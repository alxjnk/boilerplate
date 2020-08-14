/**
 *
 * Sidebar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
// import { Link } from 'react-router-dom';
import { createUseStyles, useTheme } from 'react-jss';
import classNames from 'classnames';

const sidebarStyle = theme => ({
	sidebarWrapper: {
		position: 'relative',
		boxSizing: 'border-box',
		width: '250px',
		height: 'calc(100vh - 70px)',
		marginTop: '70px',
		borderRight: '1px solid rgba(0,0,0,.125)',
		transition: 'width .3s',
		overflow: 'hidden',
		zIndex: 10,
		'&.toggled': {
			width: '0',
			transition: 'width .3s',
		},
	},
	sidebar: {
		padding: '10px',
		listStyle: 'none',
	},
	sidebarItem: {
		display: 'block',
		width: '230px',
		cursor: 'pointer',
	},
	'@media (max-width: 991.98px)': {
		sidebarWrapper: {
			width: '250px',
			position: 'fixed',
			left: '0',
			transition: 'width .3s',
			'&.toggled': {
				width: '0',
				transition: 'width .3s',
			},
		},
	},
});

const useStyle = createUseStyles(sidebarStyle);

function Sidebar(props) {
	const { sidebarToggle } = props;
	const theme = useTheme();
	const classes = useStyle({ ...props, theme });
	const sidebarWrapper = classNames(classes.sidebarWrapper, {
		toggled: sidebarToggle,
	});
	return (
		<div className={sidebarWrapper}>
			<ListGroup className={classes.sidebar} variant="flush">
				<ListGroup.Item className={classes.sidebarItem}>
					{/* <Link className={classes.sidebarItem} to="/apartment1"> */}
					Apartment 1{/* </Link> */}
				</ListGroup.Item>
				<ListGroup.Item className={classes.sidebarItem}>
					{/* <Link  className={classes.sidebarItem} to="/apartment2"> */}
					Apartment 2{/* </Link> */}
				</ListGroup.Item>
			</ListGroup>
		</div>
	);
}

Sidebar.propTypes = {
	sidebarToggle: PropTypes.bool,
};

export default Sidebar;
