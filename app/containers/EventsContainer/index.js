/**
 *
 * Events
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import Events from '../../components/Events/index';
import { getEventsDataRequest } from './actions';
import { makeSelectEvents } from './selectors';

export function EventsContainer({eventsList = [], handleEventsDataRequest, ...props}) {
	useInjectReducer({ key: 'eventsContainer', reducer });
	useInjectSaga({ key: 'eventsContainer', saga });
	useEffect(() => { handleEventsDataRequest() }, [])

	return <Events eventsList={eventsList} />;
}

// Events.propTypes = {
// 	dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
	eventsList: makeSelectEvents(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleEventsDataRequest: () => dispatch(getEventsDataRequest()),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(EventsContainer);
