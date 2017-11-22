import _  from 'lodash';

import {
  FETCH_CARDS_FROM_CACHE,
  FETCH_CARD_FROM_CACHE,
  FETCH_CARDS_SUCCESS,
  FETCH_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
  CREATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
} from '../actions';

export default function CardsReduser(state = {}, action) {

  switch (action.type) {

  case FETCH_CARDS_FROM_CACHE :
  case FETCH_CARDS_SUCCESS :
    return _.mapKeys(action.payload.data, 'id');

  case FETCH_CARD_FROM_CACHE :
  case FETCH_CARD_SUCCESS :
    return {...state, [action.payload.data.id]: action.payload.data};

  case UPDATE_CARD_SUCCESS :
    return {...state, [action.payload.data.id]: action.payload.data};

  case CREATE_CARD_SUCCESS :
    return {...state, [action.payload.data.id]: action.payload.data};

  case DELETE_CARD_SUCCESS :
    return state;

  default :
    return state;
  }
}
