import React, { useContext, useEffect, useState } from 'react'

import {
  Spinner,
  Box,
  Flex,
  Button,
  Container,
  Heading,
  useBoolean,
} from '@chakra-ui/react'

import {
  AddIcon
} from "@chakra-ui/icons"

import AddTodoButton from '../components/AddTodoButton'
import TodoList from '../components/TodoList'

import { ITodo } from '../types'

import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/store';
import useForceUpdate from '../utils/hooks/useForceUpdate'

import TodoService from '../api/services/TodoService';

import { ForceUpdateContext } from '../utils/ForceUpdateContext'

export default function TodosPage() {
  const [updateFlag, forceUpdate] = useForceUpdate();
  const [loading, setLoading] = useBoolean(true);
  const navigate = useNavigate();
  const [todos, setTodos] = useState([] as ITodo[])

  let { user } = useAppSelector(state => state.auth);

  const getTodos = async () => {
    setLoading.on();
    await TodoService.getTodos(user?.token as string)
    .then((response) => {
      setTodos(response as ITodo[]);
    })
    .catch((error) => console.log(error))
    setLoading.off()
  }

  useEffect(() => {
    if (user) {
      getTodos();
    }
  }, [updateFlag])

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user])

  return loading ? 
    <Spinner 
    color='blue.500' 
    emptyColor='gray.300' 
    thickness='.3rem' 
    m="1rem" 
    size="xl"/> 
    : (
    <ForceUpdateContext.Provider value={forceUpdate as () => void}>
      <Box 
        display="flex"
        width="100%"
        height="100vh"
        >
          <Container maxW="container.sm">
            <Box 
            display="grid"
            gridTemplateRows="1fr auto"
            gap="3rem">
              <Box display="grid" gridAutoFlow="row">
                {todos.length > 0 ? <TodoList todos={todos}/> : <Heading textAlign="center">You have no todos yet</Heading>}
              </Box>
              <Flex justifyContent="center">
                <AddTodoButton updateList={forceUpdate as () => void}/>
              </Flex>
            </Box>
          </Container>
        </Box>
    </ForceUpdateContext.Provider>
    
  )
}
