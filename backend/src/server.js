import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { dbconnect } from "./config/database.config.js";
dbconnect();

const app = express();

app.use(
	cors({
		credentials: true,
		origin: ["http://localhost:1234"],
	})
);

const PORT = 5678;

app.listen(PORT, () =>
	console.log("Listening on port http://localhost:" + PORT)
);
