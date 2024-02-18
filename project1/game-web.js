"use strict";

const gameWeb = {

    gamePage: function(gameManager,username,message="") {

        return `
              <!doctype html>
              <html lang="en">
                <head>
                    <link rel="stylesheet" type="text/css" href="home.css">
                    <link rel="stylesheet" type="text/css" href="game-web.css">
                    <title>Guess A Word!</title>
                </head>
                <body>
                      <div id="game-page">
                            <div id="header"> 
                               <h1 id="heading">Guess A Word!</h1>
                               <div id="statistics">
                                    ${gameWeb.showStatistics(gameManager)} 
                                </div>
                            </div>
                            <div id="game-panel">
                                 <div id="left-panel">
                                      ${gameWeb.getWordsList(gameManager,username)}
                                 </div>
                                 <div id="right-panel">
                                      ${gameWeb.countValidGuesses(gameManager,username)}
                                      ${gameWeb.getGuessedWordsList(gameManager,username)}
                                      ${gameWeb.showMessage(message)}
                                      ${gameWeb.makeGuess()}
                                 </div>
                            </div>
                          <div id="footer">
                              ${gameWeb.newGame()} 
                              ${gameWeb.setLogout()}
                          </div>
                      </div>
                </body>
              </html>
          `;
    },
    showStatistics: function (gameManager) {
        const statistics = gameManager.getStatistics();

        if(statistics.length === 0) {
            return `
                <div id="top-players">
                    <span class="highlight">Top Players</span>
                    <p class="no-players">TBD, No players yet.</p>
                </div>`;
        }

        return `
               <div id="top-players">
               <span class="highlight">Top Players</span>
                    <ol class="players">`+ Object.values(statistics).map( player => `
                        <li>
                            <p class="player">${ player.username} wins ${player.wins} games</p>                          
                        </li>
                        `).join('')+
                    `</ol>
               </div>`;
    },

    getWordsList: function (gameManager,username) {
        const currentGame = gameManager.games[username];

        return `<p class="subheading">Possible Words</p>
                <div class="possible-words-list">
                    <ul class="words-list">`+ Object.values(currentGame.remainingWords).map( word => `
                        <li>
                            <p class="word">${word}</p>
                        </li>
                        `).join('')+
                    `</ul>
                </div>`;
    },
    countValidGuesses: function (gameManager,username) {
        const currentGame = gameManager.games[username];

        return `
            <p id="valid-guesses">Valid Guesses: ${currentGame.validGuessCount}</p>
        `;
    },
    getGuessedWordsList: function (gameManager,username) {
        const currentGame = gameManager.games[username];

        return `<ol id="guessed-words">`+ Object.values(currentGame.guessedWords).map( word => `
                    <li>
                        <div class="word">
                            <p> <span class="highlight">${ word.guessedWord } </span> matched <span class="highlight">${ word.matched }</span> letters.</p>
                        </div>
                    </li>
                    `).join('')+
                `</ol>`;
    },

    showMessage: function ( message ) {
        return `<div id="message-panel">
                    <p class="message">${message}</p> 
                </div>`;
    },

    makeGuess: function () {
        return `
                <div id="guess-panel">
                    <form action="/guess" method="POST">
                        <input type="text" id="word" name="word" placeholder="Enter a word">
                        <button type="submit">Guess</button>   
                    </form>
                </div>
                `;
    },

    newGame: function () {
        return `<div id="new-game-button">
                    <form action="/new-game" method="POST">
                        <button type="submit">New Game</button>
                    </form>
                </div>`;
    },

    setLogout: function (){
        return `<div id="logout-button">
                    <form action="/logout" method="POST">
                        <button type="submit">Logout</button>
                    </form>
                </div>`;
    }
};

module.exports = gameWeb;