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

let serverOnline = true;
let newVersionReady = false;

export default function AppStatusReduser(state, action) {

  switch (action.type) {
  case FETCH_CARDS_FAIL :
  case FETCH_CARD_FAIL :
  case CREATE_CARD_FAIL :
  case UPDATE_CARD_FAIL :
  case DELETE_CARD_FAIL :
    if (action.error && action.error.response.status !== 400) {
      serverOnline = false;
    }
    return {serverOnline, newVersionReady};

  case FETCH_CARDS_SUCCESS :
  case FETCH_CARD_SUCCESS :
  case UPDATE_CARD_SUCCESS :
  case CREATE_CARD_SUCCESS :
  case DELETE_CARD_SUCCESS :
    serverOnline = true;
    return {serverOnline, newVersionReady};

  case SERVICE_WORKER_UPDATE_READY :
    serverOnline = true;
    newVersionReady = action.payload;
    return {serverOnline, newVersionReady};

  default :
    return {serverOnline, newVersionReady};
  }
}
