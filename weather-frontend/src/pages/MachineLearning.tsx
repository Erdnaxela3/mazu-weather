import React, { useState } from "react";
import { Box, Heading, Input, Button, VStack, Text} from "@chakra-ui/react";
import axios from "axios";

const MachineLearning: React.FC = () => {
  const [inputs, setInputs] = useState({
    Precipitation: 0,
    TempMax: 0,
    TempMin: 0,
    Wind: 0,
  });
  const [predictionResult, setPredictionResult] = useState<number | null>(null);

  const url = "http://8f6650a1-f59e-4543-84a5-05470e248b34.westeurope.azurecontainer.io/score";
  const apiKey = 'fbYGlhWkPF2yCXNGqjLaHDMyIRglMkx8';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };
      const formattedInputs = {"Inputs": {
        "input1": [
          {
            "precipitation": inputs.Precipitation,
            "temp_max": inputs.TempMax,
            "temp_min": inputs.TempMin,
            "wind": inputs.Wind,
          }
        ]
      }};

      const response = await axios.post(url, formattedInputs, { headers });
      const Sunny = response.data.Results.WebServiceOutput0[0]["Scored Labels"];
      setPredictionResult(Sunny);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box p={4}>
      <Heading>Machine Learning Form</Heading>
      <VStack mt={4}>
        <Text fontWeight="bold">Enter the following details:</Text>
        <Text>Precipitation 1 to 50</Text>
        <Input
          type="number"
          placeholder="Precipitation"
          name="Precipitation"
          value={inputs.Precipitation}
          onChange={handleInputChange}
        />
        <Text>Maximum Temperature</Text>
        <Input
          type="number"
          placeholder="Maximum Temperature"
          name="TempMax"
          value={inputs.TempMax}
          onChange={handleInputChange}
        />
        <Text>Miniimum Temperature</Text>
        <Input
          type="number"
          placeholder="Minimum Temperature"
          name="TempMin"
          value={inputs.TempMin}
          onChange={handleInputChange}
        />
        <Text>Wind speed</Text>
        <Input
          type="number"
          placeholder="Wind speed"
          name="Wind"
          value={inputs.Wind}
          onChange={handleInputChange}
        />
        <Button colorScheme="teal" onClick={handleFormSubmit}>
          Submit
        </Button>
        {predictionResult !== null && (
          <Box>
            <Text fontWeight="bold">Prediction Result:</Text>
            <Text>{`Sunny weather: ${predictionResult}`}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default MachineLearning;
