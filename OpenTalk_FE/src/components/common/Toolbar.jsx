import moment from 'moment';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { saveAs } from 'file-saver/FileSaver';
import React, { Fragment, Component } from 'react';
import { getCurrencySymbol, canViewRotaCosts, isOwnerOrAdmin } from 'selectors/accountSelector';
import { Col, Row, Tooltip, Button, Popover, ButtonGroup, PopoverBody, PopoverHeader } from 'reactstrap';
import { sendBulkEmployeeAccessInvites, syncEmployeeFromHRM } from 'actions/employeeActions';
import { getRotaEmployees } from 'actions/rotaEmployeeActions';
import { getRotaTypes, switchRotaType } from 'actions/rotaTypeActions';
import { getShifts, copyShifts, downloadShifts } from 'actions/shiftActions';
import { createRota, getRota, getRotas, deleteRota, updateRotaStatus, clearRotaShifts, switchRota, updateRota, publishRota } from 'actions/rotaActions';
import { switchWeek } from 'actions/weekActions';
import { updateSettings } from 'actions/settingActions';

import logMessage from 'helpers/logging';
import { confirm, complexConfirm } from 'helpers/confirm';

import config from 'appConfig/mainConfig';
import { isTablet } from 'helpers/device_detect/selectors';
import WeekPicker from './WeekPicker';
import Modal from './Modal';
import RotaDatePicker from './RotaDatePicker';

import CloseButton from '../common/CloseButton';
import EmployeeForm from '../forms/EmployeeForm';
import Notification from '../common/Notification';

import UploadEmployeesForm from '../forms/UploadEmployeesForm';
import ExistingEmployeesForm from '../forms/ExistingEmployeesForm';
import SyncKomuUserForm from '../forms/SyncKomuUserForm';
import EmployeeCheckInForm from '../forms/EmployeeCheckInForm';
import SyncEmployeeFromHRM from '../forms/SyncEmployeeFromHRM';


const routes = config.APP.ROUTES;

const { STATUSES } = routes.ROTAS;

const dashboard = routes.DASHBOARD;

const notifications = config.APP.NOTIFICATIONS;

const propTypes = {
	week: PropTypes.object.isRequired,
	rota: PropTypes.object.isRequired,
	rotas: PropTypes.array.isRequired,
	shifts: PropTypes.array.isRequired,
	rotaCost: PropTypes.number.isRequired,
	rotaType: PropTypes.object.isRequired,
	rotaTypes: PropTypes.array.isRequired,
	authenticated: PropTypes.bool.isRequired,
};

const defaultProps = {
	week: {},
	rota: {},
	rotas: [],
	shifts: [],
	rotaCost: 0,
	rotaType: {},
	rotaTypes: [],
	authenticated: false,
};

class Toolbar extends Component {
	constructor(props) {
		super(props);
		this.toastId = null;

		this.state = this.getInitialState();

		this.handleModal = this.handleModal.bind(this);

		this.handleGetRota = this.handleGetRota.bind(this);

		this.handleEditRota = this.handleEditRota.bind(this);

		this.handleGetRotas = this.handleGetRotas.bind(this);

		this.handleGetShifts = this.handleGetShifts.bind(this);

		this.handleCopyShifts = this.handleCopyShifts.bind(this);

		this.handleCreateRota = this.handleCreateRota.bind(this);

		this.handleDeleteRota = this.handleDeleteRota.bind(this);

		this.handleSwitchRota = this.handleSwitchRota.bind(this);

		this.handleCreateShift = this.handleCreateShift.bind(this);

		this.handleAssignShift = this.handleAssignShift.bind(this);

		this.handlePublishRota = this.handlePublishRota.bind(this);

		this.handleDownloadRota = this.handleDownloadRota.bind(this);

		this.handleRotaTypeMenu = this.handleRotaTypeMenu.bind(this);

		this.handleSwitchRotaType = this.handleSwitchRotaType.bind(this);

		this.handleCreateEmployee = this.handleCreateEmployee.bind(this);

		this.handleEditRotaTooltip = this.handleEditRotaTooltip.bind(this);

		this.handleUploadEmployees = this.handleUploadEmployees.bind(this);

		this.handleInfoNotification = this.handleInfoNotification.bind(this);

		this.handleDownloadRotaMenu = this.handleDownloadRotaMenu.bind(this);

		this.handleExistingEmployees = this.handleExistingEmployees.bind(this);

		this.handleRotaBudgetTooltip = this.handleRotaBudgetTooltip.bind(this);

		this.handleCreateShiftTooltip = this.handleCreateShiftTooltip.bind(this);

		this.handlePublishRotaTooltip = this.handlePublishRotaTooltip.bind(this);

		this.handleDownloadRotaTooltip = this.handleDownloadRotaTooltip.bind(this);

		this.handleSuccessNotification = this.handleSuccessNotification.bind(this);

		this.handleCreateEmployeeTooltip = this.handleCreateEmployeeTooltip.bind(this);

		this.handleUploadEmployeesTooltip = this.handleUploadEmployeesTooltip.bind(this);

		this.handleCopyFromRotaShifts = this.handleCopyFromRotaShifts.bind(this);

		this.handleCopyFromRotaShiftsTooltip = this.handleCopyFromRotaShiftsTooltip.bind(this);

		this.handleSwitchFromAssignShiftToCreateShift = this.handleSwitchFromAssignShiftToCreateShift.bind(this);

		this.handleClearRotaShifts = this.handleClearRotaShifts.bind(this);
	}

