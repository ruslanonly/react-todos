import React, { useState } from 'react'

import {
  Box,
  Text,
  Checkbox, 
  Button
} from "@chakra-ui/react"

import { DeleteIcon } from '@chakra-ui/icons'

import { ITodo } from '../types'

type TodoProps = {
  todo: ITodo
}

export default function Todo({ todo } : TodoProps) {
  const [completed, setCompleted] = useState<boolean>(todo.completed);
  const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(prevState => !prevState);
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" gap="1rem" alignItems="center">
        <Checkbox size="lg" onChange={onCheck}></Checkbox>
        <Text 
        transition="all .25s ease" 
        textDecor={completed ? "line-through" : ""} 
        fontWeight="bold"
        color={completed ? "gray.400" : "gray.900"}
        fontSize="1.5rem">{todo.text}</Text>
      </Box>
      <Box display="grid" gridAutoFlow="column" gap="1rem">
        <Button variant="ghost" size="sm"><DeleteIcon/></Button>
      </Box>
    </Box>
  )
}
