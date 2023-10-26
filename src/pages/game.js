import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Sample data
const gameData = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    id: 2,
    question: "Who wrote 'Romeo and Juliet'?",
    image:
      "https://www.zdnet.com/a/img/resize/ba1b1ab92085d777ab5e313b34c66a94b7aa1236/2023/06/05/79a43eb8-ce38-488c-8cc0-e04699aaca7f/bing.jpg?auto=webp&width=1280", // Image file name (adjust as needed)
    answer: "William Shakespeare",
  },
  // Add more questions here
];

function GamePage() {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(60); // Set the initial timer value (in seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isTimerRunning, timer]);

  const handleAnswerSubmit = () => {
    // Check if the user's answer is correct
    const correctAnswer = gameData[currentQuestion].answer;
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    // Handle correct or incorrect answer logic here

    // Move to the next question
    if (currentQuestion < gameData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setIsAnswered(false);
    } else {
      router.replace("/complete");
      // End of the game logic
      // You can navigate to a different page or show a game over message
    }
  };

  const handleNextQuestion = () => {
    // Move to the next question
    if (currentQuestion < gameData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setIsAnswered(false);
    } else {
      // End of the game logic
      // You can navigate to a different page or show a game over message
    }
  };

  const currentGameData = gameData[currentQuestion];

  return (
    <>
      <Flex
        justify="space-between"
        alignItems="center"
        bg="teal.500"
        color="white"
        p={2}
        position="sticky"
        top="0"
        zIndex="999"
      >
        <Box>
          <Heading as="h1" size="lg">
            Game Name
          </Heading>
        </Box>
        <Box>
          <Text fontSize="sm">Timer: {timer} seconds</Text>
          <Flex alignItems="center">
            <Avatar size="sm" name="Player Name" src="/avatar.jpg" mr={2} />
            <Text fontSize="sm">Email@example.com</Text>
          </Flex>
        </Box>
      </Flex>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        color="teal"
      >
        <Stack
          spacing={4}
          align="center" // Center-align the content
          p={4}
          mx="auto"
          mt={8}
          bg="white"
          boxShadow="lg" // Add a box shadow
          borderRadius="lg" // Add rounded corners
        >
          <Heading as="h2" size="md">
            Question {currentQuestion + 1}
          </Heading>
          <Text mt={2}>{currentGameData.question}</Text>

          {currentGameData.image && (
            <Image
              src={currentGameData.image}
              alt="Question"
              mt={4}
              w="300px" // Specify the width of the image
            />
          )}

          <Input
            mt={4}
            w="250px" // Specify the width of the input
            placeholder="Your Answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            isDisabled={isAnswered}
          />

          <Flex justify="center">
            <Button
              mt={4}
              backgroundColor="#094074" color="white"
              onClick={handleAnswerSubmit}
              isDisabled={isAnswered}
            >
              Save and Next
            </Button>
          </Flex>
        </Stack>
      </Box>
    </>
  );
}

export default GamePage;
