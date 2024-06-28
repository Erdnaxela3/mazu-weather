import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Text,
  Image,
  Divider,
  Switch,
} from "@chakra-ui/react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import PredictionBar from "../components/PredictionBar";

interface Prediction {
  probability: number;
  tagId: string;
  tagName: string;
}

const CustomVision: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [useCustomVisionEndpoints, setUseLocal] = useState(false);
  const [predictionUrl, setPredictionUrl] = useState<string>("");
  const [predictionKey, setPredictionKey] = useState<string>("");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleUrlSubmit = async () => {
    try {
      const url = useCustomVisionEndpoints
        ? predictionUrl + "/url"
        : "/api/url";

      if (useCustomVisionEndpoints) {
        const response = await axios.post(
          url,
          { url: imageUrl },
          {
            headers: {
              "Prediction-Key": predictionKey,
              "Content-Type": "application/json",
            },
          }
        );
        setPredictions(response.data.predictions);
      } else {
        const response = await axios.post(url, { url: imageUrl });
        setPredictions(response.data.predictions);
      }
    } catch (error) {
      console.error("Error submitting URL:", error);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      const preview = URL.createObjectURL(acceptedFiles[0]);
      setFilePreview(preview);
    }
  };

  const handleFileSubmit = async () => {
    if (selectedFile) {
      try {
        const url = useCustomVisionEndpoints
          ? predictionUrl + "/image"
          : "/api/image";
        let headers = {
          "Content-Type": "application/octet-stream",
        };

        if (useCustomVisionEndpoints) {
          headers = {
            "Content-Type": "application/octet-stream",
            "Prediction-Key": predictionKey,
          };
        }

        const response = await axios.post(url, selectedFile, {
          headers: headers,
        });
        setPredictions(response.data.predictions);
      } catch (error) {
        console.error("Error submitting file:", error);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  return (
    <Box p={4}>
      <VStack spacing={4} mt={4}>
        <Switch
          colorScheme="teal"
          isChecked={useCustomVisionEndpoints}
          onChange={() => setUseLocal(!useCustomVisionEndpoints)}
        >
          Use Custom Vision Endpoints
        </Switch>

        {useCustomVisionEndpoints && (
          <Box>
            <FormControl>
              <FormLabel>Prediction URL</FormLabel>
              <Input
                placeholder="Enter prediction URL"
                value={predictionUrl}
                onChange={(e) => setPredictionUrl(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Prediction Key</FormLabel>
              <Input
                placeholder="Enter prediction key"
                value={predictionKey}
                onChange={(e) => setPredictionKey(e.target.value)}
              />
            </FormControl>
          </Box>
        )}

        <FormControl>
          <FormLabel>Image URL</FormLabel>
          <Input
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleUrlChange}
          />
          <Button mt={2} colorScheme="teal" onClick={handleUrlSubmit}>
            Submit URL
          </Button>
        </FormControl>

        {imageUrl && (
          <Box>
            <Image
              src={imageUrl}
              alt="Selected URL preview"
              boxSize={300}
              objectFit="cover"
            />
          </Box>
        )}

        <Divider />

        <FormControl>
          <FormLabel>Upload Image</FormLabel>
          <Box
            {...getRootProps()}
            p={4}
            border="2px dashed"
            borderColor="gray.300"
            borderRadius="md"
            textAlign="center"
            position="relative"
            height={300}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Text>Drop the files here...</Text>
            ) : selectedFile ? (
              <Image
                src={filePreview!}
                alt="Selected file preview"
                boxSize="100%"
                objectFit="cover"
                maxHeight={300}
                width={"auto"}
              />
            ) : (
              <Text>Drag & drop some files here, or click to select files</Text>
            )}
          </Box>
          <Button mt={2} colorScheme="teal" onClick={handleFileSubmit}>
            Submit File
          </Button>
        </FormControl>

        <PredictionBar predictions={predictions} />
      </VStack>
    </Box>
  );
};

export default CustomVision;
