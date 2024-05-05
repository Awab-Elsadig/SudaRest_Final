import React from "react";

const Menu = ({ items }) => {
	return (
		<section>
			<h2>Menu</h2>
			<ul>
				{items.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</section>
	);
};

export default Menu;
