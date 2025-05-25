import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import React, { Fragment, Component } from 'react';
import config from 'appConfig/mainConfig';
import Intercom from './Intercom';
import CookieBanner from './CookieBanner';

const routes = config.APP.ROUTES;

class SiteFooter extends Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState = () => ({
		error: {},
	})

	render = () =>
		<Fragment>
			<Row className="footer">
				<Col xs="12" sm="12" md="12" lg="12" xl="12" className="text-center m-0 p-4 p-lg-5">
					<ul className="list-inline">
						<li className="list-inline-item pl-3 pr-3"><a href={routes.TERMS_OF_SERVICE.URI} id="termsOfService" title={routes.TERMS_OF_SERVICE.TITLE}>{routes.TERMS_OF_SERVICE.TITLE}</a></li>
						<li className="list-inline-item pl-3 pr-3"><a href={routes.COOKIES_POLICY.URI} id="cookiesPolicy" title={routes.COOKIES_POLICY.TITLE}>{routes.COOKIES_POLICY.TITLE}</a></li>
						<li className="list-inline-item pl-3 pr-3"><a href={routes.END_USER_LICENSE_AGREEMENT.URI} id="endUserLicenseAgreement" title={routes.END_USER_LICENSE_AGREEMENT.TITLE}>{routes.END_USER_LICENSE_AGREEMENT.TITLE}</a></li>
					</ul>
					<p className="p-0 m-0">&copy; {moment().format('YYYY')} {config.APP.AUTHOR.TITLE}. All rights reserved.</p>
				</Col>
			</Row>
			<CookieBanner />
			{!this.props.authenticated && <Intercom />}
		</Fragment>
}

const mapStateToProps = (state, props) => ({
	authenticated: state.authenticated,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteFooter);

