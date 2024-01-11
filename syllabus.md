# Course Syllabus: INFO 6250 - Silicon Valley
# Spring Semester 2024 - Thu
Instructor: Brett Ritter `<b.ritter@neu.edu>`

This course covers Web Development, focusing on both the fundamentals and from them modern development practices for the web.  The class will use Javascript on both the front- and back-ends of web application development, but the lessons learned will be applicable to many languages.  
 - Basic git use as a version control system for shared applications and development
 - How information flows in a web application between various machines
 - Modern JS development for the frontend (both "vanilla" JS and React-based)
 - NodeJS development of a backend end, both server generated content using the express framework (minimal) and service development
 - Basic Debugging Techniques
 - Web security fundamental practices, both front- and back-end.
 - The basics of how many development teams breakdown application needs and complete work

### What is NOT covered
 - How to program in general
 - HTML and CSS details (My INFO6150 course is a great source of info here)
 - Languages other than Javascript (focus is on concepts)
 - Mobile specific development
 - Accessibility (a11y), Internationalization (i18n), or Localization (l10n)
 - SQL/NoSQL usage or database architectures/maintenance
 - Specific Libraries: Focus is on concepts and not the diverse but temporary library options
 
## Grading: I reserve the right to adjust based on your final demonstration of applied knowledge.  
```
15% Assignments (lowest score ignored)
10% Quizzes (lowest score ignored)
25% Server-side Project
25% Vanilla JS Project 
25% Final React Project
```

## Basic Requirements and Expectations:
- Basic familiarity with CSS and HTML is assumed ( see https://developer.mozilla.org/en-US/docs/Learn )  
- Basic exposure to programming concepts (variables, functions, looping) is assumed
- You will have to use git and github.com following the instructions given
- There is no textbook for the class, but a number of online articles will be shared
- See also the `/readings/` directory in the class repo
- Many topics will be introduced in class but require you to perform additional research/experimentation
- Additional software (without cost) is required.  Installation and configuration is your responsibility (Mac, Windows, or \*nix)
- Students should ask questions where anything is unclear
- A great deal of work will be done online, in and out of class

## Expected Class Schedule (subject to change):

### Section 1: Web Fundamentals

#### Schedule
- Thu Jan 11 
- Thu Jan 18 
- Thu Jan 25 
- Thu Feb 1 
- Thu Feb 8 

#### Topics

##### Class 1: Start of Web Fundamentals (Section 1)
- About the Course
    - Why WebDev is Awesome
    - Core Course Concepts
    - Github Repos
    - Slack Workspace
    - Do Not Copy Work Policy
- Introduction to the Web
    - Clients + Servers
    - The roles of HTML/CSS/JS
    - Static vs Dynamic content
    - HTTP Request/Response
- Introduction to Git

##### Class 2: HTML/CSS
- HTML Syntax and Role
    - Semantic HTML
- CSS Syntax and Role
    - Semantic CSS
- Using HTML
- Using CSS
- Using a Static Server

##### Class 3: Intro to JS
- Static vs Dynamic Typing
- Strong vs Weak Typing
- JS Syntax

##### Class 4: Writing an Express webserver
- Using Node
- Using NPM
    - JSON (JavaScript Object Notation)
    - package.json
    - semver
    - Dependencies
- Using Express
- Writing a Server Generated Chat App
    - HTML Forms

##### Class 5: Sessions and Logins
- Sessions
- Debugging
- Server Security
    - Authentication and Authorization
    - Injection Attacks (XSS, SQL)
    - Password Hashing/Salting

At the end of Section 1 you should be able to write a simple multiple page web application (dynamic website) using NodeJS that serves semantic HTML and styles with CSS.  You will receive from github repository updates and submit your work via Pull Requests (PRs) in the same fashion that many employers conduct their work.

#### Server Side Project (project1) Due

Wed Feb 21, 11:59pm PT

### Section 2: Web Frontend 

#### Schedule
- Thu Feb 15
- Thu Feb 22
- Thu Feb 29 (No Class Thu Mar 7)
- Thu Mar 14

#### Topics

##### Class 6: Client Side JS and RESTful Services
- The DOM
- Front End Validation with JS
- Front End State
    - Explicit State vs State in DOM
- Front End Tools
    - Linters
    - Prettier
    - Minification
    - Transpilers
    - Bundlers

##### Class 7: Client Side Dynamic Rendering 
- "Building"
    - Babel
    - Webpack
- Client Rendering from State

##### Class 8: Calling Web Services
- Single Page Applications
- Async JS
    - Promises
- Fetch
    - Calling Services
    - Parsing Results
    - Using Results

##### Class 9: RESTful Services
- Service Basics
    - Endpoints
    - Sending/Receiving Data
    - REST 
    - GraphQL
- Core REST Concepts
    - URL as a Resource
    - HTTP Method as Interaction
    - Status as Result of Interaction
- Writing RESTful Services in Express
- Calling RESTful Services from Client JS

At the end of Section 2 you should be able to write a simple single page web application (SPA) using "vanilla" JS.  Your SPA can call RESTful external services that you can also write using NodeJS to provide those service endpoints.

#### Vanilla JS Project (project2) Due

Wed Mar 20, 11:59pm PT

### Section 3: The Recent Web (React)

#### Schedule 

- Thu Mar 21
- Thu Mar 28
- Thu Apr 4
- Thu Apr 11

#### Topics

##### Class 10: Start of React (Section 3)
- Using Vite for React
- React Components
- React State
- React MVC
- React State and Pages

##### Class 11: Making Service Calls with React
- Proxies
- React Service Calls
- React Hook: useEffect
- useEffect and Service Calls?

##### Class 12: React State Management
- React Hook: useReducer
- React Hook: useContext
- React Deeplinking

##### Class 13: After INFO 6250
- Now What?
- Getting Hired
- Your Future Team
- Projects
- Agile SDLC

At the end of Section 3 you should be able to write a simple single page web application (SPA) using React JS. 

### Final Projects Due 
- NO EXTENSIONS FOR FINAL PROJECT!
Mon Apr 22, 11:59pm PT

No class Thu Apr 25 (just Project due Mon Apr 22, 11:59pm PT)

