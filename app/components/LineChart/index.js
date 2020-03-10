/**
 *
 * LineChart
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Card, Dropdown } from 'react-bootstrap';

const LineChartWrapper = createUseStyles({
	item: {
		height: 'calc(50vh - 77px)',
	},
	dropdownList: {
		display: 'flex',
		justifyContent: 'space-between',
		'& button': {
			padding: '0px',
		},
		'& button.focus, & button:focus': {
			boxShadow: 'none',
		},
	},
	chart: {
		width: '100%',
		height: '100%',
		overflow: 'auto',
		display: 'flex',
	},
	users: {
		borderBottom: '1px solid transparent',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		'& p': {
			marginBottom: '0px',
			marginRight: '5px',
			borderBottom: '1px solid transparent',
			textAlign: 'right',
		},
	},
	bookings: {
		borderLeft: '1px solid rgba(0, 0, 0, .1)',
		borderBottom: '1px solid rgba(0, 0, 0, .1)',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		flexGrow: 1,
		'& p': {
			marginBottom: '0px',
			borderBottom: '1px dashed rgba(0, 0, 0, .08)',
		},
	},
});

function LineChart({sortedBookingsData, ...props}) {
	const classes = LineChartWrapper();
	let currentRoom = Object.keys(sortedBookingsData)[0];
	const [room, setRoom] = useState(currentRoom);
	useEffect(() => {
		if (currentRoom) {
			setRoom(currentRoom);
		}
	}, [currentRoom]);
	
	return (
		<Card className={classes.item}>
			<Card.Header className={classes.dropdownList}>
				<span>
					{`Room nr.: ${room}`}
				</span>
				<span>
				<Dropdown alignRight>
					<Dropdown.Toggle variant='Secondary' id="dropdown-basic">
						Choose a room
					</Dropdown.Toggle>

					<Dropdown.Menu>
						{Object.keys(sortedBookingsData).map(room => <Dropdown.Item onClick={(e) => setRoom(prevRoom => e.target.name)} name={room} key={room}>{room}</Dropdown.Item>)}
					</Dropdown.Menu>
					</Dropdown>
				</span>
			</Card.Header>
			<Card.Body>
				<div className={classes.chart}>
					<div className={classes.users}>
						{sortedBookingsData[room] && sortedBookingsData[room].length && sortedBookingsData[room].map(user => <p name={user.id} key={user.id}>{user.full_name}</p>)}
					</div>
					<div className={classes.bookings}>
						{sortedBookingsData[room] && sortedBookingsData[room].length && sortedBookingsData[room].map(user => <p name={user.id} key={user.id}>
							<span style={{ backgroundColor: "#8ACBAB", display: 'block', height: '1.5em', marginLeft: `${user.start * 5}%`, width: `${(user.end - user.start) * 5}%`}}></span>
						</p>)}
					</div>
				</div>
			</Card.Body>
		</Card>
	);
}

LineChart.propTypes = {};

export default LineChart;
