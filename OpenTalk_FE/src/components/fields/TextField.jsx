import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input, FormGroup } from 'reactstrap';
import { Async, FieldFeedback, FieldFeedbacks } from 'react-form-with-constraints';

import isDuplicate from '../../helpers/isDuplicate';

const propTypes = {
	fieldValue: PropTypes.any,
	duplicatesPool: PropTypes.any,
	valueMissing: PropTypes.string,
	fieldPlaceholder: PropTypes.string,
	isDuplicateHaystack: PropTypes.array,
	handleBlur: PropTypes.func.isRequired,
	fieldName: PropTypes.string.isRequired,
	fieldLabel: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	fieldRequired: PropTypes.bool.isRequired,
	fieldTabIndex: PropTypes.number.isRequired,
	fieldAutoComplete: PropTypes.string.isRequired,
};

const defaultProps = {
	fieldName: '',
	fieldValue: '',
	fieldLabel: '',
	valueMissing: '',
	changeValueExists: false,
	isSameAsExisting: false,
	fieldTabIndex: '-1',
	handleBlur: () => {},
	fieldRequired: false,
	fieldPlaceholder: '',
	showIsDuplicate: null,
	handleChange: () => {},
	isDuplicateHaystack: [],
	fieldAutoComplete: 'off',
};

const TextField = ({
	fieldName,
	fieldValue,
	fieldLabel,
	handleBlur,
	valueMissing,
	changeValueExists,
	isSameAsExisting,
	handleChange,
	fieldRequired,
	fieldTabIndex,
	showIsDuplicate,
	fieldPlaceholder,
	fieldAutoComplete,
	isDuplicateHaystack,
	className,
}) => (
	<FormGroup>
		<Label for={fieldName}>{fieldLabel} {(fieldRequired) ? (<span className="text-danger">&#42;</span>) : null}</Label>
		<Input className={className} type="text" aria-label={fieldName} name={fieldName} id={fieldName} value={fieldValue} placeholder={fieldPlaceholder} tabIndex={fieldTabIndex} autoComplete={fieldAutoComplete} onChange={handleChange} onBlur={handleBlur} required={fieldRequired} />
		<FieldFeedbacks for={fieldName} show="all">
			<FieldFeedback when="valueMissing">- {valueMissing}</FieldFeedback>
		</FieldFeedbacks>
		{changeValueExists && isSameAsExisting &&
			<FieldFeedbacks for={fieldName} show="all">
				<FieldFeedback error>- {fieldLabel} already exists.</FieldFeedback>
			</FieldFeedbacks>
		}
		{(showIsDuplicate && isDuplicateHaystack.length > 0) ? (
			<FieldFeedbacks for={fieldName} show="all">
				<Async promise={() => isDuplicate(fieldValue, isDuplicateHaystack)} then={duplicate => (duplicate ? <FieldFeedback error>- {fieldLabel} already exists.</FieldFeedback> : null)} />
			</FieldFeedbacks>
		) : null}
	</FormGroup>
);

TextField.propTypes = propTypes;

TextField.defaultProps = defaultProps;

export default TextField;
