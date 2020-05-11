/*
 *
 * LineChartContainer reducer
 *
 */
import produce from 'immer';
import { LINECHART_TOGGLE } from './constants';

export const initialState = {
	lineChartToggle: false,
};

/* eslint-disable default-case, no-param-reassign */
const lineChartContainerReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case LINECHART_TOGGLE: {
				draft.lineChartToggle = !state.lineChartToggle;
				break;
			}
			default:
				return state;
		}
	});

export default lineChartContainerReducer;
