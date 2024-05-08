import React, { useState } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const { logout } = useAuth();

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	return (
		<header className={classes.headerContainer}>
			<h1>SudaRest</h1>

			<nav className={`${classes.nav} ${isMenuOpen ? classes.open : ""}`}>
				<ul>
					<li>Home</li>
					<li>Menu Link</li>
					<li>Contact Link</li>
					{!localStorage.getItem("user") ? (
						<Link className={classes.login} to={"/login"}>
							Login
						</Link>
					) : (
						<p className={classes.logout} onClick={logout}>
							Logout
						</p>
					)}
				</ul>
			</nav>

			<div className={classes["burger-menu"]} onClick={toggleMenu}>
				<FontAwesomeIcon icon={faBars} className={classes.burger} />
			</div>
		</header>
	);
}
