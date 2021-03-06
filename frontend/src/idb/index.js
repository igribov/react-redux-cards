import idb from 'idb';

const APP_DB_NAME = 'cards-db';
const DB_CARDS_TABLE = 'cards';
const APP_DB_VER = 1;

/*eslint no-case-declarations: "off"*/
export function openDatabase() {
  return idb.open(APP_DB_NAME, APP_DB_VER, (upgradeDb) => {
    switch (upgradeDb.oldVersion) {
    case 0 :
      const peopleStore = upgradeDb.createObjectStore(DB_CARDS_TABLE, {keyPath: 'id'});
      peopleStore.createIndex('status', 'status');
      // break omitted
    default :
    }
  });
}

export const fetchCardsFromIndexedDb = () =>
  openDatabase().then(db => db.transaction(DB_CARDS_TABLE).objectStore(DB_CARDS_TABLE).getAll());

export const fetchCardFromIndexedDb = (key) => openDatabase().then(db =>
  db.transaction(DB_CARDS_TABLE).objectStore(DB_CARDS_TABLE).get(+key));

export const putCardIntoIndexedDb = (card) => openDatabase().then(db => {
  const tx = db.transaction(DB_CARDS_TABLE, 'readwrite');
  tx.objectStore(DB_CARDS_TABLE).put(card);
  return tx.complete;
});

export const putCardsIntoIndexedDb = (cards) => clearCardsInIndexedDb().then(
  () => openDatabase().then(db => {
    const tx = db.transaction(DB_CARDS_TABLE, 'readwrite');
    cards.forEach(card => tx.objectStore(DB_CARDS_TABLE).put(card));
    return tx.complete;
  })
);

export const deleteCardFromIndexedDb = (card) => openDatabase().then(db => {
  const tx = db.transaction(DB_CARDS_TABLE, 'readwrite');
  tx.objectStore(DB_CARDS_TABLE).delete(card);
  return tx.complete;
});

export const clearCardsInIndexedDb = () => openDatabase().then(db => {
  const tx = db.transaction(DB_CARDS_TABLE, 'readwrite');
  tx.objectStore(DB_CARDS_TABLE).clear();
  return tx.complete;
});