	getInitialState = () => ({
		error: {},
		rotaId: '',
		startDate: '',
		startDay: 0,
		highlightedDates: [],
		rotaBudget: 0,
		rotaStatus: 'DRAFT',
		rotasIsActive: false,
		isCalenderOpen: false,
		isErrorModalOpen: false,
		employeesIsActive: false,
		enableShiftButton: true,
		isEditRotaModalOpen: false,
		isEditRotaTooltipOpen: false,
		isCreateRotaModalOpen: false,
		isCreateShiftModalOpen: false,
		isAssignShiftModalOpen: false,
		isRotaBudgetTooltipOpen: false,
		hasRotaUnassignedShifts: false,
		isCreateShiftTooltipOpen: false,
		isPublishRotaTooltipOpen: false,
		isDownloadRotaTooltipOpen: false,
		isRotaTypeMenuPopoverOpen: false,
		isCreateEmployeeModalOpen: false,
		isUploadEmployeesModalOpen: false,
		isCreateEmployeeTooltipOpen: false,
		isUploadEmployeesTooltipOpen: false,
		isExistingEmployeesModelOpen: false,
		isDownloadRotaMenuPopoverOpen: false,
		isExistingEmployeesTooltipOpen: false,
		isCopySpecificRotaShiftsTooltipOpen: false,
		isShowModalSyncEmployees: false,
		isShowModalSyncKomuUser: false,
		listEmployeeId: this.props.listEmployeeId,
		isShowModalAddCheckInRecord: false,
	});

	componentDidMount = () => {
		/* We debounce this call to wait 10ms (we do not want the leading (or "immediate") flag passed because we want to wait until all the componentDidUpdate calls have finished before loading the button states again */
		this.handleToggleButtonStates = debounce(this.handleToggleButtonStates.bind(this), 10);
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (!this.props.authenticated) {
			return;
		}

		/* If the current week/rota or shifts have changes, re/check the shift button state and update label to reflect available actions */
		if (prevProps.week !== this.props.week || prevProps.shifts !== this.props.shifts || prevProps.rotaType !== this.props.rotaType || prevProps.rota !== this.props.rota || prevProps.settings !== this.props.settings) {
			this.handleToggleButtonStates();
		}
	};

	handleGetRota = () => {
		const { actions, rota: { rotaId } } = this.props;

		const payload = {
			rotaId,
		};

		logMessage('info', 'Called Toolbar handleGetRota getRota');
		logMessage('info', 'Called Toolbar handleGetRota switchRota');

		return actions.getRota(payload)
			.then(rota => actions.switchRota(rota))
			.catch(error => Promise.reject(error));
	};

	handleDeleteRota = () => {
		const { actions, rota: { rotaId } } = this.props;

		const payload = {
			rotaId,
		};

		logMessage('info', 'Called Toolbar handleDeleteRota deleteRota');

		return actions.deleteRota(payload).catch(error => Promise.reject(error));
	};

