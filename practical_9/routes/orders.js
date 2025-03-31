const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');

// In-memory order storage (replace with database in production)
const orders = [];

// Get all orders (admin only)
router.get('/', verifyToken, isAdmin, (req, res) => {
    res.json(orders);
});

// Get user's own orders
router.get('/my-orders', verifyToken, (req, res) => {
    const userOrders = orders.filter(order => order.userId === req.user.id);
    res.json(userOrders);
});

// Get specific order
router.get('/:id', verifyToken, (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    // Only allow users to view their own orders unless they're admin
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    res.json(order);
});

// Create new order
router.post('/', verifyToken, (req, res) => {
    try {
        const { product, quantity } = req.body;

        // Validate input
        if (!product || !quantity) {
            return res.status(400).json({ error: 'Product and quantity are required' });
        }

        // Create order
        const order = {
            id: orders.length + 1,
            userId: req.user.id,
            product,
            quantity,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        orders.push(order);
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update order (admin only)
router.put('/:id', verifyToken, isAdmin, (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }

    order.status = status;
    res.json(order);
});

// Delete order (admin only)
router.delete('/:id', verifyToken, isAdmin, (req, res) => {
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    
    if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' });
    }

    orders.splice(orderIndex, 1);
    res.json({ message: 'Order deleted successfully' });
});

module.exports = router; 