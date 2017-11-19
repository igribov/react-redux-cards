import _  from 'lodash';

import {
  FETCH_CARDS_FROM_CACHE,
  FETCH_CARD_FROM_CACHE,
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

  //console.log(action, FETCH_CARDS_FROM_CACHE, action.type == 'FETCH_CARDS_FROM_CACHE');
  switch (action.type) {

    case FETCH_CARDS_FROM_CACHE:
    case FETCH_CARDS_SUCCESS:
      return _.mapKeys(action.payload.data, 'id');

    case FETCH_CARD_FROM_CACHE:
    case FETCH_CARD_SUCCESS:
      return {...state, [action.payload.data.id]: action.payload.data};

    case UPDATE_CARD_SUCCESS:
      return {...state, [action.payload.data.id]: action.payload.data};

    case CREATE_CARD_SUCCESS:
      return {...state, [action.payload.data.id]: action.payload.data};

    case DELETE_CARD_SUCCESS:
      return state;

    default:
      return state;
  }
}
