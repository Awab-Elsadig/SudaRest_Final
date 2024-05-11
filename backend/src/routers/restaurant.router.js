import express from 'express';
import { ObjectId } from 'mongodb';
import handler from 'express-async-handler';
import { RestaurantModel } from '../models/restaurants.model.js';

const router = express.Router();

router.get(
	'/',
	handler(async (req, res) => {
		const current = parseInt(req.query.current, 10) || 0;
		const maxNumberOfRestaurants = 3;

		const restaurants = await RestaurantModel.find({})
			.sort({ totalOrders: 1 })
			.skip(maxNumberOfRestaurants * current)
			.limit(maxNumberOfRestaurants);

		res.status(200).json(restaurants);
	})
);

router.get(
	'/:id',
	handler(async (req, res) => {
		if (ObjectId.isValid(req.params.id)) {
			const restaurant = await RestaurantModel.findById(req.params.id);
			if (restaurant) {
				res.status(200).json(restaurant);
			} else {
				res.status(404).json({ error: 'Restaurant not found' });
			}
		} else {
			res.status(400).json({ error: 'Invalid ID' });
		}
	})
);

router.post(
	'/',
	handler(async (req, res) => {
		const restaurant = new RestaurantModel(req.body);
		try {
			const savedRestaurant = await restaurant.save();
			res.status(201).json(savedRestaurant);
		} catch (err) {
			res
				.status(500)
				.json({ error: 'Could not add restaurant', message: err.message });
		}
	})
);

router.delete(
	'/:id',
	handler(async (req, res) => {
		if (ObjectId.isValid(req.params.id)) {
			const result = await RestaurantModel.deleteOne({ _id: req.params.id });
			if (result.deletedCount === 1) {
				res.status(200).json({ message: 'Restaurant deleted successfully' });
			} else {
				res.status(404).json({ error: 'Restaurant not found' });
			}
		} else {
			res.status(400).json({ error: 'Invalid ID' });
		}
	})
);

router.patch(
	'/:id',
	handler(async (req, res) => {
		if (ObjectId.isValid(req.params.id)) {
			const result = await RestaurantModel.updateOne(
				{ _id: req.params.id },
				{ $set: req.body }
			);
			if (result.matchedCount === 1) {
				res.status(200).json({ message: 'Restaurant updated successfully' });
			} else {
				res.status(404).json({ error: 'Restaurant not found' });
			}
		} else {
			res.status(400).json({ error: 'Invalid ID' });
		}
	})
);

export default router;
