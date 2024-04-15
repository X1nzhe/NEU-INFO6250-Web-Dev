import {
	LOGIN_STATUS,
	VIEWS,
	CLIENT,
	ACTIONS,
} from './constants.js';

import {permissionToLoginStatus} from './utils';

export const initialState = {
	error: '',
	username: '',
	loginStatus: LOGIN_STATUS.PENDING,
	currentPage: VIEWS.PRODUCTS,
	isPageLoading: false,
	isCheckingOut: false,
	products: {},
	cart: {},
	cartItemsCount: 0,
	orders: {},
	lastOrderId: '',
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.LOGIN_PENDING:
			return {
				...state,
				error: '',
				loginStatus: LOGIN_STATUS.PENDING,
			};

		case ACTIONS.LOG_IN:
			return {
				...state,
				error: '',
				loginStatus: permissionToLoginStatus(action.permission),
				username: action.username,
				currentPage: VIEWS.PRODUCTS,
			};

		case ACTIONS.CLICK_LOGIN:
			return {
				...state,
				error: '',
				currentPage: VIEWS.LOGIN,
			};

		case ACTIONS.LOG_OUT:
			return {
				...state,
				error: '',
				username: '',
				loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
				isCheckingOut: false,
				cart: {},
				cartItemsCount: 0,
				orders: {},
				lastOrderId: '',
			};

		case ACTIONS.CLICK_LOGOUT:
			return {
				...state,
				error: '',
				loginStatus: LOGIN_STATUS.LOGGING_OUT,
			};

		case ACTIONS.LOGGING_OUT:
			return {
				...state,
				loginStatus: LOGIN_STATUS.LOGGING_OUT,
			};

		case ACTIONS.TIMED_OUT:
			return {
				...state,
				loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
				error: CLIENT.SESSION_TIMEOUT,
			};

		case ACTIONS.LOADING_PAGE:
			return {
				...state,
				isPageLoading: action.isPageLoading,
			};

		case ACTIONS.REPORT_ERROR:
			return {
				...state,
				error: action.error || 'ERROR',
			};

		case ACTIONS.REPLACE_PRODUCTS:
			return {
				...state,
				products: action.products,
			};

		case ACTIONS.REPLACE_CART:
			return {
				...state,
				cart: action.cart,
				cartItemsCount: action.cart.totalQuantity,
			};

		case ACTIONS.REPLACE_ORDERS:
			return {
				...state,
				orders: action.orders
			};

		case ACTIONS.CLICK_PRODUCTS:
			return {
				...state,
				error: '',
				products: action.products,
				currentPage: VIEWS.PRODUCTS,
			};

		case ACTIONS.CLICK_CART:
			return {
				...state,
				error: '',
				cart: action.cart,
				cartItemsCount: action.cart.totalQuantity,
				currentPage: VIEWS.CART,
				lastOrderId: '',
			};

		case ACTIONS.CLICK_ORDERS:
			return {
				...state,
				error: '',
				orders: action.orders,
				currentPage: VIEWS.ORDERS,
			};

		case ACTIONS.START_CHECKING_OUT:
			return {
				...state,
				error: '',
				isCheckingOut: true,
				isPageLoading: true,
			};

		case ACTIONS.CHECKING_OUT:
			return {
				...state,
				lastOrderId: action.orderId,
				cart: action.cart,
				cartItemsCount: 0,
			};

		case ACTIONS.AFTER_CHECK_OUT:
			return {
				...state,
				isCheckingOut: false,
				isPageLoading: false,
			};

		case ACTIONS.SHOW_HOMEPAGE:
			return {
				...state,
				error: '',
				lastOrderId: '',
				currentPage: VIEWS.PRODUCTS,
			};

		default:
			throw new Error({error: CLIENT.UNKNOWN_ACTION, detail: action});
	}
}

export default reducer;