import React, { useEffect, useState } from 'react'

import {
  Spinner,
  Box,
  Container,
  Heading,
  useBoolean,
  useToast
} from '@chakra-ui/react'
import TodoList from '../components/TodoList'

import { IUser, ITodo } from '../types'
import { useNavigate } from 'react-router-dom';
import TodoService from '../api/services/TodoService';
import { useAppSelector } from '../app/store';

export default function TodosPage() {
  const [loading, setLoading] = useBoolean(true);
  const navigate = useNavigate();
  const [todos, setTodos] = useState([] as ITodo[])

  let { user } = useAppSelector(state => state.auth);

  const getTodos = async () => {
    console.log(user);
    TodoService.getTodos(user?.token as string)
    .then((response) => {
      console.log(response);
      setTodos(response as ITodo[]);
    })
    .catch((error) => console.log(error))
    setLoading.off()
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    getTodos();
  }, [user])

  return loading ? 
    <Spinner 
    color='blue.500' 
    emptyColor='gray.300' 
    thickness='.3rem' 
    m="1rem" 
    size="xl"/> 
    : (
    <Box 
    display="flex"
    width="100%"
    height="100vh"
    >
      <Container maxW="container.sm">
        <Box display="grid"
        gridTemplateRows="auto 1fr">
          <Box display="grid" gridAutoFlow="row">
            {todos.length > 0 ? <TodoList todos={todos}/> : <Heading textAlign="center">You have no todos yet</Heading>}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
