import express from 'express';
import { connectToDb, getDb } from '../config/db.config.js';
import { ObjectId } from 'mongodb';
import handler from 'express-async-handler';

const router = express.Router();

let db;
connectToDb((err) => {
	if (err) {
		console.log('There is an error in the connection:', err);
		return;
	}
	console.log('Database connected successfully!');
	db = getDb();
});

router.get(
	'/',
	handler(async (req, res) => {
		const current = parseInt(req.query.current, 10) || 0;
		const maxNumberOfRestaurants = 3;

		db.collection('restaurants')
			.find()
			.sort({ name: 1 })
			.skip(maxNumberOfRestaurants * current)
			.limit(maxNumberOfRestaurants)
			.toArray()
			.then((restaurants) => {
				res.status(200).json(restaurants);
			})
			.catch((err) => {
				res
					.status(500)
					.json({ error: 'Could not get documents', message: err.message });
			});
	})
);

router.get(
	'/:id',
	handler(async (req, res) => {
		if (ObjectId.isValid(req.params.id)) {
			db.collection('restaurants')
				.findOne({ _id: new ObjectId(req.params.id) })
				.then((restaurant) => {
					if (restaurant) {
						res.status(200).json(restaurant);
					} else {
						res.status(404).json({ error: 'Restaurant not found' });
					}
				})
				.catch((err) => {
					res.status(500).json({
						error: 'Could not get the document',
						message: err.message,
					});
				});
		} else {
			res.status(400).json({ error: 'Invalid ID' });
		}
	})
);

router.post(
	'/',
	handler(async (req, res) => {
		const restaurants = req.body;

		db.collection('restaurants')
			.insertMany(restaurants)
			.then((result) => {
				res.status(201).json(result.ops);
			})
			.catch((err) => {
				res
					.status(500)
					.json({ error: 'Could not add restaurants', message: err.message });
			});
	})
);

router.delete(
	'/:id',
	handler(async (req, res) => {
		if (ObjectId.isValid(req.params.id)) {
			db.collection('restaurants')
				.deleteOne({ _id: new ObjectId(req.params.id) })
				.then((result) => {
					if (result.deletedCount === 1) {
						res
							.status(200)
							.json({ message: 'Restaurant deleted successfully' });
					} else {
						res.status(404).json({ error: 'Restaurant not found' });
					}
				})
				.catch((err) => {
					res.status(500).json({
						error: 'Could not delete the document',
						message: err.message,
					});
				});
		} else {
			res.status(400).json({ error: 'Invalid ID' });
		}
	})
);

router.patch(
	'/:id',
	handler(async (req, res) => {
		const updates = req.body;
		if (ObjectId.isValid(req.params.id)) {
			db.collection('restaurants')
				.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
				.then((result) => {
					if (result.matchedCount === 1) {
						res
							.status(200)
							.json({ message: 'Restaurant updated successfully' });
					} else {
						res.status(404).json({ error: 'Restaurant not found' });
					}
				})
				.catch((err) => {
					res.status(500).json({
						error: 'Could not update the document',
						message: err.message,
					});
				});
		} else {
			res.status(400).json({ error: 'Invalid ID' });
		}
	})
);

export default router;
