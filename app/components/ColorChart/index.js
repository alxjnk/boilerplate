/**
 *
 * ColorChart
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Card } from 'react-bootstrap';
import classNames from 'classnames';

const ColorChartWrapper = createUseStyles({
	item: {
		height: 'calc(50vh - 77px)',
		'&.toggled': {
			width: 'calc(100% + 1px)',
			height: 'calc(100% + 5px)',
		},
	},
	itemHeader: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	toggle: {
		width: '25px',
		height: '25px',
		lineHeight: '19px',
		textAlign: 'center',
		cursor: 'pointer',
		fontSize: '32px',
		borderRadius: '50%',
		backgroundColor: 'transparent',
		transition: 'all .3s',
		'&:hover': {
			backgroundColor: '#bbb',
			transition: 'all .3s',
		},
		'&.toggled': {
			transform: 'rotate(45deg)',
			transition: 'all .3s',
		},
	},
});

function ColorChart({
		colorChartToggle,
		colorChartToggler,
		...props
	}) {
	const classes = ColorChartWrapper();
	const colorChartItemClassName = classNames(classes.item, {
		toggled: colorChartToggle,
	});
	const colorChartToggleClassName = classNames(classes.toggle, {
		toggled: colorChartToggle,
	});

	return (
		<Card className={colorChartItemClassName}>
			<Card.Header className={classes.itemHeader}>
				<span>Color chart</span>
				<span className={colorChartToggleClassName} onClick={() => colorChartToggler()}>
					+
				</span>
			</Card.Header>
			<Card.Body>Chart</Card.Body>
		</Card>
	);
}

ColorChart.propTypes = {};

export default ColorChart;
