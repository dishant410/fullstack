const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const TASKS_FILE = path.join(__dirname, 'data', 'tasks.json');

// Middleware
app.use(express.json());

// Helper functions
async function readTasks() {
    try {
        const data = await fs.readFile(TASKS_FILE, 'utf8');
        return JSON.parse(data).tasks;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

async function writeTasks(tasks) {
    await fs.writeFile(TASKS_FILE, JSON.stringify({ tasks }, null, 4));
}

// Validation middleware
function validateTask(req, res, next) {
    const { title, status } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }
    
    next();
}

// Routes
// GET /tasks - Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await readTasks();
        res.json(tasks);
    } catch (error) {
        console.error('Error reading tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /tasks/:id - Get a specific task
app.get('/tasks/:id', async (req, res) => {
    try {
        const tasks = await readTasks();
        const task = tasks.find(t => t.id === parseInt(req.params.id));
        
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json(task);
    } catch (error) {
        console.error('Error reading task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /tasks - Create a new task
app.post('/tasks', validateTask, async (req, res) => {
    try {
        const tasks = await readTasks();
        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            ...req.body,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        await writeTasks(tasks);
        
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /tasks/:id - Update a task
app.put('/tasks/:id', validateTask, async (req, res) => {
    try {
        const tasks = await readTasks();
        const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
        
        if (index === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        tasks[index] = {
            ...tasks[index],
            ...req.body
        };
        
        await writeTasks(tasks);
        res.json(tasks[index]);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const tasks = await readTasks();
        const filteredTasks = tasks.filter(t => t.id !== parseInt(req.params.id));
        
        if (filteredTasks.length === tasks.length) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        await writeTasks(filteredTasks);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 