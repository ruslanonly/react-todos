import React from 'react'
import { useNavigate } from 'react-router-dom'

import { 
  Box,
  Heading,
  Container,
  Flex,
  Button
} from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../app/store'
import { logout } from '../features/auth/authSlice'

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClick = () => {
    navigate("/login");
    dispatch(logout());
  }
  return <Button onClick={onClick}>Logout</Button>
}

export default function Header() {
  let { user } = useAppSelector(state => state.auth)
  
  return (
    <Box 
    width="100%">
      <Container maxW="container.lg">
        <Flex py="2" justifyContent="space-between" alignItems="center" borderBottom="solid .1rem" borderColor="gray.300">
          <Heading fontSize="lg">Todos App</Heading>
          <Box>
            { user ? <Flex alignItems="center" gap="1rem"><Heading color="blue.700" size="md">{user.username}</Heading><LogoutButton/></Flex> : null }
          </Box>
        </Flex>
      </Container>

    </Box>
  )
}

