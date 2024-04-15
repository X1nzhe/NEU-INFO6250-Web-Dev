import { useState } from 'react';

function ChangeForm({ onChangeWord }) {
    const [ word, setWord ] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        onChangeWord(word);
        setWord('');
    }

    function onTyping(e) {
        setWord(e.target.value);
    }

    return (
        <form className="word__form" action="#/change" onSubmit={onSubmit}>
            <input className="word__input" value={word} placeholder="Input a word here" onChange={onTyping}/>
                <button className="store__button" type="submit">Store</button>
        </form>
    );
}

export default ChangeForm;