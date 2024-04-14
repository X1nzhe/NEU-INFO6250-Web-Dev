import Product from './Product';
import Loading from './Loading';
import { REDIRECTING_DELAY, SHOW } from './constants';

function Cart({
        isPageLoading,
        isCheckingOut,
        cart,
        onChangeQuantity,
        onDeleteFromCart,
        onCheckOut,
        lastOrderId,
    }) {
    let show;
    if (isPageLoading) {
        show = SHOW.PENDING;
    } else if (!Object.keys(cart.items).length) {
        show = SHOW.EMPTY;
    } else {
        show = SHOW.CONTENT;
    }

    return (
        <div className="content">
            {show === SHOW.PENDING && (
                isCheckingOut
                    ? <Loading className="cart__waiting">Checking out...</Loading>
                    : <Loading className="cart__waiting">Loading Shopping Cart...</Loading>
            )}
            {show === SHOW.EMPTY && (
                lastOrderId
                    ? <div className="cart__ordered">
                        <p>Thanks for shopping with us!</p>
                        <p>Remember your order ID: {lastOrderId}.</p>
                        <p>You will be redirected to the Home page in {REDIRECTING_DELAY / 1000} seconds...</p>
                    </div>
                    : <p className="cart__empty">Your shopping cart is empty.</p>
            )}
            {show === SHOW.CONTENT && (
                <><h2 className="cart__header">Shopping Cart</h2>
                    <ul className="cart">
                        {Object.values(cart.items).map(product => (
                            <li className="product" key={product.id}>
                                <Product
                                    product={product}
                                    onChangeQuantity={onChangeQuantity}
                                    onDeleteFromCart={onDeleteFromCart}
                                />
                            </li>
                        ))}
                    </ul>
                    <p>Total Price: ${cart.totalPrice}</p>
                    <button
                        className="check_out_button"
                        onClick={onCheckOut}
                    >Check out
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;