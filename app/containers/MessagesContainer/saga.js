import { takeEvery, call, put } from 'redux-saga/effects';
import { 
	GET_MESSAGES_DATA_REQUEST,
	SEND_NEW_MESSAGE_REQUEST
} from './constants';
import {
	getMessagesDataSuccess,
	getMessagesDataFailure,
	sendNewMessageSuccess,
	sendNewMessageFailure
} from './actions';
import { getData } from '../../utils/getData';
import socket from '../../utils/socket';

// Individual exports for testing
export default function* messagesSaga() {
	const path = `http://jobsdone.pro:9000/cm-api/messages`;

	yield takeEvery(GET_MESSAGES_DATA_REQUEST,
		function* (action) {
			try {
				const result = yield call(getData, path);

				if (result.error) throw result;

				yield put(getMessagesDataSuccess(result));
			} catch (error) {
				yield put(getMessagesDataFailure(error));
			}
		}
	);
};

export function* messagesSocketSaga() {
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
