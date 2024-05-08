import React, { useEffect, useState } from 'react'
import classes from './restaurants.module.css'
import axios from 'axios'

export default function Restaurants() {
	const [isLoading, setIsLoading] = useState(false)
	const [restaurants, setRestaurants] = useState([])

	const getRestaurants = async () => {
		await axios
			.get('/api/restaurants')
			.then((result) => setRestaurants(result.data))
			.finally(() =>
				setTimeout(() => {
					setIsLoading(false)
				}, 1000)
			)
	}

	useEffect(() => {
		setIsLoading(true)
		getRestaurants()
	}, [])

	return (
		<div className={classes.container}>
			<h2>المطاعم</h2>
			<div className={classes.restaurantsContainer}>
				{isLoading ? (
					<p>Loading Restaurants...</p>
				) : (
					restaurants.map((res) => (
						<div
							key={res._id}
							className={`${classes.restaurant} ${res.name}_Restaurant`}
						>
							<h3 className={classes.title}>{res.name}</h3>
						</div>
					))
				)}
			</div>
		</div>
	)
}
