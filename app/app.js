/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
// Import root app
import App from 'containers/App';

// Import Language Provider

import configureStore from './configureStore';
import AuthManager from './containers/AuthManager';
import ErrorBoundary from './containers/ErrorBoundary';
// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const latoObserver = new FontFaceObserver('lato', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
latoObserver.load().then(() => {
	document.body.classList.add('fontLoaded');
});

// Create redux store with history

async function init() {
	const initialState = {};
	const store = await configureStore(initialState, history);
	const MOUNT_NODE = document.getElementById('app');
	ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<ErrorBoundary>
					<AuthManager>
						<App />
					</AuthManager>
				</ErrorBoundary>
			</ConnectedRouter>
		</Provider>,
		MOUNT_NODE,
	);
}

init();
// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
	require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
