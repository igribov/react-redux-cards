import idb from 'idb';

const APP_DB_NAME = 'cards-db';
const APP_DB_VER = 1;

function _openDatabase() {
  // If the browser doesn't support service worker,
  // we don't care about having a database
  if (!navigator.serviceWorker) {
    return Promise.resolve();
  }

  return idb.open(APP_DB_NAME, APP_DB_VER, function(upgradeDb) {
    switch(upgradeDb.oldVersion) {
      case 0:
        const peopleStore = upgradeDb.createObjectStore('cards', {keyPath: 'id'});
        peopleStore.createIndex('status', 'status');
    }
  });
}

function _isApiUrl(url) {
  const Url = new URL(url);

  return Url.pathname === '/api/card/'
}

export const onApiResponse = (res) => {
  let dbPromise = _openDatabase();
  //if (/*_isApiUrl(res.request.responseURL) && */res.data) {
  //  console.log('WOWOW!!', res.request, mid);
  //}


  return res;
}

export const apiIdbRequestInterceptor = (mid, req) => {
  console.log('[apiIdbRequestInterceptor] : ', req);
  req['saveInIdb'] = true;
  return req;
}
// this._dbPromise.then(function(db) {
//   if (!db) return;
//
//   var tx = db.transaction('wittrs', 'readwrite');
//   var store = tx.objectStore('wittrs');
//   messages.forEach(function(message) {
//     store.put(message);
//   });
//
//   // limit store to 30 items
//   store.index('by-date').openCursor(null, "prev").then(function(cursor) {
//     return cursor.advance(30);
//   }).then(function deleteRest(cursor) {
//     if (!cursor) return;
//     cursor.delete();
//     return cursor.continue().then(deleteRest);
//   });
// });
