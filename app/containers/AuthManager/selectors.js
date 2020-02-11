import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authManager state domain
 */

const selectAuthManagerDomain = state => state.authManager || initialState;

/**
 * Other specific selectors
 */

const selectToken = () =>
	createSelector(
		selectAuthManagerDomain,
		state => state.jwtToken,
	);

/**
 * Default selector used by AuthManager
 */

const makeSelectAuthManager = () =>
	createSelector(
		selectAuthManagerDomain,
		substate => substate,
	);

export default makeSelectAuthManager;
export { selectAuthManagerDomain, selectToken };
