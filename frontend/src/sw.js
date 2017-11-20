import {openDatabase} from './idb/';
const DEBUG = 0;
const { assets } = global.serviceWorkerOption;
const CACHE_VERSION = `cards_v1`;
const ASSETS_ORIGINS = [location.origin];
const SERVER_ROUTE_REGEXP = new RegExp('^/(api|server)');
const API_CARDS_LIST_ENDPOINT = '/api/card/';
const IGNORE_PATHS = '/server';

if(DEBUG) console.log('CACHE_VERSION -> ', CACHE_VERSION);
const assetsToCache = ['./', ...assets];

// When the service worker is first added.
self.addEventListener('install', event => {
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
  if (SERVER_ROUTE_REGEXP.test(requestUrl.pathname)) {
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

/* Listen message event */
self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
