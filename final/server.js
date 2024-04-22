"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');

const sessions = require('./sessions');
const users = require('./users');
const products = require('./products');
const orders = require('./orders');
const carts = require('./carts');


const app = express();
const PORT = 3000;


app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json()); // Parses requests with json content bodies
app.set('json escape', true); // Enables JSON escape to prevent XSS attacks


// Initial the products list
function initProducts() {
	products.makeProductsList();
}

initProducts();


// Sessions
// Check for existing session (used on shopping cart page load)
app.get('/api/v1/session', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';

	if (!username && sessions.wasExpired(sid)) {
		res.status(401).json({error: 'session-expired'});
		return;
	}

	if (!sid || !username) {
		res.status(401).json({error: 'auth-missing'});
		return;
	}

	const permission = users.getPermissionUser(username);
	res.json({username, permission});
});

// Create a new session (login)
app.post('/api/v1/session', (req, res) => {
	const {username} = req.body;

	if (!users.isValid(username)) {
		res.status(400).json({error: 'required-username'});
		return;
	}


	const sid = sessions.addSession(username);
	users.addUser(username); // This also assigns permission according to the username
	const permission = users.getPermissionUser(username);

	if (permission !== users.PERMISSIONS.BANNED) {
		const existingCart = carts.getCart(username);
		if (!existingCart) {
			carts.makeCartFor(username);
		}
	}
	res.cookie('sid', sid);

	res.json({username, permission});
});

// Logout
app.delete('/api/v1/session', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';

	if (sid) {
		res.clearCookie('sid');
	}

	if (username) {
		// Delete the session, but not the user data
		sessions.deleteSession(sid);

		// The users with same username are treated as the same user, and share one same 'user' instance in our server.
		// If the user logged out from all devices, as no session for this user, we deactivate the user from the server state
		if (!sessions.countSessionsByUsername(username)) {
			users.deleteUser(username);
		}
	}

	// We don't report any error if sid or session didn't exist
	// Because that means we already have what we want
	res.json({wasLoggedIn: !!username}); // Provides some extra info that can be safely ignored
});


// Products
// Retrieve the Products list
app.get('/api/v1/products', (req, res) => {

	// Note: The service call is intended to allow open access
	const productsList = products.products;

	res.json({productsList});
});


//For admin only
// Add more products
app.patch('/api/v1/products', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';


	if (!username && sessions.wasExpired(sid)) {
		res.status(401).json({error: 'session-expired'});
		return;
	}

	if (!sid || !username) {
		res.status(401).json({error: 'auth-missing'});
		return;
	}

	const permission = users.getPermissionUser(username);
	if (permission !== users.PERMISSIONS.ADMIN) {
		res.status(403).json({error: 'no-permission'});
		return;
	}


	products.makeLongProductsList();
	const productsList = products.products;

	res.json({productsList});
});

//Rest Products list
app.post('/api/v1/products', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';


	if (!username && sessions.wasExpired(sid)) {
		res.status(401).json({error: 'session-expired'});
		return;
	}

	if (!sid || !username) {
		res.status(401).json({error: 'auth-missing'});
		return;
	}

	const permission = users.getPermissionUser(username);
	if (permission !== users.PERMISSIONS.ADMIN) {
		res.status(403).json({error: 'no-permission'});
		return;
	}
	products.reset();
	products.makeProductsList();
	const productsList = products.products;

	res.json({productsList});
});

// Delete A Product
app.delete('/api/v1/products/:id', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';


	if (!username && sessions.wasExpired(sid)) {
		res.status(401).json({error: 'session-expired'});
		return;
	}

	if (!sid || !username) {
		res.status(401).json({error: 'auth-missing'});
		return;
	}

	const permission = users.getPermissionUser(username);
	if (permission !== users.PERMISSIONS.ADMIN) {
		res.status(403).json({error: 'no-permission'});
		return;
	}

	const {id} = req.params;

	if (!products.contains(id)) {
		res.status(404).json({error: 'no-such-product'});
		return;
	}

	products.deleteProduct(id);
	const productsList = products.products;

	res.json({productsList});
});

// Carts
// Get the user's cart
app.get('/api/v1/carts', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';


	if (!username && sessions.wasExpired(sid)) {
		res.status(401).json({error: 'session-expired'});
		return;
	}

	if (!sid || !username) {
		res.status(401).json({error: 'auth-missing'});
		return;
	}

	const permission = users.getPermissionUser(username);
	if (permission === users.PERMISSIONS.BANNED) {
		res.status(403).json({error: 'no-permission'});
		return;
	}

	// Update items quantity in the cart
	carts.checkInventory(username);
	const cart = carts.getCart(username);

	res.json({cart});
});


