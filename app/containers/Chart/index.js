/**
 *
 * Chart
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
import makeSelectChart from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Chart() {
	useInjectReducer({ key: 'chart', reducer });
	useInjectSaga({ key: 'chart', saga });

	return (
		<div>
			<Helmet>
				<title>Chart</title>
				<meta name="description" content="Description of Chart" />
			</Helmet>
		</div>
	);
}

Chart.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	chart: makeSelectChart(),
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
)(Chart);
