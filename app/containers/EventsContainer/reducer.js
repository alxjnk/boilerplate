/*
 *
 * Events reducer
 *
 */
import produce from 'immer';
import { 
	GET_EVENTS_DATA_SUCCESS,
	GET_EVENTS_DATA_FAILURE
} from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const eventsReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_EVENTS_DATA_SUCCESS: {
				
				break;
			}
			case GET_EVENTS_DATA_FAILURE: {
				
				break;
			}
			default:
				return state;
		}
	});

export default eventsReducer;
