// product.js renders the Product Page and holds products data/state

const productsState = [
    { id:1, name:'Alice', price:0.99 },
    { id:2, name:'Bob', price:3.14 },
    { id:3, name:'Carol', price: 2.73}
];

function renderProducts(cartQuantity) {

    //Sets containers, subtitle and View Cart button
    initialProductPage(cartQuantity);

    //Renders items for sale on the product page
    const productsEl = document.getElementById('products');
    productsEl.innerHTML = ``;

    productsState.forEach( product => {
        const productDiv = document.createElement('div');

        productDiv.classList.add('item');
        productDiv.innerHTML = `
                <img class="item-image" src="//placekitten.com/150/150?image=${product.id}" alt="${product.name}">
                <p>${product.name}</p>
                <p>$${product.price.toFixed(2)} each</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productsEl.appendChild(productDiv);
    });
}

function initialProductPage(cartQuantity){
    // Renders header of the product page
    const headerEl = document.getElementById('product-header');
    headerEl.innerHTML = ``;

    //Sets subtitle
    const headerTitle = document.createElement('h2');
    headerTitle.textContent =  `Products`;
    headerEl.appendChild(headerTitle);

    //Sets View Cart button
    const viewCartButton = document.createElement('button');
    viewCartButton.id = 'view-cart';
    if (cartQuantity) {
        viewCartButton.textContent = `View Cart (${cartQuantity})`;
    }else {
        viewCartButton.textContent = `View Cart`;
    }
    headerEl.appendChild(viewCartButton);
}


function showViewCartButton(visible){
    const viewCartButton = document.getElementById('view-cart');
    if (visible) {
        viewCartButton.classList.remove('hidden');
    } else {
        viewCartButton.classList.add('hidden');
    }
}

function getProductById(productId){
    return productsState.find(item => item.id === parseInt(productId));
}



export {getProductById, showViewCartButton, renderProducts};

