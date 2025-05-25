import { useState, useEffect } from 'react';

/* comon hook for calling api */
const useApi = (callApi) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [input, setInput] = useState(null);

	useEffect(() => {
		let unmounted = false;
		const cleanup = () => {
			unmounted = true;
		};

		if (!input) {
			return cleanup;
		}

		const fetchData = async () => {
			try {
				setError(null);
				setData(null);
				const response = await callApi(input);
				setData(response);
			} catch (e) {
				setError(e);
			}
		};
		fetchData();
		return cleanup;
	}, [input]);

	return [data, error, setInput];
};

export default useApi;
