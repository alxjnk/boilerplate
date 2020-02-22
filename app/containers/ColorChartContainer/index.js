/**
 *
 * ColorChartContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectColorChartContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorChart from '../../components/ColorChart/index';

export function ColorChartContainer() {
	useInjectReducer({ key: 'colorChartContainer', reducer });
	useInjectSaga({ key: 'colorChartContainer', saga });

	return <ColorChart />;
}

// ColorChartContainer.propTypes = {
// 	dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
	colorChartContainer: makeSelectColorChartContainer(),
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
)(ColorChartContainer);
