export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
    LOGGING_OUT: 'loggingOut',
    DISALLOWED: 'disallowed',
};


export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_WORD: 'required-word',
    INVALID_WORD: 'invalid-word'
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
    DISALLOWED_USER: 'disallowedUser'
};

//Detailed messages to indicate specific error
export const MESSAGES_TO_USER = {
    [CLIENT.NETWORK_ERROR]: "Server unavailable, pleaser try again",
    [CLIENT.DISALLOWED_USER]: "You are not allowed to access the website.",
    [SERVER.REQUIRED_USERNAME]: "The username is only made up of underscore, letters and/or numbers. Please correct!",
    [SERVER.REQUIRED_WORD]:"Please input a word",
    [SERVER.INVALID_WORD]:"Please input an valid word",
    default: "Something went wrong, please try again",
}