import React from 'react';
import classes from './RestaurantDetails.module.css';
import { motion } from 'framer-motion';

export default function RestaurantDetails({ res }) {
	return (
		<motion.div className={classes.container} layout>
			<h2>RestaurantDetails</h2>
			<p>Hello</p>
			<p>Hello</p>
			<p>Hello</p>
			<p>Hello</p>
			<p>Hello</p>
			<p>Hello</p>
		</motion.div>
	);
}
