import { extendMoment } from 'moment-range';
import Moment from 'moment';
import roleData from './data/roles';
import loginData from './data/login';
import weekData from './data/week';
import preWeekData from './data/week-before';
import nextWeekData from './data/week-after';
import updateShift from './data/updateShift';
import weekCostsData from './data/week-costs';
import shiftData from './data/shift';
import rotaTypes from './data/rota-types';
import unavailability from './data/unavailability';
import unavailabilityUpdate from './data/unavailability-update';
import unavailabilityTypes from './data/unavailability-types';
import employees from './data/employees';
import revoke from './data/revoke-admin-access';
import applicationUserRoles from './data/application-user-roles';
import inviteEmployee from './data/invite-employee';
import weekViewData from './data/employee-week-view';
import weekWithNoShifts from './data/week-with-no-shifts';
import rotaEmployees from './data/rotaEmployees';
import tuesdayPreviousWeekData from './data/start-tuesday-previous-week';
import payrollsResponse from './data/payrollsResponse';
import newDatePayrollData from './data/data-payrolls-when-select-date';
import notifications from './data/notifications';
import notificationsSecondPage from './data/notifications-second-page';
import payrollFilterRequireAction from './data/payroll-filter-require-action';
import products from './data/products-list';
import errorDuplicateEmail from './data/error-duplicate-email';
import responseCreateEmployee from './data/response-create-employee';
import newPayrollResponse from './data/new-payrolls-response';

const moment = extendMoment(Moment);

/* use the real login - makes it easier to switch betwee mock/real api */
export const login = payload => new Promise(((resolve, reject) => {
	resolve(loginData);
}));

export const getRoles = () => new Promise(((resolve, reject) => {
	resolve(roleData);
}));

export const createRole = role => new Promise(((resolve, reject) => {
	resolve(role);
}));

export const updateRole = role => new Promise(((resolve, reject) => {
	resolve(role);
}));


const listEmployeeId = [];


export const getEmployees = () => {
	const newListEmployees = listEmployeeId.length > 0 ? employees.filter(el => listEmployeeId.every(item => item !== el.employee.employeeId)) : employees;
	return Promise.resolve(newListEmployees);
};

export const getApplicationUserRoles = () => Promise.resolve(applicationUserRoles);

export const revokeAdminAccess = () => Promise.resolve(revoke);

export const sendBulkEmployeeAccessInvites = () => Promise.resolve();

export const sendEmployeeAccessInvite = () => Promise.resolve(inviteEmployee);

export const createUnavailability = () => Promise.resolve(unavailability);

export const updateUnavailability = () => Promise.resolve(unavailabilityUpdate);

export const getUnavailabilityTypes = () => Promise.resolve(unavailabilityTypes);

export const deleteUnavailability = () => Promise.resolve();

export const deleteEmployee = (employee) => {
	listEmployeeId.push(employee.employeeId);
	return Promise.resolve('');
};

export const disableEmployee = (employee) => {
	listEmployeeId.push(employee.employeeId);
	return Promise.resolve('');
};

export const revokeAdminAccessInvite = (data) => {
	const result = {
		accountAccess: {
			applicationUserRoleInvites: [
				{
					object: 'applicationUserRoleInvite',
					roleName: 'EMPLOYEE',
					status: 'REVOKED',
				},
			],
			applicationUserRoles: [],
		},
		accountEmployeeId: data.accountEmployee.accountEmployeeId,
		employee: data.accountEmployee.employee,
		hourlyRate: data.accountEmployee.hourlyRate,
		object: data.accountEmployee.object,
		rotaTypePermissions: data.accountEmployee.rotaTypePermissions,
		rotaTypes: data.accountEmployee.rotaTypes,
		salary: data.accountEmployee.salary,
		weeklyContractHours: data.accountEmployee.weeklyContractHours,
	};

	return Promise.resolve(result);
};


/* GET SALE */
// export const updateRotaDay = () => Promise.resolve();

export const updateSale = () => Promise.resolve();

export const updatePayForClockEvent = payload => Promise.resolve(newPayrollResponse);

export const getAccountProducts = () => Promise.resolve(products);

export const updateAccountProducts = () => Promise.resolve();
export const createEmployee = payload => new Promise(((resolve, reject) => {
	const isDuplicateEmail = employees.some(employee => employee.employee.email === payload.email);
	if (isDuplicateEmail) {
		return reject(errorDuplicateEmail);
	}
	return resolve(responseCreateEmployee);
}));