	handleSwitchRota = (rota) => {
		const { actions } = this.props;

		/* Set the current rota */
		logMessage('info', 'Called Toolbar handleSwitchRota switchRota');

		actions.switchRota(rota)
			.then(() => {
				const { rota: { rotaId } } = this.props;

				const payload = {
					rotaId,
				};

				/* Any time we switch rotas, we need to get a fresh list of shifts for that rota */
				logMessage('info', 'Called Toolbar handleSwitchRota getShifts');

				actions.getShifts(payload)
					.then(() => {
						logMessage('info', 'Called Toolbar handleSwitchRota getShifts');

						actions.getRotaEmployees(rota).catch((error) => {
							error.data.title = 'Get Rota Employees';

							this.setState({ error });

							this.handleModal();
						});
					})
					.catch((error) => {
						error.data.title = 'Get Shifts';

						this.setState({ error });

						this.handleModal();
					});
			});
	};

	handleGetRotas = () => {
		const { actions, rotaType: { rotaTypeId } } = this.props;

		const payload = {
			rotaTypeId,
		};

		logMessage('info', 'Called Toolbar handleGetRotas getRotas');

		return actions.getRotas(payload).catch(error => Promise.reject(error));
	};

	handleGetShifts = () => {
		const { actions, rota: { rotaId } } = this.props;

		const payload = {
			rotaId,
		};

		logMessage('info', 'Called Toolbar handleGetShifts getShifts');

		return actions.getShifts(payload).catch(error => Promise.reject(error));
	};

	handleToggleButtonStates = () => {
		const { pathname } = this.props.history.location;

		const currentWeekDate = moment(this.props.week.startDate).format('YYYY-MM-DD');

		const currentRotaDate = moment(this.props.rota.startDate).format('YYYY-MM-DD');

		/* By default if no unassigned shifts, show the create shift button */
		let hasUnassignedShifts = false;

		/* However if the current rota/week start date is not in the current week e.g today/this week (not the week that the user is viewing) then disabled the shift button again (we also change the label to reflect the approiate action, although this doesnt really matter TBH as button is disabled) */
		const currentWeekRange = [];

		const startOfCurrentWeek = moment(currentWeekDate);

		const endOfCurrentWeek = moment(currentWeekDate).add(7, 'days');

		currentWeekRange.push(startOfCurrentWeek.format('YYYY-MM-DD'));

		while (startOfCurrentWeek.add(1, 'days').diff(endOfCurrentWeek) < 0) {
			currentWeekRange.push(startOfCurrentWeek.format('YYYY-MM-DD'));
		}

		/* Loop over all shifts and get the unassigned ones */
		let unassignedShifts = this.props.shifts.filter(data => (data.placements === null || data.placements.length === 0));

		/* Filter all unassigned shifts and return those that have not yet pasted. E.g if date was 6th July and an unassigned shifts start date was 5th July, it would not be returned... */
		unassignedShifts = unassignedShifts.filter(data => moment(data.startTime).isSameOrAfter(moment().format('YYYY-MM-DD')));

		/* If we have unassigned shifts, show the assign shift button */
		if (unassignedShifts.length > 0) {
			hasUnassignedShifts = true;
		}

		/* Business rule decided on 3rd August 2018 by CL to always show Create Shift button for beta release/until we get Roles view completed */
		hasUnassignedShifts = false;

		const { status, budget } = this.props.rota;

		this.setState({
			rotaBudget: budget,
			rotaStatus: status,
			hasUnassignedShifts,
			employeesIsActive: (pathname === dashboard.EMPLOYEES.URI),
		});
	};

