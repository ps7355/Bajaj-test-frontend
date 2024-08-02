import React, { useState } from 'react';
import {
  Box,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Checkbox,
  useToast
} from '@chakra-ui/react';

function InputForm({ onSubmit, error, selectedOptions, setSelectedOptions }) {
  const [input, setInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false); // New state for filter visibility
  const toast = useToast();

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      JSON.parse(input); // Validate JSON
      onSubmit(input);
      setIsError(false);
      setFiltersVisible(true); // Show filters after successful submission
    } catch {
      setIsError(true);
      toast({
        title: "Invalid JSON",
        description: "The JSON format is incorrect. Please check your input.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  return (
    <Box>
      <FormControl isInvalid={isError}>
        <FormLabel>Enter JSON:</FormLabel>
        <Textarea
          placeholder='Enter JSON here'
          value={input}
          onChange={handleInputChange}
          rows={6}
          mb={3}
        />
        {isError && <FormErrorMessage>Invalid JSON format</FormErrorMessage>}
        
        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </FormControl>

      {/* Filter options appear only after valid JSON submission */}
      {filtersVisible && (
        <Box mt={4}>
          <Stack spacing={3}>
            <FormLabel>Select Filters:</FormLabel>
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
