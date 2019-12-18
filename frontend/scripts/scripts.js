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
		fetch('http://localhost:3000/products')
			.then((result) => {
				return result.json();
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
			tdID: 'tdItem_' + product._id,
			supplierId: 'supplier' + product._id,
			productId: 'product' + product._id,
			priceId: 'price' + product._id
		};
	};
	// from db product collection returned as array and ids set up in function
	const buildTableLayout = (product, ids) => {
		return `
                <div class="table-responsive">
					<table class="table table-striped">	
		<tbody class="text-justify">
		<tr class="list" id="display">
		<td scope="row" id ="${ids.supplierId}">${product.supplier}</td>
		<td scope="row " id ="${ids.productId}">${product.product}</td>
		<td scope="row" id ="${ids.priceId}">${product.price}</td>
		<div class="col">
		<input type="submit" value="Edit Record" name="edit" 
                id="${ids.editId}" class ="btn btn-primary">
                        <input type="submit" name="delete" 
                            value ="Delete Record"  
							id="${ids.deleteId}" class ="btn btn-danger">
		</div>			
		</tr>
		</tbody>
		</table>
		</div>	                          
		`;
	};

	const displayProductList = (data) => {
		data.forEach((product) => {
			let ids = buildIds(product);
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
});
