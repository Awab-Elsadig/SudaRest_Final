import React, { useEffect, useState } from 'react';
import classes from './Cart.module.css';
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

export default function Cart() {
	return (
		<motion.div
			className={classes.container}
			variants={containerVariants}
			initial='initial'
			animate='final'
			exit='exit'
		>
			<h2>Cart Page</h2>
		</motion.div>
	);
}
