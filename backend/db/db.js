// ALTERNATIVE SET UP CONNECTION FOR DB - NOT WORKING CHECK LATER
// const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectId;
// const dbname = 'products-db';
// const url = 'mongodb://localhost:27017/products-db';
// const mongoose = require('mongoose');
// const mongoOptions = {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true
// };

// const state = {
// 	db: null
// };

// const connect = (callback) => {
// 	if (state.db) callback();
// 	else {
// 		MongoClient.connect(url, mongoOptions, (error, client) => {
// 			if (error) {
// 				// console.log('mongo-db connection working');
// 				callback(error);
// 			} else {
// 				// console.log('check mongo-db connection');
// 				state.db = client.db(dbname);
// 				callback();
// 			}
// 		});
// 	}
// };

// const getPrimaryKey = (_id) => {
// 	return ObjectId(_id);
// };

// const getDb = () => {
// 	return state.db;
// };

// module.exports = { getDb, connect, getPrimaryKey };

// IMPORT INTO EXPRESS APP - NOT WORKING

// const db = require('backend/db/db.js');
// const collection = 'products';

// db.connect((error) => {
// 	if (error) {
// 		console.log('check db connection');
// 		process.exit(1);
// 	} else {
// 		app.listen(3000, () => console.log(`server connected on ${port}`));
// 	}
// });
