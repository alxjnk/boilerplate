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
import { todayInMilliseconds } from '../../utils/getDate';
import { filterBookingsData } from '../../utils/helper';

export function LineChartContainer(bookingsData, ...props) {
	useInjectReducer({ key: 'lineChartContainer', reducer });
	useInjectSaga({ key: 'lineChartContainer', saga });
	
	const filteredBookingsData = filterBookingsData(bookingsData.bookingsData, todayInMilliseconds(), todayInMilliseconds() + 30 * 24 * 60 * 60 * 1000);

	return <LineChart filteredBookingsData={filteredBookingsData}/>;
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
