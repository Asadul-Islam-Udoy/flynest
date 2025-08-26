import { Router } from "express";
import { AuthController } from "../../controllers/auth/auth.controller";

const router = Router();
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/all", AuthController.getUsers);
export default router;
