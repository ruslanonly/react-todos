import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import TodosService from "../services/todos.service";
import { IUserData } from "../types";

const getTodos = asyncHandler(async (req: Request, res: Response) => {
  let user: IUserData = req.user;
  let todos = await TodosService.getTodos(user.id);
  res.json(todos);
});

const setTodo = asyncHandler(async (req: Request, res: Response) => {
  let user: IUserData = req.user;
  let { text } = req.body;
  let todo = await TodosService.setTodo(text, user.id);
  res.json(todo);
});

const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  let { id } = req.params;
  let todoId: number = Number(id);
  let user: IUserData = req.user;

  let todo = await TodosService.getTodo(todoId);

  if (todo.user_id != user.id) {
    res.status(400);
    throw new Error("You can't delete stranger's todo.")
  }

  let deletedTodo = await TodosService.deleteTodo(todoId);
  res.json(deletedTodo);
});

const changeTodoCompleted = asyncHandler(async (req: Request, res: Response) => {
  let { todoId, completed } = req.body;
  let changedTodo = await TodosService.changeTodoCompleted(todoId, completed);
  res.json(changedTodo);
});

export default { getTodos, setTodo, deleteTodo, changeTodoCompleted }