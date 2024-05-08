import { Router } from "express";
import { connectToDb, getDb } from "../db.js";

const router = Router();

// Database Connection

let db;
connectToDb((err) => {
	if (err) {
		isErrorInDB = true;
		console.log("There issss and errror in the connections");
	}
	db = getDb();
});

router.get("/", (req, res) => {
	let restaurants = [];

	db.collection("restaurants")
		.find()
		.sort({ name: 1 })
		.forEach((restaurant) => restaurants.push(restaurant))
		.then(() => {
			res.status(200).send(restaurants);
		})
		.catch((err) =>
			res.status(500).json({ Error: "Error because of thes" + err })
		);
});

export default router;
