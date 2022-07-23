import React from 'react'

import {
  Box
} from "@chakra-ui/react"

import { ITodo } from '../types'

type TodoProps = {
  todo: ITodo
}

export default function Todo({ todo } : TodoProps) {
  return (
    <Box display="grid" gridTemplateColumns="1fr auto">
      {todo.text}
    </Box>
  )
}
