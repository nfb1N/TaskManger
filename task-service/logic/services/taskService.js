const taskRepository = require('../repositories/taskRepository');
const notificationClient = require('./notificationClient');
const eventBus = require('../events/eventBus');

async function createTask(data) {
    const task = await taskRepository.create(data.title, data.description);
    eventBus.emit('task-created', task);
    await notificationClient.notifyTaskEvent('created', task);
    return task;
}

async function getAllTasks() {
    return await taskRepository.getAll();
}

async function deleteTask(id) {
    const deleted = await taskRepository.delete(id);
    if (deleted) {
        await notificationClient.notifyTaskEvent('deleted', { id });
    }
    return deleted;
}

async function updateTask(id, updates) {
    const updated = await taskRepository.update(id, updates);
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