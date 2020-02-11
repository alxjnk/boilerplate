/**
 *
 * AuthManager
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import makeSelectAuthManager from './selectors';
import { authAction, authCheck, authLogout } from './actions';
// import Modal from '../../components/shared/Modal';
import AuthForm from './components/AuthForm';
export const AuthContext = React.createContext({});
export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;

export function AuthManager({ children, user, authUser, authLogout, authCheck }) {
	useInjectReducer({ key: 'authManager', reducer });
	useInjectSaga({ key: 'authManager', saga });

	let timeOut = null;

	useEffect(() => {
		if (user.isAuthenticated && user.jwtToken) {
			timeOut = setTimeout(() => authCheck(), 1000);
		}
		return () => {
			clearTimeout(timeOut);
		};
	});

	// if (!user.isAuthenticated) {
	// 	return (
	// 		<div style={{ display: !user.isAuthenticated ? 'block' : 'none', width: 520 }} title="Авторизация">
	// 			<AuthForm authUser={authUser} />
	// 		</div>
	// 	);
	// }

	return (
		<AuthProvider
			value={{ user, auth: user.isAuthenticated, authUser, authLogout, authCheck, permissions: user.userActions }}
		>
			{children}
		</AuthProvider>
	);
}

AuthManager.propTypes = {
	dispatch: PropTypes.func.isRequired,
	children: PropTypes.object,
	user: PropTypes.object,
	authUser: PropTypes.func,
	authLogout: PropTypes.func,
	authCheck: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	user: makeSelectAuthManager(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		authUser: values => dispatch(authAction(values)),
		authLogout: () => dispatch(authLogout()),
		authCheck: () => dispatch(authCheck()),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(withConnect)(AuthManager);
