import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chart state domain
 */

const selectChartDomain = state => state.chart || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Chart
 */

const makeSelectChart = () =>
	createSelector(
		selectChartDomain,
		substate => substate,
	);

export default makeSelectChart;
export { selectChartDomain };
