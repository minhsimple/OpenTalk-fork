import { connect } from 'react-redux';
import React, { Fragment, Component } from 'react';
import { Col, Row } from 'reactstrap';
import config from 'appConfig/mainConfig';
import Intercom from './Intercom';
import CookieBanner from './CookieBanner';

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState = () => ({
		error: {},
	})

	render = () =>
		<Fragment>
			<CookieBanner />
			{!this.props.authenticated && <Intercom />}
		</Fragment>
}

const mapStateToProps = (state, props) => ({
	authenticated: state.authenticated,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
