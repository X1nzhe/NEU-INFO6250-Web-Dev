'use strict';

const uuid = require('uuid').v4;

const MAX_INVENTORY = 10;
const MIN_INVENTORY = 0;

const INITIAL_PRODUCTS_COUNT = 4;

// Fixing product id
function generateProductsConstant() {

	const products = [];

	function addProduct(productName, price, image, inventory = MAX_INVENTORY) {
		const id = uuid();

		products.push({
			id: id,
			title: productName,
			price: price,
			image: image,
			inventory: inventory,
		});
	}
	addProduct('Simba', 3.53, '0.jpg', getRandomIntInclusive(MIN_INVENTORY, MAX_INVENTORY));
	addProduct('Squidward', 0.99, '1.jpg', getRandomIntInclusive(MIN_INVENTORY, MAX_INVENTORY));
	addProduct('Flippy', 3.14, '2.jpg', getRandomIntInclusive(MIN_INVENTORY, MAX_INVENTORY));
	addProduct('SpongeBob', 2.73, '3.jpg', getRandomIntInclusive(MIN_INVENTORY, MAX_INVENTORY));
	addProduct('Hawkeye', 5.66, '4.jpg', getRandomIntInclusive(MIN_INVENTORY, MAX_INVENTORY));
	addProduct('Drowsy', 3.29, '5.jpg', getRandomIntInclusive(MIN_INVENTORY, MAX_INVENTORY));
	addProduct('Sawing', 1.23, '6.jpg', getRandomIntInclusive(MIN_INVENTORY, MAX_INVENTORY));
	addProduct('Paw', 6.99, '7.jpg', getRandomIntInclusive(MIN_INVENTORY, MAX_INVENTORY));
	addProduct('NotCow', 2.55, '8.jpg', getRandomIntInclusive(MIN_INVENTORY, MAX_INVENTORY));
	addProduct('Tom', 7.89, '9.jpg', getRandomIntInclusive(MIN_INVENTORY, MAX_INVENTORY));
	addProduct('Tenzing', 8.99, '10.jpg', getRandomIntInclusive(MIN_INVENTORY, MAX_INVENTORY));
	return products;
}

function getRandomIntInclusive(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}


module.exports = {
	PRODUCTS_CONSTANT: generateProductsConstant(),
	MIN_INVENTORY,
	MAX_INVENTORY,
	INITIAL_PRODUCTS_COUNT,
};
