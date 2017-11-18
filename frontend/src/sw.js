import {openDatabase} from './idb/';
const DEBUG = 1;
const { assets } = global.serviceWorkerOption;
const CACHE_VERSION = `cards_${new Date().toISOString()}`;
//const CACHE_VERSION = `cards_2`;
//const ASSETS_ORIGINS = [location.origin];
const ASSETS_ORIGINS = [];
const API_ORIGINS = [
  location.origin,
  'http://localhost:8000',
  'https://cards-staging.herokuapp.com',
  'https://cards-production.herokuapp.com'
];
const API_CARDS_LIST_ENDPOINT = '/api/card/';

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
  if (!_isUrlOfCardApiEndpoint(Url.pathname)) {
    return;
  }

  if (!['GET'].includes(request.method)) {
    return;
  }

  if (Url.pathname == API_CARDS_LIST_ENDPOINT) {
    event.respondWith(_serveCards(request));
    return;
  }
  event.respondWith(_serveOneCard(request));
});


function _isUrlOfCardApiEndpoint(url) {
  return url === '/api/card/' || /^\/api\/card\/[0-9]+$/.test(url);
}

/* Serving one card object */
function _serveOneCard(request) {
  console.log('_serveOneCard____');
  return fetch(request).then(function(networkResponse) {
    // if fetch successed then remove all cards from indexDb
    // then save from response
    if (!networkResponse.ok) {
      return;
    }
    networkResponse.clone().json().then(card => {
      if (['closed','backlog'].includes(card.status)) return;
      openDatabase().then(db => {
        let tx = db.transaction('cards', 'readwrite');
        let cardsStore = tx.objectStore('cards');
        cardsStore.put(card);
        console.log('[SW] save card : ', card);
        return tx.complete;
      })
    });
    return networkResponse;
  }).catch(err => console.error('[SW] Network error:', err));
}

/* Serving cards objects */
function _serveCards(request) {
  let countOfServedCards = 0;
  const CARDS_SAVE_LIMIT = 20;
  return fetch(request).then(function(networkResponse) {
    // if fetch successed then remove all cards from indexDb
    // then save from response
    _removeOldCards().then(
      networkResponse.clone().json().then(cards =>
        openDatabase().then(db => {
          let tx = db.transaction('cards', 'readwrite');
          let cardsStore = tx.objectStore('cards');
          cards.forEach(card => {
            if (countOfServedCards > CARDS_SAVE_LIMIT) return;
            //if (['closed','backlog'].includes(card.status)) return;

            cardsStore.put(card);
            console.log('[SW] save card : ', card);
            countOfServedCards++;
          });

          return tx.complete;
        })
      )
    );

    return networkResponse;
  }).catch(err => console.error('[SW] Network error:', err));
}

/*
  Delete cards from index db
  If count of cards more then IDB_CARDS_LIMIT
*/
function _removeOldCards() {

  return openDatabase().then(db => {
    let tx = db.transaction('cards', 'readwrite');
    let cardsStore = tx.objectStore('cards');

    return cardsStore.openCursor();
  })
  .then(function deleteCard(cursor) {
    if (!cursor) return;
    cursor.delete();

    return cursor.continue().then(deleteCard);
  })
  //.then(() => DEBUG && _logAllCards('after _removeOldCards'));

}

/* Log cards from indexed db */
function _logAllCards(type = '') {
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
