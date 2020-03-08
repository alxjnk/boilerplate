/**
 *
 * Events
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
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
	sendNewMessageRequest,
	toggleEvents,
} from './actions';
import { 
	makeSelectEvents,
	makeSelectEventsToggle
} from './selectors';
import socket from '../../utils/socket';
import { sortEventsList } from '../../utils/sortEvents';

export function EventsContainer({
		eventsList, 
		handleEventsDataRequest, 
		handleNewMessageWithSocket, 
		handleEventsToggle, 
		eventsToggle, 
		handleSendNewMessageWithSocket, 
		...props
	}) {
	useInjectReducer({ key: 'eventsContainer', reducer });
	useInjectSaga({ key: 'eventsContainer', saga });
	//TODO: change to default props eventsList
	useEffect(() => { 
		handleEventsDataRequest() 
	}, []);
	// get new message with socket
	useEffect(() => {
		socket.on('new_message', message => {
			handleNewMessageWithSocket(message.record);
		});

		return function cleanup() {
			socket.close();
		};
	}, []);
	// send new message with socket
	// useEffect(() => {
	// 	socket.emit('new_message', (data) => {
	// 		console.log(data);
	// 		handleSendNewMessageWithSocket(data);
	// 	});
	// }, []);
	const sortedEventsList = sortEventsList(eventsList);

	return <Events eventsList={sortedEventsList} eventsToggle={eventsToggle} eventsToggler={handleEventsToggle} handleSendNewMessageWithSocket={handleSendNewMessageWithSocket} />;
}

Events.propTypes = {
	eventsList: PropTypes.object, 
	handleEventsDataRequest: PropTypes.func.isRequired, 
	handleNewMessageWithSocket: PropTypes.func.isRequired, 
	handleEventsToggle: PropTypes.func.isRequired, 
	eventsToggle: PropTypes.bool.isRequired, 
	handleSendNewMessageWithSocket: PropTypes.func.isRequired,
};

Events.defaultProps = { 
	eventsList: [], 
	handleEventsDataRequest: () => {}, 
	handleNewMessageWithSocket: () => {}, 
	handleEventsToggle: () => {},
	handleSendNewMessageWithSocket: () => {},
};

const mapStateToProps = createStructuredSelector({
	eventsList: makeSelectEvents(),
	eventsToggle: makeSelectEventsToggle()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleEventsDataRequest: () => dispatch(getEventsDataRequest()),
		handleNewMessageWithSocket: (data) => dispatch(getNewMessageWithSocket(data)),
		handleSendNewMessageWithSocket: (data) => dispatch(sendNewMessageRequest(data)),
		handleEventsToggle: () => dispatch(toggleEvents())
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(EventsContainer);