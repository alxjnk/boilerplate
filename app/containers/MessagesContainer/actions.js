/*
 *
 * Messages actions
 *
 */

import {
	GET_MESSAGES_DATA_REQUEST,
	GET_MESSAGES_DATA_SUCCESS,
	GET_MESSAGES_DATA_FAILURE,
	GET_NEW_MESSAGE_WITH_SOCKET,
	SEND_ALL_MESSAGES_DATA_REQUEST,
	SEND_ALL_MESSAGES_DATA_SUCCESS,
	SEND_ALL_MESSAGES_DATA_FAILURE,
	SEND_NEW_MESSAGE_REQUEST,
	SEND_NEW_MESSAGE_SUCCESS,
	SEND_NEW_MESSAGE_FAILURE,
	MESSAGES_TOGGLE,
} from './constants';

export function getMessagesDataRequest(token) {
	return {
		type: GET_MESSAGES_DATA_REQUEST,
		// payload: {
		// 	token: token,
		// }
	};
};

export const getMessagesDataSuccess = (data) => {
	return {
		type: GET_MESSAGES_DATA_SUCCESS,
		payload: [ ...data ]
	};
};

export const getMessagesDataFailure = (error) => {
	return {
		type: GET_MESSAGES_DATA_FAILURE,
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

export const sendNewMessageFailure = (error) => {
	return {
		type: SEND_NEW_MESSAGE_FAILURE,
		payload: { ...error }
	}
};

export const sendAllMessagesRequest = (data) => {
	return {
		type: SEND_ALL_MESSAGES_DATA_REQUEST,
		payload: data
	}
};

export const sendAllMessagesSuccess = (data) => {
	return {
		type: SEND_ALL_MESSAGES_DATA_SUCCESS,
		payload: data
	}
};

export const sendAllMessagesFailure = (error) => {
	return {
		type: SEND_ALL_MESSAGES_DATA_FAILURE,
		payload: { ...error }
	}
};

export const toggleMessages = () => {
	return {
		type: MESSAGES_TOGGLE,
	}
};