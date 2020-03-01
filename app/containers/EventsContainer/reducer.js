/*
 *
 * Events reducer
 *
 */
import produce from 'immer';
import { 
	GET_EVENTS_DATA_SUCCESS,
	GET_EVENTS_DATA_FAILURE,
	GET_NEW_MESSAGE_WITH_SOCKET,
	EVENTS_TOGGLE,
} from './constants';

export const initialState = {
	eventsList: [],
	error: {},
	eventsToggle: false,
};

/* eslint-disable default-case, no-param-reassign */
const eventsReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_EVENTS_DATA_SUCCESS: {
				draft.eventsList = action.payload;
				break;
			}
			case GET_EVENTS_DATA_FAILURE: {
				draft.error = action.payload;
				break;
			}
			case GET_NEW_MESSAGE_WITH_SOCKET: {
				draft.eventsList = [ ...state.eventsList, action.payload ];
				break;
			}
			case EVENTS_TOGGLE: {
				draft.eventsToggle = !state.eventsToggle;
				break;
			}
			default:
				return state;
		}
	});

export default eventsReducer;
