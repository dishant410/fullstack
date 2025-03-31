const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Logging middleware
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('user-agent')
    };

    // Write to log file
    fs.appendFile(
        path.join(logsDir, 'server.log'),
        JSON.stringify(logEntry) + '\n',
        (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        }
    );

    next();
};

module.exports = logger; 