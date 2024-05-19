import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { BAD_REQUEST } from '../constants/httpStatus.js';

import handler from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const router = Router();

router.post(
	'/login',
	handler(async (req, res) => {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			res.send(generateTokenResponse(user));
			return;
		}

		res.status(BAD_REQUEST).send('Username or password is invalid');
	})
);

router.post(
	'/register',
	handler(async (req, res) => {
		const { username, email, password } = req.body;
		const hasedpassword = await bcrypt.hash(password, 10);
		const user = new UserModel({ username, email, password: hasedpassword });

		try {
			const savedUser = await user.save();
			res.status(201).json(savedUser);
		} catch (error) {
			res
				.status(500)
				.json({ error: 'Could not add user', message: error.message });
		}
	})
);

router.patch(
	'/update',
	handler(async (req, res) => {
		const { username, newdata } = req.body;

		try {
			const savedUser = await UserModel.updateOne({ username }, newdata);
			res.status(201).json(savedUser);
		} catch (error) {
			res
				.status(500)
				.json({ error: 'Could not update user', message: error.message });
		}
	})
);

router.delete(
	'/delete',
	handler(async (req, res) => {
		const { username } = req.body;

		try {
			const deletedUser = await UserModel.deleteOne({ username });
			res.status(200).json(deletedUser);
		} catch (error) {
			res
				.status(500)
				.json({ error: 'Could not delete user', message: error.message });
		}
	})
);

const generateTokenResponse = (user) => {
	const token = jwt.sign(
		{
			id: user.id,
			name: user.name,
			email: user.email,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '30d',
		}
	);
	console.log(user);

	return {
		id: user.id,
		email: user.email,
		name: user.name,
		address: user.address,
		isAdmin: user.isAdmin,
		token,
	};
};

export default router;
