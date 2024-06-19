import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Box bg="skyblue" p={4}>
      <Flex direction={'row'}>
        <Link to="/custom-vision">
          <Button variant="outline">
            Custom Vision
          </Button>
        </Link>
        <Link to="/machine-learning">
          <Button variant="outline">
            Machine Learning
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;