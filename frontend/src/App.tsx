import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Box, ChakraProvider, Container } from '@chakra-ui/react';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodosPage from './pages/TodosPage';

import Header from './components/Header';

import "./scss/App.scss";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Box 
          width="100vw"
          minHeight="100vh"
          display="grid"
          gridTemplateRows="auto 1fr"
          gap="1rem">
          <Header/>
          <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/' element={<TodosPage/>}/>
          </Routes>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App;
