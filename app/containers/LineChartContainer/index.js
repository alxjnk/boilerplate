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
import reducer from './reducer';
import saga from './saga';
import LineChart from '../../components/LineChart/index';
import { toggleLineChart } from './actions';
import { 
	makeSelectLineChartContainer, 
	makeSelectLineChartToggle 
} from './selectors';

export function LineChartContainer({
		bookingsData, 
		lineChartToggle, 
		handleLineChartToggle, 
		...props
	}) {
	useInjectReducer({ key: 'lineChartContainer', reducer });
	useInjectSaga({ key: 'lineChartContainer', saga });

	return <LineChart 
				bookingsData={bookingsData} 
				lineChartToggle={lineChartToggle}
				lineChartToggler={handleLineChartToggle} 
			/>;
};

LineChartContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
	lineChartToggle: PropTypes.bool.isRequired,
	handleLineChartToggle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	lineChartContainer: makeSelectLineChartContainer(),
	lineChartToggle: makeSelectLineChartToggle()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleLineChartToggle: () => dispatch(toggleLineChart()),
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(LineChartContainer);