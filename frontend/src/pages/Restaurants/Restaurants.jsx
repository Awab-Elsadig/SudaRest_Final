import React, { useEffect, useState } from 'react';
import classes from './restaurants.module.css';
import axios from 'axios';
import Restaurant from '../../components/Restaurant/Restaurant';
import { motion, AnimatePresence } from 'framer-motion';

// Motion Variants
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

const itemVariants = (index) => ({
	initial: {
		scale: 0,
	},
	animate: {
		scale: 1,
		transition: {
			delay: 0.1 * index,
			bounce: 0.2,
		},
	},
	exit: {
		scale: 0,
		transition: {
			delay: 0.1 * index,
			bounce: 0.2,
		},
	},
});

export default function Restaurants() {
	const [isLoading, setIsLoading] = useState(true);
	const [isSuccessful, setIsSuccessful] = useState(false);
	const [restaurants, setRestaurants] = useState([]);
	const [showedRestaurants, setShowedRestaurants] = useState([]);

	const getRestaurants = async () => {
		try {
			const result = await axios.get('/api/restaurants');
			setRestaurants(result.data);
			setShowedRestaurants(result.data);
			setIsSuccessful(true);
		} catch (err) {
			setIsSuccessful(false);
			console.log('The error is ' + err);
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	};

	useEffect(() => {
		getRestaurants();
	}, []);

	const handleSelectRestaurant = (restaurant) => {
		if (restaurant === null) {
			setShowedRestaurants(restaurants);
		} else {
			setShowedRestaurants([restaurant]);
		}
	};

	return (
		<motion.div
			className={classes.container}
			variants={containerVariants}
			initial='initial'
			animate='final'
			exit='exit'
		>
			{showedRestaurants.length !== 1 && <h2>أطلب من أشهى المطاعم الآن</h2>}
			<motion.div className={classes.restaurantsContainer} layout>
				{showedRestaurants.length === 1 && (
					<motion.button
						key='button'
						className={classes.backButton}
						onClick={() => handleSelectRestaurant(null)}
						variants={itemVariants(1)}
						initial='initial'
						animate='animate'
						exit='exit'
						layout
					>
						العودة
					</motion.button>
				)}
				{isLoading ? (
					<motion.h3 layout key='loading'>
						جاري تحميل المطاعم
					</motion.h3>
				) : !isSuccessful ? (
					<motion.h3 layout key='error'>
						حدث خطأ أثناء جلب البيانات
					</motion.h3>
				) : (
					showedRestaurants.map((res, i) => (
						<motion.div
							key={res.id}
							variants={itemVariants(i)}
							initial='initial'
							animate='animate'
							exit='exit'
							layout
						>
							<Restaurant
								res={res}
								onClick={() => handleSelectRestaurant(res)}
								showDetails={showedRestaurants.length == 1}
							/>
						</motion.div>
					))
				)}
			</motion.div>
		</motion.div>
	);
}
