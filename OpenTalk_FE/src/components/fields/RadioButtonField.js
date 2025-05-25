import React, { useEffect, useRef, useState } from 'react';

const OptionButton = ({ option = {}, handle = () => {}, selected = null }) => (
	<button
		type="button"
		className={`radio-button__option no-focus btn btn-light ${
			selected ? 'current' : ''
		}`}
		onClick={() => handle(option.value)}
		value={option.value}
	>
		{option.label}
	</button>
);

const customBlurEffect = (ref, callback) => {
	const clickHandler = (e) => {
		if (ref && ref.current && !ref.current.contains(e.target)) {
			e.currentTarget = ref.current;
			callback(e);
		} else {
			const { activeElement } = document;
			if (activeElement && activeElement.className.includes('no-focus')) {
				activeElement.blur();
			}
		}
	};
	document.addEventListener('click', clickHandler);
	return () => {
		document.removeEventListener('click', clickHandler);
	};
};

const RadioButtonField = ({
	options,
	label,
	onChange,
	value,
	onBlur,
	toggle,
	...props
}) => {
	const containerRef = useRef();
	const [selected, select] = useState();

	const selectHandle = (val) => {
		if (toggle && val === selected) {
			selectHandle('');
			return;
		}
		select(val);
		onChange(val);
	};

	useEffect(() => {
		if (value !== selected) {
			select(value);
		}
	}, [value]);

	useEffect(customBlurEffect, [containerRef, onBlur]);
	return (
		<div
			className="btn-group w-100 readio-buttons"
			ref={containerRef}
			role="group"
			aria-label={label}
			{...props}
		>
			{(options || []).map(option => (
				<OptionButton
					handle={selectHandle}
					selected={selected === option.value}
					option={option}
					key={option.value}
				/>
			))}
		</div>
	);
};

export default RadioButtonField;
