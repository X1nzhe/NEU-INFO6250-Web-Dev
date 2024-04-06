# React Polling samples

This is a modification of the react-services-todo sample, but with a very basic polling added.  

This makes use of a few features, that I summarize below:

## useEffect 

We call useEffect to create the polling as a side effect

- Polling is created as a side effect of App rendering
- The callback given to useEffect returns a function to perform cleanup.  If you aren't strong about when things run, add console.log statements to tell say:
    - When the useEffect callback runs
    - When the pollTodos function runs
    - When the cleanup function runs
- The useEffect dependency array is NOT empty.  We only start the polling when a user is logged in (and they weren't logged in before)
- We do call clearTimeout() when we don't need to.  clearTimeout is "safe" to run if the timeoutId doesn't exist.  Alternatively, we could change pollingRef.current to a falsy value after cleanup and only call clearTimeout if pollingRef.current has a value

## setTimeout

We use setTimeout to run the fetchTodos() function and update state.  After completion (successful or not) we set a new timeout to call pollTodos again.  

We use `setTimeout()` instead of `setInterval()` to guarantee that the next poll isn't scheduled until AFTER any pending calls are completed (which could happen if anything like DNS, database, or other network delays make a polling service call take longer than expected).  Things get confusing if we get a newer response BEFORE getting an older, now inaccurate response.

## useRef

We use the useRef hook to create `pollingRef`.  Refs are values that hold contents between component renders like state does, but unlike state:
- We don't have a setter
- Changing a Ref value does not queue a new render
- Refs are all objects with their actual value stored in the `current` property of the Ref object

We use a Ref instead of state to keep track of the polling timeoutId because:
- If we used state that would cause a lot of re-renders, which would trigger the useEffect cleanup that would cancel and recreate the timeout, and that new timeout id would put us into an infinite loop
- Unlike the in-class example of an intervalId (see above for why we used a timeout instead of an interval), we can't use a closure around the timeoutId because the timeoutId keeps changing.  The cleanup function has no way to know what the current value of the timeoutId is without using an outside value (like state or ref)
- The timeoutIds are regularly changing because we keep creating new timeouts as the old ones are finished

You can read more about useRef in the React documentation:
- https://react.dev/reference/react/useRef
- Note that the docs ALSO talk about another use of useRef, where you can get a reference to a DOM Node.  This is a legit use, but I've also seen it abused to try and act like document.querySelector.  You should not over use useRef for that reason, and in this example we are not using it to track an DOM Node at all.

## useCallback

When we create the useEffect callback, it will create a timeout that will call pollTodos.  This means that the useEffect callback "depends" on pollTodos, and things could get weird if the useEffect callback runs at a later point when the original pollTodos function is not the same as the current pollTodos function.  

While in our example pollTodos will always have the same code, we WOULD actually be defining it differently every time the App component renders.  Because pollTodos is defined inside app, so running App() twice (as happens with rerendering) would give us two different pollTodos functions.  They would do the same steps, but would be technically different functions.  

To resolve this confusion, we use a hook called `useCallback`, which "memoizes" the function definition for pollTodos.  We pass useCallback the pollTodos definition and a set of dependencies.  Unless the dependencies change, useCallback will always return the same exact function (not "just" a function with identical steps).  This means the pollTodos listed in the useEffect dependency array is NOT changed every single render, so the side effect callback (and cleanup) aren't needlessly called every single render.

To learn more about "memoization", you can see the wikipedia article (note that memoization can be used in most any programming language, not just JS, and not just web-based)
- https://en.wikipedia.org/wiki/Memoization

To learn more about the useCallback hook you can read about it in the React documentation:
- https://react.dev/reference/react/useCallback


## Important polling reminders

To reiterate the same notes about polling I mentioned previously:

- This demonstrates "basic" or "simple" polling. Basic polling "works", but generates network traffic even when there is no change in the data, and should be avoided if you need highly up-to-date information or if the requests send too much data.  "Better" alternatives include "long polling" and websockets.

- We are using basic polling because, while the alternatives give better network performance, we are focusing on the concepts of request/response updates for this course

- React requires the use of some pieces to handle creating and removing the polling and updating the state stored in React, but the actual polling process itself isn't changed.



