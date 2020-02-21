/*
 *
 * BookingsContainer reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
	closestCheckInData: [
		{
			id: 1,
			name: 'Tom',
			surname: 'Stivens',
			roomNumber: 7,
			arrivalDate: '14.01.2020',
			departureDate: '21.01.2020',
			numberOfPeople: 3,
		},
		{
			id: 2,
			name: 'Stiv',
			surname: 'Jobs',
			roomNumber: 3,
			arrivalDate: '09.02.2020',
			departureDate: '23.02.2020',
			numberOfPeople: 1,
		},
		{
			id: 3,
			name: 'Marta',
			surname: 'Pit',
			roomNumber: 11,
			arrivalDate: '21.03.2020',
			departureDate: '27.03.2020',
			numberOfPeople: 4,
		},
	],
	closestCheckOutData: [
		{
			id: 1,
			name: 'Mike',
			surname: 'Sigal',
			roomNumber: 3,
			arrivalDate: '02.01.2020',
			departureDate: '11.01.2020',
			numberOfPeople: 5,
		},
		{
			id: 2,
			name: 'Kate',
			surname: 'Rock',
			roomNumber: 5,
			arrivalDate: '11.02.2020',
			departureDate: '17.02.2020',
			numberOfPeople: 1,
		},
		{
			id: 3,
			name: 'Migel',
			surname: 'Sores',
			roomNumber: 6,
			arrivalDate: '19.03.2020',
			departureDate: '22.03.2020',
			numberOfPeople: 2,
		},
	],
};

/* eslint-disable default-case, no-param-reassign */
const bookingsContainerReducer = (state = initialState, action) =>
	produce(state, (/* draft */) => {
		switch (action.type) {
			case DEFAULT_ACTION:
				break;
		}
	});

export default bookingsContainerReducer;
