import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Checkbox,
  Text,
  HStack
} from '@chakra-ui/react';

function InputForm({ onSubmit, error, selectedOptions, setSelectedOptions }) {
  const [input, setInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false); // State for filter visibility
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [responseReceived, setResponseReceived] = useState(false); // State to check if response is received

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsError(false);
  };

  const handleExampleClick = () => {
    setInput(JSON.stringify({ data: ["M", "1", "334", "4", "B"] }, null, 2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseReceived(false); // Reset response status

    try {
      JSON.parse(input); // Validate JSON
      await onSubmit(input);
      setIsError(false);
      setFiltersVisible(true); // Show filters after successful submission
      setResponseReceived(true);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  return (
    <Box textAlign="center" p={4} maxWidth="800px" margin="0 auto">
      <FormControl isInvalid={isError} mb={4}>
        <FormLabel>Enter JSON:</FormLabel>
        <HStack spacing={2} align="center">
          <Input
            placeholder='Enter JSON here'
            value={input}
            onChange={handleInputChange}
            width="80%" // Increased width
            resize="none" // Prevent resizing
          />
          <Button
            colorScheme="blue"
            onClick={handleExampleClick}
            width="20%" // Expanded width
          >
            Use Example JSON
          </Button>
        </HStack>
        {isError && <FormErrorMessage>Invalid JSON format</FormErrorMessage>}
        
        <Button colorScheme="teal" onClick={handleSubmit} mt={3} isLoading={isLoading}>
          Submit
        </Button>
      </FormControl>

      {/* Loading message */}
      {isLoading && (
        <Text color="orange.500" mt={3}>
           Sir, I am using the free version of the Render Service to host the API. Please wait up to 1 minute for it to boot up.
        </Text>
      )}

      {/* Filter options appear only after valid JSON submission */}
      {filtersVisible && !isLoading && responseReceived && (
        <Box mt={4}>
          <FormLabel>Select Filters:</FormLabel>
          <Stack spacing={3} direction="row" justify="center">
            <Checkbox
              value="Alphabets"
              onChange={handleOptionChange}
              isChecked={selectedOptions.includes('Alphabets')}
            >
              Alphabets
            </Checkbox>
            <Checkbox
              value="Numbers"
              onChange={handleOptionChange}
              isChecked={selectedOptions.includes('Numbers')}
            >
              Numbers
            </Checkbox>
            <Checkbox
              value="Highest alphabet"
              onChange={handleOptionChange}
              isChecked={selectedOptions.includes('Highest alphabet')}
            >
              Highest Alphabet
            </Checkbox>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default InputForm;
