import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import TodosService from "../services/todos.service";

import { IUser } from "../types";

const getTodos = asyncHandler(async (req: Request, res: Response) => {
  let user = req.cookies.user;
  let todos = await TodosService.getTodos(user.id);
  res.json(todos);
});

const setTodo = asyncHandler(async (req: Request, res: Response) => {
  let user = req.cookies.user;
  let { text } = req.body;
  let todo = await TodosService.setTodo(text, user.id);
  res.json(todo);
});

export default { getTodos, setTodo }