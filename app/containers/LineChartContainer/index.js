/**
 *
 * LineChartContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLineChartContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import LineChart from '../../components/LineChart/index';
import { today } from '../../utils/getDate';

export function LineChartContainer(bookingsData, ...props) {
	useInjectReducer({ key: 'lineChartContainer', reducer });
	useInjectSaga({ key: 'lineChartContainer', saga });

	const getFieldValues = (arr = [], field) => {
		const values = [];
		
		arr.forEach(elem => {
			if (!~values.indexOf(elem[field])) values.push(elem[field]);
		});

		return values;
	};
	
	const sortBookingsData = (bookingsData, today) => {
		const sortedBookingsData = {};
		const rooms = getFieldValues(bookingsData, 'room');
	
		rooms.forEach(room => {
				bookingsData.forEach(booking => {
					if (booking.room === room && (new Date(booking.departure) * 1) >= today) {
						if (!(room in sortedBookingsData)) {
							sortedBookingsData[room] = [];
						}						
						sortedBookingsData[room].push(booking);
					};
				});
		});

		return sortedBookingsData;
	};

	const sortedBookingsData = sortBookingsData(bookingsData.bookingsData, today());

	return <LineChart sortedBookingsData={sortedBookingsData}/>;
}

LineChartContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	lineChartContainer: makeSelectLineChartContainer(),
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
)(LineChartContainer);
