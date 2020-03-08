/**
 *
 * BookingsContainer
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import Booking from '../../components/Bookings/index';
import { getBookingsDataRequest } from './actions';

export function BookingsContainer({
		bookingsData, 
		handleBookingsDataRequest, 
		...props
	}) {
	useInjectReducer({ key: 'bookingsContainer', reducer });
	useInjectSaga({ key: 'bookingsContainer', saga });
	useEffect(() => { 
		handleBookingsDataRequest(); 
	}, []);

	return <Booking bookingsData={bookingsData} />;
}

BookingsContainer.propTypes = {
	bookingsData: PropTypes.array, 
	handleBookingsDataRequest: PropTypes.func.isRequired,
};

BookingsContainer.defaultProps = { 
	bookingsData: [], 
	handleBookingsDataRequest: () => {},
};


const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleBookingsDataRequest: () => dispatch(getBookingsDataRequest()),
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(BookingsContainer);
