/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { 
	LOAD_REPOS_SUCCESS, 
	LOAD_REPOS, 
	LOAD_REPOS_ERROR, 
	SIDEBAR_TOGGLE, 
	CHECK_IN_TOGGLE, 
	CHECK_OUT_TOGGLE, 
} from './constants';

// The initial state of the App
export const initialState = {
	toggleSidebar: false,
	checkInToggle: false,
	checkOutToggle: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
	produce(state, draft => {
		// console.log('app reducer action: ', action.type);
		switch (action.type) {
			case SIDEBAR_TOGGLE:
				draft.toggleSidebar = !state.toggleSidebar;
				break;
			case CHECK_IN_TOGGLE:
				draft.checkInToggle = !state.checkInToggle;
				break;
			case CHECK_OUT_TOGGLE:
				draft.checkOutToggle = !state.checkOutToggle;
				break;
			default:
				break;
		}
	});

export default appReducer;
