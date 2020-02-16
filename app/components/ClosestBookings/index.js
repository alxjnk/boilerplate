/**
 *
 * ClosestBookings
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Accordion, Card, Button } from 'react-bootstrap';

const ClosestBookingsWrapper = createUseStyles({
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
	cardBody: {
		paddingTop: '7px',
		paddingBottom: '7px',
		borderBottom: '1px solid rgba(0,0,0,.125)',
		'&.lastCardBody': {
			borderTop: '1px solid rgba(0,0,0,.125)',
		},
	},
});

function ClosestBookings(props) {
	const classes = ClosestBookingsWrapper();
	return (
		<Accordion>
			{props.closestBookingsData.map((item, index) => (
				<Card className={classes.card} key={item.id}>
					<Card.Header
						className={classNames(classes.header, {
							lastHeader: index === props.closestBookingsData.length - 1,
						})}
					>
						<Accordion.Toggle as={Button} variant="link" eventKey={item.id}>
							<b>Name: </b>
							{item.name}, <b>Room: </b>
							{item.roomNumber} ...
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey={item.id}>
						<Card.Body
							className={classNames(classes.cardBody, {
								lastCardBody: index === props.closestBookingsData.length - 1,
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

ClosestBookings.propTypes = {};

export default ClosestBookings;
