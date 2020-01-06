$(() => {
	console.log('jquery working');
	const h1 = $('h1');
	h1.css('color', 'blue');
	const h3 = $('h3');
	h3.css('color', 'green');
	const form = $('#form-create-records');
	const display = $('#display');
	const supplierInput = $('#supplier-input');
	const productInput = $('#product-input');
	const priceInput = $('#price-input');
	// let supplierUpdate = supplierInput.val();
	// let productUpdate = productInput.val();
	// let priceUpdate = priceInput.val();

	const getProductData = () => {
		fetch('http://localhost:3000/products', {
			method: 'GET'
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				displayProductList(data);
			});
	};
	getProductData();

	// from product collection-document-resource in db
	const buildIds = (product) => {
		return {
			editId: 'edit_' + product._id,
			deleteId: 'delete_' + product._id,
			tdId: 'tdItem_' + product._id,
			supplierId: 'supplier' + product._id,
			productId: 'product' + product._id,
			priceId: 'price' + product._id
		};
	};

	// from db product collection returned as array and ids set up in function
	const buildTableLayout = (product, ids) => {
		return `
				<div class="table-responsive">
					<table class="table">
					<th>
					<td scope="row" class="col-md-3 text-left">Supplier</td>
					<td scope="row" class="col-md-3 text-left">Product</td>
					<td scope="row" class="col-md-3 text-left">Price</td>
					</th>	
					<tbody class="table text-justify table-responsive">
		<td scope="row id"${ids.tdId}"></td>
		<td scope="row" id ="${ids.supplierId}">${product.supplier}</td>
		<td scope="row " id ="${ids.productId}">${product.product}</td>
		<td scope="row" id ="${ids.priceId}">${product.price}</td>
		<td class="table table-responsive col-md-3">
		<button type="button" name="edit" id="${ids.editId}" class ="btn btn-primary">Edit</button>
		<button type="button" name="delete" id="${ids.deleteId}" class ="btn btn-danger">Delete</button>
		</td>
				
		</tr>
		</tbody>
		</table>
		</div>	                          
		`;
	};

	const displayProductList = (data) => {
		data.forEach((product) => {
			let ids = buildIds(product);
			// console.log(ids);
			display.append(buildTableLayout(product, ids));
		});
	};

	$('#search').keyup(function() {
		search_table($(this).val());
	});
	function search_table(value) {
		$('#display tr').each(function() {
			let found = 'false';
			$(this).each(function() {
				if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
					found = 'true';
				}
			});
			if (found == 'true') {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	}

	// FRONT END POST, submit button working data sent to server body not saved - returning empty body
	// working on postman - check

	form.submit((e) => {
		e.preventDefault();
		console.log('supplier input:', supplierInput.val());
		fetch(`http://localhost:3000/products`, {
			method: 'post',
			mode: 'cors',
			body: JSON.stringify({
				supplier: supplierInput.val(),
				product: productInput.val(),
				price: priceInput.val()
			}),
			headers: {
				'Content-type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('data response', typeof data);
				if (data.res.ok) {
					let ids = buildIds(data.savedProduct);
					display.append(buildTableLayout(data.savedProduct, ids));
				} else {
					console.log('something went wrong');
				}
			});
	});
});
