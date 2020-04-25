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
import { format } from 'date-fns';

const MessagesWrapper = createUseStyles({
	item: {
		height: 'calc(50vh - 77px)',
		margin: 'auto',
		'&.toggled': {
			width: 'calc(100% - 60px)',
			height: 'calc(100% - 60px)',
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
	newMessage: {
		borderRadius: '0.8em',
		backgroundColor: 'rgba(0,0,0,.08)',
		padding: '0px 7px',
	},
	textarea: {
		marginTop: '20px',
		marginBottom: '-16px',
	},
});

function Messages({ 
		messages, 
		sortedMessages, 
		messagesToggler, 
		messagesToggle, 
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
		const { value } = e.target.children[0].children[0];

		if (!value) return;
		handleSendNewMessageWithSocket(value);
		e.target.children[0].children[0].value = '';
	};

	//по имени пользователя меняет значение поля new с true на false
	const changeMessagesStatus = (messages, fullName) => {
		return messages.map(message => {
			if (message['full_name'] === fullName) {
				message.new = false;
			}

			return message;
		})
	};
	// меняем статус сообщений
	const changeMesStatus = e => {
		// получаем поле full_name пользователя по клику
		const fullName = e.currentTarget.querySelector('span').innerText;
		// меняем статус сообщения new с true на false
		const changedMessages = changeMessagesStatus(messages, fullName);
		// вызываем хендлер по добавлению сообщений с измененным статусом в базу данных
		handleSendAllMessages(changedMessages);
	};

	return (
		<Card className={messagesItemClassName}>
			<Card.Header className={classes.itemHeader}>
				<span>Messages</span>
				<span className={messagesToggleClassName} onClick={() => messagesToggler()}>
					{/*-*/}+
				</span>
			</Card.Header>
			<Card.Body className={classes.itemBody}>
				<Accordion>
					{Object.keys(sortedMessages).map(user => (
						<Card key={user}>
							<Accordion.Toggle as={Card.Header} eventKey={user} onClick={changeMesStatus}>
								<div className={classes.messageHeader}>
									<div className={classes.platform}>{sortedMessages[user][0].platform.replace(/\..+/, '')}</div>
									<div className={classes.wrapper}>
										<div className={classes.innerHeader}>
											<span className={classes.fullname}>{user}</span>
											<span className={classes.date}>
												{new Date() * 1 - new Date(format(new Date(), 'RRRR-LL-dd')) * 1 >
												new Date() - new Date('2020-03-01T08:27:53.919Z')
													? format(new Date([...sortedMessages[user]][0].createdAt), 'HH:mm')
													: format(new Date([...sortedMessages[user]][0].createdAt), 'dd-LL-RRRR')}
											</span>
										</div>
										<div className={classes.innerHeader}>
											<span className={classes.lastMessage}>
												{[...sortedMessages[user]][0].message}
											</span>
											<span className={sortedMessages[user].map(item => item.new ? 1 : 0).reduce((result, num) => result + num, 0) ? classes.newMessage : ''}>
												{sortedMessages[user].map(item => item.new ? 1 : 0).reduce((result, num) => result + num, 0) ? sortedMessages[user].map(item => item.new ? 1 : 0).reduce((result, num) => result + num, 0) : ''}
											</span>
										</div>
									</div>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey={user}>
								<Card.Body>
									<form name="sendMessage" onSubmit={sendNewMessage} className={classes.textarea}>
										<InputGroup className="mb-3">
											<FormControl
												name="textarea"
												as="textarea"
												placeholder="Type your message..."
											/>
											<InputGroup.Append>
												<Button type="submit" variant="secondary">
													Send message
												</Button>
											</InputGroup.Append>
										</InputGroup>
									</form>
									<ListGroup variant="flush">
										{[...sortedMessages[user]].map(event => (
											<ListGroup.Item key={event.id} className={classes.event}>
												<span>{event.message}</span>
											</ListGroup.Item>
										))}
									</ListGroup>
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
