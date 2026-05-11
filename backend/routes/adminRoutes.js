import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAdminStats } from "../controllers/adminController.js";

const router = express.Router();

// Protected admin route
router.get("/stats", authMiddleware, getAdminStats);

export default router;