export const POLLING_DELAY = 5000; // 5 seconds
export const REDIRECTING_DELAY = 10000; // 10 seconds
export const VIEWS = {
	PRODUCTS: 'products',
	CART: 'cart',
	ORDERS: 'orders',
	LOGIN: 'login',
};


export const SHOW = {
	PENDING: 'pending',
	EMPTY: 'empty',
	CONTENT: 'content',
};

export const LOGIN_STATUS = {
	PENDING: 'pending',
	NOT_LOGGED_IN: 'not-logged-in',
	IS_LOGGED_IN_USER: 'logged-in-user',
	IS_LOGGED_IN_ADMIN: 'logged-in-admin',
	IS_LOGGED_IN_BANNED: 'logged-in-banned',
	LOGGING_OUT: 'logging-out',
};

export const PERMISSIONS = {
	ADMIN: 'admin',
	USER: 'user',
	BANNED: 'banned'
};

export const SERVER = {
	AUTH_MISSING: 'auth-missing',
	SESSION_EXPIRED: 'session-expired',
	AUTH_INSUFFICIENT: 'auth-insufficient',
	NO_PERMISSION: 'no-permission',
	REQUIRED_USERNAME: 'required-username',

	NO_SUCH_PRODUCT: 'no-such-product',
	PRODUCT_INFO_MISSING: 'required-product-info',

	EMPTY_CART: 'empty-cart',
	NO_SUCH_ORDER: 'no-such-order',
	ORDER_INFO_MISSING: 'required-order-info',
};

export const CLIENT = {
	NETWORK_ERR: 'networkError',
	NO_SESSION: 'noSession',
	BANNED_USER: 'bannedUser',
	SESSION_TIMEOUT: 'timedOut',
	UNKNOWN_ACTION:'unknownAction',
};

//Detailed messages to indicate specific error
export const MESSAGES_TO_USER = {
	[CLIENT.NETWORK_ERR]: "Server unavailable, pleaser try again.",
	[CLIENT.BANNED_USER]: "You are banned! But you can view our products.",
	[CLIENT.SESSION_TIMEOUT]: "Your session has timed out. Please login again.",

	[SERVER.AUTH_INSUFFICIENT]: "Your username or password was not correct.",
	[SERVER.NO_PERMISSION]: "You don't have permission to access the resources.",
	[SERVER.REQUIRED_USERNAME]: "Username only allows letters, digits, and underscores. Maximum length is 10 characters.",
	[SERVER.NO_SUCH_PRODUCT]: "Some products are not available or out of stock now.",
	[SERVER.PRODUCT_INFO_MISSING]: "Product information was missing.",
	[SERVER.NO_SUCH_ORDER]: "The order was not found.",
	[SERVER.ORDER_INFO_MISSING]: "Order information was missing.",

	default: "Something went wrong, please try again.",
};

export const ACTIONS = {
	LOGIN_PENDING:'logInPending',
	LOG_IN: 'logIn',
	CLICK_LOGIN:'clickLogIn',

	LOG_OUT: 'logOut',
	CLICK_LOGOUT:'clickLogOut',
	LOGGING_OUT:'loggingOut',
	TIMED_OUT:'timedOut',

	LOADING_PAGE: 'loadingPage',
	REPORT_ERROR:'reportError',

	REPLACE_PRODUCTS:'replaceProducts',
	REPLACE_CART:'replaceCart',
	REPLACE_ORDERS:'replaceOrders',

	CLICK_PRODUCTS:'clickProducts',
	CLICK_CART:'clickCart',
	CLICK_ORDERS:'clickOrders',

	START_CHECKING_OUT:'startCheckingOut',
	CHECKING_OUT:'checkingOut',
	AFTER_CHECK_OUT:'afterCheckOut',

	SHOW_HOMEPAGE: 'showHomePage',
};