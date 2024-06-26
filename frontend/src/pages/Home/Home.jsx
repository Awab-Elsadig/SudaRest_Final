import React, { useEffect, useState } from 'react';
import HomeSection from '../../components/HomeSection/HomeSection';
import classes from './Home.module.css';
import { useNavigate } from 'react-router-dom';
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

export default function Home() {
	const [activeSection, setActiveSection] = useState();
	const navigate = useNavigate();

	const handleClick = async (section) => {
		navigate(`/${section}`);

		console.log(`Clicked: ${section}`);
		setActiveSection(section);
	};

	useEffect(() => {
		console.log('Active Section: ' + activeSection);
	}, [activeSection]);

	return (
		<motion.div
			className={classes.container}
			variants={containerVariants}
			initial='initial'
			animate='final'
			exit='exit'
		>
			<h3 className={classes.HomeHeading}>
				اكتشف قائمتنا اللذيذة واستمتع بتجربة طعام رائعة.
			</h3>
			<HomeSection
				sectionName={'المطاعم'}
				sectionImage={
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4x1GEO8_ojCrTMDRBGMU4R8qdOIpUpqGwug&usqp=CAU'
				}
				onClick={() => handleClick('restaurants')}
			/>
			<HomeSection
				sectionName={'المنتجات'}
				sectionImage={
					'https://www.seriouseats.com/thmb/-osPdxHxCxTuA6UL7ABekRdjkSo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__12__20201203-indonesian-pantry-vicky-wasik-1-b827da1c26134cf18153da281f8efb19.jpg'
				}
				onClick={() => handleClick('products')}
			/>
			{activeSection === 'products' && <div>Content for Products Section</div>}
		</motion.div>
	);
}
