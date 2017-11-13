import _  from 'lodash';

import {
  FETCH_CARDS_FAIL,
  FETCH_CARD_FAIL,
  UPDATE_CARD_FAIL,
  CREATE_CARD_FAIL,
  DELETE_CARD_FAIL,
  UPDATE_CARD_SUCCESS,
  CREATE_CARD_SUCCESS
} from '../actions';

export default function ToasterReduser(state = {}, action) {

  switch (action.type) {
    case UPDATE_CARD_FAIL:
    case CREATE_CARD_FAIL:
      //console.log('UPDATE_CARD_FAIL=>', {error: action.error.response.data});
      return { errors: action.error.response.data };

    case UPDATE_CARD_SUCCESS:
    case CREATE_CARD_SUCCESS:
      //console.log('CREATE_CARD_SUCCESS=>', action);
      return { success: { message: 'Success ' + action.type } };

    default:
      return state;
  }
}
