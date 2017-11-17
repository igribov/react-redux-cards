import {Redirect} from 'react-router-dom';
import {FETCH_CARDS_FAIL, FETCH_CARDS_SUCCESS} from '../actions/';
import {onCardsRequestFails, onCardRequestFails}  from '../idb/';

export const idbCacheMiddleware = store => next => action => {
  console.log('ping --> ', action);

  switch(action.type) {
    case FETCH_CARDS_FAIL:
      return next(onCardsRequestFails().then(cahcedCards => {
        return {
          payload: { data: _.mapKeys(cahcedCards, 'id') },
          type: FETCH_CARDS_SUCCESS
        };
      }));
  }

  return next(action);
};
