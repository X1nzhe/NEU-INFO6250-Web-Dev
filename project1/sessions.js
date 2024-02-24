"use strict";

const uuidv4 = require('uuid').v4;

const sessions = {}; // holds {username, timestamp} by sid. e.g. sessions[123456789] = {username:Alice, timestamp:1707872910898}
const MAX_AGE = 10*60*1000; // 10 minutes

// Sets a new sid for the login user
function createSession(username) {
    const sid = uuidv4();
    sessions[sid] = {username, timestamp: Date.now()};
    return sid;
}

// Retrieves current username by active sid in cookies
function getUsername(sid) {
    if (sessions[sid] && isSessionValid(sid)) {
        return sessions[sid].username;
    } else {
        deleteSession(sid); // session expired
        return null;
    }
}

function deleteSession(sid) {
    delete sessions[sid];
}

function isSessionValid(sid) {
    return (Date.now() - sessions[sid].timestamp) <= MAX_AGE;
}

const sessionsManager = {
    MAX_AGE,
    createSession,
    getUsername,
    deleteSession,
};

module.exports = sessionsManager;