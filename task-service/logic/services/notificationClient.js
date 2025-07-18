const axios = require('axios');

async function notifyTaskEvent(eventType, data) {
    try {
        await axios.post('http://localhost:3002/notify', { eventType, data });
    } catch (err) {
        console.error('Failed to notify NotificationService:', err.message);
    }
}

module.exports = {
    notifyTaskEvent,
}; 