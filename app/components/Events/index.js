/**
 *
 * Events
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
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
import { format } from 'date-fns';
// import { platforms } from '../../variables/platforms';

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
	wrapper: {
		display: 'flex',
		marginBottom: '0',
		flexDirection: 'column',
		flexGrow: '1',
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
		width: '65%',
		fontWeight: 'bold',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	platform: {
		height: '48px',
		width: '48px',
		overflow: 'hiden',
		borderRadius: '50%',
		backgroundColor: 'rgba(0,0,0,.08)',
		marginRight: '20px',
		textAlign: 'center',
		lineHeight: '48px',
		color: 'rgba(0, 0, 0, .5)',
	},
	date: {
		fontSize: '0.9em',
	},
	lastMessage: {
		fontSize: '0.8em',
		color: 'rgba(0, 0, 0, .5)',
		width: '78%',
		// overflow: 'hidden',
		// textOverflow: 'ellipsis',
		// whiteSpace: 'nowrap',
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
				<span className={eventsToggleClassName} onClick={() => eventsToggler()}>{/*-*/}+</span>
			</Card.Header>
			<Card.Body className={classes.itemBody}>
				<Accordion>
					{Object.keys(eventsList).map(user => (
						<Card key={user}>
							<Accordion.Toggle as={Card.Header} eventKey={user}>
								<div className={classes.messageHeader}>
									<div className={classes.platform}>
										{eventsList[user][0]['platform']}
									</div>
									<div className={classes.wrapper}>
										<div className={classes.innerHeader}>
											<span className={classes.fullname}>
												{user.toUpperCase()}
											</span>
											<span className={classes.date}>
												{new Date() * 1 - new Date(format(new Date(), 'RRRR-LL-dd')) * 1 > (new Date() - new Date('2020-03-01T08:27:53.919Z')) ? format(new Date((eventsList[user][0]['createdAt'])), 'HH:mm') : format(new Date((eventsList[user][0]['createdAt'])), 'dd-LL-RRRR')}
											</span>
										</div>
										<div className={classes.innerHeader}>
											<span className={classes.lastMessage}>
												{[ ...eventsList[user]].reverse()[0]['message'].length < 20 ? [ ...eventsList[user]].reverse()[0]['message'] : [ ...eventsList[user]].reverse()[0]['message'].slice(0, 20) + '...'}
											</span>
											<span className={classes.newMessage}>
												{eventsList[user].map(item => {
													return item.new ? 1 : 0;
												}).length}
											</span>
										</div>
									</div>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey={user}>
								<Card.Body>
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
									<ListGroup variant="flush">
										{[ ...eventsList[user]].reverse().map(event => (
											<ListGroup.Item key={event.id} className={classes.event}>
												<span>
													{event.message}
												</span> 
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

Events.propTypes = {
	eventsList: PropTypes.array, 
	eventsToggler: PropTypes.func, 
	eventsToggle: PropTypes.bool, 
	handleSendNewMessageWithSocket: PropTypes.func,
};

export default Events;
