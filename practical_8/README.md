# Practical 8: Routing and Query Parameters

## Topics Covered
- Defining routes for different HTTP methods (GET, POST, PUT, DELETE)
- Handling dynamic route parameters and query strings
- Organizing routes using express.Router()

## Project: E-Commerce Product Catalog API

### Objective
Build an API for managing an e-commerce product catalog.

### Tasks
1. Implement endpoints:
   - GET /products: Return all products
   - GET /products/:id: Fetch specific product
   - GET /products?category=electronics: Filter by category

2. Use route parameters and query strings effectively

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

3. Test endpoints:
```bash
# Get all products
curl http://localhost:3000/products

# Get product by ID
curl http://localhost:3000/products/1

# Filter products by category
curl http://localhost:3000/products?category=electronics
``` 