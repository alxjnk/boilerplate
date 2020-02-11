/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Header from 'components/Header';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';
import { routes } from '../../routes';
import { selectSidebarToggle } from './selectors';
import { toggleSidebar } from './actions';

const AppWrapper = createUseStyles({
	appWrapper: {
		position: 'relative',
		top: 0,
		height: '100%',
	},
	contentWrapper: {
		position: 'relative',
		float: 'right',
		width: 'calc(100% - 250px)',
		maxHeight: '100vh',
		'&.toggled': {
			width: 'calc(100% - 60px)',
		},
	},
	content: {
		padding: '44px',
		minHeight: 'calc(100vh - 60px)',
		overflowY: 'auto',
		background: '#E5E5E5',
		marginTop: 60,
		'@media (max-width: 991.98px)': {
			padding: '15px',
			maxHeight: 'calc(100vh - 60px)',
		},
	},
	'@media (max-width: 991.98px)': {
		contentWrapper: {
			width: '100%',
			position: 'fixed',
			right: '0',
			transform: 'translate3d(250px, 0, 0)',
			'&.toggled': {
				width: '100%',
				transform: 'translate3d(0, 0, 0)',
			},
		},
		content: {
			position: 'absolute',
			width: '100%',
			overflowX: 'unset',
		},
	},
});

function App(props) {
	const { sidebarToggle, sidebarToggler } = props;
	const classes = AppWrapper();
	const contentWrapper = classNames(classes.contentWrapper, {
		toggled: sidebarToggle,
	});
	return (
		<div className={classes.appWrapper}>
			<Helmet titleTemplate="%s - Content" defaultTitle="App Wrapper">
				<meta name="description" content="content" />
			</Helmet>
			{/* <Sidebar routes={routes} toggle={sidebarToggle} sidebarToggler={sidebarToggler} /> */}
			<div className={contentWrapper}>
				<Header sidebarToggle={sidebarToggle} sidebarToggler={sidebarToggler} />
				<Suspense fallback={<div>Loading...</div>}>
					<div className={classes.content}>
						<Switch>
							{routes.map(prop => (
								<Route
									path={prop.path}
									exact={prop.exact}
									key={prop.key}
									name={prop.name}
									render={routeProps => <prop.component {...routeProps} {...props} />}
								/>
							))}
						</Switch>
					</div>
				</Suspense>
			</div>
		</div>
	);
}

App.propTypes = {
	user: PropTypes.object,
	auth: PropTypes.bool,
	authUser: PropTypes.func,
	searchCard: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	sidebarToggle: selectSidebarToggle(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		sidebarToggler: () => dispatch(toggleSidebar()),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(withConnect)(App);
