import { MongoClient } from "mongodb";

let dbConnection;

export const connectToDb = (cb) => {
	MongoClient.connect(
		"mongodb+srv://Awab_Elsadig:325464@cluster0.ynsiwid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	)
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
