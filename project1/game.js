"use strict";

const words = require('./words');

const games = {}; // active games
const statistics = [];// top players

function createGame(username) {
    const secretWord = pickWord();

    games[username] = {
        secretWord : secretWord,
        guessedWords: [], // Ordering required for 'latest guess', [{guessedWord,matched}]
        remainingWords : words.slice(),
        validGuessCount: 0,
        turns: 0,
        turnResult: ``,
        playerWin: false,
    };

    console.log(`Game started! Current player is [${username}] with the secret word [${secretWord}].`); // For grading
}

function deleteGame(username) {
    delete games[username];
}

function playGame(username, guess) {
    const game = games[username];

    // Start a turn
    const matchedCount = compare(game.secretWord, guess);
    game.turns++;

    // invalid guess
    if (!isGuessValid(username,guess)) {
        game.turnResult = `Invalid guess!`;
        return;
    }

    // Valid guess
    game.validGuessCount++;
    game.guessedWords.push({ guessedWord:guess.toLowerCase(), matched: matchedCount});
    game.remainingWords = game.remainingWords.filter(word => word.toLowerCase() !== guess.toLowerCase());

    // Correct guess
    if (exactMatch(game.secretWord,guess)) {
        // Update games and statistics
        games[username].playerWin = true;
        updateStatistics(username);
        game.turnResult = `Correct! You have won the game! <br>Press <span class="highlight">[New Game]</span> below to start a new game.`;
        return;
    }

    // Incorrect guess
    game.turnResult = `Your word <span class="highlight">${guess}</span> matched ${matchedCount} letters out of ${game.secretWord.length}`;
}

// Top 5 players, ranked by their wins
function getStatistics() {
    statistics.sort((a,b) => b.wins - a.wins);
    return statistics.slice(0, 5);
}


// Utility methods
function pickWord(){
    return words[Math.floor(Math.random() * words.length)];
}

function exactMatch(word, guess) {
    return word.toLowerCase() === guess.toLowerCase(); //case-insensitive
}

function isGuessValid(username, guess){
    const game = games[username];

    return (
        guess && game
        && (/^[a-zA-Z]+$/.test(guess))  //Only single English word allowed
        && game.remainingWords.includes(guess.toLowerCase()) // that are on the list of remaining possible words
        && !game.guessedWords.some( attempt => attempt.guessedWord === guess.toLowerCase() ) // that has not already been guessed
    );
}

function updateStatistics(username){
    const userIndex = statistics.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        statistics[userIndex].wins++;
    } else {
        statistics.push({username:username, wins:1})
    }
}

function compare( word, guess ) {
    // Covert inputs to lower case to ensure case-insensitive
    word = word.toLowerCase();
    guess = guess.toLowerCase();

    // The number of common letters between two words
    let matchedCount = 0;

    for ( let wordIndex = 0; wordIndex < word.length; wordIndex++ ) {
        const letter = word[wordIndex];
        if (guess.includes(letter)) {
            matchedCount++;
            guess = guess.replace(letter, '');
        }
    }

    return matchedCount;
}

const game = {
    games,
    createGame,
    deleteGame,
    playGame,
    getStatistics
}

module.exports = game;