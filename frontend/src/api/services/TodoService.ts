import axios from "axios";

import { ITodo } from "../../types";

async function getTodos(token : string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  let response = await axios.get("api/todos", config);
  return response.data as ITodo[];
}

async function setTodo() {

}

const TodoService = {
  getTodos,
  setTodo
}

export default TodoService;