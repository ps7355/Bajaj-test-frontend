import React from 'react';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';

function ResponseDisplay({ response, selectedOptions, setSelectedOptions }) {
  return (
    <Box mt={4}>
      <Heading size="md" mb={2}>Response</Heading>
      <Stack spacing={3}>
        {selectedOptions.length === 0 && (
          <Box>
            <Heading size="sm">Alphabets</Heading>
            <Text>{response.alphabets.join(', ')}</Text>
            <Heading size="sm">Numbers</Heading>
            <Text>{response.numbers.join(', ')}</Text>
            <Heading size="sm">Highest Alphabet</Heading>
            <Text>{response.highest_alphabet.join(', ')}</Text>
          </Box>
        )}
        {selectedOptions.includes('Alphabets') && (
          <Box>
            <Heading size="sm">Alphabets</Heading>
            <Text>{response.alphabets.join(', ')}</Text>
          </Box>
        )}
        {selectedOptions.includes('Numbers') && (
          <Box>
            <Heading size="sm">Numbers</Heading>
            <Text>{response.numbers.join(', ')}</Text>
          </Box>
        )}
        {selectedOptions.includes('Highest alphabet') && (
          <Box>
            <Heading size="sm">Highest Alphabet</Heading>
            <Text>{response.highest_alphabet.join(', ')}</Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default ResponseDisplay;
