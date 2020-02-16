import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sidebarContainer state domain
 */

const selectSidebarContainerDomain = state => state.sidebarContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SidebarContainer
 */

const makeSelectSidebarContainer = () =>
	createSelector(
		selectSidebarContainerDomain,
		substate => substate,
	);

export default makeSelectSidebarContainer;
export { selectSidebarContainerDomain };
