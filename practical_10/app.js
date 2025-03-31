const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Personal Task Manager API',
        endpoints: {
            getAllTasks: 'GET /api/tasks',
            getTask: 'GET /api/tasks/:id',
            createTask: 'POST /api/tasks',
            updateTask: 'PUT /api/tasks/:id',
            deleteTask: 'DELETE /api/tasks/:id'
        }
    });
});

const validateTask = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim(),
    body('status').isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status')
];

async function readTasks() {
    try {
        const data = await fs.readFile(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(TASKS_FILE, JSON.stringify([]));
            return [];
        }
        throw error;
    }
}

async function writeTasks(tasks) {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
}


app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await readTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error reading tasks' });
    }
});


app.get('/api/tasks/:id', async (req, res) => {
    try {
        const tasks = await readTasks();
        const task = tasks.find(t => t.id === parseInt(req.params.id));
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error reading task' });
    }
});

app.post('/api/tasks', validateTask, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const tasks = await readTasks();
        const newTask = {
            id: Date.now(),
            title: req.body.title,
            description: req.body.description || '',
            status: req.body.status || 'pending',
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
        await writeTasks(tasks);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
});


app.put('/api/tasks/:id', validateTask, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const tasks = await readTasks();
        const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title: req.body.title,
            description: req.body.description || tasks[taskIndex].description,
            status: req.body.status || tasks[taskIndex].status
        };

        await writeTasks(tasks);
        res.json(tasks[taskIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const tasks = await readTasks();
        const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        tasks.splice(taskIndex, 1);
        await writeTasks(tasks);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 