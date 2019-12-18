const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/productsData.js');

// get collection of products from products-db
router.get('/', async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.json({ message: err });
	}
});

// add new products to db
router.post('/', async (req, res) => {
	// console.log(req.body);
	const product = new Product({
		supplier: req.body.supplier,
		product: req.body.product,
		price: req.body.price
	});
	try {
		const savedProduct = await product.save();
		res.status(200).json(savedProduct);
	} catch (err) {
		res.status(422).json({ message: err });
	}
});

// need to find the exact document to delete
router.delete('/:id', (req, res, next) => {
	Product.findByIdAndRemove({ _id: req.params.id }).then(function(product) {
		res.send(product);
	});
});
// identify resource by id, get the body of resource, find the corresponding resource in DB by id,
// send request body to server to update db collection by exact id

router.put('/:id', (req, res, next) => {
	Product.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true
	}).then(function(product) {
		res.send(product);
	});
});

module.exports = router;
