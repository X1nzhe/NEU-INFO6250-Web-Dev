# INFO6250 Final project - Ameowzon (Online Market)
## Description
* This project is a simple e-commerce `single-page application (SPA)` website where multi users can browse and purchase products.
* It showcases the use of `MVC` web development frameworks to build the server-side with `Express-based NodeJS` , and the use of `Vite` and` React` to dynamically generate user interfaces, design and utilize` rich internet applications (RIA)` with `AJAX`. It also demonstrates the implementation of `service-oriented architecture (SOA)` using `RESTful APIs`.
* The website allows users to view products, log in and add items to their cart for checkout.
* It includes user authentication and authorization features, allowing users to securely log in and manage their shopping cart.
* If the username is "admin", the user is treated as an administrator, granting them access to additional management capabilities.

## Author
- [@X1nzhe](https://www.github.com/X1nzhe)

## How to Use
1. Clone the repo and get source files, 
2. Install dependencies: In the project root,`npm install`,
3. Build the front-end files: `npm run build`,
4. Start the server: `npm run start`,
5. Open your browser and navigate to http://localhost:3000 to view the application.

## Server Side
### Technologies Used
* **Express**: Used to create the server and handle routing.
* **Cookie-parser**: Used to parse cookies sent with the requests.
* **UUID**: Manages the session ID for users, used as a token for authentication/authorization.

### Functionality
* **Authentication**: Users can log in using username. Username `dog` is valid but has no permission to buy products but has permission to view products.
* **Authorization**: Certain resources are protected and require users to be authenticated with valid session id.
* **User Sessions**: Sessions are managed to keep track of logged-in users. Time-out feature has been enforced on session management to enhance the overall security.
* **Simultaneous User Logins**: Users can use the same username to log in on different devices simultaneously.
* **Product Management**: Users can view products and buy items. Admin can add, delete products and reset products to the most initial status.
* **Cart Management**: Users can view and manage items in their cart, including changing quantities from 0 to the maximum inventory for such product and checking out.
* **Order Management**: Admin users can view orders and mark orders as completed or delete orders.
### API Routes
#### Session
* GET /api/v1/session: Check for an existing session (used on shopping cart page load).
* POST /api/v1/session: Create a new session (login).
* DELETE /api/v1/session: Logout.
#### Products
* GET /api/v1/products: Retrieve the products list (open to all access without auth/authz).
* PATCH /api/v1/products: Add more products (admin only).
* POST /api/v1/products: Reset products list to initial status (admin only).
* DELETE /api/v1/products/:id: Delete a product (admin only).
#### Carts
* GET /api/v1/carts: Get the cart for the user.
* PUT /api/v1/carts/:id: Add an item to the cart for the user.
* PATCH /api/v1/carts/:id: Change an item's quantity in the cart for the user.
* DELETE /api/v1/carts/:id: Delete an item in the cart for the user.
#### Orders
* GET /api/v1/orders: Get all orders of users (admin only).
* POST /api/v1/orders: Make a new order for the user.
* DELETE /api/v1/orders/:id: Delete an order (admin only).

## Browser Side
### Technologies Used
* **Vite**: Used for building and serving the frontend assets.
* **React**: Used for building the user interface.
### Header
Displays different buttons based on user's authentication status and permissions: 
* Not logged in users will see the `Login` button.
* Logged in users can see three buttons `Products`, `Cart(0)`, `Logout`.
* Admin users can see three buttons `Products`, `Orders`,`Logout`.
* `dog` user does NOT have enough permissions and only see `Logout` button.

### Pages
* **Home Page**: Display the header and different views based on user's authentication status and choices. The default view is showing `Products`. 
* **Products Page**: Display a list of `Products` available for purchase. Users can view product information and add products to their cart.
* **Cart Page**: Display items in the cart. Users can update quantities, remove items by setting the items' quantity to zero, and proceed to checkout.
* **Login Page**: Form for users to log in.
* **Orders Page**: Display user's orders. **Visible to admin only**.

## License
[MIT License](https://choosealicense.com/licenses/mit/)

Copyright (c) 2024 Xinzhe Yuan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

