import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { updateCookieConsent } from 'actions/cookieConsentActions';

import isRunningLocalhost from 'helpers/isRunningLocalhost';
import logMessage from 'helpers/logging';


const propTypes = {
	user: PropTypes.object.isRequired,
	employees: PropTypes.array.isRequired,
	authenticated: PropTypes.bool.isRequired,
	cookieConsent: PropTypes.bool.isRequired,
};

const defaultProps = {
	user: {},
	employees: [],
	cookieConsent: false,
	authenticated: false,
};

class Intercom extends Component {
	constructor() {
		super();

		this.handlePing = this.handlePing.bind(this);

		this.handleLoadScript = debounce(this.handleLoadScript.bind(this), 1500);
	}

	componentDidMount = () => ((this.props.cookieConsent) ? this.handleLoadScript() : {});

	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.cookieConsent !== prevProps.cookieConsent) {
			if (this.props.cookieConsent) {
				this.handleLoadScript();
			}
		}
	};

	handleLoadScript = () => {
		if (isRunningLocalhost()) {
			logMessage('info', 'Called Intercom handleLoadScript - Ignored in Localhost');
		} else {
			logMessage('info', 'Called Intercom handleLoadScript');

			/* eslint-disable no-eval */
			eval(`(function() {var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${window.intercomSettings.app_id}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}l();}})()`);
			/* eslint-enable no-eval */
			this.handlePing();
		}
	};

	handlePing = () => {
		logMessage('info', 'Called Intercom handlePing');

		if (this.props.authenticated) {
			logMessage('info', 'Called Intercom handlePing - Logged In');

			const {
				email,
				firstName,
				lastName,
				mobile,
				account,
				accounts,
				intercomUserHash,
				applicationRole,
			} = this.props.user;

			if (!isEmpty(intercomUserHash)) {
				window.intercomSettings = Object.assign(window.intercomSettings, {
					email,
					user_hash: intercomUserHash,
				});
			}

			window.Intercom('boot', {
				email,
				phone: mobile,
				company: account,
				companies: accounts,
				name: `${firstName} ${lastName}`,
				app_role: applicationRole,
				app_id: window.intercomSettings.app_id,
			});

			window.Intercom('hide');
			window.Intercom('update', {
				hide_default_launcher: true,
			});
		} else {
			logMessage('info', 'Called Intercom handlePing - Guest');

			window.Intercom('boot', {
				app_id: window.intercomSettings.app_id,
			});
		}

		window.Intercom('onHide', () => {
			if (this.props.isOpenIntercom) {
				this.props.setIsOpenIntercom(false);
				window.Intercom('update', {
					hide_default_launcher: true,
				});
			}
		});
	};

	render = () => '';
}

Intercom.propTypes = propTypes;

Intercom.defaultProps = defaultProps;

const mapStateToProps = (state, props) => ({
	user: state.user,
	employees: state.employees,
	cookieConsent: state.cookieConsent,
	authenticated: state.authenticated,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		updateCookieConsent,
	}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Intercom);
