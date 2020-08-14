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

const makeSelectBookingsContainer = () =>
	createSelector(
		selectBookingsContainerDomain,
		substate => substate.bookingsData,
	);

export { selectBookingsContainerDomain, makeSelectBookingsContainer };