	handleSwitchRotaType = (event) => {
		const { actions } = this.props;

		const target = event.currentTarget;

		if (this.props.rotaTypes.length > 0) {
			const rotaType = this.props.rotaTypes.find(data => data.rotaTypeId === target.id);

			if (!isEmpty(rotaType)) {
				this.setState(this.getInitialState());

				/* Switch rota type and fetch all rotas for this type, grab latest rota and update current week */
				logMessage('info', 'Called Toolbar handleSwitchRotaType switchRotaType');

				actions.switchRotaType(rotaType).then(() => {
					logMessage('info', 'Called Toolbar handleSwitchRotaType getRotas');

					actions.getRotas(rotaType)
						.then(() => {
							/* We only want to get the rota matching the current week so we have some data by default */
							let rota = this.props.rotas.filter(data => moment(data.startDate).format('YYYY-MM-DD') === moment(this.props.week.startDate).format('YYYY-MM-DD')).shift();

							/* No rotas match the current week so lets use the first rota we find */
							if (isEmpty(rota)) {
								rota = orderBy(this.props.rotas, 'startDate').shift();
							}

							logMessage('info', 'Called Toolbar handleSwitchRotaType switchRota');

							actions.switchRota(rota).then(() => {
								/* Then we use the rotas start date to set the current week start and end dates */
								const firstDayOfWeek = moment(rota.startDate).day();

								const weekStartDate = moment(rota.startDate);

								const weekEndDate = moment(rota.startDate).add(6, 'days');

								let payload = {
									endDate: weekEndDate,
									startDate: weekStartDate,
								};

								/* Set the current week */
								logMessage('info', 'Called Toolbar handleSwitchRotaType switchWeek');

								actions.switchWeek(payload).then(() => {
									/* Get shifts for current rota */
									logMessage('info', 'Called Toolbar handleSwitchRotaType getShifts');

									actions.getShifts(rota)
										.then(() => {
											payload = {
												firstDayOfWeek,
											};

											/* Set the day of week based on start date */
											logMessage('info', 'Called Toolbar handleSwitchRotaType updateSettings');

											actions.updateSettings(payload);

											logMessage('info', 'Called Toolbar handleSwitchRotaType firstDayOfWeek:', firstDayOfWeek);

											moment.updateLocale('en', {
												week: {
													dow: firstDayOfWeek,
													doy: moment.localeData('en').firstDayOfYear(),
												},
											});

											logMessage('info', 'Called Toolbar handleSwitchRotaType getRotaEmployees');

											actions.getRotaEmployees(rota).catch((error) => {
												error.data.title = 'Get Rota Employees';

												this.setState({ error });

												this.handleModal();
											});
										})
										.catch((error) => {
											error.data.title = 'Get Shifts';

											this.setState({ error });

											this.handleModal();
										});
								});
							});
						})
						.catch((error) => {
							error.data.title = 'Get Rotas';

							this.setState({ error });

							this.handleModal();
						});
				});
			}
		}
	};

	handlePublishRota = () => {
		/* Check if the user wants to publish the rota */
		let message = '<div class="text-center"><p>Please confirm that you wish to publish the Rota?</p></div>';

		const options = {
			message,
			labels: {
				cancel: 'Cancel',
				proceed: 'Publish',
			},
			values: {
				cancel: false,
				proceed: true,
			},
			colors: {
				proceed: 'primary',
			},
			enableEscape: false,
			title: 'Publish Rota',
			className: 'modal-dialog',
		};

		/* If the user has clicked the proceed button, we publish the rota */
		/* If the user has clicked the cancel button, we do nothing */
		confirm(options)
			.then((result) => {
				const { rota: { rotaId }, actions } = this.props;

				const payload = {
					rotaId,
				};

				logMessage('info', 'Called Toolbar handleSwitchRota publishRota');

				actions.publishRota(payload)
					.then(() => this.handleGetRota())
					.then(() => this.handleGetRotas())
					.then(() => this.handleGetShifts())
					.then(() => {
						/* FIXME - Make messages constants in config */
						message = '<p>Rota was published!</p>';

						this.handleSuccessNotification(message);
					})
					.catch((error) => {
						error.data.title = 'Publish Rota';

						this.setState({ error });

						this.handleModal();
					});
			}, (result) => {
				/* We do nothing */
			});
	};

	updateRotaStatus = () => {
		if (this.props.rota.status === STATUSES.PUBLISHED) {
			this.props.actions.updateRotaStatus(STATUSES.EDITED).catch(error => Promise.reject(error));
		}
	};

	handleClearRotaShifts = () => {
		/* Check if the user wants to delate all rota shifts */
		let message = '<div class="text-center"><p>Please confirm you want to remove all shifts. This cannot be undone?</p></div>';

		const options = {
			message,
			labels: {
				cancel: 'Cancel',
				proceed: 'Clear Shifts',
			},
			values: {
				cancel: false,
				proceed: true,
			},
			colors: {
				proceed: 'primary',
			},
			enableEscape: false,
			title: 'Clear Rota Shifts',
			className: 'modal-dialog',
		};

		/* If the user has clicked the proceed button, we clear the rota shifts */
		/* If the user has clicked the cancel button, we do nothing */
		confirm(options)
			.then((result) => {
				const { rota: { rotaId }, actions } = this.props;

				const payload = {
					rotaId,
				};

				logMessage('info', 'Called Toolbar handleClearRotaShifts clearRotaShifts');

				actions.clearRotaShifts(payload)
					.then(() => {
						this.updateRotaStatus();
						/* FIXME - Make messages constants in config */
						message = '<p>Rota shifts were deleted!</p>';

						this.handleSuccessNotification(message);
					})
					.catch((error) => {
						error.data.title = 'Clear Rota';

						this.setState({ error });

						this.handleModal();
					});
			}, (result) => {
				/* We do nothing */
			});
	};

