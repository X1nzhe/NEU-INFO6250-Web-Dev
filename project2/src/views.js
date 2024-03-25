function showChatView(username, usersList, messagesList) {
    const appEl = document.querySelector('#chat-app');

    const usersHtml = generateUsersHtml(usersList);
    const messagesHtml = generateMessagesHtml(messagesList);
    const outgoingHtml = generateOutgoingHtml();

    appEl.innerHTML = `
        <div id="chat-view">
            <div id="greeting">
                <p>Hello, ${username}!</p>
                <div id="logout">
                    <button id="logout-button" type="submit">Logout</button>
                </div>
            </div>
            <div id="main-panel">
                <div id="users-list">
                    ${usersHtml}
                </div>
                <div id="messages-list">
                    ${messagesHtml}
                </div>
                <div id="outgoing">
                    ${outgoingHtml}  
                </div>
            </div>
        </div>
    `;
}

function generateUsersHtml(usersList) {
    return `<ul class="users">` +
            Object.values(usersList).map( user => `
            <li>
               <div class="user">
                 <span class="username">${user}</span>
               </div>
            </li>
          `).join('') +
           `</ul>`;
}

function generateMessagesHtml(messagesList) {
    return `<ol class="messages">` +
            // Generate the HTML for the list of messages
            Object.values(messagesList).map( message => `
            <li>
                <div class="message">
                  <img class="avatar" alt="avatar of ${message.sender}" src="//placehold.co/40x40?text=${message.sender}"/>  
                  <span class="username">${message.sender}</span>
                  <div class="message-text">${message.text}</div>
                </div>
            </li>
        `).join('')+
            `</ol>`;
}

function generateOutgoingHtml() {
    return `
        <div id="message-form">
            <form>
                <textarea id="to-send" name="text" placeholder="Enter text to send"/></textarea>
                <button id="send-button" type="submit">Send</button>
            </form>
        </div>
    `;
}


// For a smaller render function which only shows messages list area
function showMessagesList(messagesList) {
    const messagesListEl = document.querySelector('#messages-list');
    messagesListEl.innerHTML = generateMessagesHtml(messagesList);
    scrollMessagesListToBottom();
}


// For a smaller render function which only shows users list area
function showUsersList(usersList) {
    const usersListEl = document.querySelector('#users-list');
    usersListEl.innerHTML = generateUsersHtml(usersList);
}

function showLoginView() {
    const appEl = document.querySelector('#chat-app');
    appEl.innerHTML = `
        <div id="login-view">
            <h1>Chat Forum</h1>
            <form id='login-form'>
                <input id="username" type="text" placeholder="Enter your username">
                <button id="login-button" type="submit">Login</button>
            </form>
        </div>
    `;
}



function showErrorMessageView(errorMessage) {
    const appEl = document.querySelector('#chat-app');
    appEl.innerHTML = `
        <div id="error-content">
            <p id="error-message">${errorMessage}</p>
            <a href="/">Go back</a>
        </div>
    `;
}


// Scroll the messages list to the bottom for showing new messages
function scrollMessagesListToBottom() {
    const messagesEl = document.querySelector('.messages');
    if (messagesEl) {
        messagesEl.scrollIntoView(false);
    }
}

function showLoadingIndicator() {
    const appEl = document.querySelector('#chat-app');
    const loadingIndicatorHtml = `
        <div class="loading-indicator">
            <i class="gg-spinner"></i>
        </div>
    `;
    appEl.insertAdjacentHTML('beforeend',loadingIndicatorHtml);

}


export  {
    showChatView,
    showLoginView,
    showErrorMessageView,
    showMessagesList,
    showUsersList,
    scrollMessagesListToBottom,
    showLoadingIndicator
};
