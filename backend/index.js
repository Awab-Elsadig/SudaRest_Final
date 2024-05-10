import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import foodRouter from './src/routers/food.router.js';
import userRouter from './src/routers/user.router.js';
import restaurantRouter from './src/routers/restaurant.router.js';

import { dbconnect } from './src/config/database.config.js';
dbconnect();

const app = express();

app.use(express.json());

app.use(
	cors({
		credentials: true,
		origin: ['*'],
	})
);

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/restaurants', restaurantRouter);

app.use('/test', (req, res) => {
	res.send({ msg: 'Hello Awab the app is working I guess !!' });
});

app.use('/', (req, res) => {
	res.send({ msg: 'Hello Awab the app is working !!' });
});

const PORT = 5678 || process.env.PORT;

app.listen(PORT, () =>
	console.log('Listening on port http://localhost:' + PORT)
);
