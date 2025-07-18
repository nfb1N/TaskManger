const express = require('express');
const notificationsRouter = require('./routes/notifications');
const notificationService = require('./logic/services/notificationService');
const app = express();
app.use(express.json());

// NotificationService receives notifications from TaskService
app.post('/notify', (req, res) => {
    const { eventType, data } = req.body;
    if (eventType === 'created' && data && data.title) {
        notificationService.createNotification(data);
        console.log(`[NotificationService] New task created: ${data.title} (ID: ${data.id})`);
    } else if (eventType === 'deleted' && data && data.id) {
        console.log(`[NotificationService] Task deleted: ID ${data.id}`);
    } else if (eventType === 'updated' && data && data.id) {
        console.log(`[NotificationService] Task updated: ID ${data.id}`);
    } else {
        console.log('[NotificationService] Received unknown event:', req.body);
    }
    res.status(200).send('Notification received');
});

// CRUD endpoints for notifications
app.use('/notifications', notificationsRouter);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`NotificationService running on port ${PORT}`);
});