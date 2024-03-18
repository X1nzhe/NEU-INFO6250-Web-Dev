//Detailed messages to indicate specific error
const MESSAGES_TO_USER = {
    'network-error': "Server unavailable, pleaser try again",
    'required-username': "The username is only made up of underscore, letters and/or numbers, and no more than 20 characters. Please correct!",
    'auth-insufficient': "Bad password, dog is NOT allowed! ",
    default: "Something went wrong, please try again",
}

function fetchLogin(username) {
    return fetch('/api/v1/session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json', // set this header when sending JSON in the body of request
        },
        body: JSON.stringify( { username } ),
    })
        // fetch() rejects on network error
        // So we convert that to a formatted error object
        // so our caller can handle all "errors" in a similar way
        .catch( err => Promise.reject({ error: 'network-error' }) )
        .then( response => {
            if(!response.ok) {  // response.ok checks the status code from the service
                // This service returns JSON on errors,
                // so we use that as the error object and reject
                return response.json().then( err => Promise.reject(err) );
            }
            return response.json(); // happy status code means resolve with data from service
        });
}


// Checks session validity,
// and returns error or username
function fetchCheckSession() {
    return fetch('/api/v1/session')
        .catch( err => Promise.reject({ error: 'network-error' }) )
        .then( response => {
            if (!response.ok) {
                return response.json().then( err => Promise.reject(err) );
            }
            return response.json();
        });
}

// Retrieves users list from server side
// and returns error or username and the list
function fetchUsersList() {
    return fetch('/api/v1/users')
        .catch( err => Promise.reject({ error: 'network-error' }) )
        .then( response => {
            if(!response.ok) {
                return response.json().then( err => Promise.reject(err) );
            }
            return response.json();
        })
}


// Retrieves messages list for user from server side
// and returns error or username and the list
function fetchMessagesList() {
    return fetch('/api/v1/messages')
        .catch( err => Promise.reject({ error: 'network-error' }) )
        .then( response => {
            if(!response.ok) {
                return response.json().then( err => Promise.reject(err) );
            }
            return response.json();
        })
}


// Send a message for user
// and returns error or username and the message
function fetchSendMessage(message){
    return fetch('/api/v1/messages', {
        method: 'POST',
        headers: {
            'content-type': 'application/json', // set this header when sending JSON in the body of request
        },
        body: JSON.stringify({message}),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if(!response.ok) {  // response.ok checks the status code from the service
                // This service returns JSON on errors,
                // so we use that as the error object and reject
                return response.json().then( err => Promise.reject(err) );
            }
            return response.json(); // happy status code means resolve with data from service
        });
}


// Logouts
// and returns error or a boolean value, wasLoggedIn
function fetchLogout(){

    return fetch('api/v1/session', {
        method:'DELETE'
    })
        .catch( err => Promise.reject({ error: 'network-error' }) )
        .then( response => {
            if(!response.ok) {
                return response.json().then( err => Promise.reject(err) );
            }
            return response.json();
        })
}


export {
    MESSAGES_TO_USER,
    fetchLogin,
    fetchCheckSession,
    fetchUsersList,
    fetchMessagesList,
    fetchSendMessage,
    fetchLogout
};