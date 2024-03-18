import * as services from "./services";
import * as views from "./views";

// Client side state for indicating what views will be rendered
const clientState = {
    isInitialLogin: true,
    username: null,
    messagesList: null,
    usersList : null, // Indicates users change
    errorMessage: null
};

// Reset the client state to initial status once current user doesn't have valid authn.
function resetClientState() {
    clientState.isInitialLogin = true;
    clientState.username = null;
    clientState.messagesList = null;
    clientState.usersList = null;
    clientState.errorMessage = null;
}


// Kindly Note: When you are using the chat app with Developer tools on browsers, the page will be flickering.
function render() {
    if (clientState.errorMessage) {
        views.showErrorMessageView(clientState.errorMessage);
        clientState.errorMessage = null;
        return;
    }

    if (clientState.username) {

        if (clientState.isInitialLogin) {

            views.showChatView(clientState.username,[],[]);
            views.showLoadingIndicator();

            setTimeout( () => { //Display the loading indicator for 2 seconds

                views.showChatView(clientState.username, clientState.usersList, clientState.messagesList);

                // Scroll the messages list to the bottom for showing new messages
                views.scrollMessagesListToBottom();

            },2000);

            clientState.isInitialLogin = false;
        } else {

            views.showChatView(clientState.username, clientState.usersList, clientState.messagesList);

            // Scroll the messages list to the bottom for showing new messages
            views.scrollMessagesListToBottom();
        }

    } else {
        views.showLoginView();
    }
}


// Initial page load logic
// Checks for an existing session when the page loads
function init() {
    views.showLoadingIndicator();

    services.fetchCheckSession()
        .then( response => {
            if(response.username) {
                // Update client state for the logged in user
                clientState.username = response.username;
                clientState.errorMessage = null;
                return Promise.all([refreshMessagesList(), refreshUsersList()]);
            }
        })
        .catch(err => {
            if (err && err.error === 'auth-missing') {
                resetClientState();
            } else {
                clientState.errorMessage =  services.MESSAGES_TO_USER[err.error] || services.MESSAGES_TO_USER.default;
            }
        })
        .finally( () => {

            setTimeout(() => { // Display the loading indicator for 1.5 seconds
                render();
            }, 1500);

        });
}

init();


function refreshMessagesList() {
    return new Promise((resolve, reject) => {
        services.fetchMessagesList()
            .then( response => {
                if (!clientState.messagesList || clientState.messagesList.length < response.messagesList.length) {
                    clientState.messagesList = response.messagesList;
                    resolve('update');
                }
                resolve();
            })
            .catch( err => {
                if (err && err.error === 'auth-missing') {// A user that is not logged in will get a 401 error from the service call
                    resetClientState();
                } else {
                    clientState.errorMessage =  services.MESSAGES_TO_USER[err.error] || services.MESSAGES_TO_USER.default;
                }
                reject(err);
            });
    });
}

function refreshUsersList() {
   return new Promise((resolve,reject) => {
        services.fetchUsersList()
            .then ( response => {
                if (!clientState.usersList || JSON.stringify(clientState.usersList) !== JSON.stringify(response.usersList) ) { // Checks any change on the users list on the server-side
                    clientState.usersList = response.usersList;
                    resolve('update');
                }
                resolve();
            })
            .catch( err => {
                if (err && err.error === 'auth-missing') {// A user that is not logged in will get a 401 error from the service call
                    resetClientState();
                } else {
                    clientState.errorMessage =  services.MESSAGES_TO_USER[err.error] || services.MESSAGES_TO_USER.default;
                }
                reject(err);
            });
    });
}


// Polling functions
function renderMessagesList() {
    refreshMessagesList()
        .then( response => {
            if (response === 'update') {
                views.showMessagesList(clientState.messagesList);
            }
        })
        .catch( err => { // We ignore this error since errors have been stored in the refreshMessagesList function
            render();
        });
}

function renderUsersList() {
    refreshUsersList()
        .then( response => {
            if (response === 'update') {
                views.showUsersList(clientState.usersList);
            }
        })
        .catch( err => { // We ignore this error since errors have been stored in the refreshUsersList function
            render();
        });
}

function pollChanges() {
    if (clientState.username) {
        renderMessagesList();
        renderUsersList();
    }
    setTimeout(pollChanges, 5000); // Poll every 5 seconds
}

pollChanges();



// Event listeners
const appEl = document.querySelector('#chat-app');
appEl.addEventListener('click', (e) => {
    if (e.target.id === 'login-button') {

        e.preventDefault(); // calling service instead of submitting

        const username = document.querySelector('#username').value;
        services.fetchLogin(username)
            .then( response => {

                clientState.username = response.username;
                return Promise.all([refreshMessagesList(), refreshUsersList()]);

            })
            .catch(err => {

                if (err && err.error === 'auth-missing') {
                    resetClientState();
                } else {
                    clientState.errorMessage =  services.MESSAGES_TO_USER[err.error] || services.MESSAGES_TO_USER.default;
                }

            })
            .finally(() => {
                render();
            });
        return;
    }

    if (e.target.id === 'send-button') {

        e.preventDefault(); // calling service instead of submitting

        const messageInputEl = document.querySelector('#to-send');
        const newMessage = messageInputEl.value;

        if (newMessage) { // Ignore empty input
            services.fetchSendMessage(newMessage)
                .then( response => {

                    if (response.username !== clientState.username) {
                        resetClientState();
                        return;
                    }

                    return Promise.all([refreshMessagesList(), refreshUsersList()]);

                })
                .catch(err => {

                    if (err && err.error === 'auth-missing') {
                        resetClientState();
                    } else {
                        clientState.errorMessage =  services.MESSAGES_TO_USER[err.error] || services.MESSAGES_TO_USER.default;
                    }

                })
                .finally(() => {
                    render();
                });
        }
        return;
    }

    if (e.target.id === 'logout-button') {
        services.fetchLogout()
            .then( response => {
                resetClientState();
            })
            .catch( err => {

                if (err && err.error !== 'auth-missing') {
                    clientState.errorMessage =  services.MESSAGES_TO_USER[err.error] || services.MESSAGES_TO_USER.default;
                }

            })
            .finally( () => {
                render();
            });
    }
});