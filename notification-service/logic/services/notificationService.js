const notificationRepository = require('../repositories/notificationRepository');

function createNotification(task) {
    return notificationRepository.createNotification(task);
}

function getAllNotifications() {
    return notificationRepository.getAllNotifications();
}

function deleteNotification(id) {
    return notificationRepository.deleteNotification(id);
}

function updateNotification(id, updates) {
    return notificationRepository.updateNotification(id, updates);
}

function handleTaskEvent(eventType, data) {
    if (eventType === 'created' && data && data.title) {
        createNotification(data);
        console.log(`[NotificationService] New task created: ${data.title} (ID: ${data.id})`);
    } else if (eventType === 'deleted' && data && data.id) {
        console.log(`[NotificationService] Task deleted: ID ${data.id}`);
    } else if (eventType === 'updated' && data && data.id) {
        console.log(`[NotificationService] Task updated: ID ${data.id}`);
    } else {
        console.log('[NotificationService] Received unknown event:', { eventType, data });
    }
}

module.exports = {
    createNotification,
    getAllNotifications,
    deleteNotification,
    updateNotification,
    handleTaskEvent,
}; 