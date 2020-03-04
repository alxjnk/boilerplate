/*
 *
 * BookingsContainer reducer
 *
 */
import produce from 'immer';
import { 
	GET_BOOKINGS_DATA_SUCCESS,
	GET_BOOKINGS_DATA_FAILURE,
	GET_NEW_BOOKING_WITH_SOCKET,
} from './constants';

export const initialState = {
	bookingsData: [],
	error: {},
};

/* eslint-disable default-case, no-param-reassign */
const bookingsContainerReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_BOOKINGS_DATA_SUCCESS: {
				draft.bookingsData = action.payload;
				break;
			}
			case GET_BOOKINGS_DATA_FAILURE: {
				draft.error = action.payload;
				break;
			}
			case GET_NEW_BOOKING_WITH_SOCKET: {
				draft.bookingsData = [ ...state.bookingsData, action.payload ];
				break;
			}
			default:
				return state;
		}
	});

export default bookingsContainerReducer;
