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
import { Container, Row, Col, Card } from 'react-bootstrap';
import { routes } from '../../routes';
import { 
	selectSidebarToggle,
	selectCheckInToggle,
	selectCheckOutToggle,
} from './selectors';
import { makeSelectBookingsContainer } from '../BookingsContainer/selectors';
import { makeSelectMessagesToggle } from '../MessagesContainer/selectors';
import { makeSelectLineChartToggle } from '../LineChartContainer/selectors';
import { makeSelectColorChartToggle } from '../ColorChartContainer/selectors';
import { 
	toggleSidebar,
	checkInToggle,
	checkOutToggle
} from './actions';
import Sidebar from '../../components/Sidebar/index';
import MessagesContainer from '../MessagesContainer/index';
import BookingContanier from '../BookingsContainer/index';
import LineChartContainer from '../LineChartContainer/index';
import ColorChartContainer from '../ColorChartContainer/index';
import { getNewBookingWithSocket } from '../BookingsContainer/actions';
import socket from '../../utils/socket';
import { checkInBookings, checkOutBookings, checkInBookingsSorter, checkOutBookingsSorter } from '../../utils/helper';
import { todayInMilliseconds, dateWithDalayInMilliseconds } from '../../utils/getDate';
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
			transition: 'width .3s',
		},
	},
	content: {
		position: 'relative',
		padding: '29px 15px',
		maxHeight: 'calc(100vh - 70px)',
		overflowY: 'auto',
		marginTop: 70,
		zIndex: 10,
		'@media (max-width: 991.98px)': {
			position: 'relative',
			maxHeight: 'calc(100vh - 70px)',
			width: '100%',
			overflowX: 'unset',
		},
	},
	container: {
		maxWidth: '100% !important',
	},
	topRow: {
		'& > div': {
			marginBottom: '25px',
		},
		'&.lineChartToggled > div:nth-of-type(1)': {
			position: 'absolute',
			zIndex: 1,
			minWidth: 'calc(100% - 30px)',
			height: 'calc(100% - 60px)',
		},
		'&.messagesToggled > div:nth-of-type(2)': {
			position: 'absolute',
			zIndex: 1,
			minWidth: 'calc(100% - 30px)',
			height: 'calc(100% - 60px)',
		},
	},
	bottomRow: {
		'&.checkInToggled > div:nth-of-type(1)': {
			position: 'absolute',
			top: '29px',
			zIndex: 1,
			maxWidth: 'calc(100% - 31px)',
			height: 'calc(100% - 63px)',
		},
		'&.checkOutToggled > div:nth-of-type(2)': {
			position: 'absolute',
			top: '29px',
			zIndex: 1,
			maxWidth: 'calc(100% - 31px)',
			height: 'calc(100% - 63px)',
		},
		'&.colorChartToggled > div:nth-of-type(3)': {
			position: 'absolute',
			top: '29px',
			zIndex: 1,
			maxWidth: 'calc(100% - 31px)',
			height: 'calc(100% - 63px)',
		},
	},
	toggle: {
		width: '25px',
		height: '25px',
		lineHeight: '19px',
		textAlign: 'center',
		cursor: 'pointer',
		fontSize: '32px',
		borderRadius: '50%',
		backgroundColor: 'transparent',
		transition: 'all .3s',
		'&:hover': {
			backgroundColor: '#bbb',
			transition: 'all .3s',
		},
		'&.toggled': {
			transform: 'rotate(45deg)',
			transition: 'all .3s',
		},
	},
	wrapper: {
		'&.toggled': {
			height: '100%',
		},
	},
	item: {
		height: 'calc(50vh - 77px)',
		'&.toggled': {
			width: 'calc(100% + 1px)',
			height: 'calc(100% + 5px)',
		},
		'& > div': {
			display: 'flex',
			justifyContent: 'space-between',
		}
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
		}
	},
});

