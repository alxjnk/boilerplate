/**
 *
 * ClosestBookingsContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectClosestBookingsContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import ClosestBookings from '../../components/ClosestBookings/index';

const closestBookingsData = [
	{
		id: 1,
		name: 'Tom',
		surname: 'Stivens',
		roomNumber: 7,
		arrivalDate: '14.01.2020',
		departureDate: '21.01.2020',
		numberOfPeople: 3,
	},
	{
		id: 2,
		name: 'Stiv',
		surname: 'Jobs',
		roomNumber: 3,
		arrivalDate: '09.02.2020',
		departureDate: '23.02.2020',
		numberOfPeople: 1,
	},
	{
		id: 3,
		name: 'Marta',
		surname: 'Pit',
		roomNumber: 11,
		arrivalDate: '21.03.2020',
		departureDate: '27.03.2020',
		numberOfPeople: 4,
	},
];

export function ClosestBookingsContainer() {
	useInjectReducer({ key: 'closestBookingsContainer', reducer });
	useInjectSaga({ key: 'closestBookingsContainer', saga });

	return <ClosestBookings closestBookingsData={closestBookingsData} />;
}

// ClosestBookingsContainer.propTypes = {
// 	dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
	closestBookingsContainer: makeSelectClosestBookingsContainer(),
});

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
)(ClosestBookingsContainer);
