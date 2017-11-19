import _  from 'lodash';

import {
  FETCH_CARDS_FAIL,
  FETCH_CARD_FAIL,
  UPDATE_CARD_FAIL,
  CREATE_CARD_FAIL,
  DELETE_CARD_FAIL,
  UPDATE_CARD_SUCCESS,
  CREATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
} from '../actions';

export default function ToasterReduser(state = {}, action) {

  switch (action.type) {
    case UPDATE_CARD_FAIL:
    case CREATE_CARD_FAIL:
      return action.error.response ?
        { errors: action.error.response.data } :
        { error: { message: action.error.data }};

    case DELETE_CARD_SUCCESS:
      return {success: { message: 'Card successfully deleted'}};
    case UPDATE_CARD_SUCCESS:
      return {success: { message: 'Card successfully updated'}};
    case CREATE_CARD_SUCCESS:
      return {success: { message: 'Card successfully created'}};

    default:
      return state;
  }
}
