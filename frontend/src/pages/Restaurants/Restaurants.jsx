import React, { useEffect, useState } from 'react';
import classes from './restaurants.module.css';
import axios from 'axios';
import Restaurant from '../../components/Restaurant/Restaurant';
import { motion } from 'framer-motion';

const containerVariants = {
	initial: {
		x: '-100dvw',
	},
	final: {
		x: 0,
		transition: { type: 'tween' },
	},
	exit: {
		x: '100dvw',
		transition: { type: 'tween' },
	},
};

export default function Restaurants() {
	const [isLoading, setIsLoading] = useState(false);
	const [restaurants, setRestaurants] = useState([]);
	const [isSuccessful, setIsSuccessful] = useState(false);
	const [selectedRestaurant, setSelectedRestaurant] = useState(null);

	const getRestaurants = async () => {
		await axios
			.get('/api/restaurants')
			.then((result) => {
				setRestaurants(result.data);
				setIsSuccessful(true);
			})
			.finally(() =>
				setTimeout(() => {
					setIsLoading(false);
				}, 1000)
			)
			.catch((err) => {
				setIsSuccessful(false);
				console.log('The error is ' + err);
			});
	};

	const handleRestaurantClick = (res) => {
		setSelectedRestaurant((prev) => (prev == res ? '' : res));
	};

	useEffect(() => {
		setIsLoading(true);
		getRestaurants();
	}, []);

	return (
		<motion.div
			className={classes.container}
			variants={containerVariants}
			initial='initial'
			animate='final'
			exit='exit'
		>
			<h2>أطلب من أشهى المطاعم الآن !!</h2>
			<div className={classes.restaurantsContainer}>
				{isLoading ? (
					<h4>جاري تحميل المطاعم...</h4>
				) : isSuccessful ? (
					restaurants.map((res) => (
						<Restaurant
							key={res.id}
							res={res}
							onClick={() => handleRestaurantClick(res)}
							className={
								selectedRestaurant && selectedRestaurant.id == res.id
									? classes.selected
									: classes.restaurant
							}
						/>
					))
				) : (
					<h4>حدث خطأ اثناء تحميل البيانات :(</h4>
				)}
			</div>
		</motion.div>
	);
}
