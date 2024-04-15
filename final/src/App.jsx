import {useReducer, useEffect, useRef, useCallback} from 'react';
import './App.css';
import {
	POLLING_DELAY,
	REDIRECTING_DELAY,
	LOGIN_STATUS,
	VIEWS,
	SERVER,
	CLIENT,
	ACTIONS,
	PERMISSIONS,
} from './constants.js';

import reducer, {initialState} from './reducer';

import * as services from './services';
import LoginForm from './LoginForm';
import Cart from './Cart';
import Products from './Products';
import Orders from './Orders';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';


function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const productsPollingRef = useRef();
	const cartPollingRef = useRef();
	const ordersPollingRef = useRef();


	// Logic Handler for the Login Form
	function onLogin(username) {
		dispatch({type: ACTIONS.LOGIN_PENDING});//Start to try logging in and show indicator to user

		services.fetchLogin(username)
			.then(response => {
				dispatch({type: ACTIONS.LOG_IN, username: response.username, permission: response.permission});
				return services.fetchCart(); // Update the cartItemsCount for Cart(0) shown on the Header
			})
			.catch(err => {
				if (err?.error === SERVER.NO_PERMISSION) {
					return Promise.reject({error: CLIENT.BANNED_USER});
				}
				return Promise.reject(err);
			})
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_CART, cart: response.cart});
			})
			.catch(err => {
				if (err?.error === CLIENT.BANNED_USER) {
					dispatch({type: ACTIONS.LOG_IN, username, permission: PERMISSIONS.BANNED});
					return;
				}
				dispatch({type: ACTIONS.LOG_OUT});//Login failed due to unknown reason
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});
			});
	}

	function onLogout() {
		dispatch({type: ACTIONS.LOGGING_OUT}); //Start to try logging out and show indicator to user
		services.fetchLogout()
			.then(() => {
				dispatch({type: ACTIONS.LOG_OUT});
				return services.fetchProducts(); // Update and show the products view
			})
			.catch(err => {
				return Promise.reject(err);
			})
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_PRODUCTS, products: response.productsList});
			})
			.catch(err => {
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});
			});
	}


	// Login Button on the Header
	function onClickLogin() {
		dispatch({type: ACTIONS.CLICK_LOGIN});
	}

	function onClickCart() {
		if (state.lastOrderId) {//The page is showing the message for ordered successfully
			return; // Ignore this click action, waiting for redirecting
		}
		dispatch({type: ACTIONS.LOADING_PAGE, isPageLoading: true});//Show loading indicator...

		services.fetchCart()
			.then(response => {
				dispatch({type: ACTIONS.CLICK_CART, cart: response.cart});
			})
			.catch(err => {
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({type: ACTIONS.TIMED_OUT});
					return;
				}
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});// Ensure that the error ends up truthy
			})
			.finally(() => {
				dispatch({type: ACTIONS.LOADING_PAGE, isPageLoading: false});// Hide loading indicator
			});
	}

	//For admin only
	function onClickOrders() {
		if (state.lastOrderId) { //The page is showing the message for ordered successfully
			return; // Ignore this click action, waiting for redirecting
		}
		dispatch({type: ACTIONS.LOADING_PAGE, isPageLoading: true});//Show loading indicator...

		services.fetchOrders()
			.then(response => {
				dispatch({type: ACTIONS.CLICK_ORDERS, orders: response.ordersList});
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({type: ACTIONS.TIMED_OUT});
					return;
				}
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});  // Ensure that the error ends up truthy
			})
			.finally(() => {
				dispatch({type: ACTIONS.LOADING_PAGE, isPageLoading: false});// Hide loading indicator
			});
	}


	function onClickProducts() {
		if (state.lastOrderId) { //The page is showing the message for ordered successfully
			return; // Ignore this click action, waiting for redirecting
		}
		dispatch({type: ACTIONS.LOADING_PAGE, isPageLoading: true});//Show loading indicator...
		services.fetchProducts()
			.then(response => {
				dispatch({type: ACTIONS.CLICK_PRODUCTS, products: response.productsList});
			})
			.catch(err => {
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});
			})
			.finally(() => {
				dispatch({type: ACTIONS.LOADING_PAGE, isPageLoading: false});// Hide loading indicator
			});
	}


	function onAddToCart(id) {

		services.fetchAddItem(id, 1)
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_CART, cart: response.cart});
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({type: ACTIONS.TIMED_OUT});
					return;
				}
				if (err?.error === SERVER.NO_SUCH_PRODUCT) {
					dispatch({type: ACTIONS.REPORT_ERROR, error: err.error});
					return services.fetchProducts();
				}
				// For unexpected errors
				return Promise.reject(err);
			})
			.then(response => {
				if (response?.productsList) {
					dispatch({type: ACTIONS.REPLACE_PRODUCTS, products: response?.productsList});
				}
			}).catch(err => {
			// For unexpected errors, report them
			dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error}); // Ensure that the error ends up truthy
		});
	}


	//For admin to add more products to the market
	function onAddProductsAdmin() {
		services.fetchAddMoreProducts()
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_PRODUCTS, products: response.productsList});
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({type: ACTIONS.TIMED_OUT});
					return;
				}
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error}); // Ensure that the error ends up truthy
			});
	}


	//For admin to delete products from the market
	function onDeleteProductAdmin(id) {
		services.fetchDeleteProduct(id)
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_PRODUCTS, products: response.productsList});
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({type: ACTIONS.TIMED_OUT});
					return;
				}
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});// Ensure that the error ends up truthy
			});
	}

	//For admin to reset the market
	function onResetProductsAdmin() {
		services.fetchResetProducts()
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_PRODUCTS, products: response.productsList});
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({type: ACTIONS.TIMED_OUT});
					return;
				}
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error}); // Ensure that the error ends up truthy
			});
	}

	function onChangeQuantity(id, quantity) {
		services.fetchSetItemQuantity(id, quantity)
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_CART, cart: response.cart});
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({type: ACTIONS.TIMED_OUT});
					return;
				}
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});// Ensure that the error ends up truthy
			});
	}

	//Delete an item in the shopping cart
	function onDeleteFromCart(id) {
		services.fetchDeleteItem(id)
			.then(response => {
				dispatch({type: ACTIONS.CLICK_CART, cart: response.cart});
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({type: ACTIONS.TIMED_OUT});
					return;
				}
				if (err?.error === SERVER.NO_SUCH_PRODUCT) {
					dispatch({type: ACTIONS.REPORT_ERROR, error: err.error});
					return;
				}
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});
			});
	}

	function onCheckOut() {
		dispatch({type: ACTIONS.START_CHECKING_OUT});// Set flags for checking process

		services.fetchMakeOrder()
			.then(response => {
				dispatch({type: ACTIONS.CHECKING_OUT, orderId: response.orderId, cart: response.cart});
				dispatch({type: ACTIONS.AFTER_CHECK_OUT}); // Clear flags
				setTimeout(() => { // Redirect to home page
					dispatch({type: ACTIONS.SHOW_HOMEPAGE});
				}, REDIRECTING_DELAY);
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					return Promise.reject({error: CLIENT.NO_SESSION})
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					return Promise.reject({error: CLIENT.SESSION_TIMEOUT});
				}
				if (err?.error === SERVER.NO_SUCH_PRODUCT) {
					dispatch({type: ACTIONS.REPORT_ERROR, error: err.error});
					return services.fetchCart(); // Update the shopping cart
				}
				// For unexpected errors, report them
				return Promise.reject(err);
			}).then(response => {
			if (response?.cart) {
				dispatch({type: ACTIONS.REPLACE_CART, cart: response.cart});
			}
		}).catch(err => {
			if (err?.error === CLIENT.NO_SESSION) {
				dispatch({type: ACTIONS.LOG_OUT});
				return;
			}
			if (err?.error === CLIENT.SESSION_TIMEOUT) {
				dispatch({type: ACTIONS.TIMED_OUT});
				return;
			}
			dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});
		});
	}


	//For admin to delete orders
	function onDeleteOrder(id) {
		services.fetchDeleteOrder(id)
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_ORDERS, orders: response.ordersList});
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({type: ACTIONS.TIMED_OUT});
					return;
				}
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});// Ensure that the error ends up truthy
			});
	}


	function checkSession() {
		services.fetchCheckSession()
			.then(response => {
				// The user has logged in
				dispatch({type: ACTIONS.LOG_IN, username: response.username, permission: response.permission});
				return services.fetchCart(); // to show how many items in the Cart
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) {
					return Promise.reject({error: CLIENT.NO_SESSION}); // Not an error but just the user is not logged in yet
				}
				if (err?.error === SERVER.NO_PERMISSION) {
					return Promise.reject({error: CLIENT.BANNED_USER});
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					return Promise.reject({error: CLIENT.SESSION_TIMEOUT});
				}
				return Promise.reject(err); // Pass any other error unchanged
			})
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_CART, cart: response.cart});
			})
			.catch(err => {
				if (err?.error === CLIENT.NO_SESSION) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === CLIENT.SESSION_TIMEOUT) {
					dispatch({type: ACTIONS.TIMED_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === CLIENT.BANNED_USER) {
					dispatch({type: ACTIONS.LOG_IN, username: '', permission: PERMISSIONS.BANNED});
					return;
				}
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error}); // Ensure that the error ends up truthy
			});
	}

