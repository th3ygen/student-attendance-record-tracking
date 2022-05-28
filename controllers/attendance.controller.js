const _Class = require("../models/Class");
const _Attendance = require("../models/Attendance");
const _AttendanceRecord = require("../models/AttendanceRecord");
const _Student = require('../models/Student');

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
				let total = 0;
				let rec = 0;

                const atts = await _Attendance.find({
                    classId: c._id,
                });

				const stds = await _Student.find({
					classId: c._id
				});

				let attRec;
				for await (let att of atts) {
					if (att.dueDate >= new Date()) {
						continue;
					}
	
					total += stds.length;

					attRec = await _AttendanceRecord.find({
						$and: [
							{ attendanceId: att._id },
							{ status: "present" },
						]
					});

					rec += attRec.length;
				}

				let = rate = (rec / total) * 100;

				// round off to 2 decimal places, with epsilon
				rate = Math.round((rate + Number.EPSILON) * 100) / 100;
				
				result[c.name] = {
					total, rec, rate
				};
            }

			res.status(200).json({
				result,
			});
        } catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
    },
    getDataCompleteness: async (req, res) => {
		try {
			const classes = await _Class.find({});

			let result = [];

			let total = 0;
			let rec = 0;
            for (let c of classess) {

                const atts = await _Attendance.find({
                    classId: c._id,
                });

				const stds = await _Student.find({
					classId: c._id
				});

				let attRec;
				for await (let att of atts) {
					if (att.dueDate >= new Date()) {
						continue;
					}
	
					total += stds.length;

					attRec = await _AttendanceRecord.find({
						attendanceId: att._id
					});

					rec += attRec.length;
				}

            }

			let = rate = (rec / total) * 100;

			// round off to 2 decimal places, with epsilon
			rate = Math.round((rate + Number.EPSILON) * 100) / 100;

			res.status(200).json({
				rate,
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
    },
	newAttendance: async (req, res) => {
		try {
			const { classId, dueDate } = req.body;

			const att = new _Attendance({
				date: new Date(),
				classId, dueDate
			});

			await att.save();

			return res.status(200).json({
				attendance: att
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	editClass: async (req, res) => {
		try {
			const { classId, name, timeSlots, students, teacherId } = req.body;

			const _class = await _Class.findById(classId);
			const _stds = await _Student.find({ classId });

			for (let std of _stds) {
				std.classEnrolled.splice(std.classEnrolled.indexOf(classId), 1);

				await std.save();
			}

			_class.name = name;
			_class.timeSlots = timeSlots;

			for (let std of students) {
				std.classEnrolled.push(classId);

				await std.save();
			}

			_class.teacherId = teacherId;

			await _class.save();

			return res.status(200).json({
				class: _class
			});

		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	deleteClass: async (req, res) => {
		try {
			const { classId } = req.body;

			const _class = await _Class.findById(classId);

			const _stds = await _Student.find({ classId });

			for (let std of _stds) {
				std.classEnrolled.splice(std.classEnrolled.indexOf(classId), 1);

				await std.save();
			}

			await _class.remove();

			return res.status(200).json({
				message: "Class deleted successfully"
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	}
}