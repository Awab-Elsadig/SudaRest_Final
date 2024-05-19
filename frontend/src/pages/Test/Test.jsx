import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Test.module.css';

// Motion Variants
const containerVariants = {
	initial: {
		// x: '-100dvw',
		scale: 0,
		originY: -1,
	},
	final: {
		scale: 1,
		transition: { type: 'tween', duration: 1 },
	},
	exit: {
		x: '100dvw',
		transition: { type: 'tween' },
	},
};

const itemVariants = {
	hidden: {
		opacity: 0,
		scale: 0.8,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
	exit: {
		opacity: 0,
		scale: 0,
	},
};

export default function Test() {
	const [count, setCount] = useState(0);
	const names = ['First', 'Second', 'Third'];

	const handleIncrement = () => {
		if (count < 3) {
			setCount(count + 1);
		}
	};

	const handleDecrement = () => {
		if (count > 0) {
			setCount(count - 1);
		}
	};

	return (
		<motion.div
			className={classes.container}
			variants={containerVariants}
			initial='initial'
			animate='final'
			exit='exit'
			layout
		>
			<p>{count}</p>
			<AnimatePresence mode='sync'>
				{names.slice(0, count).map((name, i) => (
					<motion.div
						key={i}
						className={classes.box}
						variants={itemVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						layout
						transition={{ duration: 0.3 }}
					>
						{name}
					</motion.div>
				))}
			</AnimatePresence>
			<button onClick={handleIncrement}>Add 1</button>
			<button onClick={handleDecrement}>Subtract 1</button>
		</motion.div>
	);
}
