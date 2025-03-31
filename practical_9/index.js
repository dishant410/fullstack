const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('./middleware/logger');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(logger);

// Routes
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Default error
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 