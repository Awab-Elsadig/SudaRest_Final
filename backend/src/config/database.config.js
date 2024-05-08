import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { FoodModel } from "../models/food.model.js";
import bcrypt from "bcryptjs";

const users = [
	{
		name: "Awab",
		email: "elsadigawab@gmail.com",
		address: "Sidi Gabeer",
		password: "325464",
		isAdmin: true,
	},
];

const food = [
	{
		name: "Pizza",
		price: 22,
		tags: ["Yes", "Great"],
		favorite: true,
		stars: 4,
		imageUrl: "#",
		origins: ["Italy"],
		cookTime: 25,
	},
];

const PASSWORD_HASH_SALT_ROUNDS = 10;

set("strictQuery", true);

export const dbconnect = async () => {
	try {
		connect(process.env.MONGO_URI);
		console.log("Connect Succesfully");
		await seedUsers();
		await seedFood();
	} catch (err) {
		console.log(err);
	}
};

async function seedUsers() {
	const userCount = await UserModel.countDocuments();
	if (userCount > 0) {
		console.log("Users seed is already done!");
		return;
	}

	for (let user of users) {
		user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
		await UserModel.create(user);
	}
	console.log("Users seed is done!");
}

async function seedFood() {
	const foodCount = await FoodModel.countDocuments();
	if (foodCount > 0) {
		console.log("Food seed is already done!");
		return;
	}

	for (let item of food) {
		await FoodModel.create(item);
	}
	console.log("Foods seed is done!");
}
