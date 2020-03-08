/**
 *
 * Events
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { 
	Card, 
	ListGroup, 
	Accordion, 
	FormControl, 
	InputGroup, 
	Button 
} from 'react-bootstrap';
import classNames from 'classnames';

const EventsWrapper = createUseStyles({
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
		justifyContent: 'space-between',
		marginBottom: '0',
	},
	fullname: {
		fontWeight: 'bold',
	},
	textarea: {
		marginTop: '20px',
		marginBottom: '-16px',
	},
});

function Events({
	eventsList, 
	eventsToggler, 
	eventsToggle, 
	handleSendNewMessageWithSocket, 
	...props
}) {
	const classes = EventsWrapper();
	const eventsToggleClassName = classNames(classes.toggle, {
		toggled: eventsToggle,
	});
	const eventsItemClassName = classNames(classes.item, {
		toggled: eventsToggle,
	});
	const sendNewMessage = (e) => {
		e.preventDefault();
		let value = e.target.children[0].children[0].value;

		if (!value) return;
		handleSendNewMessageWithSocket(value);
		e.target.children[0].children[0].value = '';
	};

	return (
		<Card className={eventsItemClassName}>
			<Card.Header className={classes.itemHeader}>
				<span>Event list</span>
				<span className={eventsToggleClassName} onClick={() => eventsToggler()}>+</span>
			</Card.Header>
			<Card.Body className={classes.itemBody}>
				<Accordion>
					{Object.keys(eventsList).map(platform => (
						<Card key={platform}>
							<Accordion.Toggle as={Card.Header} eventKey={platform}>
								{platform.toUpperCase()}
							</Accordion.Toggle>
							<Accordion.Collapse eventKey={platform}>
								<Card.Body>
									<Accordion>
										{Object.keys(eventsList[platform]).map(user => (
											<Card key={user}>
												<Accordion.Toggle as={Card.Header} eventKey={user}>
													<p className={classes.messageHeader}>
														<span className={classes.fullname}>
															{user}
														</span>
													</p>
												</Accordion.Toggle>
												<Accordion.Collapse eventKey={user}>
													<Card.Body>
														<ListGroup variant="flush">
															{[ ...eventsList[platform][user] ].reverse().map(event => (
																<ListGroup.Item key={event.id} className={classes.event}>
																	<span>
																		{event.message}
																	</span> 
																</ListGroup.Item>
															))}
														</ListGroup>
														<form name="sendMessage" onSubmit={sendNewMessage} className={classes.textarea}>
															<InputGroup className="mb-3">
																<FormControl name="textarea" as="textarea" placeholder="Type your message..." />
																<InputGroup.Append>
																	<Button type="submit" variant="secondary">
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
							</Accordion.Collapse>
						</Card>
					))}
				</Accordion>
			</Card.Body>
		</Card>
	);
}

Events.propTypes = {};

export default Events;
