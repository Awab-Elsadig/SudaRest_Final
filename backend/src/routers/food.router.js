import { Router } from "express";
import { FoodModel } from "../models/food.model.js";
import handler from "express-async-handler";

const router = Router();

router.get(
	"/",
	handler(async (req, res) => {
		const foods = await FoodModel.find({});
		res.send(foods);
	})
);

router.get(
	"/tags",
	handler(async (req, res) => {
		const foods = await FoodModel.aggregate([
			{
				$unwind: "$tags",
			},
			{
				$group: {
					_id: "tags",
					count: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					name: "$_id",
					count: "$count",
				},
			},
		]).sort({ count: -1 });

		const all = {
			name: "All",
			count: await FoodModel.countDocuments(),
		};

		tags.unshift(all);

		res.send(tags);
	})
);

router.get(
	"/search/:searchTerm",
	handler(async (req, res) => {
		const { searchTerm } = req.params;
		const searchedFoods = foods.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
		);
		res.send(searchedFoods);

		res.send(tags);
	})
);

router.get(
	"/tags/:tag",
	handler(async (req, res) => {
		const { tag } = req.params;
		const chosenFoods = foods.filter((item) => item.tags.includes(tag));
		res.send(chosenFoods);
	})
);

router.get(
	"/:foodId",
	handler(async (req, res) => {
		const { foodId } = req.params;
		const food = foods.find((item) => item.id === foodId);
		res.send(food);
	})
);

export default router;
