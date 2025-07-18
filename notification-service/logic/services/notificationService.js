const notificationModel = require('../models/notificationModel');

function createNotification(task) {
    return notificationModel.createNotification(task);
}

function getAllNotifications() {
    return notificationModel.getAllNotifications();
}

function deleteNotification(id) {
    return notificationModel.deleteNotification(id);
}

function updateNotification(id, updates) {
    return notificationModel.updateNotification(id, updates);
}

module.exports = {
    createNotification,
    getAllNotifications,
    deleteNotification,
    updateNotification,
}; 