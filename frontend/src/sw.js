import {openDatabase} from './idb/';
const DEBUG = 0;
const { assets } = global.serviceWorkerOption;
const CACHE_VERSION = `cards_${new Date().toISOString()}`;
//const CACHE_VERSION = `cards_20`;
const ASSETS_ORIGINS = [location.origin];
const API_ORIGINS = [
  location.origin,
  'http://localhost:8000',
  'https://cards-staging.herokuapp.com',
  'https://cards-production.herokuapp.com'
];
const API_CARDS_ENDPOINT = 'api/card';

console.log('CACHE_VERSION', CACHE_VERSION);
const assetsToCache = ['./', ...assets];


// When the service worker is first added.
self.addEventListener('install', event => {
  // Perform install steps.
  if (DEBUG) {
    console.log('[SW] Install event')
  }

  event.waitUntil(
    global.caches
      .open(CACHE_VERSION)
      .then(cache => {
        return cache.addAll(assetsToCache)
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  )
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const requestUrl = new URL(request.url);
  // Ignore difference origin.
  if (!ASSETS_ORIGINS.includes(requestUrl.origin)) {
    return;
  }
  // Ignore not GET request.
  if (request.method !== 'GET') {
    return;
  }
  const resource = global.caches.match(request).then(response => {
    if (response) {
      return response;
    }
    // Load and cache known assets.
    return fetch(request)
      .then(responseNetwork => {
        const responseCache = responseNetwork.clone();
        global.caches.open(CACHE_VERSION).then(cache => {
            return cache.put(request, responseCache);
          });
        return responseNetwork;
      });
  })

  event.respondWith(resource);
});

/* If Request to API then save cards in indexedDb */
self.addEventListener('fetch', (event) => {
  const {request} = event;
  const Url = new URL(request.url);
  // us request to API ?
  if (!API_ORIGINS.includes(Url.origin)) {
    return;
  }
  if (!Url.pathname.includes(API_CARDS_ENDPOINT)) {
    return;
  }
  if (!['GET'].includes(request.method)) {
    return;
  }
  _removeOldCards();
  event.respondWith(_serveCards(request));
});

/* Serving cards objects */
function _serveCards(request) {
  return fetch(request).then(function(networkResponse) {
    networkResponse.clone().json().then(cards => {
      openDatabase().then(db => {
        let tx = db.transaction('cards', 'readwrite');
        let cardsStore = tx.objectStore('cards');
        cards.forEach(card => cardsStore.put(card));

        return tx.complete;
      });
    });
    console.log('networkResponse --> ', networkResponse);
    return networkResponse;
  })
}

/*
  Delete cards from index db
  If count of cards more then IDB_CARDS_LIMIT
  then delete backlog and closed at first
  then delete until limit = IDB_CARDS_LIMIT
*/
function _removeOldCards() {

  const IDB_CARDS_LIMIT = 6;
  let countOfCardsToDelete = 0;
  let idbPromise = openDatabase();

  idbPromise.then(db => {
    let tx = db.transaction('cards');
    let cardsStore = tx.objectStore('cards');

    return cardsStore.count();
  })
  .then(count => {
    countOfCardsToDelete = count - IDB_CARDS_LIMIT;
    return countOfCardsToDelete > 0;
  })
  .then(deleteCards => {
    if (!deleteCards) return;
    // delete cards with status backlog and closed
    return idbPromise.then(db => {
      let tx = db.transaction('cards');
      let cardsStore = tx.objectStore('cards');
      let statusIndex = cardsStore.index('status');

      return Promise.all([statusIndex.getAllKeys('closed'), statusIndex.getAllKeys('backlog')]);
    })
    .then(keysToDelete => [...keysToDelete[0], ...keysToDelete[1]].slice(0, countOfCardsToDelete))
    .then(keysToDelete => {
      if (!keysToDelete) return;
      // if cards with closed or backlog statuses in indexedDb then delete it
      return idbPromise.then(db => {
        let tx = db.transaction('cards', 'readwrite');
        let cardsStore = tx.objectStore('cards');

        return cardsStore.openCursor();
      }).then(function deleteCard(cursor) {
        if (!cursor) return;
        if (keysToDelete.includes(cursor.value.id)) {
          cursor.delete();
        }
        return cursor.continue().then(deleteCard);
      })
    })
    .then(() => {
      return idbPromise.then(db => {
        let tx = db.transaction('cards', 'readwrite');
        let cardsStore = tx.objectStore('cards');

        return cardsStore.openCursor();
      })
      .then(cursor => cursor.advance(IDB_CARDS_LIMIT))
      .then(function deleteCard(cursor) {
        if (!cursor) return;
        cursor.delete();

        return cursor.continue().then(deleteCard);
      })
    })
    .then(() => DEBUG && _logAllCards('after _removeOldCards'));
  });
}

/* Log cards from index db */
function _logAllCards(type='') {
  openDatabase().then(db => {
    let tx = db.transaction('cards', 'readwrite');
    let cardsStore = tx.objectStore('cards');
    let statusIndex = cardsStore.index('status');
    return statusIndex.openCursor();
  }).then(function logCard(cursor) {
    if (!cursor) return;
    console.log(`[LOG_CARD ${type}] : `, cursor.value);
    return cursor.continue().then(logCard);
  })
}
