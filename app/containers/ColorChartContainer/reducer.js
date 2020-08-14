/*
 *
 * ColorChartContainer reducer
 *
 */
import produce from 'immer';
import { 
	COLOR_CHART_TOGGLE, 
} from './constants';

export const initialState = {
	colorChartToggle: false,
};

/* eslint-disable default-case, no-param-reassign */
const colorChartContainerReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case COLOR_CHART_TOGGLE: {
				draft.colorChartToggle = !state.colorChartToggle;
				break;
			}
			default:
				return state;
		}
	});

export default colorChartContainerReducer;
