/**
 *
 * ColorChart
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Card } from 'react-bootstrap';

const ColorChartWrapper = createUseStyles({
	item: {
		height: 'calc(50vh - 77px)',
	},
});

function ColorChart(props) {
	const classes = ColorChartWrapper();
	return (
		<Card className={classes.item}>
			<Card.Header>Color chart</Card.Header>
			<Card.Body>Chart</Card.Body>
		</Card>
	);
}

ColorChart.propTypes = {};

export default ColorChart;
