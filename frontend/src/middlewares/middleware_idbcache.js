import {Redirect} from 'react-router-dom';
import {
  FETCH_CARDS_FAIL,
  FETCH_CARD_FAIL,
  UPDATE_CARD_SUCCESS,
  FETCH_CARDS_SUCCESS,
  FETCH_CARD_SUCCESS
} from '../actions/';

import {fetchCardsFromIndexedDb, onCardRequestFails}  from '../idb/';

export const idbCacheMiddleware = store => next => action => {
  console.log('idbCacheMiddleware', action);

  return next(action);
};
