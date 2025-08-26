import { pgTable, serial, varchar, integer, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: text("role").default("student"),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  section: varchar("section", { length: 50 }).notNull(),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  age: integer("age").notNull(),
  classId: integer("class_id").references(() => classes.id),
});

export const classesRelations = relations(classes, ({ many }) => ({
  students: many(students),
}));

export const studentsRelations = relations(students, ({ one }) => ({
  class: one(classes, {
    fields: [students.classId],
    references: [classes.id],
  }),
}));