import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import classes from './Test.module.css';

// Motion Variants
const containerVariants = {
	initial: {
		x: '-100dvw',
	},
	animate: {
		x: 0,
		transition: { type: 'tween' },
	},
	exit: {
		x: '100dvw',
		transition: { type: 'tween' },
	},
};

export default function Test() {
	const [selected, setSelected] = useState();
	const tabs = [
		{
			name: 'Carrot',
			backgroundColor: 'orange',
		},
		{
			name: 'Tomato',
			backgroundColor: 'red',
		},
		{
			name: 'Cucumber',
			backgroundColor: 'green',
		},
	];

	return (
		<motion.div
			className={classes.container}
			variants={containerVariants}
			initial='initial'
			animate='animate'
			exit='exit'
		>
			<motion.div className={classes.box} layout>
				{tabs.map((tab, index) => (
					<motion.span
						className={selected == tab.name ? classes.selected : ''}
						key={index}
						onClick={() => setSelected(tab.name)}
						style={{ backgroundColor: tab.backgroundColor }}
					>
						{tab.name}
						{selected == tab.name && (
							<motion.div
								className={classes.leftBorder}
								layoutId='leftBorder'
							></motion.div>
						)}
					</motion.span>
				))}
			</motion.div>
		</motion.div>
	);
}
