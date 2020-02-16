/**
 *
 * LineChart
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Card } from 'react-bootstrap';

const LineChartWrapper = createUseStyles({
	item: {
		height: 'calc(50vh - 77px)',
	},
});

function LineChart() {
	const classes = LineChartWrapper();
	return (
		<Card className={classes.item}>
			<Card.Header>Line chart</Card.Header>
			<Card.Body>Chart</Card.Body>
		</Card>
	);
}

LineChart.propTypes = {};

export default LineChart;
