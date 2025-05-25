// DEPRECATED

import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';

class RotaDatePicker extends Component {
	calendarContainer = ({ className, children }) => (
		<div className="react-datepicker">
			<div className="date-picker-header">
				{this.props.headerText}
			</div>
			{children}
		</div>
	)

	getHighlightedWeek = () => {
		const dates = [];

		const firstDay = moment(this.props.week.startDate).startOf('day');
		const lastDay = moment(this.props.week.endDate).startOf('day');

		dates.push(firstDay.clone());

		while (firstDay.add(1, 'days').diff(lastDay) < 0) {
			dates.push(firstDay.clone());
		}

		dates.push(lastDay.clone());

		return [{ 'react-datepicker__day--highlighted': dates }];
	};

	render = () => (
		<DatePicker
			withPortal
			inline
			autoFocus
			fixedHeight
			calendarContainer={this.calendarContainer}
			tabIndex={-1}
			selected={this.props.week.startDate}
			onChange={this.props.onChange}
			onClickOutside={this.props.onClickOutside}
			highlightDates={this.getHighlightedWeek()}
			shouldCloseOnSelect={true}>
		</DatePicker>
	)
}

RotaDatePicker.propTypes = {
	week: PropTypes.object.isRequired,
	headerText: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onClickOutside: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
	week: state.week,
});

export default connect(mapStateToProps)(RotaDatePicker);
