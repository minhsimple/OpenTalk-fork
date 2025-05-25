import axios from 'axios';
import jwtDecode from 'jwt-decode';

import formatError from 'helpers/errors';
import log from 'helpers/logging';
import { getState as getLocalStorageState } from 'store/persistedLocalStorageState';
import packageJson from '../../../../package.json';


export const baseURL = () => {
	if (process.env.NODE_ENV === 'uat') {
		return packageJson.config.api.uat;
	} else if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
		return packageJson.config.api.dev;
	}
	return packageJson.config.api.prod;
};

export const appURL = () => {
	if (process.env.NODE_ENV === 'uat') {
		return packageJson.config.app.uat;
	} else if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
		return packageJson.config.app.dev;
	}
	return packageJson.config.app.prod;
};

export const homeURL = () => {
	if (process.env.NODE_ENV === 'uat') {
		return packageJson.config.home.uat;
	} else if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
		return packageJson.config.home.dev;
	}
	return packageJson.config.home.prod;
};

export const imagesURL = () => {
	if (process.env.NODE_ENV === 'uat') {
		return packageJson.config.images.uat;
	} else if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
		return packageJson.config.images.dev;
	}
	return packageJson.config.images.prod;
};

const requestHeaders = () => ({
	'Cache-Control': 'no-cache',
	'Content-Type': 'application/json',
});

/* Cancellable request */
const request = (method, url, expectedStatus = 200, payload = null) => {
	let data = payload;

	/* If we are uploading a file, we need to use FormData() to attach the file and set the correct content type */
	if (typeof data !== 'undefined' && data !== null && typeof data.file !== 'undefined' && data.file !== null) {
		const { file } = data;

		data = new FormData();

		data.append('file', file);
	}

	const headers = requestHeaders();

	if (url.includes('pdf') || url.includes('excel')) {
		headers.Accept = 'application/vnd.ms-excel';
  }
  if (url.includes('import-images')) {
    headers['Content-Type'] = 'multipart/form-data';
  }

	const axiosConfig = {
		url,
		data,
		method,
		headers,
		/* cancelToken: axiosCall.token, */
		validateStatus: status => status === expectedStatus,
		responseType: (url.toLowerCase().includes('pdf') || url.toLowerCase().includes('excel')) ? 'blob' : null,
	};

	const user = getLocalStorageState('user');

	if (user) {
		const { token, accounts } = user;

		if (token) {
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		}

		if (accounts) {
			axios.defaults.headers.common['X-Account-Id'] = accounts[0].id;
		}
	}

	axios.defaults.baseURL = baseURL();

	/* If the response is an array of data, the data array will be wrapped in a data attribute. Confusing I know! */
	return axios.request(axiosConfig)
		.then(response => ((response.data.data) ? response.data.data : response.data))
		.catch((thrown) => {
			console.log(thrown);
			const error = formatError(thrown);
			return Promise.reject(error);
		});
};

/* SERVICE UPDATES */
export const serviceUpdates = payload => request('POST', '/service-updates-sign-up', 200, payload);

/* LOGIN */
export const login = payload => request('POST', '/login', 200, payload);


/* EMPLOYEES */
export const getEmployees = (pageNumber, pageSize) => request('GET', `/employees?page=${pageNumber}&size=${pageSize}`);

export const filterEmployees = (pageNumber, pageSize, check, searchString) => request('GET', `/employees/filter?page=${pageNumber}&size=${pageSize}&isEnable=${check}&employeeName=${searchString}`);

export const getEnableEmployees = () => request('GET', '/employees?check=true');

export const getEmployee = accountEmployeeId => request('GET', `/employees/${accountEmployeeId}`);

export const orderEmployees = payload => request('PUT', `/employees/order?rotaTypeId=${payload.rotaTypeId}`, 200, payload);

export const uploadEmployees = employees => request('POST', '/employees/load', 200, employees);

export const getEmployeeById = employee => request('GET', `/employees/${employee.employeeId}`);

export const createEmployee = employee => request('POST', '/employees', 201, employee);

export const updateEmployee = employee => request('PUT', `/employees/${employee.employeeId}`, 200, employee);

export const deleteEmployee = employee => request('DELETE', `/employees/${employee.employeeId}`, 204);

export const removeEmployeeLabels = removeEmployeeLabelId => request('PUT', `/employees/remove-employee-labels/${removeEmployeeLabelId}`, 200);

