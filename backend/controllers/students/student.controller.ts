import { Request, Response } from "express";
import { db } from "../../config/db";
import { students } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { StudentService } from "../../service/students/student.service";
export class StudentController {
  static async createStudent(req: Request, res: Response) {
    const student_all = await db.insert(students).values(req.body).returning();
    res.json(student_all);
  }

static async getStudents(req: Request, res: Response) {
    const { page = 1, limit = 10 } = req.query;

    const students = await StudentService.getStudents(
      Number(page),
      Number(limit)
    );
    res.json({
      page: Number(page),
      limit: Number(limit),
      data: students,
    });
  }

  static async getStudentById(req: Request, res: Response) {
    const [student] = await db.select().from(students).where(eq(students.id, Number(req.params.id)));
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  }
}
