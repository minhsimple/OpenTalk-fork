import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Label, FormGroup } from 'reactstrap';
import MaskedInput from 'react-text-mask';
import { FieldFeedback, FieldFeedbacks } from 'react-form-with-constraints';
import moment from 'moment';

const propTypes = {
	fieldValue: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	fieldRequired: PropTypes.bool.isRequired,
	fieldTabIndex: PropTypes.number.isRequired,
	fieldAutoComplete: PropTypes.string.isRequired,
};

const defaultProps = {
	fieldValue: '',
	fieldTabIndex: '-1',
	fieldRequired: false,
	handleChange: () => {},
	fieldAutoComplete: 'off',
};

class DateField extends Component {
	constructor(props) {
		super(props);

		this.state = this.getInitialState();
	}

	getInitialState = () => ({
		dateRegex: /^[0-9]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}$/,
	});

	dateMask = (value) => {
		const chars = value.split('');
		const day = [
			/[0-3]/,
			(chars[0] === '3') ? /[0-1]/ : /[0-9]/,
		];
		const month = [
			/[0-1]/,
			chars[3] === '0' ? /[1-9]/ : /[0-2]/,
		];

		const year = [
			/[1-2]/,
			/[0-9]/,
			/[0-9]/,
			/[0-9]/,
		];

		return day.concat('-').concat(month).concat('-').concat(year);
	};

	validateDateMask = (date) => {
		const isError = date ? !this.state.dateRegex.test(date) : false;
		return isError;
	}

	render = () => (
		<FormGroup>
			<Label for={this.props.fieldName}>{this.props.fieldLabel}</Label>
			<MaskedInput
				id={this.props.fieldName}
				name={this.props.fieldName}
				mask={this.dateMask}
				className="form-control"
				onChange={e => this.props.handleChange(e)}
				onBlur={e => this.props.handleChange(e)}
				placeholder={this.props.fieldPlaceholder}
				value={this.props.fieldValue || null}
				tabIndex={this.props.fieldTabIndex}
				guide={false}/>
			<FieldFeedbacks for={this.props.fieldName} show="all">
				<FieldFeedback when={value => this.validateDateMask(value)}>- Please provide a valid date of birth. </FieldFeedback>
				<FieldFeedback when={value => moment().diff(moment(value, 'DD-MM-YYYY')) < 0}>- Please provide a valid date of birth. </FieldFeedback>
			</FieldFeedbacks>
		</FormGroup>
	);
}

DateField.propTypes = propTypes;

DateField.defaultProps = defaultProps;

export default DateField;