function App(props) {
	const { 
		messagesToggle, 
		lineChartToggle, 
		colorChartToggle, 
		sidebarToggle, 
		sidebarToggler, 
		checkInToggle,
		checkInToggler,
		checkOutToggle,
		checkOutToggler,
		closestBookings = [], 
		handleNewBookingWithSocket 
	} = props;
	const closestCheckInBookings = checkInBookingsSorter(
		checkInBookings(closestBookings, formatDate(dateWithDalayInMilliseconds()), formatDate(todayInMilliseconds())),
	);
	const closestCheckOutBookings = checkOutBookingsSorter(
		checkOutBookings(closestBookings, formatDate(dateWithDalayInMilliseconds()), formatDate(todayInMilliseconds())),
	);
	const classes = AppWrapper();
	const contentWrapper = classNames(classes.contentWrapper, {
		toggled: sidebarToggle,
	});
	const messagesWrapperClassName = classNames(classes.wrapper, {
		toggled: messagesToggle,
	});
	const lineChartWrapperClassName = classNames(classes.wrapper, {
		toggled: lineChartToggle,
	});
	const topRowClassName = classNames(classes.topRow, {
		lineChartToggled: lineChartToggle,
		messagesToggled: messagesToggle,
	});
	const colorChartWrapperClassName = classNames(classes.wrapper, {
		toggled: colorChartToggle,
	});
	const bottomRowClassName = classNames(classes.bottomRow, {
		checkInToggled: checkInToggle,
		checkOutToggled: checkOutToggle,
		colorChartToggled: colorChartToggle,
	});
	const checkInWrapperClassName = classNames(classes.wrapper, {
		toggled: checkInToggle,
	});
	const checkInItemClassName = classNames(classes.item, {
		toggled: checkInToggle,
	});
	const checkInToggleClassName = classNames(classes.toggle, {
		toggled: checkInToggle,
	});
	const checkOutWrapperClassName = classNames(classes.wrapper, {
		toggled: checkOutToggle,
	});
	const checkOutItemClassName = classNames(classes.item, {
		toggled: checkOutToggle,
	});
	const checkOutToggleClassName = classNames(classes.toggle, {
		toggled: checkOutToggle,
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
								<Row className={topRowClassName}>
									<Col md="8" xl="8">
										<div className={lineChartWrapperClassName}>
											<LineChartContainer bookingsData={closestBookings} />
										</div>
									</Col>
									<Col md="4" xl="4">
										<div className={messagesWrapperClassName}>
											<MessagesContainer />
										</div>
									</Col>
								</Row>
								<Row className={bottomRowClassName}>
									<Col>
										<div className={checkInWrapperClassName}>
											<Card className={checkInItemClassName}>
												<Card.Header>
													<span>Closest check-in</span>
													<span className={checkInToggleClassName} onClick={() => checkInToggler()}>
														+
													</span>
												</Card.Header>
												<Card.Body className={classes.itemBody}>
													<BookingContanier bookingsData={closestCheckInBookings} />
												</Card.Body>
											</Card>
										</div>
									</Col>
									<Col>
										<div className={checkOutWrapperClassName}>
											<Card className={checkOutItemClassName}>
												<Card.Header>
													<span>Closest check-out</span>
													<span className={checkOutToggleClassName} onClick={() => checkOutToggler()}>
														+
													</span>
												</Card.Header>
												<Card.Body className={classes.itemBody}>
													<BookingContanier bookingsData={closestCheckOutBookings} />
												</Card.Body>
											</Card>
										</div>
									</Col>
									<Col>
										<div className={colorChartWrapperClassName}>
											<ColorChartContainer />
										</div>
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
	messagesToggle: PropTypes.bool,
	colorChartToggle: PropTypes.bool,
	sidebarToggle: PropTypes.bool,
	sidebarToggler: PropTypes.func.isRequired,
	checkInToggle: PropTypes.bool,
	checkInToggler: PropTypes.func.isRequired,
	checkOutToggle: PropTypes.bool,
	checkOutToggler: PropTypes.func.isRequired,
	closestBookings: PropTypes.array,
	handleNewBookingWithSocket: PropTypes.func.isRequired,
};

App.defaultProps = {
	closestBookings: [],
	sidebarToggler: () => {},
	checkInToggler: () => {},
	checkOutToggler: () => {},
	handleNewBookingWithSocket: () => {},
};

const mapStateToProps = createStructuredSelector({
	sidebarToggle: selectSidebarToggle(),
	checkInToggle: selectCheckInToggle(),
	checkOutToggle: selectCheckOutToggle(),
	closestBookings: makeSelectBookingsContainer(),
	messagesToggle: makeSelectMessagesToggle(),
	lineChartToggle: makeSelectLineChartToggle(),
	colorChartToggle: makeSelectColorChartToggle(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		sidebarToggler: () => dispatch(toggleSidebar()),
		checkInToggler: () => dispatch(checkInToggle()),
		checkOutToggler: () => dispatch(checkOutToggle()),
		handleNewBookingWithSocket: data => dispatch(getNewBookingWithSocket(data)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(withConnect)(App);
