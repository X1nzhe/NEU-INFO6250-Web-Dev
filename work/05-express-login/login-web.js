"use strict";

const loginWeb = {
    
    loginPage: function() {
        return `
              <!doctype html>
              <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="home.css">
                    <link rel="stylesheet" type="text/css" href="login-web.css">
                    <title>Stored Word</title>
                </head>
                <body>
                  <div id="login-page">   
                      ${loginWeb.setLogin()}
                  </div>
                </body>
              </html>
          `;
    },
    setLogin: function (){
        return `
        <div class="login-form">
            <form action="/login" method="POST">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username">
                <button type="submit">Login</button>
            </form>
        </div>
        `;
    }
};
module.exports = loginWeb;