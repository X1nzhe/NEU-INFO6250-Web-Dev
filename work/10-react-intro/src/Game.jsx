import { useState } from 'react';
import { compare, exactMatch, isValidWord } from './utils/game.js';

function Game({ username, onLogout }) {
    const [inputWord, setInputWord] = useState('');
    const [message, setMessage] = useState('');

    function onGuess() {
        if (!inputWord) {
            return;
        }

        if (!isValidWord(inputWord)) {
            setMessage(inputWord + " was not a valid word");
            setInputWord('');
            return;
        }

        if (exactMatch(inputWord)){
            setMessage(inputWord + " is the secret word!");
        } else {
            const matchedCount = compare(inputWord);
            setMessage(inputWord + " had "+matchedCount+" letter(s) in common");
        }
        setInputWord('');
    }


    return (
        <>
            <div className="game">
                <div className="greeting">
                    Hello {username}!
                    <button onClick={onLogout}>Logout</button>
                </div>
                <form className="guess">
                    <p>Let's guess the secret word. It contains 5 characters.</p>
                    <div>
                        <label>
                            <input
                                value={inputWord}
                                onInput={(e) => setInputWord(e.target.value)}
                                placeholder="Enter your word"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={onGuess}
                        >
                            Guess
                        </button>
                    </div>
                </form>
                {message && <div className="message"><p>{message}</p></div>}
            </div>
        </>
    );
}

export default Game;