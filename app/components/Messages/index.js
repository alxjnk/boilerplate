/**
 *
 * Messages
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Card, ListGroup, Accordion, FormControl, InputGroup, Button } from 'react-bootstrap';
import classNames from 'classnames';
// import { format } from 'date-fns';
import { 
	changeMessagesStatus,
	getNumberOfNewMessages,
	isNewMessages,
	getLastMessageCreateDate
} from '../../utils/helper';
// import { platforms } from '../../variables/platforms';

const MessagesWrapper = createUseStyles({
	item: {
		height: 'calc(50vh - 77px)',
		margin: 'auto',
		'&.toggled': {
			width: 'calc(100% - 0px)',
			height: 'calc(100% + 5px)',
		},
	},
	itemHeader: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	wrapper: {
		display: 'flex',
		marginBottom: '0',
		flexDirection: 'column',
		flexGrow: '1',
		width: 'calc(100% - 108px)',
	},
	itemBody: {
		overflow: 'auto',
		paddingTop: '19px',
		paddingBottom: '19px',
	},
	toggle: {
		width: '25px',
		height: '25px',
		lineHeight: '19px',
		textAlign: 'center',
		cursor: 'pointer',
		fontSize: '32px',
		borderRadius: '50%',
		backgroundColor: 'transparent',
		transition: 'all .3s',
		'&:hover': {
			backgroundColor: '#bbb',
			transition: 'all .3s',
		},
		'&.toggled': {
			transform: 'rotate(45deg)',
			transition: 'all .3s',
		},
	},
	event: {
		cursor: 'pointer',
		border: 'none !important',
		margin: '5px',
		display: 'flex',
		padding: '0 !important',
		'& span': {
			padding: '.75rem 1.25rem',
			border: '1px solid rgba(0,0,0,.125)',
			borderRadius: '5px',
		}
	},
	messageHeader: {
		display: 'flex',
		alignItems: 'center',
		'& svg': {
			width: '30px',
			height: '30px',
			marginRight: '10px',
		},
	},
	innerHeader: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	fullname: {
		width: '60%',
		fontWeight: 'bold',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	platform: {
		height: '48px',
		minWidth: '48px',
		width: '48px',
		overflow: 'hidden',
		borderRadius: '50%',
		backgroundColor: 'rgba(0,0,0,.08)',
		marginRight: '20px',
		textAlign: 'center',
		lineHeight: '48px',
		color: 'rgba(0, 0, 0, .5)',
		fontSize: '0.7em',
	},
	date: {
		fontSize: '0.9em',
		lineHeight: '1.7em',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	lastMessage: {
		fontSize: '0.8em',
		color: 'rgba(0, 0, 0, .5)',
		width: '75%',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	chatWinwow: {
		maxHeight: '300px',
		overflow: 'auto',
		border: '1px solid rgba(0,0,0,.125)',
      borderRadius: '5px',
	},
	newMessage: {
		borderRadius: '0.8em',
		backgroundColor: 'rgba(0,0,0,.08)',
		padding: '0px 7px',
	},
	textarea: {
		marginTop: '20px',
		marginBottom: '-16px',
	},
	admin: {
		marginLeft: 'auto',
	}
});

function Messages({ 
		messages, 
		sortedMessages, 
		messagesToggle, 
		messagesToggler, 
		handleSendNewMessageWithSocket,
		handleSendAllMessages, 
		...props 
	}) {
	const classes = MessagesWrapper();
	const messagesToggleClassName = classNames(classes.toggle, {
		toggled: messagesToggle,
	});
	const messagesItemClassName = classNames(classes.item, {
		toggled: messagesToggle,
	});
	
	const sendNewMessage = e => {
		e.preventDefault();
		const user_id = e.target.parentElement.parentElement.parentElement.dataset.id;
		const value = e.target.children[0].children[0].value.trim();
		const message = messages.find((item) => {
			return item.user_id === user_id
		});
		
		if (!value) return;
		
		const newMessage = {
			full_name: message.full_name,
			platform: message.platform,
			room: message.room,
			property: message.property,
			message: value,
			viewed: true,
			user_id: user_id,
			admin: true
		};

		handleSendNewMessageWithSocket(newMessage);
		e.target.children[0].children[0].value = '';
	};

	const handlerChangeMessageStatus = e => {
		const spanCollection = e.currentTarget.querySelectorAll('span');
		const fullName = spanCollection[0].innerText;
		const newMessage = spanCollection[spanCollection.length - 1].innerText ? true : false;
		
		if (newMessage) {
			const changedMessages = changeMessagesStatus(messages, fullName);

			handleSendAllMessages(changedMessages);
		}
	};
	
	return (
		<Card className={messagesItemClassName}>
			<Card.Header className={classes.itemHeader}>
				<span>Messages</span>
				<span className={messagesToggleClassName} onClick={() => messagesToggler()}>
					+
				</span>
			</Card.Header>
			<Card.Body className={classes.itemBody}>
				<Accordion>
					{Object.keys(sortedMessages).map(user => (
						<Card key={user} data-id={sortedMessages[user][0].user_id}>
							<Accordion.Toggle as={Card.Header} eventKey={user} onClick={handlerChangeMessageStatus}>
								<div className={classes.messageHeader}>
									<div className={classes.platform}>{sortedMessages[user][0].platform.replace(/\..+/, '')}</div>
									<div className={classes.wrapper}>
										<div className={classes.innerHeader}>
											<span className={classes.fullname}>{sortedMessages[user][0].full_name}</span>
											<span className={classes.date}>
												{getLastMessageCreateDate(sortedMessages, user)}
											</span>
										</div>
										<div className={classes.innerHeader}>
											<span className={classes.lastMessage}>
												{[...sortedMessages[user]][0].message}
											</span>
											<span className={isNewMessages(sortedMessages, user) ? classes.newMessage : ''}>
												{getNumberOfNewMessages(sortedMessages, user)}
											</span>
										</div>
									</div>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey={user}>
								<Card.Body>
									<div className={classes.chatWinwow}>
										<ListGroup variant="flush">
											{[...sortedMessages[user]].map(event => (
												<ListGroup.Item key={event.id} className={classes.event}>
													<span className={event.admin ? classes.admin : ''}>{event.message}</span>
												</ListGroup.Item>
											))}
										</ListGroup>
									</div>
									<form 
										name="sendMessage" 
										onSubmit={sendNewMessage} 
										className={classes.textarea}
									>
										<InputGroup className="mb-3">
											<FormControl
												name="textarea"
												as="textarea"
												placeholder="Type your message..."
											/>
											<InputGroup.Append>
												<Button 
													type="submit" 
													variant="secondary"  
												>
													Send message
												</Button>
											</InputGroup.Append>
										</InputGroup>
									</form>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					))}
				</Accordion>
			</Card.Body>
		</Card>
	);
}

Messages.propTypes = {
	messages: PropTypes.array,
	sortedMessages: PropTypes.array,
	messagesToggler: PropTypes.func,
	messagesToggle: PropTypes.bool,
	handleSendNewMessageWithSocket: PropTypes.func,
	handleSendAllMessages: PropTypes.func,
};

export default Messages;
