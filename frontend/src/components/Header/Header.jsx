// Header.js
import React, { useState } from "react";
import classes from "./Header.module.css";

export default function Header() {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
		console.log("HELLO");
	};

	return (
		<header className={classes.headerContainer}>
			<h1>Restaurant Name</h1>

			<nav className={`${classes.nav} ${isMenuOpen ? "open" : ""}`}>
				<ul>
					<li>Home</li>
					<li>Menu Link</li>
					<li>Contact Link</li>
				</ul>
			</nav>

			<div
				className={`${classes["burger-menu"]} ${isMenuOpen ? "open" : ""}`}
				onClick={toggleMenu}
			>
				MENU
			</div>
		</header>
	);
}
