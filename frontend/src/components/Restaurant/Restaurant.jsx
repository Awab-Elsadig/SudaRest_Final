import React from 'react';
import classes from './Restaurant.module.css';
import { AnimatePresence, delay, motion } from 'framer-motion';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails';

export default function Restaurant({ res, onClick, showDetails }) {
	return (
		<div className={classes.restaurant} onClick={onClick}>
			<div className={classes.top}>
				<div className={classes.right}>
					<h3 className={classes.restaurantTitle}>{res.name}</h3>
					<p className={classes.restaurantCategories}>
						{res.categories.join('، ')}
					</p>
					<p className={classes.totalOrders}>الطلبات: {res.totalOrders}</p>
				</div>
				<div className={classes.left}>
					<img src='https://fakeimg.pl/400x400/8b8b8b/fff?text=Logo' alt='' />
				</div>
			</div>
			{showDetails && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1, transition: { bounce: 0.4 } }}
					exit={{ scale: 0 }}
				>
					<RestaurantDetails res={res} />
				</motion.div>
			)}
		</div>
	);
}
