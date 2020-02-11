import axios from 'axios';
import toaster from 'toasted-notes';
import React from 'react';
// import NotificationCard from '../components/shared/NotificationCard';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
	if (response.status === 204 || response.status === 205) {
		return null;
	}
	return response;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
	if (!response) {
		toaster.notify(
			({ onClose }) => (
				<div type="error" onClose={onClose}>
					Ошибка сервера
				</div>
			),
			{
				position: 'bottom',
				duration: 5000,
			},
		);
	}
	if (response && response.status >= 200 && response.status < 300) {
		return response;
	}

	const error = new Error(response.statusText);
	error.response = response;
	if (error) {
		toaster.notify(
			({ onClose }) => <div onClose={onClose}>{response.data.err || response.data.error || error.message}</div>,
			{
				position: 'bottom',
				duration: 5000,
			},
		);
	}
	throw error;
}

const getAuthToken = () => {
	const authObject = localStorage['reduxPersist:authManager'];
	const { jwtToken } = JSON.parse(authObject);
	if (jwtToken) return jwtToken;
	return 0;
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
	const token = getAuthToken();
	return axios(url, { ...options, headers: { Authorization: token } })
		.then(checkStatus)
		.then(parseJSON)
		.catch(error => checkStatus(error.response));
}
