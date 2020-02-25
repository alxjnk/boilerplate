import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_BOOKINGS_DATA_REQUEST } from './constants';
import {
	getBookingsDataSuccess,
	getBookingsDataFailure
} from './actions';
import { getData } from '../../utils/getData';

// Individual exports for testing
export default function* bookingsContainerSaga() {
	const path = `http://jobsdone.pro:9000/cm-api/bookings`;

	yield takeEvery(GET_BOOKINGS_DATA_REQUEST,
		function* (action) {
			try {
				const result = yield call(getData, path);

				if (result.error) throw result;

				yield put(getBookingsDataSuccess(result));
			} catch (error) {
				yield put(getBookingsDataFailure(error));
			}
		}
	);
}
