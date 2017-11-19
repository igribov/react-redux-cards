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

import {
  SERVICE_WORKER_UPDATE_READY
} from '../actions/sw';

export default function AppStatusReduser(state={}, action) {

  let returnState = {
    serverOnline: true,
    newVersionReady: false
  };

  switch (action.type) {
    case FETCH_CARDS_FAIL:
    case FETCH_CARD_FAIL:
    case CREATE_CARD_FAIL:
    case UPDATE_CARD_FAIL:
    case DELETE_CARD_FAIL:
      returnState.serverOnline = false;
      return returnState;

    case FETCH_CARDS_SUCCESS:
    case FETCH_CARD_SUCCESS:
    case UPDATE_CARD_SUCCESS:
    case CREATE_CARD_SUCCESS:
    case DELETE_CARD_SUCCESS:
      return returnState;

    case SERVICE_WORKER_UPDATE_READY:
      returnState.newVersionReady = action.payload;
      return returnState;

    default:
      return returnState;
  }
}
