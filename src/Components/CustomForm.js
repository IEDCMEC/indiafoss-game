import React from 'react'
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Alert,
    AlertIcon,
  } from "@chakra-ui/react";
const CustomForm = ({id,label, input, setInput, type}) => {
  return (
    <FormControl isRequired mb={4} id={id} width={'100%'}>
        <FormLabel>{label}</FormLabel>
        <Input
            type={type}
            value={input}
            onChange={setInput}
            border='2px solid #190482'
              sx={{
                '&:hover':{
                  border: '2px solid #190482'
                }
              }}
        />
    </FormControl>
  )
}

export default CustomForm