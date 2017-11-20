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
    case CREATE_CARD_FAIL:
    case DELETE_CARD_FAIL:
      console.log('CARD_FAIL:', action);
      if (action.error.response && action.error.response.data) {
        return { errors: action.error.response.data };
      }
      if (action.error.response && action.error.response.statusText) {
        return { error: { message: action.error.response.statusText }};
      }
      return { error: { message: 'Error occured!' }};

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
