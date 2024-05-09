import React, { useEffect, useState } from 'react';
import classes from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import AnimateHeight from 'react-animate-height';

export default function Header() {
	const [navHeight, setNavHeight] = useState('auto');
	const { logout } = useAuth();

	const toggleMenu = () => {
		setNavHeight((prev) => {
			const newHeight = prev == 'auto' ? 0 : 'auto';
			return newHeight;
		});
	};

	return (
		<header className={classes.headerContainer}>
			<Link className={classes.logo} to={'/'}>
				SudaRest
			</Link>

			<div className={classes['burger-menu']} onClick={toggleMenu}>
				<FontAwesomeIcon icon={faBars} className={classes.burger} />
			</div>
			<AnimateHeight
				className={`${classes.nav}`}
				height={navHeight}
				duration={500}
				animateOpacity
			>
				<ul onClick={() => setNavHeight(0)}>
					<li>
						<NavLink to={'/'}>Home</NavLink>
					</li>
					<li>
						<NavLink to={'/restaurants'}>Restaurants</NavLink>
					</li>
					<li>
						<NavLink to={'/cart'}>Cart</NavLink>
					</li>
					{!localStorage.getItem('user') ? (
						<li>
							<NavLink className={classes.login} to={'/login'}>
								Login
							</NavLink>
						</li>
					) : (
						<li className={classes.logout} onClick={logout}>
							Logout
						</li>
					)}
				</ul>
			</AnimateHeight>
		</header>
	);
}
