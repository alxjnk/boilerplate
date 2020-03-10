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
		'& span': {
			marginTop: 'auto',
			marginBottom: 'auto',
		},
	},
});

function LineChart({sortedBookingsData, ...props}) {
	const classes = LineChartWrapper();
	let currentRoom = Object.keys(sortedBookingsData)[0];
	const [room, setRoom] = useState(currentRoom);
	
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
				Chart
			</Card.Body>
		</Card>
	);
}

LineChart.propTypes = {};

export default LineChart;