// On initial page loading
	useEffect(() => {
		services.fetchProducts()
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_PRODUCTS, products: response.productsList});
			})
			.catch(err => {
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});
			});
		checkSession();
	}, []); // rendering only once on the initial page loading


	// Polling functions
	const pollProducts = useCallback(() => {
		services.fetchProducts()
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_PRODUCTS, products: response.productsList});
			})
			.then(() => {
				productsPollingRef.current = setTimeout(pollProducts, POLLING_DELAY);
			})
			.catch(err => {
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});// Ensure that the error ends up truthy
				productsPollingRef.current = setTimeout(pollProducts, POLLING_DELAY);
			});
	}, []);

	const pollCart = useCallback(() => {
		services.fetchCart()
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_CART, cart: response.cart});
			})
			.then(() => {
				cartPollingRef.current = setTimeout(pollCart, POLLING_DELAY);
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({type: ACTIONS.TIMED_OUT});
					return;
				}
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});// Ensure that the error ends up truthy
				cartPollingRef.current = setTimeout(pollCart, POLLING_DELAY);
			});
	}, []);


	const pollOrders = useCallback(() => {
		services.fetchOrders()
			.then(response => {
				dispatch({type: ACTIONS.REPLACE_ORDERS, orders: response.ordersList});
			})
			.then(() => {
				ordersPollingRef.current = setTimeout(pollOrders, POLLING_DELAY);
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({type: ACTIONS.LOG_OUT});
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({type: ACTIONS.TIMED_OUT});
					return;
				}
				// For unexpected errors, report them
				dispatch({type: ACTIONS.REPORT_ERROR, error: err?.error});// Ensure that the error ends up truthy
				ordersPollingRef.current = setTimeout(pollOrders, POLLING_DELAY);
			});
	}, []);


	// Set polling
	useEffect(() => {
		if ((state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN_USER
				|| state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN_ADMIN
				|| state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN_BANNED)
			&& state.currentPage === VIEWS.PRODUCTS
		) {
			productsPollingRef.current = setTimeout(pollProducts, POLLING_DELAY);
		}

		return () => {
			clearTimeout(productsPollingRef.current);
		};

	}, [pollProducts, state.currentPage, state.loginStatus]);

	// Set polling
	useEffect(() => {
		if (state.currentPage === VIEWS.CART
			&& state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN_USER) {
			cartPollingRef.current = setTimeout(pollCart, POLLING_DELAY);
		}
		return () => {
			clearTimeout(cartPollingRef.current);
		};
	}, [state.loginStatus, state.currentPage, pollCart]);

	useEffect(() => {
		if (state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN_ADMIN
			&& state.currentPage === VIEWS.ORDERS) {
			ordersPollingRef.current = setTimeout(pollOrders, POLLING_DELAY);
		}
		return () => {
			clearTimeout(ordersPollingRef.current);
		};
	}, [state.loginStatus, pollOrders, state.currentPage]);


	return (
		<div className="app">
			<main className="">
				{state.error && <Error error={state.error}/>}
				{state.loginStatus === LOGIN_STATUS.PENDING &&
					<Loading className="login__waiting">Loading site...</Loading>}
				{state.loginStatus === LOGIN_STATUS.LOGGING_OUT &&
					<Loading className="logging_out">Logging out...</Loading>}
				{state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
					<>
						<Header className="header__not_login"
								onClickLogin={onClickLogin}
								currentPage={state.currentPage}
						/>
						{state.currentPage === VIEWS.PRODUCTS &&
							<Products
								className="products__not_login"
								isPageLoading={state.isPageLoading}
								products={state.products}
							/>
						}
						{state.currentPage === VIEWS.LOGIN && <LoginForm onLogin={onLogin}/>}
					</>
				)}
				{state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN_BANNED && (
					<>
						<Header className="header__banned"
								username={state.username}
								onLogout={onLogout}
						/>
						<Products
							className="products__banned"
							isPageLoading={state.isPageLoading}
							products={state.products}
						/>
					</>
				)}
				{state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN_USER && (
					<>
						<Header
							username={state.username}
							onClickProducts={onClickProducts}
							onClickCart={onClickCart}
							cartItemsCount={state.cartItemsCount}
							onLogout={onLogout}
						/>
						{state.currentPage === VIEWS.PRODUCTS &&
							<Products
								className="products__user"
								isPageLoading={state.isPageLoading}
								products={state.products}
								onAddToCart={onAddToCart}
							/>}
						{state.currentPage === VIEWS.CART &&
							<Cart
								isPageLoading={state.isPageLoading}
								isCheckingOut={state.isCheckingOut}
								cart={state.cart}
								onChangeQuantity={onChangeQuantity}
								onDeleteFromCart={onDeleteFromCart}
								onCheckOut={onCheckOut}
								lastOrderId={state.lastOrderId}
							/>
						}
					</>
				)}
				{state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN_ADMIN && (
					<>
						<Header className="header__admin"
								username={state.username}
								onClickProducts={onClickProducts}
								onClickOrders={onClickOrders}
								onLogout={onLogout}
						/>
						{state.currentPage === VIEWS.PRODUCTS &&
							<Products
								className="products__admin"
								isPageLoading={state.isPageLoading}
								products={state.products}
								onAddProductsAdmin={onAddProductsAdmin}
								onDeleteProductAdmin={onDeleteProductAdmin}
								onResetProductsAdmin={onResetProductsAdmin}
							/>
						}
						{state.currentPage === VIEWS.ORDERS &&
							<Orders
								isPageLoading={state.isPageLoading}
								orders={state.orders}
								onDeleteOrder={onDeleteOrder}
							/>
						}
					</>
				)}
				<div className="bottom">
					<p>© 1996-2024, Ameowzon.com, Inc. or its affiliates</p>
				</div>
			</main>
		</div>
	);
}

export default App;
