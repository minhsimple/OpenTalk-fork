import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	onClick: PropTypes.func.isRequired,
	name: PropTypes.string,
	id: PropTypes.string,
};

class ToggleSwitch extends Component {
	handlerOnClick = (event) => {
		event.preventDefault();
		this.props.onClick(event);
	}
	render = () => (
		<div name={this.props.name} checked={this.props.checked} onClick={this.handlerOnClick} className="mt-2 mb-2">
			<input type="checkbox" id={this.props.id} name={this.props.name} readOnly checked={this.props.checked} />
			<span className="slider round"></span>
		</div>
	);
}
ToggleSwitch.propTypes = propTypes;

export default ToggleSwitch;
