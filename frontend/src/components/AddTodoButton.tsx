import React, { useRef } from 'react'

import { useDisclosure } from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Box,
  FormLabel,
  Input,
  ModalFooter
} from "@chakra-ui/react"

import TodoService from '../api/services/TodoService'
import { useAppSelector } from '../app/store'

type DeleteTodoButtonProps = {
  updateList: () => void
}

export default function DeleteTodoButton({ updateList } : DeleteTodoButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const textRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const user = useAppSelector(state => state.auth.user);

  const onAdd = async () => {
    let text: string = textRef.current.value;
    if (user) {
      await TodoService.setTodo(text, user._id, user?.token as string)
    }
    onClose();
    updateList();
  }

  return (
    <>
      <Button 
        onClick={onOpen}
        width="min-content" 
        p="1rem"
        variant="outline"
        colorScheme="blue"
        rightIcon={<AddIcon/>}>Add Todo</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <Stack spacing='24px' pb="5" alignContent="center">
              <Box>
                <FormLabel htmlFor='title'>Todo Text</FormLabel>
                <Input
                  ref={textRef}
                  name='text'
                  id='text'
                  placeholder='Enter todo text'
                />
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onAdd}>Add</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
