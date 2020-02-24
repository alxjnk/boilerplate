/*
 *
 * Events actions
 *
 */

import {
	GET_EVENTS_DATA_REQUEST,
	GET_EVENTS_DATA_SUCCESS,
   GET_EVENTS_DATA_FAILURE
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