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
import { makeSelectColorChartToggle } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorChart from '../../components/ColorChart/index';
import {
	toggleColorChart,
} from './actions';

export function ColorChartContainer({
		colorChartToggle,
		handleColorChartToggle,
		...props
	}) {
	useInjectReducer({ key: 'colorChartContainer', reducer });
	useInjectSaga({ key: 'colorChartContainer', saga });

	return <ColorChart 
				colorChartToggle={colorChartToggle}
				colorChartToggler={handleColorChartToggle} 
			/>;
}

ColorChartContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	colorChartToggle: makeSelectColorChartToggle(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleColorChartToggle: () => dispatch(toggleColorChart()),
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
