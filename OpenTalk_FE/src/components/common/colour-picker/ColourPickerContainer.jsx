import { CirclePicker } from 'react-color';
import { Button } from 'reactstrap';
import React from 'react';

class ColourPicker extends React.Component {
	constructor(props) {
		super(props);

		this.state = { isColourPickerModalOpen: false };
	}

	/* Sets the color the user has chosen. If they select the color again, the default color is used */
	handleColourClick = (color) => {
		if (color.hex === this.props.colour) {
			this.resetColour();
		} else {
			this.props.onColourSelect(color);
		}
		this.handleColourPickerModalState();
	}

	resetColour = () => {
		const color = {
			hex: this.props.defaultColour,
		};
		this.props.onColourSelect(color);
	}

	handleColourPickerModalState = () => this.setState({ isColourPickerModalOpen: !this.state.isColourPickerModalOpen });

	useDefaultColours = () => this.props.colour === this.props.defaultColour || this.props.colour === '';

	applyStyles = () => (this.useDefaultColours() ? null : { backgroundColor: this.props.colour, color: 'white' });

	render = () => (
		<div className={`color-picker-container drop_${this.props.drop}`}>
			<Button type='button'
				title="Select Colour"
				id="selectColourButton"
				className={`btn btn-create-select btn-toggle-fields ${this.props.buttonClassName}`}
				style={this.applyStyles()}
				onClick={this.handleColourPickerModalState}>
				Select Colour
			</Button>
			{this.state.isColourPickerModalOpen ? <div className="color-picker-popover">
				<div className="color-picker-overlay" onClick={this.handleColourPickerModalState} />
				<div className="color-picker-arrow"></div>
				<CirclePicker className="wrapped-circle-picker"
					colors={this.props.defaultColourList}
					color={this.props.colour}
					onChange={this.handleColourClick} />
				<div className="color-picker-bottom-text"></div>
			</div> : null}
		</div>
	);
}

ColourPicker.defaultProps = {
	buttonClassName: 'color-picker-select-button',
};

export default ColourPicker;
