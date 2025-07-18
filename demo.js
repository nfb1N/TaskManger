// demo.js
// Run both TaskService and NotificationService in one process for event-driven demo

const express = require('express');
const bodyParser = require('body-parser');
const EventEmitter = require('events');

// Shared event bus
const eventBus = new EventEmitter();

// --- TaskService logic ---
const tasks = [];

function createTask(data) {
    const task = {
        id: tasks.length + 1,
        title: data.title,
        description: data.description || '',
        createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    eventBus.emit('task-created', task);
    return task;
}

// --- NotificationService logic ---
function listenForTaskCreated() {
    eventBus.on('task-created', (task) => {
        console.log(`[NotificationService] New task created: ${task.title} (ID: ${task.id})`);
    });
}

// --- Start NotificationService listener ---
listenForTaskCreated();

// --- Start TaskService HTTP server ---
const app = express();
app.use(bodyParser.json());

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const task = createTask({ title, description });
    res.status(201).json(task);
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`TaskService (demo) running on port ${PORT}`);
    console.log('Try POST /tasks and watch NotificationService log!');
}); 