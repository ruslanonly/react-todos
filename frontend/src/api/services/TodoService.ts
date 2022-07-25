import axios from "axios";

import { ITodo } from "../../types";

async function getTodos() {
  let authenticatedUser = JSON.parse(localStorage.getItem("user") as string);
  let response = await axios.get("api/todos",
    {
      headers: {
        Authorization: `Bearer ${authenticatedUser.token}`
      }
    });
  return response.data as ITodo[];
}

async function setTodo() {

}

const TodoService = {
  getTodos,
  setTodo
}

export default TodoService;