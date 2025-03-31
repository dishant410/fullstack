const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'users.json');

// Helper function to read users data
async function readUsers() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { users: [] };
    }
}

// Helper function to write users data
async function writeUsers(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 4));
}

// Helper function to send JSON response
function sendJsonResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

// Handle GET /users
async function handleGetUsers(req, res) {
    try {
        const data = await readUsers();
        sendJsonResponse(res, 200, data);
    } catch (err) {
        sendJsonResponse(res, 500, { error: 'Internal server error' });
    }
}

// Handle POST /users
async function handlePostUser(req, res) {
    try {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const newUser = JSON.parse(body);
                const data = await readUsers();
                
                // Validate required fields
                if (!newUser.name || !newUser.email) {
                    sendJsonResponse(res, 400, { error: 'Name and email are required' });
                    return;
                }

                // Generate new ID
                newUser.id = data.users.length + 1;
                data.users.push(newUser);
                
                await writeUsers(data);
                sendJsonResponse(res, 201, newUser);
            } catch (err) {
                sendJsonResponse(res, 400, { error: 'Invalid JSON data' });
            }
        });
    } catch (err) {
        sendJsonResponse(res, 500, { error: 'Internal server error' });
    }
}

// Handle DELETE /users/:id
async function handleDeleteUser(req, res) {
    try {
        const id = parseInt(req.url.split('/')[2]);
        const data = await readUsers();
        
        const userIndex = data.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            sendJsonResponse(res, 404, { error: 'User not found' });
            return;
        }

        data.users.splice(userIndex, 1);
        await writeUsers(data);
        sendJsonResponse(res, 200, { message: 'User deleted successfully' });
    } catch (err) {
        sendJsonResponse(res, 500, { error: 'Internal server error' });
    }
}

// Create server
const server = http.createServer((req, res) => {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Route handling
    if (req.url === '/users' && req.method === 'GET') {
        handleGetUsers(req, res);
    } else if (req.url === '/users' && req.method === 'POST') {
        handlePostUser(req, res);
    } else if (req.url.match(/^\/users\/\d+$/) && req.method === 'DELETE') {
        handleDeleteUser(req, res);
    } else {
        sendJsonResponse(res, 404, { error: 'Not found' });
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 