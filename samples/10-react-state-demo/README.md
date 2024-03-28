# React State Demo

This is a simple demonstration of React using state to conditionally render different contents within a single page application.

## Using

- run `npm install`
  - You only need to do this ONCE
  - The command has to run in the same directory as the `package.json` file
- run `npm run dev`
  - This starts the Vite dev server
- Visit http://localhost:5173/ in your browser
  - If you type a username and hit login, you should see:
    - Content that greets the username
    - A button for logout
  - Clicking the logout button will return you to the Login Form
- Use Ctrl-C to stop the server when you're done

## Important Notes

Examine the code and how it does the following:
- Uses `useState` to create a new state variables
- Destructures the return value from useState to get:
  - A copy of the current state value
  - A setter function
- Passes props to descendant components to allow those components to change state that is in the ancestor
- Uses wrapper functions around the setters to limit and focus what the descendant components can do
  - Which decouples the descendants from the state of the ancestor
  - The onLogin wrapper is passed a value
    - Allows the descendant to pass a variable value to the ancestor
- Names those wrapper functions to make their purpose more clear
- Login has it's OWN username state
  - Distinct from the username state in App.jsx
  - Login username is "as it is typed"
  - App username is "once they are logged in"
  - onLogin connects the two


