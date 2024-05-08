import { MongoClient } from "mongodb";

let dbConnection;

export const connectToDb = (cb) => {
	MongoClient.connect("mongodb://localhost:27017/SudaRest")
		.then((client) => {
			dbConnection = client.db();
			cb();
		})
		.catch((err) => {
			console.log(err);
			cb(err);
		});
};

export const getDb = () => dbConnection;
