const SECRET_WORD = "RECAT";

function compare(guess) {
    // Covert inputs to lower case to ensure case-insensitive
    const word = SECRET_WORD.toLowerCase();
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

function exactMatch(guess) {
    return SECRET_WORD.toLowerCase() === guess.toLowerCase(); //case-insensitive
}

function isValidWord(word) {
    let isValid = true;
    isValid = !!word && word.trim().length === 5;
    isValid = isValid && word.match(/^[A-Za-z]+$/);
    return isValid;
}



export  {compare, exactMatch, isValidWord};