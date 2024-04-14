"use strict";

const uuid = require('uuid').v4;

const carts = require('./carts');
const products = require('./products');

const orders = {};

function makeOrder(username) {
	const id = uuid();
	const cart = carts.getCart(username);
	const madeOrderFailed = false;

	if (!cart) {
		return madeOrderFailed;
	}

	// Reduce inventory of our products in stock for each item
	const canReduceInventory = Object.keys(cart.items).every(itemId => {
		const item = cart.items[itemId];
		const product = products.getProduct(itemId);

		return item && product && (product?.inventory - item?.quantity) >= 0;
	});

	if (!canReduceInventory) {
		return madeOrderFailed;
	}

	Object.keys(cart.items).forEach(itemId => {
		const item = cart.items[itemId];
		products.reduceInventory(item.id, item.quantity);
	});

	orders[id] = {
		id: id,
		username: username,
		items: cart.items,
		totalQuantity: cart.totalQuantity,
		totalPrice: cart.totalPrice,
	};

	carts.deleteCartFor(username);

	return id;
}

function deleteOrder(id) {
	delete orders[id]
}

function contains(id) {
	return !!orders[id];
}

module.exports = {
	makeOrder,
	deleteOrder, //For admin only
	contains,
	orders
};