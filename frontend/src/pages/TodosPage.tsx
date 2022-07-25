import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';

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

export default function TodosPage() {
  const toast = useToast();
  const [loading, setLoading] = useBoolean(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({} as IUser);
  const [todos, setTodos] = useState([] as ITodo[])
  const authorizeUser = async () => {
    let user = JSON.parse(localStorage.getItem("user") as string);
    if (!user) {
      toast({
        title: "Not authenticated.",
        description: "We can't authorize you.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      navigate("/login");
      return;
    }
    setUser(user);
    setTodos(await TodoService.getTodos());
    setLoading.off()
  }

  useEffect(() => {
    authorizeUser();
  }, [])

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
          <Box display="flex" justifyContent="center">
            <Heading py="3rem">{user.username + "'s todos"}</Heading>
          </Box>
          <Box display="grid" gridAutoFlow="row">
            <TodoList todos={todos}/>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
