# Practical 9: Middleware, Error Handling, Authentication, and Session Management in Express

## Topics Covered
- Writing custom middleware functions
- Implementing logging middleware for request tracking
- Centralized error handling in Express
- Adding authentication with JWT (JSON Web Tokens)
- Managing sessions using cookies or token-based authentication

## Project: Order Management System

### Objective
Create a secure API for managing orders with robust logging, error handling, authentication, and session management.

### Tasks
1. CRUD Operations for Orders
   - Implement endpoints:
     - POST /orders: Create a new order
     - GET /orders: Retrieve all orders
     - GET /orders/:id: Retrieve a specific order by ID
     - PUT /orders/:id: Update an order by ID
     - DELETE /orders/:id: Delete an order by ID
   - Use in-memory storage or a simple database

2. Logging Middleware
   - Write a custom middleware function to log:
     - HTTP method, URL, and timestamp of each API call
     - Save the logs to a file (server.log)

3. Centralized Error Handling
   - Implement a centralized error-handling middleware for:
     - Invalid endpoints (404 errors)
     - Missing or incorrect data in requests (400 errors)
     - Server errors (500 errors)
   - Use custom error classes for cleaner error handling

4. Authentication with JWT
   - Add user authentication with login and registration endpoints:
     - POST /auth/register: Register a new user
     - POST /auth/login: Authenticate a user and return a JWT token
   - Secure order endpoints so only authenticated users can access them
   - Implement middleware to validate JWT tokens in API requests

5. Session Management
   - Use JWT tokens stored in HTTP-only cookies for session management
   - Set the cookie on login and remove it on logout:
     - POST /auth/logout: Clear the authentication cookie

6. Bonus Task: Role-Based Access Control
   - Assign roles (e.g., admin, user) during user registration
   - Restrict certain endpoints (e.g., DELETE /orders/:id) to admin users

### Setup
1. Initialize the project:
```bash
npm init -y
npm install express jsonwebtoken bcryptjs cookie-parser
```

2. Run the project:
```bash
node index.js
```

3. Test endpoints:
```bash
# Register a new user
curl -X POST -H "Content-Type: application/json" -d '{"username":"john","password":"secret","role":"user"}' http://localhost:3000/auth/register

# Login
curl -X POST -H "Content-Type: application/json" -d '{"username":"john","password":"secret"}' http://localhost:3000/auth/login

# Create an order (with JWT token)
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_JWT_TOKEN" -d '{"product":"Item 1","quantity":2}' http://localhost:3000/orders
``` 