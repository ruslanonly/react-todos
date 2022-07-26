import React, { useContext, useState } from 'react'

import {
  Box,
  Text,
  Checkbox, 
  Button
} from "@chakra-ui/react"

import { DeleteIcon } from '@chakra-ui/icons'

import { ITodo } from '../types'

import TodoService from "../api/services/TodoService";
import { useAppSelector } from '../app/store';
import { ForceUpdateContext } from '../utils/ForceUpdateContext';

type TodoProps = {
  todo: ITodo
}

export default function Todo({ todo } : TodoProps) {
  const forceUpdate = useContext(ForceUpdateContext);
  const { user } = useAppSelector(state => state.auth);
  const [completed, setCompleted] = useState<boolean>(todo.completed);
  const onCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await TodoService.changeTodoCompleted(todo._id, !completed, user?.token as string)
    setCompleted(prevState => !prevState);
  }

  const onDelete = async () => {
    await TodoService.deleteTodo(todo._id, user?.token as string);
    forceUpdate();
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" gap="1rem" alignItems="center">
        <Checkbox isChecked={completed} size="lg" onChange={onCheck}></Checkbox>
        <Text 
        transition="all .25s ease" 
        textDecor={completed ? "line-through" : ""} 
        fontWeight="bold"
        color={completed ? "gray.400" : "gray.900"}
        fontSize="1.5rem">{todo.text}</Text>
      </Box>
      <Box display="grid" gridAutoFlow="column" gap="1rem">
        <Button variant="ghost" size="sm" onClick={onDelete}><DeleteIcon/></Button>
      </Box>
    </Box>
  )
}
