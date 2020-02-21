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
import { Container, Row, Col, Card } from 'react-bootstrap';
import { routes } from '../../routes';
import { selectSidebarToggle } from './selectors';
import {
	makeSelectCheckInContainer,
	makeSelectCheckOutContainer
} from '../BookingsContainer/selectors';
import { toggleSidebar } from './actions';
import Sidebar from '../../components/Sidebar/index';
import EventsContainer from '../EventsContainer/index';
import BookingContanier from '../BookingsContainer/index';
import LineChartContainer from '../LineChartContainer/index';
import ColorChartContainer from '../ColorChartContainer/index';

const AppWrapper = createUseStyles({
	appWrapper: {
		position: 'relative',
		top: 0,
		height: '100%',
	},
	mainContainer: {
		display: 'flex',
	},
	contentWrapper: {
		position: 'relative',
		width: 'calc(100% - 250px)',
		transition: 'width .3s',
		maxHeight: '100vh',
		'&.toggled': {
			// width: 'calc(100% - 60px)',
			width: '100%',
			transtion: 'width .3s',
		},
	},
	content: {
		padding: '30px 15px',
		minHeight: 'calc(100vh - 70px)',
		overflowY: 'auto',
		// background: '#E5E5E5',
		marginTop: 70,
		'@media (max-width: 991.98px)': {
			padding: '15px',
			maxHeight: 'calc(100vh - 70px)',
		},
	},
	container: {
		maxWidth: '100% !important',
	},
	item: {
		height: 'calc(50vh - 77px)',
	},
	itemBody: {
		overflow: 'auto',
	},
	'@media (max-width: 991.98px)': {
		contentWrapper: {
			width: '100%',
			position: 'fixed',
			right: '0',
			transform: 'translate3d(250px, 0, 0)',
			transition: 'transform .3s',
			'&.toggled': {
				width: '100%',
				transform: 'translate3d(0, 0, 0)',
				transition: 'transform .3s',
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
			<Header sidebarToggle={sidebarToggle} sidebarToggler={sidebarToggler} />
			<div className={classes.mainContainer}>
				<Sidebar routes={routes} sidebarToggle={sidebarToggle} sidebarToggler={sidebarToggler}>
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
				</Sidebar>
				<div className={contentWrapper}>
					<Suspense fallback={<div>Loading...</div>}>
						<div className={classes.content}>
							<Container className={classes.container}>
								<Row>
									<Col xl="8">
										<LineChartContainer />
									</Col>
									<Col>
										<EventsContainer />
									</Col>
								</Row>
								<br />
								<Row>
									<Col>
										<Card className={classes.item}>
											<Card.Header>Closest check-in</Card.Header>
											<Card.Body className={classes.itemBody}>
												<BookingContanier bookingsData={props.closestCheckInData} />
											</Card.Body>
										</Card>
									</Col>
									<Col>
										<Card className={classes.item}>
											<Card.Header>Closest check-out</Card.Header>
											<Card.Body className={classes.itemBody}>
												<BookingContanier bookingsData={props.closestCheckOutData} />
											</Card.Body>
										</Card>
									</Col>
									<Col>
										<ColorChartContainer />
									</Col>
								</Row>
							</Container>
						</div>
					</Suspense>
				</div>
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
	closestCheckInData: makeSelectCheckInContainer(),
	closestCheckOutData: makeSelectCheckOutContainer(),
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
