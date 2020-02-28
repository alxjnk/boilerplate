/**
 *
 * BookingsContainer
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import Booking from '../../components/Bookings/index';
import { 
	getBookingsDataRequest,
	// getNewBookingWithSocket
} from './actions';
// import { subscribeToBooking } from '../../utils/socket';

export function BookingsContainer({bookingsData = [], handleBookingsDataRequest, ...props}) {
	console.log(bookingsData);
	useInjectReducer({ key: 'bookingsContainer', reducer });
	useInjectSaga({ key: 'bookingsContainer', saga });
	useEffect(() => { handleBookingsDataRequest() }, [])
	// useEffect(() => { subscribeToBooking(handleNewBookingWithSocket) }, [])

	return <Booking bookingsData={bookingsData} />;
}

// BookingsContainer.propTypes = {
// 	dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleBookingsDataRequest: () => dispatch(getBookingsDataRequest()),
		// handleNewBookingWithSocket: (data) => dispatch(getNewBookingWithSocket(data)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(BookingsContainer);
