import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the messages state domain
 */

const selectMessagesDomain = state => state.messagesContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Messages
 */

const makeSelectMessages = () =>
	createSelector(
		selectMessagesDomain,
		substate => substate.messages,
	);

const makeSelectMessagesToggle = () =>
	createSelector(
		selectMessagesDomain,
		substate => substate.messagesToggle,
	);

export { 
	makeSelectMessages, 
	selectMessagesDomain, 
	makeSelectMessagesToggle 
};
