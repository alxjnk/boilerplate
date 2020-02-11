/*
 *
 * AuthManager reducer
 *
 */
import produce from 'immer';
import {
	AUTH_ERROR,
	AUTH_REQUEST,
	AUTH_SUCCESS,
	AUTH_LOGOUT_SUCCESS,
	AUTH_CHECK_ERROR,
	AUTH_CHECK_SUCCESS,
} from './constants';

export const initialState = {
	jwtToken: '',
	userActions: [],
	userName: '',
	status: '',
	hasLoadedOnce: false,
	isAuthenticated: false,
	isLogoutModal: false,
	isChecked: false,
	expiresAt: '',
	allActions: new Map(),
};

/* eslint-disable default-case, no-param-reassign */
const authManagerReducer = (state = initialState, action) => {
	const { type, payload } = action;
	const response = payload;
	return produce(state, draftState => {
		switch (type) {
			case AUTH_REQUEST:
				draftState.status = 'loading';
				break;
			case AUTH_SUCCESS:
				draftState.userName = response && response.name ? response.name : '';
				draftState.userActions = response && response.actions ? response.actions : [];
				draftState.allActions = response && response.actions ? response.map_of_actions : new Map();
				draftState.status = response && response.jwt ? 'success' : '';
				draftState.isAuthenticated = !!(response && response.jwt);
				draftState.hasLoadedOnce = true;
				draftState.jwtToken = response && response.jwt ? response.jwt : '';
				draftState.expiresAt = response && response.expiresAt ? response.expiresAt : '';
				draftState.isLogoutModal = false;
				break;
			case AUTH_ERROR:
				return initialState;
			case AUTH_CHECK_ERROR:
				return initialState;
			case AUTH_LOGOUT_SUCCESS:
				return {
					...initialState,
					isLogoutModal: true,
				};
			default:
				return state;
		}
	});
};

export default authManagerReducer;
