"use strict";

//Mock stored data
const words = [ // Notice: An array of objects
    {
        username: "Amit",
        word: "HOME",
    },
    {
        username: "Bao",
        word: "WORK",
    }
];

function setWord({ username, word }) {
    const userIndex = words.findIndex(user => user.username === username);

    if (userIndex !== -1) {
        words[userIndex].word = word; // Update stored word for exist user
    } else {
        words.push({ username,word }); // Store the word for our new user
    }
}

function getWord(username) {
    const user = words.find(user => user.username === username);
    return user ? user.word : '';
}

const data = {
    setWord,
    getWord,
};

module.exports = data;