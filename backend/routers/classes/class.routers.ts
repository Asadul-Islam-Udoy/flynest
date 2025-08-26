import { Router } from "express";
import { ClassController } from "../../controllers/classes/class.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

const router = Router();

router.post("/", authMiddleware, roleGuard("admin"), ClassController.createClass);
router.post("/:id/enroll", authMiddleware, roleGuard("admin","teacher"), ClassController.enrollStudent);
router.get("/:id/students", authMiddleware, roleGuard("admin","teacher"), ClassController.getClassStudents);
router.get("/all", authMiddleware, roleGuard("admin","teacher"), ClassController.getClasses);
export default router;
