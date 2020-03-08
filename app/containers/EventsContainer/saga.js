import { takeEvery, call, put } from 'redux-saga/effects';
import { 
	GET_EVENTS_DATA_REQUEST,
	SEND_NEW_MESSAGE_REQUEST
} from './constants';
import {
	getEventsDataSuccess,
	getEventsDataFailure,
	sendNewMessageSuccess,
	sendNewMessageFailure
} from './actions';
import { getData } from '../../utils/getData';
import socket from '../../utils/socket';

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
};

export function* eventsSocketSaga() {
	yield takeEvery(SEND_NEW_MESSAGE_REQUEST,
		function* (action) {
			cosnole.log(action);
			try {
				const result = yield call(
					socket.on('ping', () => {
						// handleSendNewMessageWithSocket(data);
					})
				);

				if (result.error) throw result;

				yield put(sendNewMessageSuccess(result));
			} catch (error) {
				yield put(sendNewMessageFailure(error));
			}
		}
	);
};
