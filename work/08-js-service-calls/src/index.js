import * as services from "./services";
import * as views from "./views";


// Client side state for indicating views rendering
const clientState = {
    username: null,
    errorMessage: null
};


function render() {
    if (clientState.errorMessage) {
        views.showErrorMessageView(clientState.errorMessage);
        clientState.errorMessage = null;
        return;
    }
    if (clientState.username !== null) {
        services.getWord()
            .then( response => {
                views.showWordView( response.username, response.storedWord );
            })
            .catch( err => {
                if (err && err.error === 'auth-missing') {// A user that is not logged in will get a 401 error from the service call
                    clientState.username = null;
                    views.showLoginView();
                } else {
                    const errorMessage =  services.MESSAGES_TO_USER[err.error] || services.MESSAGES_TO_USER.default;
                    views.showErrorMessageView(errorMessage);
                }
            });
    } else {
        views.showLoginView();
    }
}

// Initial page load logic
// Checks for an existing session when the page loads
function init() {
    services.checkSession()
        .then( response => {
            if(response.username) {
                clientState.username = response.username;
                clientState.errorMessage = null;
            }
        })
        .catch(err => {
            if (err && err.error === 'auth-missing') {
                clientState.username = null;
                clientState.errorMessage = null;
            } else {
                clientState.errorMessage =  services.MESSAGES_TO_USER[err.error] || services.MESSAGES_TO_USER.default;
            }
        })
        .finally( () => {
            render();
        });
}

init();


const appEl = document.querySelector('#app');
appEl.addEventListener('click', (e) => {
    if (e.target.id === 'login-button') {
        e.preventDefault(); // calling service instead of submitting
        const username = document.querySelector('#username').value;
        services.fetchLogin(username)
            .then( response => {
                clientState.username = response.username;
            })
            .catch(err => {
                if (err && err.error === 'auth-missing') {
                    clientState.username = null;
                } else {
                    clientState.errorMessage =  services.MESSAGES_TO_USER[err.error] || services.MESSAGES_TO_USER.default;
                }
            })
            .finally(() => {
                render();
            });
        return;
    }

    if (e.target.id === 'store-button') {
        e.preventDefault();
        const wordInputEl = document.querySelector('#word-input');
        const newWord = wordInputEl.value;

        services.putWord(newWord)
            .then( response => {
                if (response.username !== clientState.username) {
                    clientState.username = null;
                }
            })
            .catch(err => {
                if (err && err.error === 'auth-missing') {
                    clientState.username = null;
                } else {
                    clientState.errorMessage =  services.MESSAGES_TO_USER[err.error] || services.MESSAGES_TO_USER.default;
                }
            })
            .finally(() => {
                render();
            });
        return;
    }

    if (e.target.id === 'logout-button') {
        services.fetchLogout()
            .then( response => {
                    clientState.username = null;
                    clientState.errorMessage = null;
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
