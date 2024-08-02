// App.js
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Container, Box, Heading, Flex, useToast } from '@chakra-ui/react';
import InputForm from './Inputform';
import ResponseDisplay from './ResponseDisplay';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (response) {
      document.title = response.roll_number; // Set the document title
    }
  }, [response]);

  const handleSubmit = async (jsonInput) => {
    try {
      const res = await fetch('https://bajaj-test-backend-api.onrender.com/bfhl', {
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
    <div style={{ marginLeft: "350px" }}> {/* Correctly using inline styles */}
      <ChakraProvider>
        <Flex
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          flexDirection="column" // Ensures content is centered vertically and horizontally
          p={4}
        >
          <Container maxW={{ base: "95%", md: "container.md" }} centerContent>
            <Box p={4} maxW="lg" borderWidth={1} borderRadius="md" boxShadow="md" width="100%">
              <Heading mb={4} textAlign="center">Bajaj Dev Challenge</Heading>
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
        </Flex>
      </ChakraProvider>
    </div>
  );
}

export default App;
