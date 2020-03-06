/**
 *
 * Events
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import Events from '../../components/Events/index';
import { 
	getEventsDataRequest, 
	getNewMessageWithSocket,
	toggleEvents,
} from './actions';
import { 
	makeSelectEvents,
	makeSelectEventsToggle
} from './selectors';
import socket from '../../utils/socket';
import { sortEventsList } from '../../utils/sortEvents';

export function EventsContainer({eventsList = [], handleEventsDataRequest, handleNewMessageWithSocket, handleEventsToggle, eventsToggle, ...props}) {
	useInjectReducer({ key: 'eventsContainer', reducer });
	useInjectSaga({ key: 'eventsContainer', saga });
	//TODO: change to default props eventsList
	useEffect(() => { 
		handleEventsDataRequest() 
	}, []);
	useEffect(() => {
		socket.on('new_message', message => {
			handleNewMessageWithSocket(message.record);
		});
	}, []);
	const sortedEventsList = sortEventsList(eventsList);

	return <Events eventsList={sortedEventsList} eventsToggle={eventsToggle} eventsToggler={handleEventsToggle} />;
}

// Events.propTypes = {
// 	dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
	eventsList: makeSelectEvents(),
	eventsToggle: makeSelectEventsToggle()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleEventsDataRequest: () => dispatch(getEventsDataRequest()),
		handleNewMessageWithSocket: (data) => dispatch(getNewMessageWithSocket(data)),
		handleEventsToggle: () => dispatch(toggleEvents())
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(EventsContainer);