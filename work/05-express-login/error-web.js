"use strict";

const errorWeb = {
    errorPage: function(errorCode, errorMessage) {
        return `
              <!doctype html>
              <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="home.css">
                    <link rel="stylesheet" type="text/css" href="error-web.css">
                    <title>Stored Word</title>
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
        if(errorCode === 400) {
            return `
                    <div class="go-to-home-page">
                        <form action="/home" method="POST">
                            <button type="submit">Go back</button>
                        </form>
                    </div>
                `;
        } else {    // in case of 403 Forbidden
                return ``;
        }
    }
};
module.exports = errorWeb;