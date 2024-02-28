# JS Service Calls

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'js-service-calls' (`git checkout -b js-service-calls`)
* Add and Modify the files in this directory to have the require features
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers.  
* Due by **Wed Mar 13, 11:59pm PT**

## Goals and Requirements

You will create a single page application that allows users to
- login
- logout
- while logged in:
  - see their personal stored word
  - change their personal stored word

This is similar to the "express-login" assignment
- Except static HTML files instead of server-generated HTML
- Using client-side JS 
- Using service calls

Key lessons include:
- Making service calls
  - Instead of navigating to new server-based pages
- Sending JSON data in the body
  - Hint: including data
- Performing login/logout with service calls
- Using service status codes
- Parsing and using service data from body

You will be writing:
- **static** html (just one page!)
  - The HTML will be changed by the front end JS, but the server-side is static HTML
- **static** css
- client-side JS
  - Using webpack and babel, as with the js-cart assignment

You will not modify any server-side JS files, including server.js

## Different Content Views and Moments

### Page Load

When the page loads, JS code will check for an existing session (the GET /api/session call in Resources)
- If there is a session, JS code will get the existing stored word (the GET /api/word call in Resources) and show the Word View
- If there is not an existing session, JS code will show the Login Page
  - "page" here meaning content, there is only one HTML page, and it is static
  - A user that is not logged in will get a 401 error from the service call
    - You don't have to show a special error message for this situation
    - Showing the login form IS how the user needs to deal with the problem
- This means that reloading the page 
  - Will NOT forget the stored word
  - Will NOT forget if you are logged in
  - WILL perform this initial page load logic again

### Login

Show a form requesting a username
- When submitted, this form will login (calling, NOT navigating to, the POST /api/session in Resources)
  - If successful, JS Code will show the Word View
  - If unsuccessful, JS Code will show an appropriate error message to the user ("dog" causes a different error than username of invalid characters)
    - "dog" simulates the user getting a password wrong
    - Show the user a "nice" error message that is NOT the error message the service returns 
      - but is BASED on the error message the service returns
      - Because the error message is the result of the render loop, you should have the error message in your state to show it
      - Remember to remove this error message after they successfully login!

### Word View

- Show the username
- Show an option to logout 
  - If the user logs out
    - call the logout service (DELETE /api/session in Resources) (call, do not navigate to)
    - Once service call returns, show the user the Login view
- Show a form showing the stored word for this user and offering the option to update it
  - If the user updates the word
    - Call the replace word service (PUT /api/word in Resources) (call, do not navigate to)

### Visuals

The visual requirements are the same as `express-login` - You are welcome to use the same HTML/CSS from that assignment, but:
- Make sure you apply any corrections
  - From that assignment as reviewed by TA
  - Any discussed in class
  - Any covered by the requirements that may not have been called out on the previous assignment
- Translate the format as needed
  - This assignment is using a base static HTML file + front-end generated HTML, not backend-generated HTML

You must show effort to make it visually attractive and usable
- Make different areas of content visually distinct using colors and/or spacing
- Make content legible using whitespace (padding, margin, line-height, etc)
- Interactions (form fields, buttons, links) must have text/labels to be understood by an uninformed user
- Context (additional text/headings) should make it clear what content is being displayed
- The content should be responsive (text flow to fit) the page at desktop sizes 
  - Avoid fixed sizes on structural elements (those elements that would prevent responsive behavior)
  - Enforced reasonable visual gutters to keep content to a maximum width is allowed but not required

## Resources

This `server.js` offers these urls to use for service calls with the listed HTTP Methods

### GET `/api/session`

Checks to see if the user is logged in 
- If yes, returns JSON of object with `username` property
- If no, returns 401 status 
  - This is not an error to report to user, but is used by the code to decide if a user is or is not already logged in

### POST `/api/session`

- Expects body to be JSON of object with a username property

Checks submitted username
- if is "dog", returns 403 status and JSON of object with error property "auth-insufficient"
- if invalid (not alphanumeric or is empty), returns 400 status and JSON of object with error property "required-username"
- if valid, sets the `sid` cookie and returns a JSON of object with username property

### DELETE `/api/session`

Performs a logout, removing the `sid` cookie and deleting any matching session on server

Always returns JSON of object with wasLoggedIn boolean property
- This return value isn't very useful

### GET `/api/word`

Returns JSON of object with username and storedWord properties
- If not logged in, instead returns status 401 and JSON of object with error property of "auth-insufficient"

### PUT `/api/word`

- Expects body to be JSON of object with a "word" property
Returns JSON of object with username and storedWord properties
- For this assignment, an empty string (`""`) is a valid word to store
- If not logged in, instead returns status 401 and JSON of object with error property of "auth-insufficient"

## Hints
- Start by writing a basic render method. This will tell you what variables you need in your state.  Then add event listeners and service calls to update the state and handle events from elements you have rendered.  
- Write a little bit of functionality at a time and make sure it works before adding more functionality.
- Don't forget to add a check for existing session when the page loads, but that should be written only after you have the basic functionality of rendering based on state working.
- You will want to make use of event delegation to attach event listeners to ancestor elements that are not replaced, and check the event.target to see if the target was a specific element.  This will let you add event listeners for elements that may not be on the page yet or that are commonly replaced by your render method.
- Don't forget to show error messages to the user in the text of the page. `console.log`/`console.warn` are NOT error handling!
- Not all service errors are errors you need to display to the user.  For example, when you check for an existing session, you will get back a rejected promise if there is no session, but that is an expected result and not a problem, so no error is shown to the user.

## Restrictions
* You should use the node/npm modules used in class ONLY
* Do not use any outside JS or CSS files or assets
  - Exception: You may use CSS for icons from http://css.gg IF you link to their CSS file on their site
* Use Semantic HTML and semantic CSS class names
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* Do not have any outside files in your PR (no files from other assignments, for example)
* Use arrays and objects when they each make sense
* Do not use `var`, use `const` and `let` appropriately
* Do not use `alert`, `prompt` or other blocking JS
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
* Do not have commented out code
* Do not use localStorage or other client-side storage 
* Do not use CSS preprocessors, minifiers, or other tools to modify your CSS
* Follow the best practices as described in this course to date

