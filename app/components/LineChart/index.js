/**
 *
 * LineChart
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Card, Dropdown, Button } from 'react-bootstrap';
import { 
	todayInMilliseconds, 
	months, 
	getPeriodLength, 
	getAmountDaysInMonth
} from '../../utils/getDate';
import { filterBookingsData } from '../../utils/helper';

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

function LineChart({bookingsData, ...props}) {
	const classes = LineChartWrapper();
	const currentMonth = new Date().getMonth();
	const dateToday = new Date(todayInMilliseconds()).getDate();
	let currentPeriod = 1;
	const [period, setPeriod] = useState(currentPeriod);
	useEffect(() => {
		setPeriod(currentPeriod);
	}, [currentPeriod]);
	
	const changePeriod = (e) => {
		let value = +e.currentTarget.innerText.match(/\d/)[0];
		
		setPeriod(prevPeriod => value);
	};
	// настраиваем длину отображения месяцев на графике
	const setMonthsWidthOnChart = (period, index, currentMonth) => {
		return (
			index === 0 ? 
			100 / getPeriodLength(period) * (getAmountDaysInMonth(currentMonth + index) - new Date(todayInMilliseconds()).getDate() + 1) : 
			index === period ? 
			100 / getPeriodLength(period) * (new Date(todayInMilliseconds()).getDate() - 1) : 100 / getPeriodLength(period) * getAmountDaysInMonth(currentMonth + index)
		);
	};
		
	const filteredBookingsData = filterBookingsData(bookingsData.bookingsData, todayInMilliseconds(), todayInMilliseconds() + getPeriodLength(period) * 24 * 60 * 60 * 1000);
	
	let currentRoom = Object.keys(filteredBookingsData)[0];
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
					<Button variant="secondary" onClick={changePeriod}>1m</Button>
					<Button variant="secondary" onClick={changePeriod}>2m</Button>
					<Button variant="secondary" onClick={changePeriod}>3m</Button>
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
								{Array.from({ length: period + 1 }, (_,ind) => ind + 1).map((item, index) => (
										<span 
											className={classes.month} 
											key={months[new Date(todayInMilliseconds()).getMonth() + index].monthName}
											style={{
												display: 'block', 
												width: `${setMonthsWidthOnChart(period, index, currentMonth)}%`
											}}
										>
											{months[new Date(todayInMilliseconds()).getMonth() + index].monthName}
										</span>
									))}
							</div>
							<div className={classes.bookings}>
								{filteredBookingsData[room] && filteredBookingsData[room].length && filteredBookingsData[room].map(user => <p name={user.id} key={user.id}>
									<span style={{ 
										backgroundColor: "rgba(0,0,0,.05)",
										padding: "0 5px", display: 'flex',
										justifyContent: `${user.startDay !== user.endDay ? 'space-between' : 'space-around'}`,
										marginLeft: `${100 / getPeriodLength(period) * user.start}%`, 
										width: `${100 / getPeriodLength(period) * (user.end - user.start + 1)}%`
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
