/*
 *
 * AuthManager actions
 *
 */

import { AUTH_REQUEST, AUTH_LOGOUT_REQUEST, AUTH_CHECK_REQUEST } from './constants';

export function authAction({ username, password }) {
	return {
		type: AUTH_REQUEST,
		payload: { username: unescape(encodeURIComponent(username)), password: unescape(encodeURIComponent(password)) },
	};
}

export function authLogout() {
	return {
		type: AUTH_LOGOUT_REQUEST,
	};
}

export function authCheck() {
	return {
		type: AUTH_CHECK_REQUEST,
	};
}
