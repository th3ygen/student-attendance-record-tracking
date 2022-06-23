const _Attendance = require('../models/Attendance');
const _AttendanceRecord = require('../models/Attendance');
const _Notification = require('../models/Notification');

const MAX_ABSENT = 3;

module.exports = {
    pushNotification: async (title, content, type) => {
        try {
            const notification = new _Notification({
                title,
                content,
                type,    
                status: 'unread',
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
    },
    toBin: async (req, res) => {
        try {
            const notification = await _Notification.findById(req.params.id);

            notification.status = 'bin';

            await notification.save();

            res.status(200).json({
                notification,
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    },
    recover: async (req, res) => {
        try {
            const notification = await _Notification.findById(req.params.id);

            notification.status = 'unread';

            await notification.save();

            res.status(200).json({
                notification,
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    },
    getBinSize: async (req, res) => {
        try {
            const binSize = await _Notification.countDocuments({ status: 'bin' });

            res.status(200).json({
                binSize,
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    }
}