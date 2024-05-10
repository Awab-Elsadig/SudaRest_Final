import { Router } from 'express';
import { connectToDb, getDb } from '../config/db.config.js';
import { ObjectId } from 'mongodb';

const router = Router();

// Database Connection
// connectToDb((err) => {
// 	if (err) {
// 		isErrorInDB = true;
// 		console.log('There issss an error in the connection');
// 		return;
// 	}
// 	console.log('Database connected successfully!');
// });

// const db = getDb(); // Moved outside of the callback

// router.get('/', (req, res) => {
// 	let restaurants = [];
// 	const current = req.query.current || 0;
// 	const maxNumberOfRestaurants = 3;

// 	db.collection('restaurants')
// 		.find()
// 		.sort({ name: 1 })
// 		.skip(maxNumberOfRestaurants * current)
// 		.limit(maxNumberOfRestaurants)
// 		.forEach((restaurant) => restaurants.push(restaurant))
// 		.then(() => {
// 			res.status(200).send(restaurants);
// 		})
// 		.catch((err) =>
// 			res.status(500).json({ Error: 'Could not get documents because ' + err })
// 		);
// });

// router.get('/:id', (req, res) => {
// 	if (ObjectId.isValid(req.params.id)) {
// 		db.collection('restaurants')
// 			.findOne({ _id: new ObjectId(req.params.id) })
// 			.then((restaurant) => res.status(200).json(restaurant))
// 			.catch((err) => {
// 				res
// 					.status(500)
// 					.json({ Error: 'Could not Get the document because ' + err });
// 			});
// 	} else {
// 		res.status(500).json({ Error: 'Invalid Doc Id' });
// 	}
// });

// router.post('/', (req, res) => {
// 	const restaurants = req.body;

// 	db.collection('restaurants')
// 		.insertMany(restaurants)
// 		.then((result) => res.status(201).json(result))
// 		.catch((err) =>
// 			res
// 				.status(500)
// 				.json({ Error: 'Could Not Add Restaurants because ' + err })
// 		);
// });

// router.delete('/:id', (req, res) => {
// 	if (ObjectId.isValid(req.params.id)) {
// 		db.collection('restaurants')
// 			.deleteOne({ _id: new ObjectId(req.params.id) })
// 			.then((result) => res.status(200).json(result))
// 			.catch((err) => {
// 				res
// 					.status(500)
// 					.json({ Error: 'Could not Delete the document because ' + err });
// 			});
// 	} else {
// 		res.status(500).json({ Error: 'Invalid Doc Id' });
// 	}
// });

// router.patch('/:id', (req, res) => {
// 	const updates = req.body;
// 	if (ObjectId.isValid(req.params.id)) {
// 		db.collection('restaurants')
// 			.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
// 			.then((result) => res.status(200).json(result))
// 			.catch((err) => {
// 				res
// 					.status(500)
// 					.json({ Error: 'Could not Update the document because ' + err });
// 			});
// 	} else {
// 		res.status(500).json({ Error: 'Invalid Doc Id' });
// 	}
// });

router.get('/', (req, res) => {
	res.send({ res: 'This should be the response from restaurants' });
});

export default router;
