import React, { useState } from 'react'

import { Link } from 'react-router-dom'

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
  useMediaQuery,
} from '@chakra-ui/react'

import {
  ViewIcon,
  ViewOffIcon
} from "@chakra-ui/icons"

type RegisterInputState = {
  username: string,
  email: string,
  password: string
}

export default function RegisterPage() {
  const [wideDevice] = useMediaQuery("(min-width: 800px)")
  const [showPassword, setShowPassword] = useBoolean(false);
  const [inputs, updateInputs] = useState<RegisterInputState>({} as RegisterInputState)

  const onRegister = () => {
    console.log(inputs);
  }

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    let {name, value} = event.target as HTMLInputElement;
    updateInputs((prevState) => ({...prevState, [name]: value}));
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
        <Heading alignSelf={wideDevice ? "" : "center"}>Register page</Heading>
        <Heading color="gray.300" _hover={{color: "gray.500"}}>
          <Link to="/login">Login</Link>
        </Heading>
      </Box>
      <Container>
        <FormControl display="grid" gap="3">
          <FormLabel>Username</FormLabel>
          <Input 
          name='username' 
          type='username' 
          placeholder='Enter username'
          onChange={onInputChange}/>

          <FormLabel>Email address</FormLabel>
          <Input 
          name='email' 
          type='email' 
          placeholder='Enter email'
          onChange={onInputChange}/>

          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input 
              name='password'
              pr="4.5rem"
              type={showPassword ? 'text' : 'password'} 
              placeholder="Enter your password"
              onChange={onInputChange}
            />
            <InputRightElement width="4.5rem">
              <Button onClick={() => setShowPassword.toggle()} size="sm">
                {showPassword ? <ViewIcon boxSize={5}/> : <ViewOffIcon boxSize={5}/>}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={onRegister} colorScheme="blue">Register</Button>
          </Box>
        </FormControl>
      </Container>
    </Box>
  )
}
