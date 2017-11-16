const DEBUG = 1;
const CACHE_NAME = `cards_${new Date().toISOString()}`;
const { assets } = global.serviceWorkerOption;
const ASSETS_ORIGINS = [location.origin, 'https://cdn.rawgit.com'];

console.log('CACHE_NAME', CACHE_NAME);
const assetsToCache = ['./', ...assets];
// When the service worker is first added.
self.addEventListener('install', event => {
  // Perform install steps.
  if (DEBUG) {
    console.log('[SW] Install event')
  }

  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache)
      })
      .then(() => {
        if (DEBUG) {
          console.log('[SW] Cached assets: main', assetsToCache)
        }
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  )
});

self.addEventListener('fetch', event => {
  const request = event.request;
  // Ignore not GET request.
  if (request.method !== 'GET') {
    if (DEBUG) {
      console.log(`[SW] Ignore non GET request ${request.method}`);
    }
    return;
  }

  const requestUrl = new URL(request.url);
  // Ignore difference origin.
  if (!ASSETS_ORIGINS.includes(requestUrl.origin)) {
    if (DEBUG) {
      console.log(`[SW] Ignore difference origin ${requestUrl.origin}`);
    }
    return;
  }

  const resource = global.caches.match(request).then(response => {
    if (response) {
      if (DEBUG) {
        console.log(`[SW] fetch URL ${requestUrl.href} from cache`);
      }

      return response;
    }

    // Load and cache known assets.
    return fetch(request)
      .then(responseNetwork => {
        if (!responseNetwork || !responseNetwork.ok) {
          if (DEBUG) {
            console.log(
              `[SW] URL [${requestUrl.toString()}] wrong responseNetwork: ${responseNetwork.status} ${responseNetwork.type}`
            )
          }
        }

        if (DEBUG) {
          console.log(`[SW] URL ${requestUrl.href} fetched`);
        }

        const responseCache = responseNetwork.clone();

        global.caches.open(CACHE_NAME).then(cache => {
            return cache.put(request, responseCache);
          }).then(() => {
            if (DEBUG) {
              console.log(`[SW] Cache asset: ${requestUrl.href}`);
            }
          })

        return responseNetwork;
      });
  })

  event.respondWith(resource);
})
