import { Router } from "express";
import { connectToDb, getDb } from "../db.js";
import { ObjectId } from "mongodb";

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
			res.status(500).json({ Error: "Could not get documents because " + err })
		);
});

router.get("/:id", (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		db.collection("restaurants")
			.findOne({ _id: new ObjectId(req.params.id) })
			.then((restaurant) => res.status(200).json(restaurant))
			.catch((err) => {
				res
					.status(500)
					.json({ Error: "Could not Get the document because " + err });
			});
	} else {
		res.status(500).json({ Error: "Unvalid Doc Id" });
	}
});

router.post("/", (req, res) => {
	const restaurant = req.body;

	db.collection("restaurants")
		.insertOne(restaurant)
		.then((result) => res.status(201).json(result))
		.catch((err) =>
			res.status(500).json({ Error: "Could Not Add Restaurant because " + err })
		);
});

router.delete("/:id", (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		db.collection("restaurants")
			.deleteOne({ _id: new ObjectId(req.params.id) })
			.then((result) => res.status(200).json(result))
			.catch((err) => {
				res
					.status(500)
					.json({ Error: "Could not Delete the document because " + err });
			});
	} else {
		res.status(500).json({ Error: "Unvalid Doc Id" });
	}
});

router.patch("/:id", (req, res) => {
	const updates = req.body;
	if (ObjectId.isValid(req.params.id)) {
		db.collection("restaurants")
			.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
			.then((result) => res.status(200).json(result))
			.catch((err) => {
				res
					.status(500)
					.json({ Error: "Could not Update the document because " + err });
			});
	} else {
		res.status(500).json({ Error: "Unvalid Doc Id" });
	}
});

export default router;
