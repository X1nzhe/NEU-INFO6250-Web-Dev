"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
// Note: uuid has set in and managed by the "sessions.js"

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const sessionsManager = require('./sessions'); // "sessions" holds all the non-web logic for managing sessions
const data = require('./data'); // "data" holds all the non-web logic for managing users/words
const dataWeb = require('./data-web'); // "data-web" holds the templates for the generated HTML of Data Page
const loginWeb = require('./login-web'); // "login-web" holds the templates for the generated HTML of Login Page
const errorWeb = require('./error-web'); // "error-wen" holds the templates for the generated HTML of error messages

app.use(express.static('./public'));


// Home page handler
app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessionsManager.getUsername(sid);

    if( sid && username ) {
        res.send(dataWeb.dataPage(username, data)); // Login success, shows Data Page
    } else {
        res.send(loginWeb.loginPage()); // Invalid login in cases of neither Not login nor The User is not found nor Session Expired
    }
});

// Changes users' stored word
app.post('/change-word', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessionsManager.getUsername(sid);

    if (!username) {
        res.redirect('/'); // Neither Session expired nor user is not found
        return;
    }

    const word = req.body.word.trim();

    data.setWord({ username, word });// Update the stored word for current user

    res.redirect('/'); // Redirect to the home page
});

app.post('/login', (req, res) => {
    const username = req.body.username.trim();

    // Prevent illegal usernames
    if (!username || !/^[a-zA-Z0-9]+$/.test(username)) {
        const errorMessage = '400 Bad Request: The username is made up of letters or numbers only!';
        const errorCode = 400;
        res.status(errorCode).send(errorWeb.errorPage(errorCode, errorMessage));
        return;
    }

    // Prevent "bad password"
    if (username.toLowerCase() === 'dog') {
        const errorMessage = '403 Forbidden: \'dog\' is not allowed!';
        const errorCode = 403;
        res.status(errorCode).send(errorWeb.errorPage(errorCode, errorMessage));
        return;
    }

    // Set sid and cookie for legal users
    const sid = sessionsManager.createSession(username);
    res.cookie('sid', sid,{ maxAge: sessionsManager.MAX_AGE });
    res.redirect('/');
})

app.post('/logout',(req, res) => {
    const sid = req.cookies.sid;

    sessionsManager.deleteSession(sid);
    res.clearCookie('sid');
    res.redirect('/');

})

// Go back to home page when input username is invalid
app.post('/home',(req,res) => {
    res.redirect('/');
})


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
