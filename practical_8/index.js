const express = require('express');
const productsRouter = require('./routes/products');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/products', productsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 