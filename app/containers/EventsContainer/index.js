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
import { 
	getEventsDataRequest, 
	getNewMessageWithSocket 
} from './actions';
import { makeSelectEvents } from './selectors';
import { subscribeToMessage } from '../../utils/socket';
// import socket from '../../utils/socket';

export function EventsContainer({eventsList = [], handleEventsDataRequest, handleNewMessageWithSocket, ...props}) {
	useInjectReducer({ key: 'eventsContainer', reducer });
	useInjectSaga({ key: 'eventsContainer', saga });
	useEffect(() => { handleEventsDataRequest() }, []);
	useEffect(() => { subscribeToMessage(handleNewMessageWithSocket) }, []);

// export function EventsContainer({ eventsList = [], handleEventsDataRequest, ...props }) {
// 	//TODO: change to default props eventsList
// 	useInjectReducer({ key: 'eventsContainer', reducer });
// 	useInjectSaga({ key: 'eventsContainer', saga });
// 	useEffect(() => {
// 		handleEventsDataRequest();
// 	}, []);

// 	useEffect(() => {
// 		socket.on('new_message', msg => {
// 			console.log(msg);
// 		});
// 	}, []);

	return <Events eventsList={eventsList} />;
}

// Events.propTypes = {
// 	dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
	eventsList: makeSelectEvents()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleEventsDataRequest: () => dispatch(getEventsDataRequest()),
		handleNewMessageWithSocket: (data) => dispatch(getNewMessageWithSocket(data)),

		// handleEventsDataRequest: () => dispatch(getEventsDataRequest())
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(EventsContainer);
