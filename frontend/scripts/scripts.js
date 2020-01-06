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

	const deleteRecord = (product, tdId, deleteId) => {
		let deleteButton = $(`#${deleteId}`);
		deleteButton.click(() => {
			console.log('delete button working');
			fetch(`http://localhost:3000/products/${product._id}`, {
				method: 'DELETE'
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					if (data) {
						$(`#${tdId}`).remove();
					}
				});
		});
	};

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

	const buildTableLayout = (product, ids) => {
		return `
		<tr class="tr-group-item">
		<th class="row">
		<td id="${ids.tdId}"></td>
		<td class=" col-md-4 text-left" id ="${ids.supplierId}">${product.supplier}</td>
		<td class="col-md-4 text-left" id ="${ids.productId}">${product.product}</td>
		<td class="col-md-4 text-left" id ="${ids.priceId}">${product.price}</td>
		<td class="col-md-4">
		<button type="button" name="edit" id="${ids.editId}" class ="btn btn-primary">Edit</button>
		<button type="button" name="delete" id="${ids.deleteId}" class ="btn btn-danger">Delete</button>
		</td>
		</th>		
		</tr>             
		`;
	};
	// bootstrap - tr row - td cell

	const displayProductList = (data) => {
		data.forEach((product) => {
			let ids = buildIds(product);
			// console.log(ids);
			display.append(buildTableLayout(product, ids));
			deleteRecord(product, ids.tdId, ids.deleteId);
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
				if (data) {
					let ids = buildIds(data.savedProduct);
					display.append(buildTableLayout(data.savedProduct, ids));
					// updateRecord(data.savedProduct, ids.tdId, ids.editId);
					// deleteRecord(data.savedProduct, ids.tdId, ids.deleteId);
				} else {
					console.log('something went wrong');
				}
			});
	});
});
