/*
 *
 * ColorChartContainer actions
 *
 */

import { 
	COLOR_CHART_TOGGLE, 
} from './constants';

export function toggleColorChart() {
	return {
		type: COLOR_CHART_TOGGLE,
	};
}
