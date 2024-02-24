"use strict";

const errorWeb = {
    errorPage: function(errorCode, errorMessage) {
        return `
              <!doctype html>
              <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="home.css">
                    <link rel="stylesheet" type="text/css" href="error-web.css">
                    <title>Words Guess</title>
                </head>
                <body>
                  <div id="error-page">   
                      ${errorWeb.setErrorMessage(errorMessage)}
                      ${errorWeb.setGoHome(errorCode)}
                  </div>
                </body>
              </html>
          `;
    },
    setErrorMessage: function (errorMessage){
        return `
                <div class="error-message">
                    <p>${errorMessage}</p>
                </div>
                `;
    },

    setGoHome: function (errorCode) {
        return `
                <div class="go-to-home-page">
                    <p>Click <a href="/">here</a> to go back to the home page.</p>
                </div>
            `;
    }
};
module.exports = errorWeb;