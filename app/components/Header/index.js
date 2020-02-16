/**
 *
 * Header
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import { Navbar, Button } from 'react-bootstrap';
import classNames from 'classnames';

const headerStyle = theme => ({
	headerWrapper: {
		zIndex: 500,
		position: 'fixed',
		width: '100vw',
		'@media (max-width: 991.98px)': {
			width: '100% !important',
		},
	},
	header: {
		display: 'flex',
		width: '100%',
		height: '70px',
		background: '#fff',
		alignItems: 'center',
		boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.25)',
		justifyContent: 'flex-start',
		'@media (max-width: 991.98px)': {
			justifyContent: 'space-between',
		},
		// padding: '0 22px 0 22px',
		padding: '0',
	},
	logo: {
		width: '250px',
		height: '100%',
		lineHeight: '60px',
		textAlign: 'center',
	},
	sidebarToggler: {
		cursor: 'pointer',
		background: '#3A0078',
		boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.21)',
		color: '#FFFFFF',
		width: 24,
		height: 24,
		borderRadius: '50%',
		// display: 'none',
		// ------------------
		display: 'block',
		// ------------------
		'@media (max-width: 991.98px)': {
			display: 'block',
		},
		'& svg': {
			animation: '1s linear 0s normal none infinite running rot',
			transform: 'scale(0.6)',
		},
		'&.toggled': {
			'& svg': {
				transform: 'scale(0.6) rotate(180deg)',
			},
		},
	},
	toggler: {
		display: 'block !important',
		marginLeft: '25px',
	},
	logOut: {
		margin: '0 25px 0 auto',
	},
});

const useStyles = createUseStyles(headerStyle);

function Header(props) {
	const { onSearchCard, sidebarToggle, sidebarToggler } = props;
	const theme = useTheme();
	const classes = useStyles({ ...props, theme });
	const sidebarTogglerClassName = classNames(classes.toggler, {
		toggled: sidebarToggle,
	});
	return (
		<div className={classes.headerWrapper}>
			<Navbar expand="lg" className={classes.header}>
				<Navbar.Toggle className={sidebarTogglerClassName} onClick={() => sidebarToggler()} />
				<Navbar.Brand href="#home" className={classes.logo}>
					Logo
				</Navbar.Brand>
				<Navbar.Text className={classes.logOut}>
					<Button variant="outline-primary">Log Out</Button>
				</Navbar.Text>
			</Navbar>
		</div>
	);
}

Header.propTypes = {
	cardId: PropTypes.number,
	onSearchCard: PropTypes.func,
};

export default Header;
