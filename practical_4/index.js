const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types mapping
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif'
};

// Create server
const server = http.createServer((req, res) => {
    // Get file path from URL
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // Get file extension
    const ext = path.extname(filePath);
    
    // Set content type
    const contentType = MIME_TYPES[ext] || 'text/plain';
    res.setHeader('Content-Type', contentType);

    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                fs.readFile(path.join(PUBLIC_DIR, '404.html'), (err, content) => {
                    res.writeHead(404);
                    res.end(content);
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            }
        } else {
            // Success
            res.writeHead(200);
            res.end(content);
        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 