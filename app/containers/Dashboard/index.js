/**
 *
 * Dashboard
 *
 */

import React  from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
export function Dashboard(props) {
	useInjectReducer({ key: 'dashboard', reducer });
	useInjectSaga({ key: 'dashboard', saga });
	return <div />;
}

Dashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({
	dashboard: makeSelectDashboard(),
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

export default compose(withConnect)(Dashboard);
