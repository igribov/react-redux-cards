const FETCH_CARDS = 'FETCH_CARDS';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAIL = 'FETCH_CARDS_FAIL';

const FETCH_CARD = 'FETCH_CARD';
export const FETCH_CARD_SUCCESS = 'FETCH_CARD_SUCCESS';
export const FETCH_CARD_FAIL = 'FETCH_CARD_FAIL';

const UPDATE_CARD = 'UPDATE_CARD';
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS';
export const UPDATE_CARD_FAIL = 'UPDATE_CARD_FAIL';

const DELETE_CARD = 'DELETE_CARD';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const DELETE_CARD_FAIL = 'DELETE_CARD_FAIL';

const CREATE_CARD = 'CREATE_CARD';
export const CREATE_CARD_SUCCESS = 'CREATE_CARD_SUCCESS';
export const CREATE_CARD_FAIL = 'CREATE_CARD_FAIL';

export const SET_ACTIVE_VIEW_CARD = 'set_active_view_card';

export function fetchCards() {
  return {
    type: FETCH_CARDS,
    payload: {
      request: {
        url:'card/'
      }
    }
  };
}

export function fetchCard(id) {

  return {
    type: FETCH_CARD,
    payload: {
      request: {
        url:'card/' + id
      }
    }
  };
}

export function createCard(card) {

  return {
    type: CREATE_CARD,
    payload: {
      request:{
        method: 'post',
        data: card,
        url:'card'
      }
    }
  };
}

export function updateCard(card, callback) {

  return {
    type: UPDATE_CARD,
    payload: {
      request:{
        method: 'put',
        data: card,
        url:`card/${card.id}`
      }
    }
  };
}

export function deleteCard(card) {

  return {
    type: DELETE_CARD,
    payload: {
      request:{
        method: 'delete',
        url:`card/${card.id}`
      }
    }
  };
}

export function setActiveViewCard(card) {

	return {
		type: SET_ACTIVE_VIEW_CARD,
		payload: card
	};
}
