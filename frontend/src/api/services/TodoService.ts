import axios, { AxiosRequestConfig } from "axios";

import { ITodo } from "../../types";

const getAuthRequestConfig = (token: string) => {
  let config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return config;
}

async function getTodos(token : string) {
  let response = await axios.get("api/todos", getAuthRequestConfig(token));
  return response.data as ITodo[];
}

async function setTodo(text: string, user_id: number, token: string) {
  let data = {
    text,
    user_id
  }
  let response = await axios.post("api/todos", data, getAuthRequestConfig(token));
  return response.data as ITodo;
}

async function deleteTodo(todoId: number, token: string) {
  let response = await axios.delete(`api/todos/${todoId}`, getAuthRequestConfig(token))
  return response.data as ITodo;
}

async function changeTodoCompleted(todoId: number, completed: boolean, token: string) {
  let data = {
    todoId,
    completed
  }

  let response = await axios.put(`api/todos`, data, getAuthRequestConfig(token))
  return response.data as ITodo;
}

const TodoService = {
  getTodos,
  setTodo,
  deleteTodo,
  changeTodoCompleted
}

export default TodoService;