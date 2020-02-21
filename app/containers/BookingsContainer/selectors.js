import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bookingsContainer state domain
 */

const selectBookingsContainerDomain = state => state.bookingsContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookingsContainer
 */

const makeSelectCheckInContainer = () =>
	createSelector(
		selectBookingsContainerDomain,
		substate => substate.closestCheckInData,
	);

const makeSelectCheckOutContainer = () =>
	createSelector(
		selectBookingsContainerDomain,
		substate => substate.closestCheckOutData,
	);

export { 
	selectBookingsContainerDomain, 
	makeSelectCheckInContainer, 
	makeSelectCheckOutContainer 
};
