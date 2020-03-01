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
	messageHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '0',
	},
	fullname: {
		fontWeight: 'bold',
	},
});

function Events({eventsList, ...props}) {
	const classes = EventsWrapper();

	return (
		<Card className={classes.item}>
			<Card.Header>Event list</Card.Header>
			<Card.Body className={classes.itemBody}>
				<ListGroup variant="flush">
					{eventsList.reverse().map(event => (
						<ListGroup.Item key={event.id} className={classes.event}>
							<p className={classes.messageHeader}>
								<span className={classes.fullname}>
									{`${event.fullName || event.full_name}`}
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
