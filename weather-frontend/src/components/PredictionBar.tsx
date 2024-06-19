import React from 'react';
import { Box, Heading, Tooltip, HStack, Text } from '@chakra-ui/react';

interface Prediction {
  probability: number;
  tagId: string;
  tagName: string;
}

interface PredictionBarProps {
  predictions: Prediction[];
}

const generateColor = (index: number) => {
  const colors = [
    'red.400', 'green.400', 'blue.400', 'purple.400', 'orange.400', 'yellow.400', 'pink.400', 'teal.400'
  ];
  return colors[index % colors.length];
};

const PredictionBar: React.FC<PredictionBarProps> = ({ predictions }) => {
  return (
    <Box width="100%">
      <Heading size="md" mt={4} mb={2}>Predictions</Heading>
      {predictions.length > 0 && (
        <Box position="relative" height="40px" width="100%" bg="gray.200" borderRadius="md">
          <HStack spacing={0} height="100%" width="100%">
            {predictions
              .sort((a, b) => b.probability - a.probability)
              .map((prediction, index) => (
                <Tooltip
                  key={prediction.tagId + '' + prediction.probability}
                  label={`${prediction.tagName} - ${(prediction.probability * 100).toFixed(2)}%`}
                  aria-label="Prediction tooltip"
                  placement="top"
                  hasArrow
                  // Ensures the tooltip is visible on hover
                  openDelay={0}
                  closeDelay={300}
                >
                  <Box
                    height="100%"
                    width={`${prediction.probability * 100}%`}
                    bg={generateColor(index)}
                    borderLeftRadius={index === 0 ? 'md' : 'none'}
                    borderRightRadius={index === predictions.length - 1 ? 'md' : 'none'}
                    position="relative"
                  >
                    {prediction.probability * 100 > 5 && (
                      <Text
                        color="white"
                        fontSize="xs"
                        textAlign="center"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        px={2}
                        style={{ lineHeight: '40px' }}  // Align the text vertically
                      >
                        {`${prediction.tagName} - ${(prediction.probability * 100).toFixed(2)}%`}
                      </Text>
                    )}
                  </Box>
                </Tooltip>
              ))}
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default PredictionBar;
