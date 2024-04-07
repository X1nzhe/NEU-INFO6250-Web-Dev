function isDog(username) {
    return username.toLowerCase() === 'dog';
}

function isValid(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

export {isDog, isValid};