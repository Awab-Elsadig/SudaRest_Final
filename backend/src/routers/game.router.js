import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { BAD_REQUEST } from '../constants/httpStatus.js';

import handler from 'express-async-handler';
import { gameModel } from '../models/game.model.js';
import bcrypt from 'bcryptjs';

const router = Router();

router.get(
	'/',
	handler(async (req, res) => {
		const data = await gameModel
			.find({})
			.then(res.send(data))
			.catch((err) => res.status(400).send({ error: err }));
	})
);

router.post(
	'/',
	handler(async (req, res) => {
		const { title, numberPlayed } = req.body;

		try {
			const oneSample = await gameModel.create({ title, numberPlayed });
			res.json(oneSample);
		} catch (error) {
			res.status(400).send({ error: error });
		}
	})
);

export default router;
