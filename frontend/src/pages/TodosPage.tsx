import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';

import {
  Spinner,
  Box,
  Container,
  Heading,
  useBoolean
} from '@chakra-ui/react'
import TodoList from '../components/TodoList'

import { IUser, ITodo } from '../types'
import { useNavigate } from 'react-router-dom';

export default function TodosPage() {
  const [loading, setLoading] = useBoolean(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({} as IUser);
  const [todos, setTodos] = useState([] as ITodo[])
  const authorizeUser = async () => {
    let user = JSON.parse(localStorage.getItem("user") as string);
    if (!user) {
      navigate("/login");
    }
    let response = await axios.post(
      "auth/me", {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
    });
    setTodos(await getTodos())
    setUser(user);
    setLoading.off()
  }

  const getTodos = useCallback(async () => {
    let response = await axios.get("api/todos",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data as ITodo[];
  }, [])

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
      <Container maxW="container.lg">
        <Box display="grid"
        gridTemplateRows="auto 1fr">
          <Box display="flex" justifyContent="center">
            <Heading py="3rem">{user.username + "'s todos"}</Heading>
          </Box>
          <Box display="grid"
          gridTemplateColumns="1fr 1fr">
            <TodoList todos={todos}/>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
