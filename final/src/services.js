// Checks session validity,
// and returns error or the username and permission
function fetchCheckSession() {
    return fetch('/api/v1/session')
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

function fetchLogin(username) {
    return fetch('/api/v1/session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json', // set this header when sending JSON in the body of request
        },
        body: JSON.stringify({username}),
    })
        // fetch() rejects on network error
        // So we convert that to a formatted error object
        // so our caller can handle all "errors" in a similar way
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {  // response.ok checks the status code from the service
                // This service returns JSON on errors,
                // so we use that as the error object and reject
                return response.json().then(err => Promise.reject(err));
            }
            return response.json(); // happy status code means resolve with data from service
        });
}


// Logouts
// and returns error or a boolean value, wasLoggedIn
function fetchLogout() {
    return fetch('api/v1/session', {
        method: 'DELETE'
    })
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

// Retrieves all products from the server side
// and returns error or the list
function fetchProducts() {
    return fetch('/api/v1/products')
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

// For admin only
// Add more products to the market by one click
// Returns error or the updated products list
function fetchAddMoreProducts() {
    return fetch('/api/v1/products', {
        method: 'PATCH',
    })
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {  // response.ok checks the status code from the service
                // This service returns JSON on errors,
                // so we use that as the error object and reject
                return response.json().then(err => Promise.reject(err));
            }
            return response.json(); // happy status code means resolve with data from service
        });
}

//For admin only
// Reset the products list to initial status
function fetchResetProducts() {
    return fetch('/api/v1/products', {
        method: 'POST',
    })
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {  // response.ok checks the status code from the service
                // This service returns JSON on errors,
                // so we use that as the error object and reject
                return response.json().then(err => Promise.reject(err));
            }
            return response.json(); // happy status code means resolve with data from service
        });
}

//For admin only
//Delete a product from the online market
function fetchDeleteProduct(id) {

    return fetch(`api/v1/products/${id}`, {
        method: 'DELETE',
    })
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}


// Retrieves shopping cart for user from server side
// and returns error or the cart
function fetchCart() {
    return fetch('/api/v1/carts')
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}


// Add an item to the cart for the user
// and returns error or the added item
function fetchAddItem(id, quantity) {
    return fetch(`/api/v1/carts/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json', // set this header when sending JSON in the body of request
        },
        body: JSON.stringify({quantity}),
    })
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {  // response.ok checks the status code from the service
                // This service returns JSON on errors,
                // so we use that as the error object and reject
                return response.json().then(err => Promise.reject(err));
            }
            return response.json(); // happy status code means resolve with data from service
        });
}

// Change an item's quantity in the cart for user
// and returns error or the updated Cart
function fetchSetItemQuantity(id, quantity) {
    return fetch(`/api/v1/carts/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json', // set this header when sending JSON in the body of request
        },
        body: JSON.stringify({quantity}),
    })
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {  // response.ok checks the status code from the service
                // This service returns JSON on errors,
                // so we use that as the error object and reject
                return response.json().then(err => Promise.reject(err));
            }
            return response.json(); // happy status code means resolve with data from service
        });
}

function fetchDeleteItem(id) {
    return fetch( `/api/v1/carts/${id}`, {
        method: 'DELETE',
    })
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

// For admin only
// Get all orders
function fetchOrders() {
    return fetch('/api/v1/orders')
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

// Make an order for the user
// and returns error or the order’s ID
function fetchMakeOrder() {
    return fetch('/api/v1/orders', {
        method: 'POST',
    })
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {  // response.ok checks the status code from the service
                // This service returns JSON on errors,
                // so we use that as the error object and reject
                return response.json().then(err => Promise.reject(err));
            }
            return response.json(); // happy status code means resolve with data from service
        });
}

//For admin only
function fetchDeleteOrder(id) {

    return fetch(`api/v1/orders/${id}`, {
        method: 'DELETE',
    })
        .catch(err => Promise.reject({error: 'network-error'}))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}


export {
    fetchLogin,
    fetchCheckSession,
    fetchLogout,

    fetchProducts,
    fetchAddMoreProducts, // For admin only
    fetchResetProducts, // For admin only
    fetchDeleteProduct, // For admin only

    fetchCart,
    fetchSetItemQuantity,
    fetchAddItem,
    fetchDeleteItem,

    fetchOrders,// For admin only
    fetchMakeOrder,
    fetchDeleteOrder,//For admin only
};