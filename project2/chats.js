"use strict";

const activeUsers = {};

const messages = [];


//Server-side allowlist to sanitize the username
function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim().length <= 20;
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function addUser(username) {
    if (isValidUsername(username)) {
        activeUsers[username] = username;
    }
}

function deleteUser(username) {
    delete activeUsers[username];
}

function addMessage({ sender, text }) {
    const newMessage = {
        sender,
        text,
    };
    messages.push(newMessage);
}


module.exports = {
    isValidUsername,
    addUser,
    deleteUser,
    addMessage,
    activeUsers,
    messages,
};