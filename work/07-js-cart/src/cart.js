//"cart.js" renders the Cart page and managers cart data/state

//Contains all items in the shopping cart
const cartState = []; // Ordering required, first added, last shown in the shopping cart

function renderCart() {
    // Sets subtitle and container
    initialCartPage();

    //Sets items in the cart
    const cartItems = document.getElementById('cart-items');
    let totalCost = 0;

    if (cartState.length === 0) {  //   The shopping cart is empty
        const emptyCartDiv = document.createElement('div');
        emptyCartDiv.id = 'empty-cart';
        emptyCartDiv.textContent = 'Nothing in the cart';
        cartItems.appendChild(emptyCartDiv);

    }else{ // The shopping cart is NOT empty
        cartState.forEach(product => {
            if( product.quantity ){ // shows item as long as that quantity is greater than 0
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                            <img class="cat-image" src="//placekitten.com/50/50?image=${product.id}" alt="${product.name}">
                            <p>Product: ${product.name}</p>
                            <p>Quantity: <input class='item-quantity' data-id='${product.id}' type='number' value='${product.quantity}' min='0' max='99'></p>
                            <p>Price: $${product.price}</p>
                            <p>Subtotal: $${(product.price * product.quantity).toFixed(2)}</p>
                           `;
                cartItems.appendChild(cartItemDiv);
                totalCost += product.price * product.quantity;
            }
        });
    }

    // Shows total price/cost for all cats added in the cart
    const cartPageEl = document.getElementById('cart-page');
    const totalCostDiv = document.createElement('div');
    totalCostDiv.id = 'cart-total';
    totalCostDiv.textContent = `Total: $${totalCost.toFixed(2)}`;
    cartPageEl.appendChild(totalCostDiv);

    // Sets Hide Cart button & Checkout button
    addButtons();
}

function initialCartPage(){
    const cartPageEl = document.getElementById('cart-page');
    cartPageEl.innerHTML = ``;

    if(cartPageEl.classList.contains('hidden')) {
        cartPageEl.classList.remove('hidden');
    }
    cartPageEl.classList.add('show');

    const cartTitleEl = document.createElement('h2');
    cartTitleEl.textContent = 'Shopping Cart';
    cartPageEl.appendChild(cartTitleEl);

    const cartItemsDiv = document.createElement('div');
    cartItemsDiv.id = 'cart-items';
    cartPageEl.appendChild(cartItemsDiv);
}

function addButtons() {
    //Adds div for two buttons
    const cartPageEl = document.getElementById('cart-page');
    const cartButtonsDiv = document.createElement('div');
    cartButtonsDiv.id = 'cart-buttons';
    cartPageEl.appendChild(cartButtonsDiv);

    // Adds Hide Cart button
    const hideCartButton = document.createElement('button');
    hideCartButton.id = 'hide-cart';
    hideCartButton.textContent = 'Hide Cart';
    cartButtonsDiv.appendChild(hideCartButton);

    //Adds Checkout button
    const checkoutButton = document.createElement('button');
    checkoutButton.id = 'checkout';
    checkoutButton.textContent = 'Checkout';
    cartButtonsDiv.appendChild(checkoutButton);
}

function hideCart() {
    const cartPageEl = document.getElementById('cart-page');
    cartPageEl.innerHTML = ``;

    if(cartPageEl.classList.contains('show')) {
        cartPageEl.classList.remove('show');
    }
    cartPageEl.classList.add('hidden');
}

// For View Cart button
//  The View Cart button will include a number of total items in the cart if that number is greater than 0
function getCartTotalQuantity(){
    let itemsCount = 0;
    cartState.forEach(item => {
        itemsCount += item.quantity;
    });
    return itemsCount;
}

function addToCart(product){
    const existItem = cartState.find( item => item.id === product.id);
    if (existItem) {
        existItem.quantity++;
    } else {
        cartState.push({...product, quantity:1});
    }
}

function setQuantityById(productId,newQuantity) {
    const itemIndex = cartState.findIndex( item => item.id === productId);

    if (itemIndex !== -1) {
        if (newQuantity) {
            cartState[itemIndex].quantity = newQuantity;
        } else {
            cartState.splice(itemIndex,1);
        }
    }
}

function checkout(){
    cartState.length = 0; //Checking out will remove all cats from the Shopping Cart
}

export {checkout, hideCart, addToCart, setQuantityById, getCartTotalQuantity, renderCart};