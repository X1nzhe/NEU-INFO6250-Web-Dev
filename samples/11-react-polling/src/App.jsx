import { useState, useEffect, useCallback, useRef } from 'react';

import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  POLLING_DELAY,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchTodos,
  fetchUpdateTodo,
  fetchDeleteTodo,
  fetchAddTodo,
} from './services';

import LoginForm from './LoginForm';
import Todos from './Todos';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddTodoForm from './AddTodoForm';

function App() {

  // Here we define our "top level" state
  // These values are passed down to other components
  // We COULD have fewer states if we used objects to track multiple state values
  // But here I've done them as individual values to keep it basic
  //
  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); // one variable covers multiple cases
  const [ isTodoPending, setIsTodoPending ] = useState(false);
  const [ todos, setTodos ] = useState({});
  const [ lastAddedTodoId, setLastAddedTodoId ] = useState();

  const pollingRef = useRef(); // A "ref" tracks a value like state, but doesn't trigger a rerender

  // We also pass "action" functions that do things and update state
  // The top level state has a BUNCH of these
  // We can move these elsewhere - we'll look at that later
  // For now, recognize the benefit of keeping the JSX returned at the bottom of this component
  // clean and readable because we have all of these state-management functions here

  function onLogin( username ) {
    setIsTodoPending(true);
    fetchLogin(username)
    .then( fetchedTodos => {
      setError(''); // in case another action had set an error
      setTodos( fetchedTodos );
      setIsTodoPending(false);
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setTodos({});
    setLastAddedTodoId('');
    fetchLogout() // We don't really care about results
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function onRefresh() {
    setError('');
    setIsTodoPending(true); // Show loading state
    fetchTodos()
    .then( todos => {
      setTodos(todos);
      setLastAddedTodoId('');
      setIsTodoPending(false);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function onDeleteTodo(id) {
    setError('');
    setIsTodoPending(true); // Show loading state
    fetchDeleteTodo(id)
      .then( () => {
        return fetchTodos(); // Return the promise so we can chain
      })
      .then( todos => {
        setTodos(todos);
        setIsTodoPending(false);
      })
      .catch( err => {
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      });
  }

  function onToggleTodo(id) {
    fetchUpdateTodo(id, { done: !todos[id].done } )
    .then( todo => { // Service call returns the updated todo
      // Don't modify existing state object!
      setTodos({
        ...todos, // copy the existing state object
        [id]: todo, // override the existing todo with this id
      });
      setLastAddedTodoId('');
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function onAddTodo(task) {
    fetchAddTodo(task)
    .then( todo => {
      // Notice we get the id of the new todo from the returned todo
      // Don't modify existing state object!
      setTodos({ // Create new object
        ...todos, // copy contents of existing state object
        [todo.id]: todo, // add new todo
      });
      setLastAddedTodoId(todo.id);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });

  }

  function checkForSession() {
    fetchSession()
    .then( session => { // The returned object from the service call
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); // We do not have todos yet!
      return fetchTodos(); // By returning this promise we can chain the original promise
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( todos => {
      setTodos(todos);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        // Not yet logged in isn't a reported error
        return;
      }
      // For unexpected errors, report them
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });

  }

  // Here we use a useEffect to perform the initial loading
  // Initial loading isn't triggered by an event like most service calls
  useEffect(
    () => {
      checkForSession();
    },
    [] // Only run on initial render
  );


  const pollTodos = useCallback( () => {
    // Here we decide not to use any spinners for the polling
    fetchTodos()
    .then( todos => {
      setTodos(todos);
      setLastAddedTodoId('');
    })
    .then( () => {
      pollingRef.current = setTimeout(pollTodos, POLLING_DELAY);
    })
    .catch( () => {
      // Why does instructor never demonstrate error handling!
      console.log('unhandled error, students should report something to user');
      pollingRef.current = setTimeout(pollTodos, POLLING_DELAY); // We try again despite error
    });
  }, []);

  useEffect(
    () => {
      if(loginStatus == LOGIN_STATUS.IS_LOGGED_IN) {
        // We store in a ref because the value is constantly changing
        // We use a ref instead of state because we don't want to rerender when it changes
        pollingRef.current = setTimeout( pollTodos, POLLING_DELAY );
      }
      return () => {
        clearTimeout(pollingRef.current); // Causes no errors if there is no such timeout
      };
    },
    [loginStatus, pollTodos] // pollTodos will not change because it is memoized with useCallback
  );


  return (
    <div className="app">
      <main className="">
        { error && <Status error={error}/> }
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <p>Hello, {username}</p>
            <Controls onLogout={onLogout} onRefresh={onRefresh}/>
            <Todos
              isTodoPending={isTodoPending}
              todos={todos}
              lastAddedTodoId={lastAddedTodoId}
              onDeleteTodo={onDeleteTodo}
              onToggleTodo={onToggleTodo}
            />
            <AddTodoForm onAddTodo={onAddTodo}/>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
