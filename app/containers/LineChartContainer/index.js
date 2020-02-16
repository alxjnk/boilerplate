/**
 *
 * LineChartContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLineChartContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import LineChart from '../../components/LineChart/index';

export function LineChartContainer() {
	useInjectReducer({ key: 'lineChartContainer', reducer });
	useInjectSaga({ key: 'lineChartContainer', saga });

	return <LineChart />;
}

// LineChartContainer.propTypes = {
// 	dispatch: PropTypes.func.isRequired,
// };

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
