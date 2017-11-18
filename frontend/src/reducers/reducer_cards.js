import _  from 'lodash';
import {onCardRequestFails}  from '../idb/';

import {
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAIL,
  FETCH_CARD_SUCCESS,
  FETCH_CARD_FAIL,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAIL,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_FAIL,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAIL
} from '../actions';

export default function CardsReduser(state = {}, action) {

  switch (action.type) {
    case FETCH_CARDS_SUCCESS:
      //console.log('FETCH_CARDS=>', _.mapKeys(action.payload.data, 'id'));
      return _.mapKeys(action.payload.data, 'id');

    case FETCH_CARD_SUCCESS:
      return {...state, [action.payload.data.id]: action.payload.data};

    case UPDATE_CARD_SUCCESS:
      return {...state, [action.payload.data.id]: action.payload.data};

    case CREATE_CARD_SUCCESS:
      return {...state, [action.payload.data.id]: action.payload.data};

    case DELETE_CARD_SUCCESS:
      return state;

    case CREATE_CARD_FAIL:
    case UPDATE_CARD_FAIL:
    case DELETE_CARD_FAIL:
      return state;

    default:
      return state;
  }
}
