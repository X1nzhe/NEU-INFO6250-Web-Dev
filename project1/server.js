"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
// Note: uuid has been set in and been managed by the "sessions.js"

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const sessionsManager = require('./sessions'); // "sessions" holds all the non-web logic for managing sessions
const gameManager = require('./game');// "game" holds all the non-web logic for managing users/games
const gameWeb = require('./game-web');// "game-web" holds the templates for the generated HTML of Game Page
const loginWeb = require('./login-web'); // "login-web" holds the templates for the generated HTML of Login Page
const errorWeb = require('./error-web'); // "error-wen" holds the templates for the generated HTML of error messages
const GREETING = "Welcome! Let's guess the secret word."


app.use(express.static('./public'));


// Home page handler
app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessionsManager.getUsername(sid); // Check sid validity

    if( username ) {
        const currentGame = gameManager.games[username];

        if ( !currentGame ) { // No active game for the user
            gameManager.createGame(username);// Initial a game. A logged in user will see the game
            res.send(gameWeb.gamePage(gameManager,username,GREETING)); // Login success, shows the Game Page
        }else { // There is an active game
            const playResult = gameManager.games[username].turnResult;
            res.send(gameWeb.gamePage(gameManager,username,playResult)); // A game exist, show game state on the Game Page
        }
    } else { // sid invalid
        res.send(loginWeb.loginPage()); // Invalid login in cases of neither Not login nor The User is not found nor Session Expired
    }
});

// Login button handler
app.post('/login', (req, res) => {
    const username = req.body.username.trim();

    // Prevent illegal usernames
    if ( !username || !/^[a-zA-Z0-9]+$/.test(username) ) { // Only letters or numbers allowed
        const errorMessage = '400 Bad Request: The username is made up of letters or numbers only!';
        const errorCode = 400;
        res.status(errorCode).send(errorWeb.errorPage(errorCode, errorMessage));
        return;
    }

    // Prevent "bad password"
    if ( username.toLowerCase() === 'dog' ) {
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

//Guess button handler
app.post('/guess', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessionsManager.getUsername(sid);

    if (!username) {
        res.redirect('/'); // Neither Session expired nor user is not found
        return;
    }

    // Disable the guess operation and do nothing if the player has won
    const currentGame = gameManager.games[username];
    if (currentGame.playerWin) {
        return;
    }

    // Updates game state for the user
    const guess = req.body.word.trim();
    gameManager.playGame(username, guess);

    res.redirect('/'); // Redirect to the home page
})

// New game button handler
app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessionsManager.getUsername(sid); // check sid valid

    if (!username) {
        res.redirect('/'); // Neither Session expired nor user is not found
        return;
    }

    gameManager.deleteGame(username);
    // Note: a new game will be created by the Home page handler

    res.redirect('/'); // Redirect to the home page
})

// Logout button handler
app.post('/logout',(req, res) => {
    const sid = req.cookies.sid;

    // Clear current session, but we keep active game data for the user
    sessionsManager.deleteSession(sid);
    res.clearCookie('sid');
    res.redirect('/');
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));