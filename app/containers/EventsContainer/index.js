/**
 *
 * Events
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import makeSelectEvents from './selectors';
import Events from '../../components/Events/index';

const eventsList = [
	{ 'Booking event': 4 },
	{ 'Message event': 8 },
	{ 'Dismiss booking': 3 },
	{ 'Booking finishes today': 2 },
];

export function EventsContainer(props) {
	useInjectReducer({ key: 'events', reducer });
	useInjectSaga({ key: 'events', saga });

	return <Events eventsList={eventsList} />;
}

// Events.propTypes = {
// 	dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
	events: makeSelectEvents(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(withConnect)(EventsContainer);
