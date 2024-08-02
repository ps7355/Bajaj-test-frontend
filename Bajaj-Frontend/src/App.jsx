import React, { useState } from 'react';
import { ChakraProvider, Container, Box, Heading, Button, useToast } from '@chakra-ui/react';
import InputForm from './Inputform';
import ResponseDisplay from './ResponseDisplay';


function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const toast = useToast();

  const handleSubmit = async (jsonInput) => {
    try {
      const res = await fetch('http://localhost:3000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput,
      });

      if (!res.ok) {
        throw new Error('Server error');
      }

      const data = await res.json();
      setResponse(data);
      setError(null);
      toast.closeAll(); // Close any existing toasts
    } catch (err) {
      setError('Invalid JSON input or server error');
      setResponse(null);
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.md" centerContent>
        <Box p={4} maxW="lg" borderWidth={1} borderRadius="md" boxShadow="md">
          <Heading mb={4}>Your Roll Number</Heading>
          <InputForm onSubmit={handleSubmit} error={error} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
          {response && (
            <ResponseDisplay
              response={response}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          )}
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default App;