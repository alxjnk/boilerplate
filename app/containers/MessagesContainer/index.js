/**
 *
 * MessagesContainer
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
import Messages from '../../components/Messages/index';
import { 
	getMessagesDataRequest, 
	getNewMessageWithSocket,
	sendNewMessageRequest,
	toggleMessages,
} from './actions';
import { 
	makeSelectMessages,
	makeSelectMessagesToggle
} from './selectors';
import socket from '../../utils/socket';
import { sortMessages } from '../../utils/helper';

export function MessagesContainer({
		messages, 
		handleMessagesDataRequest, 
		handleNewMessageWithSocket, 
		handleMessagesToggle, 
		messagesToggle, 
		handleSendNewMessageWithSocket, 
		...props
	}) {
	useInjectReducer({ key: 'messagesContainer', reducer });
	useInjectSaga({ key: 'messagesContainer', saga });
	//TODO: change to default props messages
	useEffect(() => { 
		handleMessagesDataRequest() 
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
	
	const sortedMessages = sortMessages(messages);

	return <Messages messages={sortedMessages} messagesToggle={messagesToggle} messagesToggler={handleMessagesToggle} handleSendNewMessageWithSocket={handleSendNewMessageWithSocket} />;
}

Messages.propTypes = {
	messages: PropTypes.object, 
	handleMessagesDataRequest: PropTypes.func.isRequired, 
	handleNewMessageWithSocket: PropTypes.func.isRequired, 
	handleMessagesToggle: PropTypes.func.isRequired, 
	messagesToggle: PropTypes.bool.isRequired, 
	handleSendNewMessageWithSocket: PropTypes.func.isRequired,
};

Messages.defaultProps = { 
	messages: [], 
	handleMessagesDataRequest: () => {}, 
	handleNewMessageWithSocket: () => {}, 
	handleMessagesToggle: () => {},
	handleSendNewMessageWithSocket: () => {},
};

const mapStateToProps = createStructuredSelector({
	messages: makeSelectMessages(),
	messagesToggle: makeSelectMessagesToggle()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleMessagesDataRequest: () => dispatch(getMessagesDataRequest()),
		handleNewMessageWithSocket: (data) => dispatch(getNewMessageWithSocket(data)),
		handleSendNewMessageWithSocket: (data) => dispatch(sendNewMessageRequest(data)),
		handleMessagesToggle: () => dispatch(toggleMessages())
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(MessagesContainer);