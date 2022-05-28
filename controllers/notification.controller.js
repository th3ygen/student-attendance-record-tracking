const _Attendance = require('../models/Attendance');
const _AttendanceRecord = require('../models/AttendanceRecord');
const _Notification = require('../models/Notification');

const MAX_ABSENT = 3;

module.exports = {
    pushNotification: async (title, content, type) => {
        try {
            const notification = new _Notification({
                title,
                content,
                type,
            });

            await notification.save();

            return notification;
        } catch (e) {
            console.log(e);
        }
    },
    getNotifications: async (req, res) => {
        try {
            const notifications = await _Notification.find({});

            res.status(200).json({
                notifications,
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    }
}