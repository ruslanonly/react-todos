import express from "express";

import TodosController from "../controllers/todos.controller";
import { protect } from "../middleware/authMiddleware";
let router = express.Router();

router.get("/todos", protect, TodosController.getTodos)
router.post("/todos", protect, TodosController.setTodo)

export default router;