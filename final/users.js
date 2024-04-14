"use strict";

const PERMISSIONS = {
	ADMIN: 'admin',
	USER: 'user',
	BANNED: 'banned'
};

const activeUsers = {};


//Server-side allowlist to sanitize the username
function isValid(username) {
	let isValid = true;
	isValid = isValid && username.trim().length <= 10;
	isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
	return isValid;
}

function addUser(username) {
	if (isValid(username)) {
		let permission = PERMISSIONS.USER;

		if (username === 'dog') {
			permission = PERMISSIONS.BANNED;
		} else if (username === 'admin') {
			permission = PERMISSIONS.ADMIN;
		}

		activeUsers[username] = {
			username: username,
			permission: permission
		};
	}
}

function getPermissionUser(username) {
	return activeUsers[username]?.permission;
}

function deleteUser(username) {
	delete activeUsers[username];
}


module.exports = {
	isValid,
	addUser,
	deleteUser,
	getPermissionUser,
	activeUsers,
	PERMISSIONS
};