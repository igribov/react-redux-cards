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
  return next(action);

  switch(action.type) {

    case FETCH_CARD_FAIL:
      return next(fetchCardsFromIndexedDb().then(cahcedCards => {
        if (!action.meta) {
          return {
            payload: {error: true},
            type: FETCH_CARD_FAIL
          };
        }
        const key = action.meta.previousAction.payload.request.url.replace(/card\//, '');
        cahcedCards = _.mapKeys(cahcedCards, 'id');

        if (key in cahcedCards) {
          return {
            payload: { data: cahcedCards },
            type: FETCH_CARDS_SUCCESS
          };
        } else {
          return {
            payload: {error: true},
            type: FETCH_CARD_FAIL
          };
        }
      }));
    case FETCH_CARDS_FAIL:
      return next(fetchCardsFromCache().then(cahcedCards => {
        return {
          payload: { data: _.mapKeys(cahcedCards, 'id') },
          type: FETCH_CARDS_SUCCESS
        };
      }));
  }

  return next(action);
};
