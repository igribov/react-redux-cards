import _  from 'lodash';

import {
  FETCH_CARDS,
  FETCH_CARD,
  UPDATE_CARD,
  CREATE_CARD,
  DELETE_CARD,
} from '../actions';

export default function CardsReduser(state = {}, action) {

  switch (action.type) {
    case FETCH_CARDS:
      //console.log('FETCH_CARDS=>', _.mapKeys(action.payload.data, 'id'));
      return _.mapKeys(action.payload.data, 'id');

    case FETCH_CARD:
      //console.log('FETCH_CARD=>', { ...state, [action.payload.data.id]: action.payload.data});
      return { ...state, [action.payload.data.id]: action.payload.data};

    case UPDATE_CARD:
      console.log(action.payload);
      return { ...state, [action.payload.data.id]: action.payload.data};

    case CREATE_CARD:
      console.log(action);
      return { ...state, [action.payload.data.id]: action.payload.data};

	  case DELETE_CARD:
	    console.log(action.payload);
	    return state;

    default:
      return state;
  }
}