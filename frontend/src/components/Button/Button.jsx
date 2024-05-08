/* eslint-disable react/prop-types */
import React from "react";
import classes from "./Button.module.css";

export default function Button({
	type = "button",
	text = "Submit",
	backgroundColor = "#e72929",
	color = "white",
	fontSize = "1.3rem",
	width = "12rem",
	height = "3.5rem",
	onClick,
}) {
	return (
		<div className={classes.container}>
			<button
				className={classes.button}
				style={{ color, backgroundColor, fontSize, width, height }}
				type={type}
				onClick={onClick}
			>
				{text}
			</button>
		</div>
	);
}
