import { useState } from 'react';
import './App.css';
import Login from './Login';
import Game from './Game';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    function onLogin(username) {
        setUsername(username);
        setIsLoggedIn(true);
    }

    function onLogout() {
        setIsLoggedIn(false);
        setUsername('');
    }

    return (
        <div className="app">
          { isLoggedIn
              ? <>
                  <Game
                      username={username}
                      onLogout={onLogout}
                  />
                </>
              : <>
                  <Login
                      onLogin={onLogin}
                  />
              </>
          }
        </div>
    );
}

export default App;
