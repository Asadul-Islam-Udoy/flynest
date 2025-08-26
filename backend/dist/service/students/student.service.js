"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
// services/studentService.ts
const db_1 = require("../../config/db");
const schema_1 = require("../../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
class StudentService {
    static async getStudents(page, limit) {
        const offset = (page - 1) * limit;
        const data = await db_1.db
            .select({
            id: schema_1.students.id,
            name: schema_1.students.name,
            age: schema_1.students.age,
            class: schema_1.classes.name,
            section: schema_1.classes.section
        })
            .from(schema_1.students)
            .leftJoin(schema_1.classes, (0, drizzle_orm_1.eq)(schema_1.students.classId, schema_1.classes.id))
            .limit(limit)
            .offset(offset);
        return data;
    }
}
exports.StudentService = StudentService;
