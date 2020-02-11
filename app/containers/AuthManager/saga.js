import { takeLatest, call, put, select, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import {
	AUTH_REQUEST,
	AUTH_SUCCESS,
	AUTH_ERROR,
	AUTH_LOGOUT_REQUEST,
	AUTH_LOGOUT_SUCCESS,
	AUTH_LOGOUT_ERROR,
	AUTH_CHECK_REQUEST,
	AUTH_CHECK_SUCCESS,
	AUTH_CHECK_ERROR,
} from './constants';

const authConfig = {
	method: 'GET',
};

const baseURL = `${API_URL}/api/v1/authorization`;

export function* authUser(action) {
	// eslint-disable-next-line no-undef
	const requestURL = `${baseURL}/corp/login`;

	try {
		const response = yield call(request, requestURL, {
			...authConfig,

			auth: action.payload,
		});
		yield put({ type: AUTH_SUCCESS, payload: response.data });
	} catch (error) {
		yield put({ type: AUTH_ERROR, payload: error });
	}
}

export function* authLogout() {
	// eslint-disable-next-line no-undef
	const requestURL = `${baseURL}/corp/logout`;

	try {
		yield call(request, requestURL, {
			...authConfig,
		});
		yield put({ type: AUTH_LOGOUT_SUCCESS });
	} catch (error) {
		yield put({ type: AUTH_LOGOUT_ERROR, payload: error });
	}
}

export function* authCheck() {
	// eslint-disable-next-line no-undef
	const requestURL = `${baseURL}/corp/cookies/check`;
	try {
		yield call(request, requestURL, {
			...authConfig,
		});
		yield put({ type: AUTH_CHECK_SUCCESS });
	} catch (error) {
		yield put({ type: AUTH_CHECK_ERROR, payload: error });
	}
}

export default function* authManagerSaga() {
	yield takeEvery(AUTH_CHECK_REQUEST, authCheck);
	yield takeLatest(AUTH_REQUEST, authUser);
	yield takeLatest(AUTH_LOGOUT_REQUEST, authLogout);
}
