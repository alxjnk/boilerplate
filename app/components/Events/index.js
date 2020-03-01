/**
 *
 * Events
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Card, ListGroup } from 'react-bootstrap';
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
});

function Events({eventsList, eventsToggler, eventsToggle, ...props}) {
	const classes = EventsWrapper();
	const eventsToggleClassName = classNames(classes.toggle, {
		toggled: eventsToggle,
	});
	const eventsItemClassName = classNames(classes.item, {
		toggled: eventsToggle,
	});

	return (
		<Card className={eventsItemClassName}>
			<Card.Header className={classes.itemHeader}>
				<span>Event list</span>
				<span className={eventsToggleClassName} onClick={() => eventsToggler()}>+</span>
			</Card.Header>
			<Card.Body className={classes.itemBody}>
				<ListGroup variant="flush">
					{[ ...eventsList ].reverse().map(event => (
						<ListGroup.Item key={event.id} className={classes.event}>
							<p className={classes.messageHeader}>
								<span className={classes.fullname}>
									{`${event.full_name}`}
								</span>
								<span>
									{`${event.platform.toUpperCase()}`}
								</span>
							</p>
							<span>
								{`${event.message}`}
							</span> 
						</ListGroup.Item>
					))}
				</ListGroup>
			</Card.Body>
		</Card>
	);
}

Events.propTypes = {};

export default Events;
