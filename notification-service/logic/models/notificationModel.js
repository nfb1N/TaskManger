const notifications = [];

function createNotification(task) {
    const notification = {
        id: require('uuid').v4(),
        message: `New task created: ${task.title} (ID: ${task.id})`,
        taskId: task.id,
        createdAt: new Date().toISOString(),
    };
    notifications.push(notification);
    return notification;
}

function getAllNotifications() {
    return notifications;
}

function deleteNotification(id) {
    const idx = notifications.findIndex(n => n.id === id);
    if (idx !== -1) {
        notifications.splice(idx, 1);
        return true;
    }
    return false;
}

function updateNotification(id, updates) {
    const notification = notifications.find(n => n.id === id);
    if (!notification) return null;
    if (updates.message !== undefined) notification.message = updates.message;
    return notification;
}

module.exports = {
    createNotification,
    getAllNotifications,
    deleteNotification,
    updateNotification,
}; 