/* eslint-disable react/prop-types */
import React from 'react';
import classes from './Input.module.css';

function Input(
	{ label, type, defaultValue, onChange, onBlur, name, error, bgColor, color },
	ref
) {
	const getErrorMessage = () => {
		if (!error) return;
		if (error.message) return error.message;

		switch (error.type) {
			case 'required':
				return 'This field is required';
			case 'minLength':
				return 'Field is Too Short';
			default:
				return '*';
		}
	};
	return (
		<div className={classes.container}>
			<label className={classes.label}>{label}</label>
			<input
				className={classes.input}
				type={type}
				defaultValue={defaultValue}
				onChange={onChange}
				onBlur={onBlur}
				name={name}
				ref={ref}
				placeholder={label}
				style={{ backgroundColor: bgColor, color: color }}
			/>
			{error && <div className={classes.error}>{getErrorMessage()}</div>}
		</div>
	);
}

export default React.forwardRef(Input);
