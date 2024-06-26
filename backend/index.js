import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import sampleRouter from './src/routers/game.router.js';
import userRouter from './src/routers/user.router.js';
import restaurantRouter from './src/routers/restaurant.router.js';
import { connect } from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/restaurants', restaurantRouter);
app.use('/api/users', userRouter);
app.use('/api/games', sampleRouter);

const PORT = process.env.PORT || 5678;

try {
	connect(process.env.MONGO_URI);
	console.log('Connected to DB Succesfully');

	app.listen(PORT, () =>
		console.log('Listening on port http://localhost:' + PORT)
	);
} catch (err) {
	console.log(err);
}
