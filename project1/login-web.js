"use strict";

const loginWeb = {

    loginPage: function() {
        return `
              <!doctype html>
              <html lang="en">
                <head>
                    <link rel="stylesheet" type="text/css" href="home.css">
                    <link rel="stylesheet" type="text/css" href="login-web.css">
                    <title>Guess A Word!</title>
                </head>
                <body>
                    <div id="header"> 
                       <h1>Guess A Word!</h1>
                       <p id="login-greet">Enter your username to login</p>
                    </div>
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