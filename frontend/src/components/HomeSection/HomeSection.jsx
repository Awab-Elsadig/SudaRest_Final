import React from "react";
import { PropTypes } from "prop-types";
import classes from "./HomeSection.module.css";

export default function HomeSection({ sectionName, sectionImage, onClick }) {
	return (
		<section className={classes.HomeSection} onClick={onClick}>
			<div className={classes.rightImage}>
				<img src={sectionImage} alt="" />
			</div>
			<div className={classes.leftContent}>
				<h3>{sectionName}</h3>
			</div>
		</section>
	);
}

HomeSection.propTypes = {
	sectionName: PropTypes.string,
	sectionImage: PropTypes.string,
	onClick: PropTypes.func,
};
