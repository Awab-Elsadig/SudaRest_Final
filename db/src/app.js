import express from "express";
import RestaurantRouter from "./routes/restaurant.router.js";

const app = express();
const PORT = 5000;

// Routes
app.use("/restaurants", RestaurantRouter);

app.listen(PORT, () => {
	console.log("Listening on port http://localhost:" + PORT);
});
