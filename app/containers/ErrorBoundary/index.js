import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import remote from 'loglevel-plugin-remote';

const errorJSON = log => ({
	msg: log.message,
	timestamp: log.timestamp,
	level: log.level.label,
	stacktrace: log.stacktrace,
});

if (process.env.NODE_ENV !== 'development') {
	remote.apply(log, { format: errorJSON, url: '/' });
}

log.enableAll();

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		// log the error to our server with loglevel
		log.error(error, info.componentStack);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}
		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.object,
};

export default ErrorBoundary;
