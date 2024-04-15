import { useState, useEffect } from 'react';
import './App.css';
import {
    LOGIN_STATUS,
    CLIENT,
    SERVER,
} from './constants';

import {
    fetchCheckSession,
    fetchLogin,
    fetchLogout,
    fetchGetWord,
    fetchStoreWord,
} from './services';

import Status from './Status';
import Loading from './Loading';
import LoginForm from './LoginForm';
import StoredWord from './StoredWord';
import ChangeForm from './ChangeForm';
import LogoutButton from './LogoutButton';

function App() {
    const [ error, setError ] = useState('');
    const [ username, setUsername] = useState('');
    const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING);
    const [ storedWord, setStoredWord] = useState('');
    const [ isWordLoading, setIsWordLoading ] = useState(false);
    function onLogin( username ){
        setIsWordLoading(true);
        setError('');

        fetchLogin(username)
            .then( response => {

                setError('');
                setUsername(response.username);
                setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);

                setTimeout(() => { // Setup 2 seconds delay to mock loading resources
                    setIsWordLoading(false); // Disable loading indicator
                    setStoredWord( response.storedWord);
                }, 2000);

            })
            .catch( err => {
                setLoginStatus(LOGIN_STATUS.PENDING); // Login was failed. Shows loading indicator

                setTimeout(() => { // Setup 2 seconds delay to mock loading resources
                if( err?.error === SERVER.AUTH_MISSING ) {
                    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
                    return;

                } else if ( err?.error === SERVER.AUTH_INSUFFICIENT ) { // The user is disallowed.
                    setLoginStatus(LOGIN_STATUS.DISALLOWED);
                    setError(CLIENT.DISALLOWED_USER);
                    return;
                }
                    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN); // Other cases with no logged in status.
                    setError( err?.error || 'ERROR');
                },2000);
            });
    }

    function onLogout() {
        setError('');
        setLoginStatus(LOGIN_STATUS.LOGGING_OUT);

        setTimeout( () => { // Setup 2 seconds delay to mock loading resources
            // Reset states
            setError('');
            setUsername('');
            setStoredWord('');
            setIsWordLoading(false);

            fetchLogout()
                .then( () => {
                    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN); // Successfully logged out
                })
                .catch( err => {
                    setError( err?.error || 'ERROR');
                });

        }, 2000);
  }

  // Submit a new word
    function onChangeWord( word ) {

        setError('');
        setIsWordLoading(true); //Shows loading indicator

        fetchStoreWord( word )
        .then( response => {

            setTimeout(() => { // Setup 2 seconds delay to mock loading resources
                setIsWordLoading(false); //Hides loading indicator
                setStoredWord( response.storedWord);
            }, 2000);

        })
        .catch( err => {
            setIsWordLoading(false); //Hides loading indicator
            setError( err?.error || 'ERROR');
        })

    }

    function checkForSession() {

        setTimeout( () => { // Setup 2 seconds delay to mock loading resources
          fetchCheckSession()
              .then( response => {
                  setUsername(response.username);
                  setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); // Logged in already

                  return fetchGetWord();

              })
              .catch( err => {
                  if( err?.error === SERVER.AUTH_MISSING ) { // Not logged in
                      return Promise.reject( { error: CLIENT.NO_SESSION});
                  }
                  return Promise.reject(err);
              })
              .then( response => {
                  setStoredWord(response.storedWord);
              })
              .catch( err => {
                  if ( err?.error === CLIENT.NO_SESSION ) {
                      setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
                      return;
                  }
                  setError( err?.error || 'ERROR');
              });
        }, 2000);

    }

    useEffect(() => {
        checkForSession(); // On page load initially
    }, []);

    return (
        <>
        <div className="app">
            <main className="">
                { error && <Status error={error}/> }
                { loginStatus === LOGIN_STATUS.PENDING && <Loading>Loading user...</Loading> }
                { loginStatus === LOGIN_STATUS.LOGGING_OUT && <Loading>Logging out...</Loading> }
                { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
                { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
                <>
                    { isWordLoading
                        ? <Loading/>
                        : <div className="word-view">
                                <div className="current-user">
                                    <p>Hello, {username}!</p>
                                </div>
                                <div className="main-panel">
                                    <StoredWord storedWord={storedWord}/>
                                    <ChangeForm onChangeWord={onChangeWord}/>
                                    <LogoutButton onLogout={onLogout}/>
                                </div>
                        </div>
                    }
                </>
                )}
            </main>
        </div>
        </>
    );
}

export default App;
