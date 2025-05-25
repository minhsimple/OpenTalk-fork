import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { isOwnerOrAdmin, isEmployee, hasRotaPayrollWrite } from 'selectors/accountSelector';

import { Col, Row, Navbar, NavItem, Popover, PopoverBody, PopoverHeader } from 'reactstrap';

import config from 'appConfig/mainConfig';
import { logout } from 'actions/authenticationActions';
import { addClass, removeClass } from 'helpers/classes';
import { saveState as saveSessionStorageState, getState } from 'store/persistedSessionStorageState';
import {
	isMediaLargeAndUp,
	getIsTablet,
	getIsBrowser,
	getIsMobileOnly,
} from 'helpers/device_detect/selectors';

import SwitchAccount from './SwitchAccount';
import HelpButton from '../common/HelpButton';
// import { Dirent } from 'fs';
import { getAccountProducts } from '../../redux/actions/productsActions';
import productsEnum from '../../__utils__/constantProducts';

import '../scss/notification.scss';

const routes = config.APP.ROUTES;

const dashboard = routes.DASHBOARD;

const propTypes = {
	user: PropTypes.object.isRequired,
	rota: PropTypes.object.isRequired,
	employees: PropTypes.array.isRequired,
};

const defaultProps = {
	user: {},
	rota: {},
	employees: [],
	history: {
		location: {
			pathName: dashboard.IMAGES_VERIFY.URI,
		},
	},
};

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleLogout = this.handleLogout.bind(this);

		this.handleProfileMenu = this.handleProfileMenu.bind(this);

		this.handleNavigationMenu = this.handleNavigationMenu.bind(this);
		// Notification
		this.notificationRef = React.createRef();
	}

	getInitialState = () => ({
		employeesIsActive: false,
		isProfileMenuPopoverOpen: false,
		isNavigationMenuPopoverOpen: false,
		isDeviceOptionsPopoverOpen: false,
		isOpenQuickHelp: false,
		isHasTarget: false,
		flagNotification: false,
		imageVerifyIsActive: false,
		imagesVerifiedIsActive: false,
		exportIsActive: false,
		employeeReportIsActive: false,
	});

	componentDidMount = () => {
		const { pathname } = this.props.history.location;
		const user = getState('user');
		if (user && user.token) {
			this.props.actions.getAccountProducts();
		}
		this.setState({
			employeesIsActive: (pathname === dashboard.EMPLOYEES.URI),
			imageVerifyIsActive: (pathname === dashboard.IMAGES_VERIFY.URI),
			imagesVerifiedIsActive: (pathname === dashboard.IMAGES_VERIFY.URI_2),
			exportIsActive: (pathname === dashboard.EXPORT.URI),
			exceptionIsActive: (pathname === dashboard.MY_EXCEPTION.URI),
			manageDeviceIsActive: (pathname === dashboard.MANAGE_DEVICES.URI),
			companyBranchIsActive: (pathname === dashboard.COMPANY_BRANCH.URI),
			employeeReportIsActive: (pathname === dashboard.EMPLOYEE_REPORTS.URI),
		});
	};

	handleLogout = () => this.props.actions.logout().then(() => this.props.history.push(routes.LOGIN.URI));

	handleProfileMenu = () => this.setState({ isProfileMenuPopoverOpen: !this.state.isProfileMenuPopoverOpen });

	handleDeviceOptions = () => this.setState({ isDeviceOptionsPopoverOpen: !this.state.isDeviceOptionsPopoverOpen });

	handleNavigationMenu = (event) => {
		if (event.currentTarget.classList.contains('cross')) {
			removeClass(event.currentTarget, 'cross');
		} else {
			addClass(event.currentTarget, 'cross');
		}

		this.setState({ isNavigationMenuPopoverOpen: !this.state.isNavigationMenuPopoverOpen });
	};

	switchDevices = (device) => {
		this.handleDeviceOptions();
		saveSessionStorageState('device', device);
		// eslint-disable-next-line no-restricted-globals
		location.reload();
	}
	handleOpenQuickHelp = () => this.setState({ isOpenQuickHelp: !this.state.isOpenQuickHelp })

	handleClickOutOfViewNotification = (event) => {
		if (this.notificationRef.current) {
			if (!this.notificationRef.current.contains(event.target)) {
				this.setState({ flagNotification: !this.state.flagNotification });
			}
		}
	}

	render = () => (
		<Row>
			<Col className="bg-dark" xs="12" sm="12" md="12" lg="12" xl="12">
				<header className="pt-3 pl-0 pr-0 pb-3">
					<nav className="p-0 m-0">
						<Row>
							<Col className="d-flex justify-content-center justify-content-lg-start" xs="12" sm="12" md="12" lg="2" xl="2">
								<h1 className="m-0 p-0 align-self-center text-lg-left company-logo"><a className="d-block" href={routes.HOME.URI} title={config.APP.TITLE}>{config.APP.TITLE}<span>.</span></a></h1>
							</Col>
							<Col className="mt-3 mt-lg-0" xs="12" sm="12" md="12" lg="10" xl="10">
								<Navbar className="row p-0 m-0" color="dark" dark expand="xl">
									<button type="button" className="col-12 col-sm-12 col-md-2 btn btn-nav btn-action navbar-toggler pl-3 pr-3 border-0 lines-button x text-white font-weight-normal" id="navigationMenu" title="Navigation" aria-label="Navigation" onClick={event => this.handleNavigationMenu(event)}>
										<span className="lines"></span>
									</button>
									<Popover placement="bottom" isOpen={this.state.isNavigationMenuPopoverOpen} target="navigationMenu" toggle={this.handleNavigationMenu}>
										<PopoverBody>
											<ul className="actions popover-menu navigation-menu">
												{this.props.isEmployee === false &&
													<Fragment>
														{this.props.isOwnerOrAdmin ?
															<NavItem className={`pr-3 ml-0 ${(this.state.employeesIsActive) ? 'active' : ''}`}><a href={dashboard.EMPLOYEES.URI} title={dashboard.EMPLOYEES.TITLE} id="employees-page" className="btn btn-action btn-nav border-0"><i className="pr-2 fa fa-fw fa-users" aria-hidden="true"></i>{dashboard.EMPLOYEES.TITLE}</a></NavItem>
															: null
														}
													</Fragment>}
											</ul>
										</PopoverBody>
									</Popover>
									<div className="collapse navbar-collapse m-0 p-0 col-lg-9 col-xl-9">
										<ul className="actions popover-menu">
											{this.props.isEmployee ?
												<NavItem className={`pr-3 ml-0 ${(this.state.imageVerifyIsActive) ? 'active' : ''}`}>
													<a href={dashboard.IMAGES_VERIFY.URI_2} title={dashboard.IMAGES_VERIFY.TITLE_2} id="employees-page" className="btn btn-action btn-nav border-0"><i className="pr-2 fa fa-fw fa-users" aria-hidden="true"></i>{dashboard.IMAGES_VERIFY.TITLE_2}</a>
												</NavItem> : null
											}
											{this.props.isEmployee === false &&
												<Fragment>
													{this.props.isOwnerOrAdmin ?
														<NavItem className={`pr-3 ml-0 ${(this.state.employeesIsActive) ? 'active' : ''}`}>
															<a href={dashboard.EMPLOYEES.URI} title={dashboard.EMPLOYEES.TITLE} id="employees-page" className="btn btn-action btn-nav border-0"><i className="pr-2 fa fa-fw fa-users" aria-hidden="true"></i>{dashboard.EMPLOYEES.TITLE}</a>
														</NavItem> : null
													}
													<NavItem className={`pr-3 ml-0 ${(this.state.imagesVerifiedIsActive) ? 'active' : ''}`}>
														<a href={dashboard.IMAGES_VERIFY.URI_2} title={dashboard.IMAGES_VERIFY.TITLE_2} id="employees-page" className="btn btn-action btn-nav border-0"><i className="pr-2 fa fa-fw fa-camera" aria-hidden="true"></i>{dashboard.IMAGES_VERIFY.TITLE_2}</a>
													</NavItem>
													<NavItem className={`pr-3 ml-0 ${(this.state.employeeReportIsActive) ? 'active' : ''}`}>
														<a href={dashboard.EMPLOYEE_REPORTS.URI} title={dashboard.EMPLOYEE_REPORTS.TITLE} id="employees-report-page" className="btn btn-action btn-nav border-0"><i className="pr-2 fa fa-fw fa-file" aria-hidden="true"></i>{dashboard.EMPLOYEE_REPORTS.TITLE}</a>
													</NavItem>
													<NavItem className={`pr-3 ml-0 ${(this.state.exportIsActive) ? 'active' : ''}`}>
														<a href={dashboard.EXPORT.URI} title={dashboard.EXPORT.TITLE} id="employees-page" className="btn btn-action btn-nav border-0"><i className="pr-2 fas fa-file-export" aria-hidden="true"></i>{dashboard.EXPORT.TITLE}</a>
													</NavItem>
												</Fragment>
											}
											<NavItem className={`pr-3 ml-0 ${(this.state.exceptionIsActive) ? 'active' : ''}`}>
												<a href={dashboard.MY_EXCEPTION.URI} title={dashboard.MY_EXCEPTION.TITLE} id="employees-page" className="btn btn-action btn-nav border-0"><i className="pr-2 fas fa-calendar-times" aria-hidden="true"></i>{dashboard.MY_EXCEPTION.TITLE}</a>
											</NavItem>
											{this.props.isOwnerOrAdmin ?
												<Fragment>
													<NavItem className={`pr-3 ml-0 ${(this.state.manageDeviceIsActive) ? 'active' : ''}`}>
													<a href={dashboard.MANAGE_DEVICES.URI} title={dashboard.MANAGE_DEVICES.TITLE} id="employees-page" className="btn btn-action btn-nav border-0"><i className="pr-2 fa fa-fw fa-users" aria-hidden="true"></i>{dashboard.MANAGE_DEVICES.TITLE}</a>
													</NavItem>
													<NavItem className={`pr-3 ml-0 ${(this.state.companyBranchIsActive) ? 'active' : ''}`}>
														<a href={dashboard.COMPANY_BRANCH.URI} title={dashboard.COMPANY_BRANCH.TITLE} id="employees-page" className="btn btn-action btn-nav border-0"><i className="pr-2 fa fa-fw fa-code-branch" aria-hidden="true"></i>{dashboard.COMPANY_BRANCH.TITLE}</a>
													</NavItem>
												</Fragment> : null
											}
										</ul>
									</div>

									<ul className="mt-3 mt-md-0 actions profile-toggle col-12 col-sm-12 col-md-10 col-lg-3 col-xl-3">
										<li className="col-12 col-sm-6 col-md-auto mr-sm-2 pl-0 pr-0 pl-sm-3 p-md-0 mb-3 mb-sm-0">
											{!isMediaLargeAndUp && <HelpButton id="tablet-support-link"/>}
										</li>
										<li className="col-12 col-sm-6 col-md-auto mr-sm-2 pl-0 pr-0 pl-sm-3 p-md-0 mb-3 mb-sm-0">
											<button type="button" className="btn btn-nav btn-action border-0 col-12 col-sm-auto" id="devices" title="Device Options"
												aria-label="Profile Menu" onClick={this.handleDeviceOptions}>
												{getIsBrowser() && <i className="fas fa-desktop"></i>}
												{getIsTablet() && <i className="fas fa-tablet-alt"></i>}
												{getIsMobileOnly() && <i className="fas fa-mobile"></i>}
											</button>
											<Popover placement="bottom" isOpen={this.state.isDeviceOptionsPopoverOpen} target="devices" toggle={this.handleDeviceOptions}>
												<PopoverBody>
													<ul className="popover-menu devices-toogle">
														<li className="col-12 col-sm-6 col-md-auto p-0 text-right">
															<button type="button" className={`btn btn-action btn-nav border-0${getIsBrowser() ? ' active' : ''}`}
																aria-label="Desktop" onClick={() => !getIsBrowser() && this.switchDevices('desktop')}>
																Desktop
															</button>
														</li>
														<li className="col-12 col-sm-6 col-md-auto p-0 text-right">
															<button type="button" className={`btn btn-action btn-nav border-0${getIsTablet() ? ' active' : ''}`}
																aria-label="Tablet" onClick={() => !getIsTablet() && this.switchDevices('tablet')}>
																Tablet
															</button>
														</li>
														<li className="col-12 col-sm-6 col-md-auto p-0 text-right">
															<button type="button" className="btn btn-action btn-nav border-0"
																aria-label="Mobile" onClick={() => this.switchDevices('mobile')}>
																Mobile
															</button>
														</li>
													</ul>
												</PopoverBody>
											</Popover>
										</li>
										<li className="col-12 col-sm-6 col-md-auto mr-sm-2 pl-0 pr-0 pl-sm-3 p-md-0 mb-3 mb-sm-0">
											<SwitchAccount inline history={this.props.history} />
										</li>
										<li className="col-12 col-sm-6 col-md-auto p-0 text-right">
											<button type="button" className="btn btn-nav btn-user border-0 col-12 col-sm-auto" id="profileMenu" title="Profile Menu" aria-label="Profile Menu" onClick={this.handleProfileMenu}>Hello, {this.props.user.firstName}<i className="pl-2 fa fa-fw fa-chevron-down" aria-hidden="true"></i></button>
											<Popover placement="bottom" isOpen={this.state.isProfileMenuPopoverOpen} target="profileMenu" toggle={this.handleProfileMenu}>
												<PopoverBody>
													<ul className="popover-menu">
														<li><a href={routes.DASHBOARD.ACCOUNT_SETTINGS.URI} className="btn btn-action btn-nav border-0"><i className="pr-2 fa fa-cog iconSetting" aria-hidden="true"></i>{routes.ACCOUNT_SETTINGS.TITLE}</a></li>
														<li><button type="button" title={routes.LOGOUT.TITLE} className="btn btn-action btn-nav border-0" onClick={this.handleLogout}><i className="pr-2 fa fa-fw fa-sign-out" aria-hidden="true"></i>{routes.LOGOUT.TITLE}</button></li>
													</ul>
												</PopoverBody>
											</Popover>
										</li>
									</ul>
								</Navbar>
							</Col>
						</Row>
					</nav>
				</header>
			</Col>
		</Row>
	);
}

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

const mapStateToProps = (state, props) => ({
	user: state.user,
	rota: state.rota,
	roles: state.roles,
	employees: state.employees,
	isOwnerOrAdmin: isOwnerOrAdmin(state.user),
	isEmployee: isEmployee(state.user),
	hasRotaPayrollWrite: hasRotaPayrollWrite(state),
	notification: state.notification,
	productPunchClock: state.products.length > 0 ? state.products.find(product => product.productName === productsEnum.PUNCH_CLOCK) : null,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ logout, getAccountProducts }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
