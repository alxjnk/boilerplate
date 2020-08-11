/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import classNames from 'classnames';

const headerStyle = theme => ({
	headerWrapper: {
		zIndex: 500,
		position: 'fixed',
		width: props => (props.sidebarToggle ? 'calc(100vw - 60px)' : 'calc(100vw - 250px)'),
		'@media (max-width: 991.98px)': {
			width: '100% !important',
		},
	},
	header: {
		display: 'flex',
		width: '100%',
		height: 60,
		background: '#fff',
		alignItems: 'center',
		boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.25)',
		justifyContent: 'flex-start',
		'@media (max-width: 991.98px)': {
			justifyContent: 'space-between',
		},
		padding: '0 43px 0 22px',
	},
	sidebarToggler: {
		cursor: 'pointer',
		background: '#3A0078',
		boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.21)',
		color: '#FFFFFF',
		width: 24,
		height: 24,
		borderRadius: '50%',
		display: 'none',
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
});

const useStyles = createUseStyles(headerStyle);

function Header(props) {
	const { onSearchCard, sidebarToggle, sidebarToggler } = props;
	const theme = useTheme();
	const classes = useStyles({ ...props, theme });
	const sidebarTogglerClassName = classNames(classes.sidebarToggler, {
		toggled: sidebarToggle,
	});
	return (
		<div className={classes.headerWrapper}>
			<div className={classes.header}>
				<div className={sidebarTogglerClassName} onClick={() => sidebarToggler()}>
					<div>Arrow left</div>
				</div>
			</div>
		</div>
	);
}

Header.propTypes = {
	cardId: PropTypes.number,
	onSearchCard: PropTypes.func,
};

export default Header;
