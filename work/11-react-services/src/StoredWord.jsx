function StoredWord( { storedWord }) {

    return (
        <div id="stored-word">
            {   storedWord ?
                <p>Your stored word is <strong>{storedWord}</strong>.</p>
            :
                <p>Your stored word has been set to empty.</p>
            }
        </div>
    );
}

export default StoredWord;