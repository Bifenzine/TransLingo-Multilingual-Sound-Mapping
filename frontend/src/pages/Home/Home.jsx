import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [french, setFrench] = useState("");
  const [arabic, setArabic] = useState("");
  const [notChanged, setNotChanged] = useState("");
  const [changed, setChanged] = useState("");
  const [changedA_F, setChangedA_F] = useState("")

  const { colorMode, toggleColorMode } = useColorMode();


  const handleSubmit = async () => {
    try {
      // Split French and Arabic words into arrays of characters
      const frenchArray = french.split("");
      const arabicArray = arabic.split("");

      // Initialize arrays to store unchanged and changed letters
      let notChangedArray = [];
      let changedArray = [];

      // Initialize array to store letters not similar in French and Arabic
      let changedA_F_Array = [];

      // Iterate over each letter of the French word
      for (let i = 0; i < frenchArray.length; i++) {
        let foundMatch = false; // Flag to track if a match is found for the current French letter
        // Iterate over each letter of the Arabic word
        for (let j = 0; j < arabicArray.length; j++) {
          // Check if the letters are similar
          if (frenchArray[i] === arabicArray[j]) {
            notChangedArray.push(frenchArray[i]); // Store unchanged letter
            foundMatch = true;
            break; // Exit the inner loop once a match is found
          }
        }
        // If no match is found for the current French letter, add it to changedArray
        if (!foundMatch) {
          changedArray.push(`${frenchArray[i]}`); // Note: Arabic letter not found, so only French letter is stored
        }
      }

      // Iterate over each letter of the Arabic word
      for (let i = 0; i < arabicArray.length; i++) {
        let foundMatch = false; // Flag to track if a match is found for the current Arabic letter
        // Iterate over each letter of the French word
        for (let j = 0; j < frenchArray.length; j++) {
          // Check if the letters are similar
          if (arabicArray[i] === frenchArray[j]) {
            foundMatch = true;
            break; // Exit the inner loop once a match is found
          }
        }
        // If no match is found for the current Arabic letter, add it to changedA_F_Array
        if (!foundMatch) {
          changedA_F_Array.push(`${arabicArray[i]}`); // Note: Arabic letter not found in French, so Arabic letter is stored
        }
      }

      // Join arrays to form strings
      const notChanged = notChangedArray.join(",");
      const changed = changedArray.join(",");
      const changedA_F = changedA_F_Array.join(",");

      // Create formData object
      const formData = {
        french: french,
        arabic: arabic,
        notChanged: notChanged,
        changed: changed,
        changedA_F: changedA_F // Add changedA_F to formData
      };

      // Send formData to the backend
      const response = await fetch('http://localhost:7000/insertWord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Handle response
      if (response.ok) {
        // Registration successful
        const data = await response.json();
        console.log('Registered word:', french);
        onClose();
      } else {
        alert("Word Already Exist !!!")
        // Registration failed, handle error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Flex justifyContent={"end"} py={5}>
        <Box mr={2}>
          <Button bg={"gray.dark"} color={"white"} onClick={onOpen}>
            Add
          </Button>
        </Box>
        <Box>
          <Button bg={"gray.dark"} color={"white"} onClick={toggleColorMode}>
            Toggle Mode
          </Button>
        </Box>
      </Flex>

      <Flex mt={50}>
        <SearchBar
        />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add word</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="French"
              value={french}
              onChange={(e) => setFrench(e.target.value)}
              mb={2}
            />
            <Input
              placeholder="Arabic"
              value={arabic}
              onChange={(e) => setArabic(e.target.value)}
              mb={2}
            />

            {/* <Input
              placeholder="Not changed"
              value={notChanged}
              onChange={(e) => setNotChanged(e.target.value)}
              mb={2}
            />
            <Input
              placeholder="Changed"
              value={changed}
              onChange={(e) => setChanged(e.target.value)}
            /> */}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;