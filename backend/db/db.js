const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const dbname = 'products-db';
const url = 'mongodb://localhost:27017/products-db';
const mongoose = require('mongoose');

const state = {};

mongoose.connect(url, { useNewUrlParser: true }, (error) => {
	if (!error) {
		console.log('mongo-db connection working');
	} else {
		console.log('check mongo-db connection');
	}
});
mongoose.Promise = global.Promise;

const getPrimaryKey = (_id) => {
	return ObjectId(_id);
};

const getDb = () => {
	return state.db;
};

module.exports = { getDb, connect, getPrimaryKey };
