import express from "express";

import AuthController from "../controllers/auth.controller";
import { protect } from "../middleware/authMiddleware";
let router = express.Router();

router.post("/register", AuthController.register)
router.post("/login", AuthController.login);
router.post("/me", protect, AuthController.getMe);

export default router;