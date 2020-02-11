/**
 *
 * AuthForm
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import notify from '../../../../utils/notification';
// import {createUseStyles} from 'react-jss';

function AuthForm({ authUser }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [touched, setTouched] = useState(false);
	const formRef = useRef(null);

	function auth() {
		if (!username) {
			notify('bottom', 'Укажите логин пользователя', 2000, 'error');
		}
		if (!password) {
			notify('bottom', 'Укажите пароль пользователя', 2000, 'error');
		}
		if (username && password) {
			authUser({
				username,
				password,
			});
		}
	}

	// useEffect(() => {
	// 	formRef.current.focus();
	// }, []);

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				auth();
				setTouched(true);
			}}
		>
			<div>
				<input
					setRef={formRef}
					value={username}
					onChange={username => setUsername(username)}
					error={touched && !username}
					placeholder="Username"
				/>
			</div>
			<div>
				<input
					value={password}
					inputType="password"
					error={touched && !password}
					onChange={password => setPassword(password)}
					placeholder="Password"
				/>
			</div>
			<div>
				<button type="submit">Отправить</button>
			</div>
		</form>
	);
}

AuthForm.propTypes = {
	authUser: PropTypes.func,
};

export default AuthForm;
