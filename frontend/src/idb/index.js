import idb from 'idb';

const APP_DB_NAME = 'cards-db';
const APP_DB_VER = 1;

export function openDatabase() {
  return idb.open(APP_DB_NAME, APP_DB_VER, (upgradeDb) => {
    switch(upgradeDb.oldVersion) {
      case 0:
        const peopleStore = upgradeDb.createObjectStore('cards', {keyPath: 'id'});
        peopleStore.createIndex('status', 'status');
    }
  });
}

export const onCardsRequestFails = () => {
  return openDatabase().then(db => {
    let tx = db.transaction('cards');
    let cardsStore = tx.objectStore('cards');

    return cardsStore.getAll();
  });
}

export const onCardRequestFails = (api_url) => {
  if (!/^card\/[1-9]+$/.test(api_url)) {
    return;
  }
  const key = +api_url.replace(/card\//, '');

  return openDatabase().then(db => {
    let tx = db.transaction('cards');
    let cardsStore = tx.objectStore('cards');

    return cardsStore.get(key);
  });
}
