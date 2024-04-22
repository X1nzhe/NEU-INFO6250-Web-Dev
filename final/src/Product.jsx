import { getImageUrl } from './utils';

function Product({product, onAddToCart, onDeleteProductAdmin, onChangeQuantity, onDeleteFromCart}) {

    return (
        <>
            <div className="product__image">
                <img src={getImageUrl(product.image)} alt={product.title + '_image'}/>
            </div>
            <div className="product__info">
                <h3 className="product__title">{product.title}</h3>
                <p className="product__price">${product.price}</p>
                {product.inventory === 0
                    ? <p className="product__out_of_stock">Out of Stock</p>
                    : product.inventory < 4
                        ? <p className="product__low_stock">Almost Sold Out!</p>
                        :
                        <p className="product__in_stock">In Stock</p>
                }
                {onDeleteProductAdmin &&
                    <p className="product__inventory">
                        Inventory Count: {product.inventory}
                    </p>
                }
                {product.inventory
                    ? <>
                        {onAddToCart && (
                            <button
                                data-id={product.id}
                                className="product__add_to_cart"
                                onClick={(e) => {
                                    const id = e.target.dataset.id;
                                    onAddToCart(id);
                                }}>Add to Cart
                            </button>
                        )}
                    </>
                    : <>
                        {onAddToCart && <button className="product__back_soon">Back Soon</button>}
                    </>
                }
                {onChangeQuantity && (
                    <>
                        <p className="product__quantity">
                            Quantity:
                            <input
                                className="product__quantity_input"
                                data-id={product.id}
                                type='number'
                                value={product.quantity}
                                min='0'
                                max={product.inventory}
                                onChange={(e) => {
                                    const id = e.target.dataset.id;
                                    const newQuantity = e.target.value;
                                    onChangeQuantity(id, newQuantity);
                                }}
                            />
                        </p>
                        <p className="product__subtotal">
                            Subtotal:${product.subtotal}
                        </p>
                    </>
                )}
                { onDeleteFromCart && (
                    <button
                        data-id={product.id}
                        className="product__delete"
                        onClick={(e) => {
                            const id = e.target.dataset.id;
                            onDeleteFromCart(id);
                        }}>
                        &#10060; Delete
                    </button>
                )}
                {onDeleteProductAdmin && (
                    <button
                        data-id={product.id}
                        className="product__delete"
                        onClick={(e) => {
                            const id = e.target.dataset.id;
                            onDeleteProductAdmin(id);
                        }}>
                        &#10060; Delete
                    </button>
                )}
            </div>
        </>
    );
}

export default Product;