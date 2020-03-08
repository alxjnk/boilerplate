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
	SEND_NEW_MESSAGE_REQUEST,
	SEND_NEW_MESSAGE_SUCCESS,
	SEND_NEW_MESSAGE_FAILURE,
	EVENTS_TOGGLE,
} from './constants';

export function getEventsDataRequest(token) {
	return {
		type: GET_EVENTS_DATA_REQUEST,
		// payload: {
		// 	token: token,
		// }
	};
};

export const getEventsDataSuccess = (data) => {
	return {
		type: GET_EVENTS_DATA_SUCCESS,
		payload: [ ...data ]
	};
};

export const getEventsDataFailure = (error) => {
	return {
		type: GET_EVENTS_DATA_FAILURE,
		payload: { ...error }
	};
};

export const getNewMessageWithSocket = (data) => {
	return {
		type: GET_NEW_MESSAGE_WITH_SOCKET,
		payload: data
	}
};

export const sendNewMessageRequest = (data) => {
	return {
		type: SEND_NEW_MESSAGE_REQUEST,
		payload: data
	}
};

export const sendNewMessageSuccess = (data) => {
	return {
		type: SEND_NEW_MESSAGE_SUCCESS,
		payload: data
	}
};

export const sendNewMessageFailure = (data) => {
	return {
		type: SEND_NEW_MESSAGE_FAILURE,
		payload: { ...error }
	}
};

export const toggleEvents = () => {
	return {
		type: EVENTS_TOGGLE,
	}
};