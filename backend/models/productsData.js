const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
	supplier: {
		type: String,
		required: [ true, 'Supplier field is required' ]
	},
	product: {
		type: String,
		required: [ true, 'Product field is required' ]
	},
	price: {
		type: Number,
		required: [ true, 'Price field is required' ]
	}
});

module.exports = mongoose.model('Product', ProductSchema);
