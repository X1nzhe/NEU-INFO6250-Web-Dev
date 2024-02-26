// index.js controls the web app and renders the home page

import { getProductById, showViewCartButton, renderProducts } from "./product";
import { checkout, hideCart, addToCart, setQuantityById, getCartTotalQuantity, renderCart } from "./cart";

let showCart = false;

function render() {
    renderProducts(getCartTotalQuantity());

    if ( showCart ) {
        showViewCartButton(false);
        renderCart();
    }else {
        showViewCartButton(true);
        hideCart();
    }
}

render();

const productPageEl = document.querySelector('#product-page');
productPageEl.addEventListener('click', (e) => {
    if ( e.target.id === 'view-cart') {
        showCart = true;
        render();
        return;
    }
    if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.dataset.id;
        addToCart(getProductById(productId));
        render();
    }
});

const cartPageEl = document.querySelector('#cart-page');
cartPageEl.addEventListener('click', (e) => {
    if (e.target.id === 'hide-cart') {
        showCart = false;
        render();
        return;
    }
    if (e.target.id === 'checkout') {
        checkout();
        showCart = false;   //Checking out will Hide the Cart content
        render();
    }
});
cartPageEl.addEventListener('change', (e) =>{
    if (e.target.classList.contains('item-quantity')) { // Updates the quantity of cats
        const newQuantity = parseInt(e.target.value);
        const productId = e.target.dataset.id;
        if ( newQuantity>=0 ) { // Only passes valid input
            setQuantityById(productId, newQuantity);
            render();
        }
    }
});



