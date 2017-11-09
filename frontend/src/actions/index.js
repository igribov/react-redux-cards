import axios from 'axios';
import HttpService from '../services/HttpService';
const ROOT_URL = `${API_HOST}/api`;
const API_KEY = '?key=igribov_hash_hash';

export const FETCH_CARDS = 'fetch_cards';
export const FETCH_CARD = 'fetch_card';
export const UPDATE_CARD = 'update_card';
export const DELETE_CARD = 'delete_card';
export const CREATE_CARD = 'create_card';
export const SET_ACTIVE_VIEW_CARD = 'set_active_view_card';

const httpService = new HttpService({ headers: {'Authorization' : 'Bearer accesstoken123456789123456789012'} });

export function fetchCards() {
  const request = httpService.get('card/');

  return {
    type: FETCH_CARDS,
    payload: request
  };
}

export function fetchCard(id) {
  const request = httpService.get(`card/${id}`);

  return {
    type: FETCH_CARD,
    payload: request
  };
}

export function createCard(card) {
  const request = httpService.post(`card/${id}`);

  return {
    type: CREATE_CARD,
    payload: request
  };
}

export function updateCard(card, callback) {
  const request = httpService.put(`card/${card.id}`, card);

  return {
    type: UPDATE_CARD,
    payload: request
  };
}

export function deleteCard(card, callback=()=>{}) {
  const request = httpService.del(`card/${card.id}`).then(() => callback());

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