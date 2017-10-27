import axios from 'axios';

const ROOT_URL = `${API_HOST}/api`;
const API_KEY = '?key=igribov_hash_hash';

export const FETCH_CARDS = 'fetch_cards';
export const FETCH_CARD = 'fetch_card';
export const UPDATE_CARD = 'update_card';
export const DELETE_CARD = 'delete_card';
export const CREATE_CARD = 'create_card';
export const SET_ACTIVE_VIEW_CARD = 'set_active_view_card';

export function fetchCards() {
  const request = axios.get(`${ROOT_URL}/card/`);

  return {
    type: FETCH_CARDS,
    payload: request
  };
}

export function fetchCard(id) {
  const request = axios.get(`${ROOT_URL}/card/${id}`);

  return {
    type: FETCH_CARD,
    payload: request
  };
}

export function setActiveDate(date) {
  return {
    type: SET_ACTIVE_DATE,
    payload: date
  };
}

export function createCard(card) {

  const request = axios.post(`${ROOT_URL}/card`, card);

  return {
    type: CREATE_CARD,
    payload: request
  };
}

export function updateCard(card, callback) {

  const request = axios.put(`${ROOT_URL}/card/${card.id}`, card);

  return {
    type: UPDATE_CARD,
    payload: request
  };
}

export function deleteCard(card) {

  console.log('deleteCard', card);
	const request = axios.delete(`${ROOT_URL}/card/${card.id}`);

	return {
		type: DELETE_CARD,
		payload: request
	};
}

export function setActiveViewCard(card) {

	return {
		type: SET_ACTIVE_VIEW_CARD,
		payload: card
	};
}