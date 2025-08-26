"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassController = void 0;
const db_1 = require("../../config/db");
const schema_1 = require("../../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
class ClassController {
    static async createClass(req, res) {
        const cls = await db_1.db.insert(schema_1.classes).values(req.body).returning();
        res.json(cls);
    }
    static async enrollStudent(req, res) {
        const { studentId } = req.body;
        const [student] = await db_1.db.update(schema_1.students)
            .set({ classId: Number(req.params.id) })
            .where((0, drizzle_orm_1.eq)(schema_1.students.id, studentId))
            .returning();
        res.json(student);
    }
    static async getClassStudents(req, res) {
        const data = await db_1.db.select().from(schema_1.students).where((0, drizzle_orm_1.eq)(schema_1.students.classId, Number(req.params.id)));
        res.json(data);
    }
    static async getClasses(req, res) {
        const data = await db_1.db.select().from(schema_1.classes); // ✅ use correct table
        res.json(data);
    }
}
exports.ClassController = ClassController;
