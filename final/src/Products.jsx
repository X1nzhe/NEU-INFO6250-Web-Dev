import Loading from './Loading';
import Product from './Product';
import { SHOW } from './constants';

function Products({
      className = "products",
      isPageLoading,
      products,
      onAddToCart,
      onAddProductsAdmin,
      onDeleteProductAdmin,
      onResetProductsAdmin,
    }) {
	const productsCount = Object.keys(products).length;
	let show;
	if (isPageLoading) {
		show = SHOW.PENDING;
	} else if (!productsCount) {
		show = SHOW.EMPTY;
	} else {
		show = SHOW.CONTENT;
	}


	return (
		<div className="content">
			{show === SHOW.PENDING && <Loading className="products__waiting">Loading Products...</Loading>}
			{show === SHOW.EMPTY &&
				<>
					<p className="products__empty">No product for sell.</p>
					{onAddProductsAdmin &&
						<div className="products__buttons">
							<button
								className="add_products_button"
								onClick={onAddProductsAdmin}
							>Add Products
							</button>
						</div>
					}
				</>
			}
			{show === SHOW.CONTENT && (
				<>
					<ul className={className}>
						{Object.values(products).map(product => (
							<li className="product" key={product.id}>
								<Product
									product={product}
									onAddToCart={onAddToCart}
									onDeleteProductAdmin={onDeleteProductAdmin}
								/>
							</li>
						))}
					</ul>
					<div className="products__buttons">
						{(onAddProductsAdmin && productsCount < 8) &&
							<button
								className="add_products_button"
								onClick={onAddProductsAdmin}
							>Add More Products</button>
						}
						{onResetProductsAdmin &&
							<button
								className="reset_products_button"
								onClick={onResetProductsAdmin}
							>Reset Products</button>
						}
					</div>
				</>
			)}
		</div>
	);
}

export default Products;