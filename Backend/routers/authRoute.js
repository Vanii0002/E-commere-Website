import express from "express";
import { register, login, logout, home } from "../controllers/authController.js";
import authRequired from "../middleware/authRequired.js";
const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// Protected route example: home
router.get("/", authRequired, home);

export default router;      