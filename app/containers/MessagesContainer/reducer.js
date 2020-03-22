/*
 *
 * Messages reducer
 *
 */
import produce from 'immer';
import { 
	GET_MESSAGES_DATA_SUCCESS,
	GET_MESSAGES_DATA_FAILURE,
	GET_NEW_MESSAGE_WITH_SOCKET,
	MESSAGES_TOGGLE,
} from './constants';

export const initialState = {
	messages: [],
	error: {},
	messagesToggle: false,
};

/* eslint-disable default-case, no-param-reassign */
const messagesReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_MESSAGES_DATA_SUCCESS: {
				draft.messages = action.payload;
				break;
			}
			case GET_MESSAGES_DATA_FAILURE: {
				draft.error = action.payload;
				break;
			}
			case GET_NEW_MESSAGE_WITH_SOCKET: {
				draft.messages = [ ...state.messages, action.payload ];
				break;
			}
			case MESSAGES_TOGGLE: {
				draft.messagesToggle = !state.messagesToggle;
				break;
			}
			default:
				return state;
		}
	});

export default messagesReducer;
