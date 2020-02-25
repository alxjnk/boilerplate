import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_EVENTS_DATA_REQUEST } from './constants';
import {
	getEventsDataSuccess,
	getEventsDataFailure
} from './actions';
import { getData } from '../../utils/getData';

// Individual exports for testing
export default function* eventsSaga() {
	const path = `http://jobsdone.pro:9000/cm-api/messages`;

	yield takeEvery(GET_EVENTS_DATA_REQUEST,
		function* (action) {
			try {
				const result = yield call(getData, path);

				if (result.error) throw result;

				yield put(getEventsDataSuccess(result));
			} catch (error) {
				yield put(getEventsDataFailure(error));
			}
		}
	);
}
