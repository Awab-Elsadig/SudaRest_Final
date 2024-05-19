import React from 'react';
import classes from './Restaurant.module.css';

export default function Restaurant({ res, className, onClick }) {
	return (
		<div
			className={`${classes.restaurant} ${res.name}_Restaurant ${className}`}
			onClick={onClick}
		>
			<div className={classes.right}>
				<h3 className={classes.restaurantTitle}>{res.name}</h3>
				<p className={classes.restaurantCategories}>
					{res.categories.reduce(
						(current, prev) => (current = `${current}، ${prev}`)
					)}
				</p>
				<p className={classes.totalOrders}>الطلبات: {res.totalOrders}</p>
			</div>
			<div className={classes.left}>
				<img src='https://fakeimg.pl/400x400/8b8b8b/fff?text=Logo' alt='' />
			</div>
		</div>
	);
}
