/* eslint-disable react/prop-types */
import React from "react";
import classes from "./InputContainer.module.css";

export default function InputContainer({ label, bgColor, children }) {
	return (
		<div className={classes.container} style={{ backgroundColor: bgColor }}>
			<label className={classes.label}>{label}</label>
			<div className={classes.content}>{children}</div>
		</div>
	);
}
