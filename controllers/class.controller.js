const _Class = require("../models/Class");
const _Attendance = require("../models/Attendance");
const _AttendanceRecord = require("../models/Attendance");
const _Student = require('../models/Student');

module.exports = {
	newStudent: async (req, res) => {
		try {
			const { name, id } = req.body;

			const student = new _Student({
				name,
				id,
			});

			await student.save();

			res.json({
				student,
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	getStudents: async (req, res) => {
		try {
			const students = await _Student.find({});

			res.status(200).json({
				students,
			});

		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	getStudentsByClassId: async (req, res) => {
		try {
			const classId = req.params.id;

			const students = await _Student.find({
				classEnrolled: classId,
			});

			res.status(200).json({
				students,
			});

		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	deleteStudent: async (req, res) => {
		try {
			const student = await _Student.findByIdAndDelete(req.params.id);

			res.status(200).json({
				message: "Student deleted",
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	deleteClass: async (req, res) => {
		try {
			const classId = req.body.classId;

			const students = await _Student.find({ 
				classEnrolled: classId,
			});

			for (let student of students) {
				student.classEnrolled.splice(student.classEnrolled.indexOf(classId), 1);
				await student.save();
			}

			await _Class.findByIdAndDelete(classId);

			res.status(200).json({
				message: "Class deleted",
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
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
	addStudent: async (req, res) => {
		try {
			const { stdId, classId } = req.body;

			const student = await _Student.findById(stdId);

			if (!student) {
				return res.status(404).json({
					message: "Student not found",
				});
			}

			const _class = await _Class.findById(classId);

			if (!_class) {
				return res.status(404).json({
					message: "Class not found",
				});
			}

			const total = await _Student.find({
				classEnrolled: _class._id
			}).countDocuments();

			if (total >= _class.maxStudents) {
				return res.status(400).json({
					message: "Class is full",
				});
			}

			if (student.classEnrolled.includes(classId)) {
				return res.status(400).json({
					message: "Student already enrolled",
				});
			}

			student.classEnrolled.push(_class._id);

			await student.save();

			res.status(200).json({
				message: "Student added to class",
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	addClass: async (req, res) => {
		try {
			const { name, maxStudent, teacherId, timeslots, students } = req.body;

			const _class = new _Class({
				name, maxStudent, teacherId, timeSlot: timeslots
			});

			for (let student of students) {
				const _student = await _Student.findById(student);

				if (_student.classEnrolled.indexOf(_class._id) === -1) {
					_student.classEnrolled.push(_class._id);		
					await _student.save();
				}
			}

			await _class.save();

			res.status(200).json({
				class: _class
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	editStudent: async (req, res) => {
		try {
			const { name, classEnrolled } = req.body;

			const student = await _Student.findById(id);

			if (!student) {
				return res.status(404).json({
					message: "Student not found",
				});
			}

			student.name = name;

			await student.save();

			res.status(200).json({
				message: "Student edited",
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	editClass: async (req, res) => {
		try {
			const { name, maxStudent, teacherId, timeslots, students } = req.body;

			const _class = await _Class.findById(req.params.id);

			if (!_class) {
				return res.status(404).json({
					message: "Class not found",
				});
			}

			
			_class.name = name;
			_class.maxStudents = maxStudent;
			_class.teacherId = teacherId;
			_class.timeSlot = timeslots;
			
			const stds = await _Student.find({
				classEnrolled: _class._id
			});

			for (let student of stds) {
				student.classEnrolled.splice(student.classEnrolled.indexOf(_class._id), 1);
				
				await student.save();
			}

			for (let student of students) {
				const _student = await _Student.findById(student);

				if (_student.classEnrolled.indexOf(_class._id) === -1) {
					_student.classEnrolled.push(_class._id);		
					await _student.save();
				}
			}

			await _class.save();

			res.status(200).json({
				message: "Class updated",
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	getClasses: async (req, res) => {
		try {
			const classes = await _Class.find({});

			const result = [];
			for (let _class of classes) {
				// find total students who have classEnrolled = _class._id
				const total = await _Student.find({
					classEnrolled: _class._id
				}).countDocuments();

				result.push({
					class: _class,
					total
				});
			}

			res.status(200).json({
				classes: result
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	},
	getClass: async (req, res) => {
		try {
			const _class = await _Class.findById(req.params.id);

			if (!_class) {
				return res.status(404).json({
					message: "Class not found",
				});
			}

			// get all enrolled students
			const students = await _Student.find({
				classEnrolled: _class._id
			});

			res.status(200).json({
				class: _class, students
			});
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	}
};
