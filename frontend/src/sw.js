import {openDatabase} from './idb/';
const DEBUG = 0;
const { assets } = global.serviceWorkerOption;
const CACHE_VERSION = `cards_${new Date().toISOString()}`;
//const CACHE_VERSION = 'cards_1';
const ASSETS_ORIGINS = [location.origin];
//const ASSETS_ORIGINS = [];
const SERVER_ROUTE_REGEXP = new RegExp('^/(api|server)');
const API_CARDS_LIST_ENDPOINT = '/api/card/';
const IGNORE_PATHS = '/server';

if(DEBUG) console.log('CACHE_VERSION -> ', CACHE_VERSION);
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

// cache ASSETS only
self.addEventListener('fetch', event => {
  const request = event.request;
  const requestUrl = new URL(request.url);
  // Ignore not GET request.
  if (request.method !== 'GET') {
    return;
  }
  // Ignore difference origin.
  if (!ASSETS_ORIGINS.includes(requestUrl.origin)) {
    return;
  }
  // Ignore server API request and "/server" route
  if (SERVER_ROUTE_REGEXP.test(requestUrl.pathname))) {
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

  if (!['GET'].includes(request.method)) {
    return;
  }
  const Url = new URL(request.url);
  // is request to cards API ?
  if (!_isUrlOfCardApiEndpoint(Url.pathname)) {
    return;
  }
  // save list of objects or one object
  if (Url.pathname == API_CARDS_LIST_ENDPOINT) {
    event.respondWith(_serveCards(request));
    return;
  }
  event.respondWith(_serveOneCard(request));
});

/* helper */
function _isUrlOfCardApiEndpoint(url) {
  return url === '/api/card/' || /^\/api\/card\/[0-9]+$/.test(url);
}

/* Serving one card object */
function _serveOneCard(request) {
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
        if (DEBUG) console.log('[SW]save card to indexedDB:', card);
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
            cardsStore.put(card);
            if(DEBUG) console.log('[SW]save card to indexedDB:', card);
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
  });
}

/* Listen message event */
self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
