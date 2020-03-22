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
// import { platforms } from '../../variables/platforms';

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

function Messages({ messages, messagesToggler, messagesToggle, handleSendNewMessageWithSocket, ...props }) {
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
	console.log(messages);

	return (
		<Card className={messagesItemClassName}>
			<Card.Header className={classes.itemHeader}>
				<span>Event list</span>
				<span className={messagesToggleClassName} onClick={() => messagesToggler()}>
					{/*-*/}+
				</span>
			</Card.Header>
			<Card.Body className={classes.itemBody}>
				<Accordion>
					{Object.keys(messages).map(user => (
						<Card key={user}>
							<Accordion.Toggle as={Card.Header} eventKey={user}>
								<div className={classes.messageHeader}>
									<div className={classes.platform}>{messages[user][0].platform.replace(/\..+/, '')}</div>
									<div className={classes.wrapper}>
										<div className={classes.innerHeader}>
											<span className={classes.fullname}>{user.toUpperCase()}</span>
											<span className={classes.date}>
												{new Date() * 1 - new Date(format(new Date(), 'RRRR-LL-dd')) * 1 >
												new Date() - new Date('2020-03-01T08:27:53.919Z')
													? format(new Date([...messages[user]].reverse()[0].createdAt), 'HH:mm')
													: format(new Date([...messages[user]].reverse()[0].createdAt), 'dd-LL-RRRR')}
											</span>
										</div>
										<div className={classes.innerHeader}>
											<span className={classes.lastMessage}>
												{[...messages[user]].reverse()[0].message}
											</span>
											<span className={classes.newMessage}>
												{messages[user].map(item => (item.new ? 1 : 0)).length}
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
										{[...messages[user]].reverse().map(event => (
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
	messagesToggler: PropTypes.func,
	messagesToggle: PropTypes.bool,
	handleSendNewMessageWithSocket: PropTypes.func,
};

export default Messages;