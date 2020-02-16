import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the colorChartContainer state domain
 */

const selectColorChartContainerDomain = state => state.colorChartContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ColorChartContainer
 */

const makeSelectColorChartContainer = () =>
	createSelector(
		selectColorChartContainerDomain,
		substate => substate,
	);

export default makeSelectColorChartContainer;
export { selectColorChartContainerDomain };
