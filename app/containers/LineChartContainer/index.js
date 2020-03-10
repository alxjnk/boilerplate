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
					if (new Date(booking.arrival) * 1 <= today) {
						booking['start'] = 0;
						booking['startDay'] = new Date(today).getDate();
					} else {
						booking['start'] = Math.ceil(new Date(booking.arrival) * 1 / 24 / 60 / 60 / 1000 - today / 24 / 60 / 60 / 1000);
						booking['startDay'] = new Date(booking.arrival).getDate();
					}
					booking['end'] = Math.ceil(new Date(booking.departure) * 1 / 24 / 60 / 60 / 1000 - today / 24 / 60 / 60 / 1000);
					booking['endDay'] = new Date(booking.departure).getDate();
					sortedBookingsData[room].push(booking);
				};
			});
			sortedBookingsData[room].sort((a, b) => {
				return new Date(b.arrival) * 1 - new Date(a.arrival) * 1;
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
