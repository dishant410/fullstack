# Practical 7: Introduction to Express.js

## Topics Covered
- Setting up an Express project
- Understanding the request-response cycle
- Using middleware (express.json() and express.static())

## Project: Simple Content Delivery Server

### Objective
Create a static file server with basic APIs for logging user visits.

### Tasks
1. Serve static HTML, CSS, and JS files from a public directory
2. Log user visits (IP, time) to visits.log using middleware
3. Provide API endpoint (GET /logs) to retrieve log data

### Setup
1. Initialize the project:
```bash
npm init -y
npm install express
```

2. Run the project:
```bash
node index.js
```

3. Access the server at: http://localhost:3000 