// Add a product to the cart for the user
app.put('/api/v1/carts/:id', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';


	if (!username && sessions.wasExpired(sid)) {
		res.status(401).json({error: 'session-expired'});
		return;
	}

	if (!sid || !username) {
		res.status(401).json({error: 'auth-missing'});
		return;
	}

	const permission = users.getPermissionUser(username);
	if (permission === users.PERMISSIONS.BANNED) {
		res.status(403).json({error: 'no-permission'});
		return;
	}

	const {id} = req.params;
	const {quantity} = req.body;

	if (!id || !quantity) {
		res.status(400).json({error: 'required-product-info'});
		return;
	}

	if (!products.contains(id)) {
		res.status(404).json({error: 'no-such-product'});
		return;
	}

	carts.addItem(username, id, quantity);
	// Update items quantity in the cart
	carts.checkInventory(username);
	const cart = carts.getCart(username);

	res.json({cart});
});

// Change an item's quantity in the cart for the user
app.patch('/api/v1/carts/:id', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';


	if (!username && sessions.wasExpired(sid)) {
		res.status(401).json({error: 'session-expired'});
		return;
	}

	if (!sid || !username) {
		res.status(401).json({error: 'auth-missing'});
		return;
	}

	const permission = users.getPermissionUser(username);
	if (permission === users.PERMISSIONS.BANNED) {
		res.status(403).json({error: 'no-permission'});
		return;
	}

	const {id} = req.params;
	const {quantity} = req.body;

	if (!id || !quantity) {
		res.status(400).json({error: 'required-product-info'});
		return;
	}

	if (!products.contains(id)) {
		res.status(404).json({error: 'no-such-product'});
		return;
	}

	carts.updateItemQuantity(username, id, quantity);
	// Update items quantity in the cart
	carts.checkInventory(username);
	const cart = carts.getCart(username);
	res.json({cart});
});

// delete an item's in the cart for the user
app.delete('/api/v1/carts/:id', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';


	if (!username && sessions.wasExpired(sid)) {
		res.status(401).json({error: 'session-expired'});
		return;
	}

	if (!sid || !username) {
		res.status(401).json({error: 'auth-missing'});
		return;
	}

	const permission = users.getPermissionUser(username);
	if (permission === users.PERMISSIONS.BANNED) {
		res.status(403).json({error: 'no-permission'});
		return;
	}

	const {id} = req.params;

	if (!id) {
		res.status(400).json({error: 'required-product-info'});
		return;
	}

	if (!products.contains(id)) {
		res.status(404).json({error: 'no-such-product'});
		return;
	}

	carts.deleteItem(username, id);
	// Update items quantity in the cart
	carts.checkInventory(username);
	const cart = carts.getCart(username);
	res.json({cart});
});



// Orders
//Get all orders
app.get('/api/v1/orders', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';


	if (!username && sessions.wasExpired(sid)) {
		res.status(401).json({error: 'session-expired'});
		return;
	}

	if (!sid || !username) {
		res.status(401).json({error: 'auth-missing'});
		return;
	}


	const permission = users.getPermissionUser(username);
	if (permission !== users.PERMISSIONS.ADMIN) {
		res.status(403).json({error: 'no-permission'});
		return;
	}

	const ordersList = orders.orders;


	res.json({ordersList});
});

//Make an order
app.post('/api/v1/orders', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';


	if (!username && sessions.wasExpired(sid)) {
		res.status(401).json({error: 'session-expired'});
		return;
	}

	if (!sid || !username) {
		res.status(401).json({error: 'auth-missing'});
		return;
	}

	const permission = users.getPermissionUser(username);
	if (permission === users.PERMISSIONS.BANNED) {
		res.status(403).json({error: 'auth-insufficient'});
		return;
	}
	if (!carts.getCart(username)) {
		res.status(404).json({error: 'empty-cart'});
		return;
	}

	const orderId = orders.makeOrder(username);
	// This was making order failed
	if ( !orderId ) {
		res.status(404).json({error: 'no-such-product'});
		return;
	}

	// Update items quantity in the cart
	carts.checkInventory(username);
	const cart = carts.getCart(username);

	res.json({orderId, cart});
});

//For admin only
//Delete an order
app.delete('/api/v1/orders/:id', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';


	if (!username && sessions.wasExpired(sid)) {
		res.status(401).json({error: 'session-expired'});
		return;
	}

	if (!sid || !username) {
		res.status(401).json({error: 'auth-missing'});
		return;
	}

	const permission = users.getPermissionUser(username);
	if (permission !== users.PERMISSIONS.ADMIN) {
		res.status(403).json({error: 'no-permission'});
		return;
	}

	const {id} = req.params;

	if (!id) {
		res.status(400).json({error: 'required-order-info'});
		return;
	}

	if (!orders.contains(id)) {
		res.status(404).json({error: 'no-such-order'});
		return;
	}

	orders.deleteOrder(id);
	const ordersList = orders.orders;

	res.json({ordersList});

});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));