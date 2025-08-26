"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const db_1 = require("../../config/db");
const schema_1 = require("../../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const student_service_1 = require("../../service/students/student.service");
class StudentController {
    static async createStudent(req, res) {
        const student_all = await db_1.db.insert(schema_1.students).values(req.body).returning();
        res.json(student_all);
    }
    static async getStudents(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const students = await student_service_1.StudentService.getStudents(Number(page), Number(limit));
        res.json({
            page: Number(page),
            limit: Number(limit),
            data: students,
        });
    }
    static async getStudentById(req, res) {
        const [student] = await db_1.db.select().from(schema_1.students).where((0, drizzle_orm_1.eq)(schema_1.students.id, Number(req.params.id)));
        if (!student)
            return res.status(404).json({ error: "Student not found" });
        res.json(student);
    }
}
exports.StudentController = StudentController;
