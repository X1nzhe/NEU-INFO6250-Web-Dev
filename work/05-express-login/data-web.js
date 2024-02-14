"use strict";
// Render Data page
const dataWeb = {

    dataPage: function(username,data) {
        return `
              <!doctype html>
              <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="home.css">
                    <link rel="stylesheet" type="text/css" href="data-web.css">
                    <title>Stored Word</title>
                </head>
                <body>
                  <div id="data-page">
                      ${dataWeb.getUser(username)}
                      <div id="main-panel">
                          ${dataWeb.getUserWord(username,data)}
                          ${dataWeb.changeUserWord()}
                          ${dataWeb.setLogout()}                    
                      </div>
                  </div>
                </body>
              </html>
          `;
    },
    getUser:function (username) {
        return `<div class="current-user">
                    <p>Hello, ${username}!</p>
                 </div>`;
    },

    getUserWord:function (username,data) {
        return `<div class="stored-word">
                    <p>Your Stored Word Is <strong>${data.getWord(username)}</strong> </p>
                </div>`;
    },

    changeUserWord: function () {
        return `<div class="change-word">
                    <form action="/change-word" method="POST">
                        <label for="word">Change your stored word:</label>
                        <input type="text" id="word" name="word">
                        <button type="submit">Change</button>
                    </form>
                </div>`;
    },

    setLogout: function () {
        return `<div class="logout-button">
                    <form action="/logout" method="POST">
                        <button type="submit">Logout</button>
                    </form>
                </div>`;
    }
};

module.exports = dataWeb;