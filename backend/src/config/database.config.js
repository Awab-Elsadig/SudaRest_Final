import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { ToDoModel } from "../models/todo.model.js";
import bcrypt from "bcryptjs";

const users = [
	{
		name: "Awab",
		email: "elsadigawab@gmail.com",
		password: "325464",
		isAdmin: true,
	},
];

const tasks = [
	{
		task: "Do the dishes",
		done: false,
	},
];

const PASSWORD_HASH_SALT_ROUNDS = 10;

set("strictQuery", true);

export const dbconnect = async () => {
	try {
		connect(process.env.MONGO_URI);
		console.log("Connect Succesfully");
		await seedUsers();
		await seedTasks();
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

async function seedTasks() {
	const taskCount = await ToDoModel.countDocuments();
	if (taskCount > 0) {
		console.log("Task seed is already done!");
		return;
	}

	for (let task of tasks) {
		await ToDoModel.create(task);
	}
	console.log("Tasks seed is done!");
}
