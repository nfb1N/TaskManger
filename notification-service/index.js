const express = require('express');
const notificationsRouter = require('./routes/notifications');
const notificationService = require('./logic/services/notificationService');
const app = express();
app.use(express.json());

// NotificationService receives notifications from TaskService
app.post('/notify', (req, res) => {
    const { eventType, data } = req.body;
    notificationService.handleTaskEvent(eventType, data);
    res.status(200).send('Notification received');
});

// CRUD endpoints for notifications
app.use('/notifications', notificationsRouter);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`NotificationService running on port ${PORT}`);
});