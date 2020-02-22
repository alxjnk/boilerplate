/**
 *
 * SidebarContainer
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
import makeSelectSidebarContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

export function SidebarContainer(props) {
	useInjectReducer({ key: 'sidebarContainer', reducer });
	useInjectSaga({ key: 'sidebarContainer', saga });

	return (
		<div>
			<Helmet>
				<title>SidebarContainer</title>
				<meta name="description" content="Description of SidebarContainer" />
			</Helmet>
		</div>
	);
}

SidebarContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	sidebarContainer: makeSelectSidebarContainer(),
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
)(SidebarContainer);