	handleDownloadRota = (event, format) => {
		const { rota: { rotaId }, actions } = this.props;

		const rota = {
			rotaId,
		};

		const extension = (format === 'pdf') ? format : 'xls';

		actions.downloadShifts(rota, format)
			.then(response => saveAs(response, `rota-shifts-${moment(this.props.rota.startDate).format('YYYY-MM-DD')}.${extension}`))
			.catch((error) => {
				error.data.title = 'Download Rota';

				this.setState({ error });

				this.handleModal();
			});
	};

	handleCopyShifts = (fromRota, includePlacements) => {
		const { actions, rota, rotaType: { rotaTypeId } } = this.props;

		/* if fromRota does not exist then create one */
		if (!fromRota) {
			this.handleInfoNotification('The rota you selected does not have any shifts. Please select another');
		} else {
			const toRota = rota;

			logMessage('info', 'Called Toolbar handleCopyShifts copyShifts');

			actions.copyShifts(fromRota, toRota, includePlacements)
				.then(() => this.handleSwitchRota(toRota))
				.then(() => this.handleGetRotas())
				.then(() => {
					/* FIXME - bug with setState somewhere when calling history.push(routes.DASHBOARD.ROLES.URI); */
				})
				.catch((error) => {
					error.data.title = 'Copy Shifts';
					this.setState({ error });
					this.handleModal();
				});
		}
	};

	handleCreateRota = () => this.setState({ isCreateRotaModalOpen: !this.state.isCreateRotaModalOpen });

	handleCreateShift = () => this.setState({ isCreateShiftModalOpen: !this.state.isCreateShiftModalOpen });

	handleAssignShift = () => this.setState({ isAssignShiftModalOpen: !this.state.isAssignShiftModalOpen });

	handleEditRotaTooltip = () => this.setState({ isEditRotaTooltipOpen: !this.state.isEditRotaTooltipOpen });

	handleRotaTypeMenu = () => this.setState({ isRotaTypeMenuPopoverOpen: !this.state.isRotaTypeMenuPopoverOpen });

	handleRotaBudgetTooltip = () => this.setState({ isRotaBudgetTooltipOpen: !this.state.isRotaBudgetTooltipOpen });

	handleCreateEmployee = () => this.setState({ isCreateEmployeeModalOpen: !this.state.isCreateEmployeeModalOpen });

	handleSyncKomuUser = () => this.setState({ isShowModalSyncKomuUser: !this.state.isShowModalSyncKomuUser });

	handleSyncEmployeesFromHRM = () => { this.setState({ isShowModalSyncEmployees: !this.state.isShowModalSyncEmployees }); };

	handleAddCheckInRecord = () => {
		this.setState({ isShowModalAddCheckInRecord: !this.state.isShowModalAddCheckInRecord });
	};

	handleInviteEmployee = () => {
		const { actions } = this.props;
		let message = '<p>By clicking "Send Invites" all employees who are not currently users will be invited to create a user account. Employees who sign-up will be able to login and view all rotas that they are members off. <span class="font-weight-bold">Please note:</span> Employees can also view draft rotas.</p>';

		const options = {
			message,
			labels: {
				cancel: 'Cancel',
				proceed: 'Send Invites',
			},
			values: {
				cancel: false,
				proceed: true,
			},
			colors: {
				proceed: 'primary',
			},
			enableEscape: false,
			title: 'Invite all employees',
			className: 'modal-dialog',
		};

		confirm(options)
			.then((result) => {
				logMessage('info', 'Called employee invites');
				actions.sendBulkEmployeeAccessInvites()
					.then(() => {
						message = '<p>Employee invites successfully sent!</p>';

						this.handleSuccessNotification(message);
					}).catch((error) => {
						error.data.title = 'Invite Employee';

						this.setState({ error });

						this.handleModal();
					});
			});
	}

	handleCreateShiftTooltip = () => this.setState({ isCreateShiftTooltipOpen: !this.state.isCreateShiftTooltipOpen });

