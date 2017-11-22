import {
  SET_ACTIVE_VIEW_CARD,
} from '../actions';

export default function ActiveViewCardReduser(state = null, action) {

  switch (action.type) {
  case SET_ACTIVE_VIEW_CARD :
    return action.payload;

  default :
    return state;
  }
}
