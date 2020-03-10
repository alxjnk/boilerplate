/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Header from 'components/Header';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';
import { 
	Container, 
	Row, 
	Col, 
	Card 
} from 'react-bootstrap';
import { routes } from '../../routes';
import { selectSidebarToggle } from './selectors';
import { makeSelectBookingsContainer } from '../BookingsContainer/selectors';
import { makeSelectEventsToggle } from '../EventsContainer/selectors';
import { toggleSidebar } from './actions';
import Sidebar from '../../components/Sidebar/index';
import EventsContainer from '../EventsContainer/index';
import BookingContanier from '../BookingsContainer/index';
import LineChartContainer from '../LineChartContainer/index';
import ColorChartContainer from '../ColorChartContainer/index';
import { getNewBookingWithSocket } from '../BookingsContainer/actions';
import socket from '../../utils/socket';
import { 
	checkInBookings,
	checkOutBookings
} from '../../utils/bookingsFilter';
import { 
	today,
	date
} from '../../utils/getDate';
import { 
	checkInSorter,
	checkOutSorter
} from '../../utils/bookingsSorter';
import { formatDate } from '../../utils/formatDate';

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
			width: '100%',
			transtion: 'width .3s',
		},
	},
	content: {
		position: 'relative',
		padding: '30px 15px',
		minHeight: 'calc(100vh - 70px)',
		maxHeight: 'calc(100vh - 70px)',
		overflowY: 'auto',
		marginTop: 70,
		zIndex: 10,
		'@media (max-width: 991.98px)': {
			padding: '15px',
			maxHeight: 'calc(100vh - 70px)',
		},
	},
	container: {
		maxWidth: '100% !important',
	},
	wrapper: {
		'&.toggled': {
			position: 'fixed',
			top: '70px',
			bottom: '0',
			left: '0',
			right: '0',
			width: '100vw',
			height: 'calc(100vh - 70px)',
			display: 'flex',
			zIndex: 11,
			backgroundColor: '#fff',
		},
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
	const { 
		eventsToggle,
		sidebarToggle, 
		sidebarToggler, 
		closestBookings = [],
		handleNewBookingWithSocket, 
	} = props;
	const closestCheckInBookings = checkInSorter(
		checkInBookings(
			closestBookings, 
			formatDate(date()), 
			formatDate(today())
		)
	);
	const closestCheckOutBookings = checkOutSorter(
		checkOutBookings(
			closestBookings, 
			formatDate(date()), 
			formatDate(today())
		)
	);
	const classes = AppWrapper();
	const contentWrapper = classNames(classes.contentWrapper, {
		toggled: sidebarToggle,
	});
	const wrapperClassName = classNames(classes.wrapper, {
		toggled: eventsToggle,
	});
	useEffect(() => { 
		socket.on('new_booking', booking => {
			handleNewBookingWithSocket(booking.record);
		}); 

		return function cleanup() {
			socket.close();
		};
	}, []);

	return (
		<div className={classes.appWrapper}>
			<Helmet titleTemplate="%s - Content" defaultTitle="App Wrapper">
				<meta name="description" content="content" />
			</Helmet>
			<Header 
				sidebarToggle={sidebarToggle} 
				sidebarToggler={sidebarToggler} 
			/>
			<div className={classes.mainContainer}>
				<Sidebar 
					routes={routes} 
					sidebarToggle={sidebarToggle} 
					sidebarToggler={sidebarToggler}
				>
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
										<LineChartContainer bookingsData={closestBookings} />
									</Col>
									<Col>
										<div className={wrapperClassName}>
											<EventsContainer />
										</div>
									</Col>
								</Row>
								<br />
								<Row>
									<Col>
										<Card className={classes.item}>
											<Card.Header>
												Closest check-in
											</Card.Header>
											<Card.Body className={classes.itemBody}>
												<BookingContanier bookingsData={closestCheckInBookings} />
											</Card.Body>
										</Card>
									</Col>
									<Col>
										<Card className={classes.item}>
											<Card.Header>
												Closest check-out
											</Card.Header>
											<Card.Body className={classes.itemBody}>
												<BookingContanier bookingsData={closestCheckOutBookings} />
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
	eventsToggle: PropTypes.bool,
	sidebarToggle: PropTypes.bool, 
	sidebarToggler: PropTypes.func.isRequired, 
	closestBookings: PropTypes.array,
	handleNewBookingWithSocket: PropTypes.func.isRequired, 
};

App.defaultProps = { 
	closestBookings: [], 
	sidebarToggler: () => {},
	handleNewBookingWithSocket: () => {},
};

const mapStateToProps = createStructuredSelector({
	sidebarToggle: selectSidebarToggle(),
	closestBookings: makeSelectBookingsContainer(),
	eventsToggle: makeSelectEventsToggle()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		sidebarToggler: () => dispatch(toggleSidebar()),
		handleNewBookingWithSocket: (data) => dispatch(getNewBookingWithSocket(data))
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(App);
