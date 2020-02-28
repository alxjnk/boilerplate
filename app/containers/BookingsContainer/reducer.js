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
	closestCheckInData: [],
	closestCheckOutData: [
		{
			id: 1,
			platform: 'booking',
			fullName: 'Mike Sigal',
			arrival: '02.01.2020',
			departure: '11.01.2020',
			room: 3,
			price: 49,
			pax: 6,
			comment: "Some long life comment what they needs",
			property: "Villa del mare",
			dissmiss: false,
			createdAt: null,
			updatedAt: null,
		},
		{
			id: 2,
			platform: 'airbnb',
			fullName: 'Kate Rock',
			arrival: '11.02.2020',
			departure: '17.02.2020',
			room: 5,
			price: 40,
			pax: 3,
			comment: "Some long life comment what they needs",
			property: "Villa del mare",
			dissmiss: false,
			createdAt: null,
			updatedAt: null,
		},
		{
			id: 3,
			platform: 'booking',
			fullName: 'Migel Sores',
			arrival: '19.03.2020',
			departure: '22.03.2020',
			room: 6,
			price: 55,
			pax: 2,
			comment: "Some long life comment what they needs",
			property: "Villa del mare",
			dissmiss: false,
			createdAt: null,
			updatedAt: null,
		},
	],
	error: {},
};

/* eslint-disable default-case, no-param-reassign */
const bookingsContainerReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		console.log(action);
		switch (action.type) {
			case GET_BOOKINGS_DATA_SUCCESS: {
				draft.closestCheckInData = action.payload;
				break;
			}
			case GET_BOOKINGS_DATA_FAILURE: {
				draft.error = action.payload;
				break;
			}
			case GET_NEW_BOOKING_WITH_SOCKET: {
				draft.closestCheckInData = [ ...state.closestCheckInData, action.payload ];
				break;
			}
			default:
				return state;
		}
	});

export default bookingsContainerReducer;
