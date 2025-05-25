const getEndTimeDisplay = (isClosingShift, isEmployee, endTime) => {
	if (isClosingShift) {
		if (isEmployee) {
			return 'Close';
		}
		return `${endTime} (CL)`;
	}
	return endTime;
};

export default getEndTimeDisplay;
