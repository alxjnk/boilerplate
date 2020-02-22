/**
 *
 * Header
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import { Navbar, Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import Logo from '../../images/LOGO.png';

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
		background: '#8ACBAB',
		alignItems: 'center',
		justifyContent: 'flex-start',
		'@media (max-width: 991.98px)': {
			justifyContent: 'space-between',
		},
		padding: '0',
	},
	logo: {
		width: '250px',
		height: '100%',
		lineHeight: '60px',
		textAlign: 'center',
	},
	sidebarToggler: {
		border: '1px solid rgba(0,0,0,.1)',
		width: '56px',
		height: '40px',
		borderRadius: '3px',
		marginLeft: '25px',
		display: 'flex',
		marginRight: '25px',
		background: 'transparent',
	},
	arrow: {
		display: 'block',
		margin: 'auto',
		position: 'relative',
		border: '14px solid transparent',
		borderRight: '24px solid rgba(0,0,0,.2)',
		left: '-8px',
		transition: 'all .3s',
		'&.toggled': {
			transform: 'rotate(180deg)',
			transformOrigin: '75% 50% 0',
			transition: 'all .3s',
		},
	},
	dropdownMenu: {
		marginLeft: 'auto',
		marginRight: '25px',
	},
	dropdownToggle: {
		backgroundColor: 'transparent !important',
		boxShadow: 'none',
		border: 'none',
		border: '1px solid rgba(0,0,0,.1)',
		'&:hover, &:active, &.active, &.focus, &:focus, &.btn-success.dropdown-toggle': {
			backgroundColor: 'transparent !important',
			boxShadow: 'none !important',
			border: 'none !important',
			border: '1px solid rgba(0,0,0,.1)',
		},
		'&:after': {
			display: 'none',
		},
	},
});

const useStyles = createUseStyles(headerStyle);

function Header(props) {
	const { onSearchCard, sidebarToggle, sidebarToggler } = props;
	const theme = useTheme();
	const classes = useStyles({ ...props, theme });
	const sidebarArrowClassName = classNames(classes.arrow, {
		toggled: sidebarToggle,
	});
	return (
		<div className={classes.headerWrapper}>
			<Navbar expand="lg" className={classes.header}>
				<button type="button" className={classes.sidebarToggler} onClick={() => sidebarToggler()}>
					<span className={sidebarArrowClassName} />
				</button>
				<Navbar.Brand href="#home" className={classes.logo}>
					<img src={Logo} alt="logo" height="50px" width="200px" />
				</Navbar.Brand>
				<Dropdown alignRight className={classes.dropdownMenu}>
					<Dropdown.Toggle className={classes.dropdownToggle} variant="success" id="dropdown-basic">
						<span className={`${classes.toggler} navbar-toggler-icon`} />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item href="#/action-1">Sign out</Dropdown.Item>
						<Dropdown.Item href="#/action-2">About app</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Navbar>
		</div>
	);
}

Header.propTypes = {
	cardId: PropTypes.number,
	onSearchCard: PropTypes.func,
};

export default Header;
