/*
 *
 * Events actions
 *
 */

import {
	GET_EVENTS_DATA_REQUEST,
	GET_EVENTS_DATA_SUCCESS,
	GET_EVENTS_DATA_FAILURE,
	GET_NEW_MESSAGE_WITH_SOCKET,
	EVENTS_TOGGLE,
} from './constants';

export function getEventsDataRequest(token) {
	return {
		type: GET_EVENTS_DATA_REQUEST,
		// payload: {
		// 	token: token,
		// }
	};
}

export const getEventsDataSuccess = (data) => {
	return {
		type: GET_EVENTS_DATA_SUCCESS,
		payload: [ ...data ]
	};
}

export const getEventsDataFailure = (error) => {
	return {
		type: GET_EVENTS_DATA_FAILURE,
		payload: { ...error }
	};
}

export const getNewMessageWithSocket = (data) => {
	return {
		type: GET_NEW_MESSAGE_WITH_SOCKET,
		payload: data
	}
}

export const toggleEvents = () => {
	return {
		type: EVENTS_TOGGLE,
	}
}