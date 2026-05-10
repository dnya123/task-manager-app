import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";
import { 
    createTask,
    getTasks, 
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/tasks", authMiddleware, createTask);
router.get("/tasks", authMiddleware, getTasks);
router.put("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);

export default router;