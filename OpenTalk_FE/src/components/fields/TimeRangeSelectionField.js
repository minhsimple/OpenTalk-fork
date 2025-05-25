import React, { useState, useEffect, Fragment } from 'react';
import { Input } from 'reactstrap';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import isEmpty from 'lodash/isEmpty';

const moment = extendMoment(Moment);

const minutesOfDay = momentObj => (momentObj.hours() * 60) + momentObj.minutes();

const defaultProps = {
	onTimeSelected: () => {},
	value: '',
};

const findClosestOption = ([[_, times]], defaultTime) =>
	times.find(option =>
		moment(option.value, 'YYYY-MM-DD HH:mm:ss').isSameOrAfter(defaultTime));

const getTimeOptions = (startDate, startTime, timeInterval, internalDate) => {
	const times = [];

	/* 24 hours * 60 mins in an hour */

	let timeHours = 24 * 60;

	if (timeInterval === 15) {
		/* 24 hours * 15 mins in an hour (DO NOT EDIT. Edit timeInterval instead). */

		timeHours = 24 * 4;
	} else if (timeInterval === 30) {
		/* 24 hours * 30 mins in an hour (DO NOT EDIT. Edit timeInterval instead). */

		timeHours = 24 * 2;
	}

	/* Set default start and end times, to nearest time intervals so we have some default times */

	let start = moment(startDate, 'YYYY-MM-DD').startOf('day');

	if (startTime) {
		// start = moment(startTime, 'YYYY-MM-DD HH:mm:ss')
		// 	.add(timeInterval, 'minutes')
		// 	.seconds(0);
		start = moment(startTime).seconds(0);
		const remainder = timeInterval - (start.minute() % timeInterval);
		start = start.add(remainder, 'minutes');
		start = start.seconds(0);
	}

	/* Loop over the hours, creating a end time range from the start time plus 24 hours */

	for (let i = 0; i < timeHours; i += 1) {
		const minutes = moment(start)
			.add(timeInterval * i, 'minutes')
			.seconds(0);

		const option = {
			label: minutes.format('HH:mm'),
			day: minutes.format('ddd, Do MMMM'),
			value: minutes.format('YYYY-MM-DD HH:mm:ss'),
		};

		if (
			internalDate &&
			moment(option.value, 'YYYY-MM-DD').isAfter(moment(startDate).format('YYYY-MM-DD'))
		) {
			break;
		}

		/* This is to dyanmically update the label value if the selected end time if in the next day - allows better UX for the user */

		if (
			moment(option.day, 'ddd, Do MMMM').isAfter(moment(startDate).format('YYYY-MM-DD'))
		) {
			option.label = moment(option.value).format('HH:mm (ddd, Do)');
		}
		/* Add the day if it doesn't exist */

		times[option.day] = times[option.day] || [];

		if (!startTime) {
			times[option.day].push(option);
		} else if (
			moment(option.value, 'YYYY-MM-DD').isSame(moment(startDate).format('YYYY-MM-DD'))
		) {
			if (minutesOfDay(moment(option.value)) >= minutesOfDay(start)) {
				times[option.day].push(option);
			}
		} else {
			times[option.day].push(option);
		}
	}

	return Object.entries(times);
};

const Option = ({ day, value, label }) => (
	<option value={value} label={label}>
		{label}
	</option>
);

const OptionGroup = ({ label, options, grouped }) =>
	(grouped ? (
		<optgroup label={label}>
			{(options || []).map(option => (
				<Option {...option} key={option.value} />
			))}
		</optgroup>
	) : (
		<Fragment>
			{(options || []).map(option => (
				<Option {...option} key={option.value} />
			))}
		</Fragment>
	));

const TimeRangeSelectionField = ({
	label = '',
	value = '',
	startDate = moment().format('YYYY-MM-DD'),
	startTime = null,
	tabIndex = '1',
	required = false,
	disabled = false,
	defaultTime = false,
	internalDate = null,
	onTimeSelected = () => {},
	onBur = () => {},
	...props
}) => {
	const [times, setTimes] = useState([]);
	const [selected, select] = useState(value || '');

	const handleSelect = ({ target: { value: newValue } }) => {
		select(newValue);
		onTimeSelected(newValue);
	};

	useEffect(() => {
		const timesOptions =
			getTimeOptions(startDate, startTime, 15, internalDate) || [];
		setTimes(timesOptions);
	}, [startDate, startTime]);

	useEffect(() => {
		if (!times || times.length === 0) {
			select('');
			return;
		}
		if (value === selected) {
			return;
		}
		select(value || '');
	}, [value, times]);

	useEffect(() => {
		if (!defaultTime || isEmpty(times) || selected) {
			return;
		}
		const opt = findClosestOption(times, defaultTime);
		if (opt) {
			handleSelect({ target: { value: opt.value } });
		}
	}, [times, defaultTime]);

	return (
		<Input
			type="select"
			className="custom-select custom-select-xl"
			value={selected || ''}
			onChange={handleSelect}
			tabIndex={tabIndex}
			required={required}
			disabled={disabled}
			onBlur={onBur}
			{...props}
		>
			{label &&
				<option value="" label={label}>
					{label}
				</option>
			}
			{times.map(([lab, options]) => (
				<OptionGroup
					label={lab}
					grouped={!internalDate}
					options={options}
					key={lab}
				/>
			))}
		</Input>
	);
};

TimeRangeSelectionField.defaultProps = defaultProps;

export default TimeRangeSelectionField;
