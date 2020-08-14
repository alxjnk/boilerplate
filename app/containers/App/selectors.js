/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const selectSidebarToggle = () =>
	createSelector(
		selectGlobal,
		globalState => globalState.toggleSidebar,
	);

const selectCheckInToggle = () =>
	createSelector(
		selectGlobal,
		globalState => globalState.checkInToggle,
	);

const selectCheckOutToggle = () =>
	createSelector(
		selectGlobal,
		globalState => globalState.checkOutToggle,
	);

export { 
	selectGlobal, 
	selectSidebarToggle,
	selectCheckInToggle,
	selectCheckOutToggle
};
