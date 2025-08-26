import { Router } from "express";
import { StudentController } from "../../controllers/students/student.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

const router = Router();

router.post("/", authMiddleware, roleGuard("admin"), StudentController.createStudent);
router.get("/", authMiddleware, roleGuard("admin", "teacher"), StudentController.getStudents);
router.get("/:id", authMiddleware, StudentController.getStudentById);

export default router;
