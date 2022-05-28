const _Class = require("../models/Class");
const _Attendance = require("../models/Attendance");
const _AttendanceRecord = require("../models/AttendanceRecord");

module.exports = {
	getTotalEnrolled: async (req, res) => {
		try {
			const classess = await _Class.find({});

			const total = classess.reduce((acc, curr) => {
				return ++acc;
			}, 0);

			res.status(200).json({
				total,
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	
};
