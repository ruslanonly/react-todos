import express from "express";

import TodosController from "../controllers/todos.controller";
let router = express.Router();

router.get("/todos", TodosController.getTodos)
router.post("/todos", TodosController.setTodo)
router.delete("/todos/:id", TodosController.deleteTodo)
router.put("/todos", TodosController.changeTodoCompleted)

export default router;