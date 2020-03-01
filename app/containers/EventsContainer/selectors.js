import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the events state domain
 */

const selectEventsDomain = state => state.eventsContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Events
 */

const makeSelectEvents = () =>
	createSelector(
		selectEventsDomain,
		substate => substate.eventsList,
	);

const makeSelectEventsToggle = () =>
	createSelector(
		selectEventsDomain,
		substate => substate.eventsToggle,
	);

export { 
	makeSelectEvents, 
	selectEventsDomain, 
	makeSelectEventsToggle 
};
