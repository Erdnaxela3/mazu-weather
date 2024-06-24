import React, { useState } from "react";
import { Box, Heading, Input, Button, VStack, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import axios from "axios";

const MachineLearning: React.FC = () => {
  const [inputs, setInputs] = useState({
    Pclass: 0,
    Sex: "",
    Age: 0,
    Fare: 0,
  });
  const [predictionResult, setPredictionResult] = useState<number | null>(null);

  const url = "";
  const apiKey = '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSexSelection = (sex: string) => {
    setInputs({ ...inputs, Sex: sex });
  };

  const handleFormSubmit = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        'Access-Control-Allow-Origin': '*',
      };

      const formattedInputs = {"Inputs": {
        "input1": [
          {
            "Pclass": inputs.Pclass,
            "Sex": inputs.Sex,
            "Age": inputs.Age,
            "Fare": inputs.Fare,
          }
        ]
      }};

      const response = await axios.post(url, formattedInputs, { headers });
      const { Survived } = response.data.Results.WebServiceOutput0[0];
      setPredictionResult(Survived);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box p={4}>
      <Heading>Machine Learning Form</Heading>
      <VStack mt={4}>
        <Text fontWeight="bold">Enter the following details:</Text>
        <Text>Pclass: 1, 2, or 3</Text>
        <Input
          type="number"
          placeholder="Pclass"
          name="Pclass"
          value={inputs.Pclass}
          onChange={handleInputChange}
        />
        <Text>Sex M or F</Text>
        <Menu>
          <MenuButton as={Button} colorScheme="teal">
            Sex
          </MenuButton>
          <MenuList>
          <MenuItem onClick={() => handleSexSelection('M')}>M</MenuItem>
          <MenuItem onClick={() => handleSexSelection('F')}>F</MenuItem>
          </MenuList>
        </Menu>
        <Text>Age</Text>
        <Input
          type="number"
          placeholder="Age"
          name="Age"
          value={inputs.Age}
          onChange={handleInputChange}
        />
        <Text>Fare</Text>
        <Input
          type="number"
          placeholder="Fare"
          name="Fare"
          value={inputs.Fare}
          onChange={handleInputChange}
        />
        <Button colorScheme="teal" onClick={handleFormSubmit}>
          Submit
        </Button>
        {predictionResult !== null && (
          <Box>
            <Text fontWeight="bold">Prediction Result:</Text>
            <Text>{`Survived: ${predictionResult}`}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default MachineLearning;
