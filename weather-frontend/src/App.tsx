import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import CustomVision from './pages/CustomVision';
import MachineLearning from './pages/MachineLearning';

const App: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/custom-vision" element={<CustomVision />} />
        <Route path="/machine-learning" element={<MachineLearning />} />
      </Routes>
    </Box>
  );
};

export default App;