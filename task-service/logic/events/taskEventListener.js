const eventBus = require('./eventBus');

eventBus.on('task-created', (task) => {
    console.log(`[EventListener] Task created: ${task.title} (ID: ${task.id})`);
}); 