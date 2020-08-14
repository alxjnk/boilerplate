/*
 *
 * LineChartContainer actions
 *
 */

import {
	LINECHART_TOGGLE
} from './constants';

export const toggleLineChart = () => {
	return {
		type: LINECHART_TOGGLE,
	}
};
