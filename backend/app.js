const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/products', require('./routes/products'));

app.get('/', (req, res) => {
	res.send('home route working');
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const url = 'mongodb://localhost:27017/products-db';
mongoose.connect(url, { useNewUrlParser: true }, (error) => {
	if (!error) {
		console.log('mongo-db connection working');
	} else {
		console.log('check mongo-db connection');
	}
});
mongoose.Promise = global.Promise;

app.listen(process.env.port || 3000, () => console.log(`server connected on ${port}`));
