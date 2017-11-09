import axios from 'axios';
import HttpService from '../services/HttpService';

export const SET_APP_USER = 'SET_APP_USER';
export const SIGN_UP = 'SIGN_UP';

export function setAppUser(user) {

	return {
		type: SET_APP_USER,
		payload: user
	};
}

export function signUp(credetionals) {

	return {
		type: SIGN_UP,
		payload: user
	};
}