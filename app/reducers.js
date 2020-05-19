/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import authManagerReducer from './containers/AuthManager/reducer';
import bookingsContainerReducer from './containers/BookingsContainer/reducer';
import messagesReducer from './containers/MessagesContainer/reducer';
import colorChartReducer from './containers/ColorChartContainer/reducer';
import lineChartContainerReducer from './containers/LineChartContainer/reducer';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
	return combineReducers({
		global: globalReducer,
		bookings: bookingsContainerReducer,
		messages: messagesReducer,
		authManager: authManagerReducer,
		// colorChart: colorChartReducer,
		lineChart: lineChartContainerReducer,
		router: connectRouter(history),
		...injectedReducers,
	});
}
