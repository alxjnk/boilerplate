import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the closestBookingsContainer state domain
 */

const selectClosestBookingsContainerDomain = state => state.closestBookingsContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClosestBookingsContainer
 */

const makeSelectClosestBookingsContainer = () =>
	createSelector(
		selectClosestBookingsContainerDomain,
		substate => substate,
	);

export default makeSelectClosestBookingsContainer;
export { selectClosestBookingsContainerDomain };