	handlePublishRotaTooltip = () => this.setState({ isPublishRotaTooltipOpen: !this.state.isPublishRotaTooltipOpen });

	handleEditRota = (event, rotaId) => this.setState({ rotaId, isEditRotaModalOpen: !this.state.isEditRotaModalOpen });

	handleUploadEmployees = () => this.setState({ isUploadEmployeesModalOpen: !this.state.isUploadEmployeesModalOpen });

	handleDownloadRotaTooltip = () => this.setState({ isDownloadRotaTooltipOpen: !this.state.isDownloadRotaTooltipOpen });

	handleCreateEmployeeTooltip = () => this.setState({ isCreateEmployeeTooltipOpen: !this.state.isCreateEmployeeTooltipOpen });

	handleUploadEmployeesTooltip = () => this.setState({ isUploadEmployeesTooltipOpen: !this.state.isUploadEmployeesTooltipOpen });

	handleExistingEmployees = () => this.setState({ isExistingEmployeesModalOpen: !this.state.isExistingEmployeesModalOpen });

	handleDownloadRotaMenu = () => this.setState({ isDownloadRotaTooltipOpen: false, isDownloadRotaMenuPopoverOpen: !this.state.isDownloadRotaMenuPopoverOpen });

	handleCopyFromRotaShifts = (date) => {
		logMessage('info', 'Called Toolbar handleCopyFromRotaShifts');

		// if rota startdate is 0, this indicates sunday, so use the normal 'week' else, use the 'isoweek'
		if (this.props.rotaStartDate === 0) {
			date.day(this.props.rotaStartDate);
		} else {
			date.startOf('isoWeek').day(this.props.rotaStartDate);
		}

		/* Check if the user wants to copy the previous weeks rota shifts into the new rota */
		const message = `<p>Please confirm that you would like to copy all of the shifts from week beginning ${date.format('DD-MM-YYYY')} into this rota (${this.props.week.startDate.format('DD-MM-YYYY')})?</p>`;

		const options = {
			message,
			cancel: {
				label: 'Cancel',
				value: false,
			},
			buttons: [{
				color: 'primary',
				id: 'shiftsOnly',
				value: 'shiftsOnly',
				label: 'Copy Shifts Only',
			}, {
				color: 'secondary',
				id: 'shiftsAndPlacements',
				value: 'shiftsAndPlacements',
				label: 'Copy Shifts and Placements',
			}],
			enableEscape: false,
			title: `Copy ${this.props.rotaType.rotaTypeName} Rota From Week Beginning ${date.format('DD-MM-YYYY')}`,
			className: 'modal-dialog',
		};

		/**
		 * If the user has clicked the primary button, we copy the shifts onlys.
		 * If the user has clicked the secondary button, we copy the shifts and placements.
		 * If the user has clicked the cancel button, we do nothing.
		 */
		complexConfirm(options)
			.then((confirmAction) => {
				/* Find the rota for the previous week */
				const rotaToCopy = this.props.rotas.filter(rota => moment(rota.startDate).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')).shift();

				logMessage('info', 'Called Toolbar handleCopyFromRotaShifts - matching rota:', date);

				const includePlacements = (confirmAction === 'shiftsAndPlacements');

				this.handleCopyShifts(rotaToCopy, includePlacements);
			}, () => { });
	};

	handleCopyFromRotaShiftsTooltip = () => this.setState({ isCopySpecificRotaShiftsTooltipOpen: !this.state.isCopySpecificRotaShiftsTooltipOpen });

	handleSwitchFromAssignShiftToCreateShift = () => this.setState({ isCreateShiftModalOpen: true, isAssignShiftModalOpen: false });

	handleInfoNotification = (message) => {
		if (!toast.isActive(this.toastId)) {
			this.toastId = toast.info(<Notification icon="fa-info-circle" title="Information" message={message} />, {
				autoClose: false,
				closeButton: <CloseButton />,
			});
		}
	};

	handleSuccessNotification = (message) => {
		if (!toast.isActive(this.toastId)) {
			this.toastId = toast.success(<Notification icon="fa-check-circle" title="Success" message={message} />, {
				closeButton: false,
				autoClose: notifications.TIMEOUT,
			});
		}

		/* FIXME - Make messages constants in config */
		/* If the message has come from deleting a rota, we need to redirect back to dashboard to reload all data again */
		if (message === '<p>Rota was deleted!</p>') {
			this.props.history.push(routes.DASHBOARD.HOME.URI);
		}
	};

	handleModal = () => this.setState({ isErrorModalOpen: !this.state.isErrorModalOpen }, () => ((!this.state.isErrorModalOpen) ? this.props.history.push(routes.DASHBOARD.HOME.URI) : null));

	handleToggle = () => this.setState({ isCalenderOpen: !this.state.isCalenderOpen });

	handleChange = (date) => {
		this.handleToggle();
		this.handleCopyFromRotaShifts(date);
	}

	isRotaOverBudget = () => this.props.rota.budget > 0 && this.props.totalRotaCost > this.props.rota.budget;

	render = () => (
		<Fragment>
			{this.props.showRotaBudgets ?
				<Row>
					<Col className={`${(this.isRotaOverBudget()) ? 'bg-light-danger' : 'bg-light-grey'} pt-2 pb-2 pt-sm-2 pb-md-2 text-center text-md-left`} xs="12" sm="12" md="12" lg="12" xl="12">
						<ul className="list-unstyled list-inline m-0 p-0">
							<li className="list-inline-item">Rota Budget: <strong>{this.props.currencySymbol}{this.state.rotaBudget.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></li>
							<li className="list-inline-item">Rota Cost: <strong>{this.props.currencySymbol}{this.props.totalRotaCost}</strong></li>
							{(this.isRotaOverBudget()) ? (<li className="list-inline-item">Extra Cost: <strong className="text-danger">{this.props.currencySymbol}{(this.props.totalRotaCost - this.state.rotaBudget).toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></li>) : null}
						</ul>
					</Col>
				</Row> : null
			}
			<Row className="pt-1 pb-1">
				<Col className="pt-0 pb-0 pt-sm-0 pt-md-3 pb-sm-3" xs="12" sm="12" md="5" lg="3" xl="3">
					{(this.state.employeesIsActive) ? (
						<Fragment>
							{/* <button title="Bulk Invite Employee" data-testid="bulk-invite-employees" id="bulk-invite-employees" className="btn btn-nav btn-secondary col-12 col-sm-auto mb-3 mb-sm-0 mb-md-0 pl-3 pr-3 border-0" onClick={this.handleInviteEmployee}>Invite All Employees</button> */}
							<button className="btn btn-nav btn-secondary col-12 col-sm-auto mb-3 mb-sm-0 mb-md-0 pl-3 pr-3 border-0" onClick={this.handleAddCheckInRecord}>Check-In for employees</button>
						</Fragment>
					) : null}
					<div className="weekPicker">
						<WeekPicker history={this.props.history} />
					</div>
				</Col>
				<Col className="pt-0 pb-0 pt-sm-0 pt-md-3 pb-sm-3 text-center text-md-left" xs="12" sm="12" md="7" lg="5" xl="4"></Col>
				<Col className="pt-0 pb-0 pt-sm-0 pt-md-3 pb-sm-3 text-center text-md-right" xs="12" sm="12" md="5" lg="4" xl="5">
					<div className="d-block d-sm-inline-block d-md-none d-lg-inline-block">
						{(this.state.employeesIsActive) ? (
							<Fragment>
								<button type="button" className={'btn border-0 text-dark pl-3 pr-3 bg-white mr-3'} onClick={this.handleSyncKomuUser}>Sync Komu User</button>
								<button type="button" className={'btn border-0 text-dark pl-3 pr-3 bg-white mr-3'} onClick={this.handleSyncEmployeesFromHRM}>Sync Employees From HRM</button>
								<button title="Create Employee" id="create-employee" className="btn btn-nav btn-secondary col-12 col-sm-auto mb-3 mb-sm-0 mb-md-0 pl-3 pr-3 border-0" onClick={this.handleCreateEmployee}>Create Employee</button>
								{!isTablet &&
									<button title="Upload Employees" id="upload-employees" className="btn btn-nav btn-primary col-12 col-sm-auto pl-3 pr-3 ml-sm-3 mb-3 mb-sm-0 mb-md-0 border-0" onClick={this.handleUploadEmployees}>Upload Employees</button>
								}
							</Fragment>
						) : null}
					</div>
					<ButtonGroup className="d-none d-md-inline-block d-lg-none p-0 m-0">
						{(this.state.employeesIsActive) ? (
							<Fragment>
								<button type="button" title="Create Employee" id="create-employee" className="btn btn-nav btn-secondary border-0 pl-3 pr-3" onClick={this.handleCreateEmployee}>Create Employee</button>
								<Tooltip placement="bottom" isOpen={this.state.isCreateEmployeeTooltipOpen} target="create-employee" toggle={this.handleCreateEmployeeTooltip}>Create Employee</Tooltip>
								<button type="button" title="Upload Employees" id="upload-employees" className="btn btn-nav btn-primary border-0 pl-3 pr-3" onClick={this.handleUploadEmployees}>Upload Employees</button>
								<Tooltip placement="bottom" isOpen={this.state.isUploadEmployeesTooltipOpen} target="upload-employees" toggle={this.handleUploadEmployeesTooltip}>Upload Employees</Tooltip>
							</Fragment>
						) : null}
					</ButtonGroup>
				</Col>
			</Row>
			<Modal title="Create Employee" className="modal-dialog" show={this.state.isCreateEmployeeModalOpen} onClose={this.handleCreateEmployee}>
				<EmployeeForm editMode={false} handleSuccessNotification={this.handleSuccessNotification} handleClose={this.handleCreateEmployee} />
			</Modal>
			<Modal title="Add Existing Employees" className="modal-dialog" show={this.state.isExistingEmployeesModalOpen} onClose={this.handleExistingEmployees}>
				<ExistingEmployeesForm editMode={false} handleSuccessNotification={this.handleSuccessNotification} handleClose={this.handleExistingEmployees} />
			</Modal>
			<Modal title="Upload Employees" className="modal-dialog" show={this.state.isUploadEmployeesModalOpen} onClose={this.handleUploadEmployees}>
				<UploadEmployeesForm handleInfoNotification={this.handleInfoNotification} handleClose={this.handleUploadEmployees} />
			</Modal>
			<Modal title='Sync Komu User' show={this.state.isShowModalSyncKomuUser} onClose={this.handleSyncKomuUser}>
				<SyncKomuUserForm onClose={this.handleSyncKomuUser} />
			</Modal>
			<Modal size="xl" title='Sync Employees From HRM' show={this.state.isShowModalSyncEmployees} onClose={this.handleSyncEmployeesFromHRM}>
				<SyncEmployeeFromHRM/>
			</Modal>
			<Modal title='Employee CheckIn' show={this.state.isShowModalAddCheckInRecord} onClose={this.handleAddCheckInRecord}>
				<EmployeeCheckInForm onClose={this.handleAddCheckInRecord} listEmployeeId={this.props.listEmployeeId} />
			</Modal>
			{(this.state.isCalenderOpen) ? (
				<RotaDatePicker headerText="Select which week to copy a rota from" onChange={this.handleChange} onClickOutside={this.handleToggle} />
			) : null}
			{(this.state.error.data) ? (
				<Modal title={this.state.error.data.title} className="modal-dialog-error" buttonLabel="Close" show={this.state.isErrorModalOpen} onClose={this.handleModal}>
					<div dangerouslySetInnerHTML={{ __html: this.state.error.data.message }} />
				</Modal>
			) : null}
		</Fragment>
	);
}

Toolbar.propTypes = propTypes;

Toolbar.defaultProps = defaultProps;

const mapStateToProps = (state, props) => ({
	week: state.week,
	rotaStartDate: state.settings.firstDayOfWeek,
	startDay: state.rota.startDay,
	rota: state.rota,
	rotas: state.rotas,
	shifts: state.shifts,
	rotaCost: state.rotaCost,
	rotaType: state.rotaType,
	rotaTypes: state.rotaTypes,
	authenticated: state.authenticated,
	currencySymbol: getCurrencySymbol(state),
	canViewRotaCosts: canViewRotaCosts(state, state.rotaType.rotaTypeId),
	isOwnerOrAdmin: isOwnerOrAdmin(state.user),
	showRotaBudgets: canViewRotaCosts(state, state.rotaType.rotaTypeId)
		&& state.route === '/dashboard/rotas',
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		getRota,
		getRotas,
		getShifts,
		copyShifts,
		switchWeek,
		switchRota,
		updateRota,
		deleteRota,
		updateRotaStatus,
		clearRotaShifts,
		publishRota,
		getRotaTypes,
		downloadShifts,
		updateSettings,
		switchRotaType,
		getRotaEmployees,
		sendBulkEmployeeAccessInvites,
		syncEmployeeFromHRM,
	}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