export const disableEmployee = employee => request('PUT', `/employees/active-employee/${employee.employeeId}`, 200);

/* ACCOUNTS */
export const getAccounts = () => request('GET', '/accounts');

export const getAccount = account => request('GET', `/accounts/${account.accountId}`);

export const createAccount = account => request('POST', '/accounts', 201, account);

export const updateAccount = account => request('PUT', `/accounts/${account.accountId}`, 200, account);

export const deleteAccount = account => request('DELETE', `/accounts/${account.accountId}`, 204);

/* APPLICATION-ROLES */
export const getApplicationUserRoles = () => request('GET', '/application-user-roles');

 /* EMPLOYEE WORK REMOTE */
 export const createEmployeeWorkRemote = employeeWorkRemote => request('POST', '/employeeworkremotes', 201, employeeWorkRemote);

 export const getEmployeeWorkRemote = () => request('GET', '/employeeworkremotes');

 export const updateEmployeeWorkRemote = employeeWorkRemote => request('PUT', `/employeeworkremotes/${employeeWorkRemote.employeeWorkRemoteId}/update`, 200, employeeWorkRemote);

/* MANAGE USERS */

export const revokeAdminAccess = payload => request('DELETE', `/employees/${payload.accountEmployee.accountEmployeeId}/roles/${payload.applicationUserRoleId}`, 200);

export const sendBulkEmployeeAccessInvites = () => request('POST', '/employee-invites', 200);

export const sendAdminAccessInvite = payload => request('POST', `/employee-invites/${payload.accountEmployee.accountEmployeeId}/admin-invite`, 200);

export const sendEmployeeAccessInvite = accountEmployeeId => request('POST', `/employee-invites/${accountEmployeeId}/employee-invite`, 200);

export const sendRotaManagerAccessInvite = payload => request('POST', `/employee-invites/${payload.accountEmployeeId}/rota-manager-invite?createEmployees=${payload.createEmployees}`, 200, payload.data);

export const updateRotaManagerPermissions = payload => request('PUT', `/employees/${payload.accountEmployeeId}/rota-manager-update?createEmployees=${payload.createEmployees}`, 200, payload.data);

export const revokeAdminAccessInvite = payload => request('DELETE', `/employee-invites/${payload.accountEmployee.accountEmployeeId}`, 200);

export const resendAdminAccessInvite = payload => request('POST', `/employee-invites/${payload.accountEmployee.accountEmployeeId}/resend`, 200);

/* DOWNLOADS */
export const downloadEmployeeUploadTemplate = () => request('GET', '/downloads/employee-upload-template?format=excel');


/* update Account Setting */
export const updateAccountSettings = payload => request('PUT', '/accounts', 200, payload.data);

// update pay for clock event
export const updatePayForClockEvent = payload => request('PUT', '/clocks/update-pay-time', 200, payload);

export const updateAccountProducts = payload => request('PUT', `/accounts/products/${payload.productId}?isEnabled=${payload.isEnabled}`, 200);

export const getAccountProducts = () => request('GET', '/accounts/products', 200);
/* IMAGE_VERIFY */
export const getImageVerify = (name, companyBranch, startProbability, endProbability, startTime, endTime, clockStatus, onlyMe, isRejectAndPendingImages, isFake, pageNumber, pageSize) => request('GET', `/employees/image-verify?name=${name}&companyBranch=${companyBranch}&startProbability=${startProbability}&endProbability=${endProbability}&startTime=${startTime}&endTime=${endTime}
&clockStatus=${clockStatus}&onlyMe=${onlyMe}&isRejectAndPendingImages=${isRejectAndPendingImages}&isFake=${isFake}&page=${pageNumber}&size=${pageSize}&sort=timeVerify,desc`, 200);

/* Image Setup */
export const updateFacialRecoginition = (payload, employeeId) => request('PUT', `/employees/${employeeId}/setup/import-images`, 200, payload);

export const getEmployeeForSetup = employeeName => request('GET', `/employees/punch-clock-app?${employeeName ? `employeeName=${employeeName}` : ''}`, 200);

export const uploadImageForSetUpFacialRecoginition = (playLoad, employeeId) => request('POST', `/employees/${employeeId}/setup/import-images`, 200, playLoad);

export const updateImageVerifiedForEmployee = payload => request('PUT', '/employees/image-verify/update-image', 200, payload);

export const setupImageForMultipleEmployees = payLoad => request('PUT', '/employees/facial-recognition/update-multiple-employees', 200, payLoad);

