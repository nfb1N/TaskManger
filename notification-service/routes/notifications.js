const express = require('express');
const router = express.Router();
const notificationService = require('../logic/services/notificationService');

// GET /notifications
router.get('/', (req, res) => {
    res.json(notificationService.getAllNotifications());
});

// POST /notifications
router.post('/', (req, res) => {
    const { task } = req.body;
    if (!task || !task.title || !task.id) {
        return res.status(400).json({ error: 'Task object with id and title required' });
    }
    const notification = notificationService.createNotification(task);
    res.status(201).json(notification);
});

// DELETE /notifications/:id
router.delete('/:id', (req, res) => {
    const deleted = notificationService.deleteNotification(req.params.id);
    if (deleted) {
        res.json({ message: 'Notification deleted' });
    } else {
        res.status(404).json({ error: 'Notification not found' });
    }
});

// PATCH /notifications/:id
router.patch('/:id', (req, res) => {
    const updated = notificationService.updateNotification(req.params.id, req.body);
    if (updated) {
        res.json(updated);
    } else {
        res.status(404).json({ error: 'Notification not found or no fields to update' });
    }
});

module.exports = router; 