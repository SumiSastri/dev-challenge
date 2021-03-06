const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const productsRoute = require('./routes/products');

app.use(cors());
app.use(express.json());
app.use('/products', require('./routes/products'));
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.get('/', (req, res) => {
	res.send('home route working');
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const url = 'mongodb://localhost:27017/products-db';
mongoose.connect(
	url,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	},
	(error) => {
		if (!error) {
			console.log('mongo-db connection working');
		} else {
			console.log('check mongo-db connection');
		}
	}
);
mongoose.Promise = global.Promise;

app.listen(3000, () => console.log(`server connected on ${port}`));
