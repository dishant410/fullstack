const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Store visit logs in memory (in a real app, you'd use a database)
let visitLogs = [];

// Visit logging middleware
app.use((req, res, next) => {
    const visit = {
        ip: req.ip,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method
    };
    
    visitLogs.push(visit);
    
    // Write to file
    fs.appendFile(
        path.join(__dirname, 'visits.log'),
        JSON.stringify(visit) + '\n'
    ).catch(err => console.error('Error writing to log file:', err));
    
    next();
});

// API endpoint to get visit logs
app.get('/logs', (req, res) => {
    res.json(visitLogs);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 