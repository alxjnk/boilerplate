import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import { 
	GET_MESSAGES_DATA_REQUEST,
	SEND_ALL_MESSAGES_DATA_REQUEST,
	SEND_NEW_MESSAGE_REQUEST,
} from './constants';
import {
	getMessagesDataSuccess,
	getMessagesDataFailure,
	sendAllMessagesSuccess,
	sendAllMessagesFailure,
	sendNewMessageSuccess,
	sendNewMessageFailure,
} from './actions';
import { getData } from '../../utils/getData';
import { sendData } from '../../utils/sendData';
import socket from '../../utils/socket';

export function* getMessagesSaga() {
	// const path = `http://jobsdone.pro:9000/cm-api/messages`;
	const path = `http://localhost:9000/cm-api/messages`;

	try {
		const result = yield call(getData, path);

		yield put(getMessagesDataSuccess(result));
	} catch (error) {
		yield put(getMessagesDataFailure(error));
	}
};

export function* sendAllMessagesSaga(action) {
	// const path = `http://jobsdone.pro:9000/cm-api/messages`;
	const path = `http://localhost:9000/cm-api/messages`;
	const messages = [ ...action.payload ];
	console.log('36 saga messages container: ', messages)
	
	try {
		const result = yield call(sendData, messages, path);

		yield put(sendAllMessagesSuccess(result));
	} catch (error) {
		yield put(sendAllMessagesFailure(error));
	}
};

// export function* messagesSocketSaga(action) {
// 	yield takeEvery(SEND_NEW_MESSAGE_REQUEST,
// 		function* (action) {
// 			cosnole.log(action);
// 			try {
// 				const result = yield call(
// 					socket.on('ping', () => {
// 						// handleSendNewMessageWithSocket(data);
// 					})
// 				);

// 				if (result.error) throw result;

// 				yield put(sendNewMessageSuccess(result));
// 			} catch (error) {
// 				yield put(sendNewMessageFailure(error));
// 			}
// 		}
// 	);
// };

export default function* messagesSaga() {
	yield takeEvery(GET_MESSAGES_DATA_REQUEST, getMessagesSaga);
	yield takeEvery(SEND_ALL_MESSAGES_DATA_REQUEST, sendAllMessagesSaga);
	// yield takeLatest(SEND_NEW_MESSAGE_REQUEST, messagesSocketSaga);
};