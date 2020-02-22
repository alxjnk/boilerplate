/**
 *
 * BookingsContainer
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import Booking from '../../components/Bookings/index';

export function BookingsContainer(props) {
	useInjectReducer({ key: 'bookingsContainer', reducer });
	useInjectSaga({ key: 'bookingsContainer', saga });

	return <Booking bookingsData={props.bookingsData} />;
}

// BookingsContainer.propTypes = {
// 	dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
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
