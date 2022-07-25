import { QueryResult } from "pg";

import db from "../database/db";

import { ITodo } from "../types";

class UsersService {
  async getTodo(todoId: number) {
    let q_res: QueryResult = await db.query("SELECT * FROM todos WHERE _id = $1", [todoId]);
    let todo: ITodo = q_res.rows[0];
    return todo;
  }

  async getTodos(user_id: number) {
    let q_res: QueryResult = await db.query("SELECT * FROM todos WHERE user_id = $1", [user_id]);
    let todos: ITodo[] = q_res.rows;
    return todos;
  }

  async setTodo(text: string, user_id: number) {
    let q_res: QueryResult = await db.query("INSERT INTO todos (text, user_id) VALUES ($1, $2) RETURNING *", [text, user_id]);
    let todos: ITodo = q_res.rows[0];
    return todos;
  }

  async deleteTodo(todoId: number) {
    let q_res: QueryResult = await db.query("DELETE FROM todos WHERE _id = $1 RETURNING *", [todoId]);
    let deletedTodo = q_res.rows[0];
    return deletedTodo;
  }
}

export default new UsersService();