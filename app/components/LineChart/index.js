/**
 *
 * LineChart
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Card, Dropdown, Button } from 'react-bootstrap';
import { todayInMilliseconds, months } from '../../utils/getDate';

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
	amountOfMonthes: {
		marginLeft: 'auto',
		marginRight: '20px',
		'& button': {
			margin: '0 5px',
			padding: '3px 8px',
			color: '#000',
			backgroundColor: '#eaeaea',
			borderColor: '#eaeaea',
		}
	},
	chart: {
		width: '100%',
		height: '100%',
		overflow: 'auto',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	wrapper: {
		display: 'flex',
		flexGrow: 1,
	},
	bookingsWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	},
	bookingsHeader: {
		display: 'flex',
	},
	month: {
		marginBottom: '0px',
		textAlign: 'center',
		fontWeight: 'bold',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
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

function LineChart({filteredBookingsData, ...props}) {
	const classes = LineChartWrapper();
	let currentRoom = Object.keys(filteredBookingsData)[0];
	const dateToday = new Date(todayInMilliseconds()).getDate();
	const [room, setRoom] = useState(currentRoom);
	useEffect(() => {
		if (currentRoom) {
			setRoom(currentRoom);
		}
	}, [currentRoom]);

	console.log(filteredBookingsData);
	
	return (
		<Card className={classes.item}>
			<Card.Header className={classes.dropdownList}>
				<span>
					<Dropdown>
						<Dropdown.Toggle variant='Secondary' id="dropdown-basic">
							{`Room: ${room ? room : ''}`}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{Object.keys(filteredBookingsData).map(room => (		<Dropdown.Item 
									onClick={(e) => setRoom(prevRoom => e.target.name)} 
									name={room} 
									key={room}
								>
									{room}
								</Dropdown.Item>))}
						</Dropdown.Menu>
					</Dropdown>
				</span>
				<div className={classes.amountOfMonthes}>
					<Button variant="secondary">1m</Button>
					<Button variant="secondary">2m</Button>
					<Button variant="secondary">3m</Button>
				</div>
				<span 
					// className={messagesToggleClassName} onClick={() => messagesToggler()}
				>
					+
				</span>
			</Card.Header>
			<Card.Body>
				<div className={classes.chart}>
					<div className={classes.wrapper}>
						<div className={classes.users}>
							{filteredBookingsData[room] && filteredBookingsData[room].length && filteredBookingsData[room].map(user => <p name={user.id} key={user.id}>{user.full_name}</p>)}
						</div>
						<div className={classes.bookingsWrapper}>
							<div className={classes.bookingsHeader}>
								<span className={classes.month} style={{display: 'block', width: `${100 / 31 * (31 - new Date(todayInMilliseconds()).getDate())}%`}}>{months[new Date(todayInMilliseconds()).getMonth()].monthName}</span>
								<span className={classes.month} style={{display: 'block', borderRight: 'rgba(0,0,0,.05)', width: `${100 - 100 / 31 * (31 - new Date(todayInMilliseconds()).getDate())}%`}}>{months[new Date(todayInMilliseconds()).getMonth() + 1].monthName}</span>
							</div>
							<div className={classes.bookings}>
								{filteredBookingsData[room] && filteredBookingsData[room].length && filteredBookingsData[room].map(user => <p name={user.id} key={user.id}>
									<span style={{ 
										backgroundColor: "rgba(0,0,0,.05)",
										padding: "0 5px", display: 'flex',
										justifyContent: `${user.startDay !== user.endDay ? 'space-between' : 'space-around'}`,
										marginLeft: `${100 / 31 * user.start}%`, 
										width: `${100 / 31 * (user.end - user.start + 1)}%`
									}}>
										<span>
											{dateToday === user.startDay && user.startDay !== user.endDay ? '' : user.startDay}
										</span>
										<span style={{display: `${user.startDay === user.endDay ? 'none' : ''}`}}>
											{user.startDay !== user.endDay ? user.endDay : ''}
										</span>
									</span>
								</p>)}
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
}

LineChart.propTypes = {};

export default LineChart;
