import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the lineChartContainer state domain
 */

const selectLineChartContainerDomain = state => state.lineChartContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LineChartContainer
 */

const makeSelectLineChartContainer = () =>
	createSelector(
		selectLineChartContainerDomain,
		substate => substate,
	);

const makeSelectLineChartToggle = () =>
	createSelector(
		selectLineChartContainerDomain,
		substate => substate.lineChartToggle,
	);

export { 
	selectLineChartContainerDomain, 
	makeSelectLineChartToggle,
	makeSelectLineChartContainer,
};
