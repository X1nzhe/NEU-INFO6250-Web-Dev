function showWordView(username, word) {
    const appEl = document.querySelector('#app');
    const storedWordHtml = generateStoredWordHtml(word);

    appEl.innerHTML = `
        <div id="word-view">
            <div id="current-user">
                <p>Hello, ${username}!</p>
            </div>
            <div id="main-panel">
                ${storedWordHtml}
                <div id="change-word">
                    <form id="word-form">
                        <input id="word-input" type="text" placeholder="Input a word here">
                        <button id="store-button" type="submit">Store</button>
                    </form>
                </div>
                <div id="logout">
                    <button id="logout-button" type="submit">Logout</button>
                </div>  
            </div>
        </div>
    `;
}


function generateStoredWordHtml(word) {
    if (word) {
        return `
            <div id="stored-word">
                <p>Your stored word is <strong>${word}</strong>.</p>
            </div>
        `;
    } else {
        return `
            <div id="stored-word">
                <p>Your stored word has been set to empty.</p>
            </div>
        `;
    }
}


function showLoginView() {
    const appEl = document.querySelector('#app');
    appEl.innerHTML = `
        <h1>Stored Your Word</h1>
        <div id="login-view">
            <form id='login-form'>
                <input id="username" type="text" placeholder="Enter your username">
                <button id="login-button" type="submit">Login</button>
            </form>
        </div>
    `;
}


function showErrorMessageView(errorMessage) {
    const appEl = document.getElementById('app');
    appEl.innerHTML = `
        <div id="error-content">
            <p id="error-message">${errorMessage}</p>
            <a href="/">Go back to home page</a>
        </div>
    `;
}


export  {showWordView, showLoginView, showErrorMessageView};