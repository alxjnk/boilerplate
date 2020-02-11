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

export { selectGlobal, selectSidebarToggle };
