import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import classes from './Header.module.css';

export default function Header() {
	const [navHeight, setNavHeight] = useState(0);
	const { logout } = useAuth();
	const location = useLocation();

	const toggleMenu = () => {
		setNavHeight((prev) => (prev === 'auto' ? 0 : 'auto'));
	};

	const handleNavLinkClick = (path, event) => {
		if (location.pathname === path) {
			event.preventDefault();
		}
		setTimeout(() => {
			setNavHeight(0);
		}, 300);
	};

	const menuVariants = {
		open: {
			height: 'auto',
			transition: { duration: 0.2 },
		},
		closed: {
			height: 0,
			transition: { duration: 0.2 },
		},
	};

	return (
		<header className={classes.headerContainer}>
			<Link
				className={classes.logo}
				to={'/'}
				onClick={(event) => handleNavLinkClick('/', event)}
			>
				SudaRest
			</Link>

			<div className={classes.nav}>
				<ul>
					<NavLink to={'/'} onClick={(event) => handleNavLinkClick('/', event)}>
						<li>Home</li>
					</NavLink>
					<NavLink
						to={'/restaurants'}
						onClick={(event) => handleNavLinkClick('/restaurants', event)}
					>
						<li>Restaurants</li>
					</NavLink>
					<NavLink
						to={'/cart'}
						onClick={(event) => handleNavLinkClick('/cart', event)}
					>
						<li>Cart</li>
					</NavLink>
					<NavLink
						to={'/profile'}
						onClick={(event) => handleNavLinkClick('/profile', event)}
					>
						<li className={classes.login}>Profile</li>
					</NavLink>
					<NavLink
						to={'/test'}
						onClick={(event) => handleNavLinkClick('/test', event)}
					>
						<li>Test</li>
					</NavLink>
				</ul>
			</div>

			<div className={classes['burger-menu']} onClick={toggleMenu}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className={`${classes.burger} w-6 h-6`}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
					/>
				</svg>
			</div>
			<motion.div
				className={classes.menuNav}
				variants={menuVariants}
				initial='closed'
				animate={navHeight === 'auto' ? 'open' : 'closed'}
			>
				<ul>
					<NavLink to={'/'} onClick={(event) => handleNavLinkClick('/', event)}>
						<motion.li>Home</motion.li>
					</NavLink>
					<NavLink
						to={'/restaurants'}
						onClick={(event) => handleNavLinkClick('/restaurants', event)}
					>
						<motion.li>Restaurants</motion.li>
					</NavLink>
					<NavLink
						to={'/cart'}
						onClick={(event) => handleNavLinkClick('/cart', event)}
					>
						<motion.li>Cart</motion.li>
					</NavLink>
					<NavLink
						to={'/profile'}
						onClick={(event) => handleNavLinkClick('/profile', event)}
					>
						<motion.li className={classes.register}>Profile</motion.li>
					</NavLink>
					<NavLink
						to={'/test'}
						onClick={(event) => handleNavLinkClick('/test', event)}
					>
						<motion.li>Test</motion.li>
					</NavLink>
				</ul>
			</motion.div>
		</header>
	);
}
