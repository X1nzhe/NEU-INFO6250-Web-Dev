import { useState } from 'react';
import { isValid, isDog } from './utils/login.js';


function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    function checkUsername() {
        if (isDog(username)) {
            setError('Dog is not a valid user.');
            return;
        }

        if (!isValid(username)) {
            setError('The username is only made up with letters, digits and underscores.');
        } else {
            setError('');
            onLogin(username);
        }
    }

    return (
        <div className="login">
            <form>
                <label>
                    <span>Username: </span>
                    <input
                        value={username}
                        onInput={(e) => setUsername(e.target.value)}
                    />
                </label>
                <button
                    type="button"
                    onClick={checkUsername}
                >
                    Login
                </button>
            </form>
            {error && <div className="error"><p>{error}</p></div>}
        </div>
    );
}

export default Login;