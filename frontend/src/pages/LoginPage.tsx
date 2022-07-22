import React, { useState } from 'react'

import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  useBoolean,
  InputGroup,
  InputRightElement,
  Box,
  Container,
  Heading,
  useMediaQuery
} from '@chakra-ui/react'

import {
  ViewIcon,
  ViewOffIcon
} from "@chakra-ui/icons"
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [wideDevice] = useMediaQuery("(min-width: 800px)")
  const [showPassword, setShowPassword] = useBoolean(false);
  const onRegister = () => {
    console.log(wideDevice);
  }
  return (
    <Box 
    display="grid" 
    gridAutoFlow={wideDevice ? "column" : "row"} 
    width="100%" 
    height="100vh" 
    alignItems={wideDevice ? "center" : "flex-start"}
    justifyItems="center">
      <Box display="flex" gap="2" flexDirection="column" alignItems="center">
        <Heading alignSelf={wideDevice ? "" : "center"}>Login page</Heading>
        <Heading color="gray.300" _hover={{color: "gray.500"}}>
          <Link to="/register">Register</Link>
        </Heading>
      </Box>
      <Container>
        <FormControl display="grid" gap="3">
          <FormLabel>Username</FormLabel>
          <Input type='username' placeholder='Enter username'/>

          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input 
              pr="4.5rem"
              type={showPassword ? 'text' : 'password'} 
              placeholder="Enter your password"
            />
            <InputRightElement width="4.5rem">
              <Button onClick={() => setShowPassword.toggle()} size="sm">
                {showPassword ? <ViewIcon boxSize={5}/> : <ViewOffIcon boxSize={5}/>}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={onRegister} colorScheme="blue">Login</Button>
          </Box>
        </FormControl>
      </Container>
    </Box>
  )
}
