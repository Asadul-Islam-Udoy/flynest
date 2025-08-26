// services/studentService.ts
import { db } from "../../config/db";
import { students, classes } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export class StudentService {
  static async getStudents(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const data = await db
      .select({
        id: students.id,
        name: students.name,
        age: students.age,
        class: classes.name,
        section:classes.section
      })
      .from(students)
      .leftJoin(classes, eq(students.classId, classes.id))
      .limit(limit)
      .offset(offset);

    return data;
  }
}