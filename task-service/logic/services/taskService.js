const taskModel = require('../models/taskModel');
const notificationClient = require('./notificationClient');
const eventBus = require('../events/eventBus');

async function createTask(data) {
    const task = await taskModel.create(data.title, data.description);
    eventBus.emit('task-created', task);
    await notificationClient.notifyTaskEvent('created', task);
    return task;
}

async function getAllTasks() {
    return await taskModel.getAll();
}

async function deleteTask(id) {
    const deleted = await taskModel.delete(id);
    if (deleted) {
        await notificationClient.notifyTaskEvent('deleted', { id });
    }
    return deleted;
}

async function updateTask(id, updates) {
    const updated = await taskModel.update(id, updates);
    if (updated) {
        await notificationClient.notifyTaskEvent('updated', updated);
    }
    return updated;
}

module.exports = {
    createTask,
    getAllTasks,
    deleteTask,
    updateTask,
}; 