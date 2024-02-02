"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
  // Covert inputs to lower case to ensure case-insenstive
  const lowerWord = word.toLowerCase();
  let lowerGuess = guess.toLowerCase(); //  Letter removeable once that letter matched within first word

  // The number of common letters between two words
  let result = 0;

  /* For each letter in the first word, we check if the same letter exists in the second word.
  Once a common letter is found, we remove that letter from the second word to avoid over-counting, such as "TOO" vs "TWO" should be 2 common letters instead of 3
  and increment the result. */
  for ( let i = 0; i < lowerWord.length; i++ ) {
    const letter = lowerWord[i];
    if (lowerGuess.includes(letter)) {
      result++;
      lowerGuess = lowerGuess.replace(letter, '');
    }
  }

  return result;
}
