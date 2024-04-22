"use strict";

//Some constants we will use in the products.js file
const constants = require('./products-constant');


// products data we mocked and will use them for the app.
const products = {};


function reset() {
    Object.keys(products).forEach(key => {
        delete products[key];
    });
}

function makeProductsList() {
    if (!Object.keys(products).length) {
        const products_constant = constants.PRODUCTS_CONSTANT.slice(0,constants.INITIAL_PRODUCTS_COUNT);
        products_constant.forEach( product => {
            addProduct( product.id, product.title, product.price, product.image, product.inventory);
        });
    }
}


// For 'admin' username only
function makeLongProductsList() {

    if (Object.keys(products).length >= constants.PRODUCTS_CONSTANT.length) { // We don't have more products
        return;
    }
    if ( Object.keys(products).length < constants.INITIAL_PRODUCTS_COUNT ) { // Add first four products
        reset();
        makeProductsList();
        return;
    }
    const products_constant = constants.PRODUCTS_CONSTANT;
    products_constant.forEach( product => {
        addProduct( product.id, product.title, product.price, product.image, product.inventory);
    });
}


function getProduct(id) {
    return products[id];
}


function deleteProduct(id) {
    delete products[id];
}


function contains(id) {
    return !!products[id];
}


function reduceInventory( id, quantity ) {
    if ( products[id] && (products[id].inventory - quantity) >= constants.MIN_INVENTORY ) {
        products[id].inventory -= quantity;
    } else {
        return false;
    }
    return true;
}


function addProduct(id, productName, price, image='1.jpg', inventory=constants.MAX_INVENTORY) {

    if ( containsByImage(image) ) { return; } // The product has been in the stock

    products[id] = {
        id: id,
        title: productName,
        price: price,
        image: image,
        inventory: inventory,
    };
}

function containsByImage(image) {
    return !!Object.values(products).some(product => product.image === image);
}

module.exports = {
    reset,
    makeProductsList,
    makeLongProductsList, // For admin only
    deleteProduct, // For admin only
    getProduct,
    contains,
    reduceInventory,
    products
};
