import React, { useState } from 'react'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useBoolean,
  InputGroup,
  InputRightElement,
  Box,
  Container,
  Heading,
  useMediaQuery,
  useToast
} from '@chakra-ui/react'

import {
  ViewIcon,
  ViewOffIcon
} from "@chakra-ui/icons"
import { Link, useNavigate } from 'react-router-dom';

import AuthService from "../api/services/AuthService";

type LoginInputState = {
  username: string,
  password: string
}

export default function LoginPage() {
  const toast = useToast();
  const [logining, setLogining] = useBoolean(false);
  const navigate = useNavigate();
  const [wideDevice] = useMediaQuery("(min-width: 800px)")
  const [showPassword, setShowPassword] = useBoolean(false);
  const [inputs, updateInputs] = useState<LoginInputState>({} as LoginInputState)

  const onLogin = async () => {
    let { username, password } = inputs;
    if (!username || !password) {
      toast({
        title: "Not enough data",
        description: "Fill all of the fields",
        status: 'warning'
      })
      return ;
    }
    setLogining.on();
    try {
      await AuthService.login({username, password});
      navigate("/");
    } catch (error) {
      toast({
        title: "Incorrent credentials",
        description: "incorrect username or password",
        status: 'error'
      })
    }
    setLogining.off();
  }

  const onInputChange = (event : React.FormEvent<HTMLInputElement>) => {
    let {name, value} = event.target as HTMLInputElement;
    updateInputs((prevState : LoginInputState) => ({
      ...prevState,
      [name]: value
    }));
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
          <Input 
          name='username'
          type='username' 
          placeholder='Enter username'
          onChange={onInputChange}/>

          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input 
              name='password'
              type={showPassword ? 'text' : 'password'} 
              placeholder="Enter your password"
              pr="4.5rem"
              onChange={onInputChange}

            />
            <InputRightElement width="4.5rem">
              <Button onClick={() => setShowPassword.toggle()} size="sm">
                {showPassword ? <ViewIcon boxSize={5}/> : <ViewOffIcon boxSize={5}/>}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box display="flex" justifyContent="flex-end">
            <Button 
            isLoading={logining}
            onClick={onLogin} 
            colorScheme="blue">Login</Button>
          </Box>
        </FormControl>
      </Container>
    </Box>
  )
}
