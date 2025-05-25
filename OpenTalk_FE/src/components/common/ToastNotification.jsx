import { toast } from 'react-toastify';
import config from 'appConfig/mainConfig';
import Notification from './Notification';

const notifications = config.APP.NOTIFICATIONS;

export const showSuccessNotification = (message) => {
	toast.success(<Notification icon="fa-check-circle" title="Success" message={message} />, {
		closeButton: false,
		autoClose: notifications.TIMEOUT,
	});
};

export const showErrorNotification = (message) => {
	toast.success(<Notification icon="fa-check-circle" title="Success" message={message} />, {
		closeButton: false,
		autoClose: notifications.TIMEOUT,
	});
};
