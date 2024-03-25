"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const chats = require('./chats');


app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json()); // Parses requests with json content bodies
app.set('json escape', true); // Enables JSON escape to prevent XSS attacks

// Sessions
// Check for existing session (used on page load)
app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

// Create a new session (login)
app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;

    if(!chats.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if(username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);
    chats.addUser(username);

    res.cookie('sid', sid);

    res.json({ username });
});

// Logout
app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(sid) {
        res.clearCookie('sid');
    }

    if(username) {
        // Delete the session, but not the user data
        sessions.deleteSession(sid);

        // If the user logged out from all devices, as no session for this user, we deactivate the user from the server state
        if (!sessions.countSessionsByUsername(username)) {
            chats.deleteUser(username);
        }
    }

    // We don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({ wasLoggedIn: !!username }); // Provides some extra info that can be safely ignored
});

// Retrieve the Messages list
app.get('/api/v1/messages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const messagesList = chats.messages;

    res.json({ username, messagesList });
});



// Save A New Message
app.post('/api/v1/messages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { message } = req.body;

    if(!message) {
        // Note: Will never happen. Empty text is ignored on front-end.
        res.status(400).json({ error: 'required-message' });
        return;
    }

    chats.addMessage({ sender:username, text:message });

    res.json({ username, sentMessage: message });
});

//Retrieve the active users list
app.get('/api/v1/users', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const usersList = chats.activeUsers;

    res.json({ username, usersList });
})


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));