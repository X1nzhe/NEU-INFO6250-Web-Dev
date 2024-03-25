"use strict";

const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
    const sid = uuid();
    sessions[sid] = {
        username,
    };
    return sid;
}

function getSessionUser(sid) {
    return sessions[sid]?.username;
}

function deleteSession(sid) {
    delete sessions[sid];
}

function countSessionsByUsername(username) {
    let count = 0;
    for (const sid in sessions) {
        if ( sessions[sid]?.username === username ) {
            count++;
        }
    }
    return count;
}

module.exports = {
    addSession,
    deleteSession,
    getSessionUser,
    countSessionsByUsername,
};