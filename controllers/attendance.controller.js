const _Class = require("../models/Class");
const _Attendance = require("../models/Attendance");
const _AttendanceRecord = require("../models/AttendanceRecord");

module.exports = {
    mark: async (req, res) => {
        try {
            const { studentId, date, status }
        }
    },
    getTotalAttend: async (req, res) => {
		try {
			const atts = await _Attendance.find({});

			let total = 0;

			for (let att of atts) {
				const count = await _AttendanceRecord.find({
					status: "present",
				});

				total += count;
			}

			res.status(200).json({
				total,
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
    getTotalAbsent: async (req, res) => {
        try {
            const atts = await _Attendance.find({});

            let total = 0;

            for (let att of atts) {
                const count = await _AttendanceRecord.find({
                    status: "absent",
                });

                total += count;
            }

            res.status(200).json({
                total,
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    },
	getAttendanceRate: async (req, res) => {
		try {
			const classess = await _Class.find({});
			const atts = await _Attendance.find({});

			let totalEnrolled = classess.reduce((acc, curr) => {
				return ++acc;
			}, 0);
			let totalAttend = 0;

			for (let att of atts) {
				const count = await _AttendanceRecord.find({
					status: "present",
				});

				totalAttend += count;
			}

			const rate = (totalAttend / totalEnrolled) * 100;

			res.status(200).json({
				rate,
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
    getAttendanceRateGrouped: async (req, res) => {
        try {
            const classes = await _Class.find({);

            let result = [];

            for (let c of classess) {
                const atts = await _Attendance.find({
                    class: c._id,
                });

                let totalEnrolled = 0;

                result[c.name] = {
                    total: 
                }
            }
        } catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
    },
    getDataCompleteness: async (req, res) => {

    }
}