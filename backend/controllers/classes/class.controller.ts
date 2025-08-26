import { Request, Response } from "express";
import { db } from "../../config/db";
import { classes, students } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export class ClassController {
  static async createClass(req: Request, res: Response) {
    const cls = await db.insert(classes).values(req.body).returning();
    res.json(cls);
  }

  static async enrollStudent(req: Request, res: Response) {
    const { studentId } = req.body;
    const [student] = await db.update(students)
      .set({ classId: Number(req.params.id) })
      .where(eq(students.id, studentId))
      .returning();
    res.json(student);
  }

  static async getClassStudents(req: Request, res: Response) {
    const data = await db.select().from(students).where(eq(students.classId, Number(req.params.id)));
    res.json(data);
  }

static async getClasses(req: Request, res: Response) {
  const data = await db.select().from(classes); // ✅ use correct table
  res.json(data); 
}
}
