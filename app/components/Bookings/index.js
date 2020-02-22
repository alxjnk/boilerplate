/**
 *
 * Bookings
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Accordion, Card } from 'react-bootstrap';

const BookingsWrapper = createUseStyles({
	card: {
		border: 'none',
	},
	header: {
		backgroundColor: '#fff',
		padding: '0',
		marginBottom: '0 !important',
		'&.lastHeader': {
			borderBottom: 'none !important',
		},
	},
	toggle: {
		cursor: 'pointer',
		border: 'none',
	},
	cardBody: {
		paddingTop: '7px',
		paddingBottom: '7px',
		borderBottom: '1px solid rgba(0,0,0,.125)',
		'&.lastCardBody': {
			borderTop: '1px solid rgba(0,0,0,.125)',
		},
	},
});

function Bookings({bookingsData, ...props}) {
	const classes = BookingsWrapper();
	return (
		<Accordion>
			{bookingsData.map((item, index) => (
				<Card className={classes.card} key={item.id}>
					<Card.Header
						className={classNames(classes.header, {
							lastHeader: index === bookingsData.length - 1,
						})}
					>
						<Accordion.Toggle className={classes.toggle} as={Card.Header} variant="link" eventKey={item.id}>
							<b>Name: </b>
							{item.name}, <b>Room: </b>
							{item.roomNumber} ...
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey={item.id}>
						<Card.Body
							className={classNames(classes.cardBody, {
								lastCardBody: index === bookingsData.length - 1,
							})}
						>
							<span>
								<b>Full name: </b>
								{item.name} {item.surname},{' '}
							</span>
							{/* <br /> */}
							<span>
								<b>Arrival date: </b>
								{item.arrivalDate},{' '}
							</span>
							{/* <br /> */}
							<span>
								<b>Depature date: </b>
								{item.departureDate},{' '}
							</span>
							{/* <br /> */}
							<span>
								<b>Number of people: </b>
								{item.numberOfPeople},{' '}
							</span>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			))}
		</Accordion>
	);
}

Bookings.propTypes = {};

export default Bookings;
