# React Services

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'react-services' (`git checkout -b react-services`)
* Create a react application in this directory using create-react-app
* Modify and add files in `src/` to fulfill the requirements below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers on the PR.  
* **Due by Wed Apr 10, 11:59pm PT**

## Goals

- Create a React application using Vite that makes use of REST-based services that you write using express
- Have a service server that can serve the static files built by `npm run build`
- Configure the Vite dev server to proxy service requests to your express server.js
- Demonstrate an understanding of calling services using React
- Demonstrate an understanding of the `useEffect` hook as described in class
- Demonstrate an understanding of displaying loading states
- Demonstrate an understanding of the two different servers involved during development
  - And the single server involved during production

## Assignment Goals and Requirements
- The application will have service-based login/logout
  - As normal username "dog" will be treated as a denied user (not an invalid username, but a disallowed user)
- The application will show a logged in user their "stored word"
- The application will allow a logged in to change their "stored word"
- The "stored word" is stored per user on the server
- The page will check for an existing session on page load
  - a user that is already logged in will not have to log in again
  - While the app is waiting on the service call(s) for this check a loading indicator is displayed to the user
  - This indicator can be image, css, and/or HTML-based, but must be clearly visible for testing, however briefly
- Your application can be tested by running `npm install` and
  - running `npm start` to start the services server on port 3000
    - Note: this requires change the `scripts` section of package.json
  - running (in a separate terminal) `npm run dev` to start the Vite dev server on port 5173
  - visiting http://localhost:5173 in the browser
- Your application can ALSO work by:
  - running `npm run build` to create the static files in `dist/`
  - running `npm start` to start the express server (and NOT running the Vite dev server)
  - visiting http://localhost:3000 in the browser

## Creating the two servers under 1 package.json
- Note: Remember this is OUR configuration.  On the job you may do this, you may have two package.jsons in different folders of the same repo, or they may be two separate repos
    - However, while this is configuration is an option overall, it IS the REQUIREMENT of this assignment
- Run `npm install express uuid cookie-parser` in the created vite react project directory (where the package.json file is)
- Configuring the vite.config.js for the proxy as shown in class
- Modifying the package.json scripts to include the start script and any other scripts you wish to include
- Writing the express server.js to serve the dist/ folder as the static files document root

## Security And Error Reporting Requirements
- Both username AND the stored word should be allow-listed against criteria of your choice
  - This MUST be enforced on the service-side
  - This MAY be enforced on the client-side
  - Any received errors from a service because of user input should result in a meaningful message to the user
  - If a service is unreachable a message should be displayed to the user

## Visual Requirements
- Provide at least basic visual styling to provide distinct areas for different parts of the application and sufficient visual spacing

## Restrictions
- All components must be .jsx files named in MixedCase
- Components and server-side files should have good separation of concerns
  - not too large
  - not doing too much
  - same logic as splitting up functions
- Components  should have good, accurate, meaningful names
- state values should have good, accurate, meaningful names
- Component files should match the component name
- Components must each be in a single file with no other exported values
- Logic that is not about JSX should be imported from .js files
- .js files and functions should have good, accurate, meaningful names
- CSS should be semantic class names, either kebab-base or BEM style
- Service code should match the quality requirements from previous assignments

## Additional Requirements
- All services will return JSON (if they return a body) and receive JSON (if they receive a body)
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage, except a cookie to hold a `sid` value
- Do NOT use external JS other than that demonstrated in class
  - Note: You may use nodemon for your own development of the server, but it should not be in any of the package.json scripts described in this README.
- Do NOT interact with the browser url, including hash fragment
- You may not use `document.querySelector()` or otherwise modify the DOM directly
- You may not use `useRef`, or `ref` props from React (If you do not know what I mean, that is fine)
- Follow the best practices described in class, in the code-review doc, and in the best-practices in the readings
- Use Semantic HTML as much as you can
- Follow any suggestions previously given to you in code reviews
- Do NOT include files in your PR that are outside the assignment (no IDE configs, `node_modules/`, etc)
  - Note: vite installs many files.  For now, those are fine to include in your PR, but please remove any example content
- Do not use external CSS libraries
  - Exception: You may use CSS files linked from https://css.gg/ for icons and/or spinners
  - Exception: You may use Google fonts
* Use arrays and objects when they each make sense
* Do not use `var`. Use `const` and `let` appropriately
* Do not use `alert`, `prompt` or other blocking JS
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
* Do not have commented out code
- You may not use floats to do more than manage flowing text with images
- You may not use HTML tables or CSS table layouts
- You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  - I and the TA(s) must be able to read it easily

