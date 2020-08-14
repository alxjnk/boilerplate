/*
 *
 * BookingsContainer actions
 *
 */

import { 
	GET_BOOKINGS_DATA_REQUEST,
	GET_BOOKINGS_DATA_SUCCESS,
	GET_BOOKINGS_DATA_FAILURE,
	GET_NEW_BOOKING_WITH_SOCKET, 
} from './constants';

export function getBookingsDataRequest(token) {
	return {
		type: GET_BOOKINGS_DATA_REQUEST,
		// payload: {
		// 	token: token,
		// }
	};
}

export const getBookingsDataSuccess = (data) => {
	return {
		type: GET_BOOKINGS_DATA_SUCCESS,
		payload: [ ...data ]
	};
}

export const getBookingsDataFailure = (error) => {
	return {
		type: GET_BOOKINGS_DATA_FAILURE,
		payload: { ...error }
	};
}

export const getNewBookingWithSocket = (data) => {
	return {
		type: GET_NEW_BOOKING_WITH_SOCKET,
		payload: data
	}
}