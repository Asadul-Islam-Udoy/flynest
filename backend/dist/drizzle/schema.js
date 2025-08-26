"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRelations = exports.classesRelations = exports.students = exports.classes = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 150 }).unique().notNull(),
    passwordHash: (0, pg_core_1.varchar)("password_hash", { length: 255 }).notNull(),
    role: (0, pg_core_1.text)("role").default("student"),
});
exports.classes = (0, pg_core_1.pgTable)("classes", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    section: (0, pg_core_1.varchar)("section", { length: 50 }).notNull(),
});
exports.students = (0, pg_core_1.pgTable)("students", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    age: (0, pg_core_1.integer)("age").notNull(),
    classId: (0, pg_core_1.integer)("class_id").references(() => exports.classes.id),
});
exports.classesRelations = (0, drizzle_orm_1.relations)(exports.classes, ({ many }) => ({
    students: many(exports.students),
}));
exports.studentsRelations = (0, drizzle_orm_1.relations)(exports.students, ({ one }) => ({
    class: one(exports.classes, {
        fields: [exports.students.classId],
        references: [exports.classes.id],
    }),
}));
