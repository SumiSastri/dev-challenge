const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
	supplier: {
		type: String,
		required: [ false, 'Supplier field is required' ]
	},
	product: {
		type: String,
		required: [ false, 'Product field is required' ]
	},
	price: {
		type: Number,
		required: [ false, 'Price field is required' ]
	}
});

module.exports = mongoose.model('Product', ProductSchema);
