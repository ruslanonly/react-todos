import React from 'react'
import { Box } from '@chakra-ui/react';

import Todo from './Todo';

import { ITodo } from "../types";

type TodoListProps = {
  todos: ITodo[]
}

export default function TodoList({todos} : TodoListProps) {
  return (
    <Box 
    display="grid"
    gridAutoFlow="row">
      {todos.map((todo : ITodo) => (
        <Todo key={todo._id} todo={todo}/>
      ))}
    </Box>
  )
}
