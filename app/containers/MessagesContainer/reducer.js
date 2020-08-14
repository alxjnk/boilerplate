/*
 *
 * Messages reducer
 *
 */
import produce from 'immer';
import { 
	GET_MESSAGES_DATA_SUCCESS,
	GET_MESSAGES_DATA_FAILURE,
	SEND_ALL_MESSAGES_DATA_SUCCESS,
	SEND_ALL_MESSAGES_DATA_FAILURE,
	SEND_NEW_MESSAGE_SUCCESS,
	SEND_NEW_MESSAGE_FAILURE,
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
		// console.log('25: Messages reducer STATE: ', state);
		switch (action.type) {
			case GET_MESSAGES_DATA_SUCCESS: {
				draft.messages = action.payload;
				break;
			}
			case GET_MESSAGES_DATA_FAILURE: {
				draft.error = action.payload;
				break;
			}
			case SEND_ALL_MESSAGES_DATA_SUCCESS: {
				draft.messages = action.payload;
				break;
			}
			case SEND_ALL_MESSAGES_DATA_FAILURE: {
				draft.error = action.payload;
				break;
			}
			case SEND_NEW_MESSAGE_SUCCESS: {
				draft.messages = [
					...state.messages,
					action.payload
				];
				break;
			}
			case SEND_NEW_MESSAGE_FAILURE: {
				draft.error = action.payload;
				break;
			}
			case GET_NEW_MESSAGE_WITH_SOCKET: {
				draft.messages = [ 
					...state.messages, 
					action.payload 
				];
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
