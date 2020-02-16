/**
 *
 * Events
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Card, ListGroup } from 'react-bootstrap';

const EventsWrapper = createUseStyles({
	item: {
		height: 'calc(50vh - 77px)',
	},
	itemBody: {
		overflow: 'auto',
		paddingTop: '19px',
		paddingBottom: '19px',
	},
	event: {
		cursor: 'pointer',
	},
});

function Events(props) {
	const classes = EventsWrapper();
	return (
		<Card className={classes.item}>
			<Card.Header>Event list</Card.Header>
			<Card.Body className={classes.itemBody}>
				<ListGroup variant="flush">
					{props.eventsList.map(event => (
						<ListGroup.Item key={Object.keys(event)[0]} className={classes.event}>
							{`${Object.keys(event)[0]}: ${event[Object.keys(event)[0]]}`}
						</ListGroup.Item>
					))}
				</ListGroup>
			</Card.Body>
		</Card>
	);
}

Events.propTypes = {};

export default Events;