/* report page */
export const updateImageEmotion = payload => request('PUT', '/employees/image-verify/update-image-emotion', 200, payload);

export const reportFailEmployees = (isDifferent, checkThershold, startDate, endDate, clockStatus, isDate) => request('GET', `/employees/report-fail-employees?isDifferent=${isDifferent}&checkThershold=${checkThershold}&${startDate ? `&startDate=${startDate}` : ''}&${endDate ? `&endDate=${endDate}` : ''}&${clockStatus ? `&clockStatus=${clockStatus}` : ''}&${isDate ? `&isDate=${isDate}` : ''}`, 200);

export const getImageVerifyException = (employeeId, isDifferent, isThershold, startDate, endDate, clockStatus, isDate, pageNumber, pageSize) => request('GET', `/employees/image-verify-exception?employeeId=${employeeId}&isDifferent=${isDifferent}&isThershold=${isThershold}&${startDate ? `&startDate=${startDate}` : ''}&${endDate ? `&endDate=${endDate}` : ''}&${clockStatus ? `&clockStatus=${clockStatus}` : ''}&${isDate ? `&isDate=${isDate}` : ''}&page=${pageNumber}&size=${pageSize}`, 200);

export const exportLogWork = (startDay, endDay, exportType) => request('GET', `/exports/logs-work?startDate=${startDay}&endDate=${endDay}&exportType=${exportType}`, 200);

export const getDayLogsWorkEmployee = (startDay, endDay, payload) => request('GET', `/exports/day-logs/employees?startDate=${startDay}&endDate=${endDay}${payload == null ? '' : `&employeeStatus=${payload}`}`, 200);

export const syncKomuUser = payload => request('POST', '/employees/update-komu-user-info', 200, payload);

export const syncEmployeeFromHRM = () => request('GET', '/employees/sync-employee-from-hrm', 200);

export const updateEmployeeFromHRM = payload => request('PUT', '/employees/sync-employee-from-hrm', 200, payload);

export const addCheckInRecord = payLoad => request('POST', '/employees/add-check-in-record', 200, payLoad);

export const showAllImagesSetupEmployee = employeeId => request('GET', `/images-setup/get-all-for-employee?${employeeId ? `employeeId=${employeeId}` : ''}`, 200);
export const getExceptionEmployee = (startDay, endDay) => request('GET', `/employees/exceptions?startDate=${startDay}&endDate=${endDay}`, 200);

export const loginWithGoogle = accessToken => request('POST', `/punch-clock/oauth2-login?accessToken=${accessToken}`, 200);

// clock devices controller
export const registerCamIp = payLoad => request('POST', '/clock-devices/register-cam-ip', 201, payLoad);

export const clockDevices = filterStatus => request('GET', `/clock-devices/get-clock-devices?status=${filterStatus}`, 200);

export const updateDevice = payLoad => request('PUT', '/clock-devices/update-clock-device', 200, payLoad);

export const updateStatusDevice = payload => request('PUT', '/clock-devices/update-status', 200, payload);

export const getImageVerifyForDevice = deviceId => request('GET', `/employees/image-verify-for-device?${deviceId ? `deviceId=${deviceId}` : ''}`, 200);

// Company Branch
export const getAllCompanyBranch = () => request('GET', '/company-branch/get-all-company-branch', 200);
export const addCompanyBranch = payload => request('POST', '/company-branch/create-company-branch', 201, payload);
export const updateCompanyBranch = payload => request('PUT', '/company-branch/update-company-branch', 201, payload);
export const deleteCompanyBranch = companyBranchId => request('DELETE', `/company-branch/${companyBranchId}`, 204);
export const getListCronjob = () => request('GET', '/config-scheduler', 200);
export const saveCronjob = cronjob => request('POST', '/config-scheduler', 200, cronjob);
export const detectFakeImages = (startDate, endDate) => request('POST', `/fake-detection?startDate=${startDate}&endDate=${endDate}`, 200);

// config
export const getConfig = () => request('GET', '/config', 200);
export const updateConfig = payload => request('PUT', '/config', 200, payload);

export const getSingleConfig = configKey => request('GET', `/config/${configKey}`, 200);
export const updateSingleConfig = payload => request('PUT', '/config/update-single-config', 200, payload);

// filter
export const getAllFilterTypes = () => request('GET', '/filter-type/get-all-filter-type', 200);
export const updateSelectedFilters = payload => request('POST', '/application-user-filter/apply-filters', 200, payload);
