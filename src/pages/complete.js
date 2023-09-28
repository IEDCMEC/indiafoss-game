import { Box, Heading, Text, Button, Flex, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Complete() {
  const router = useRouter();
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
          <Text fontSize="sm">Time Completed</Text>
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
        <Heading as="h1" size="xl" mb={4}>
          Thank You for Playing!
        </Heading>
        <Text fontSize="lg" mb={6}>
          We appreciate your participation in our game.
        </Text>
        <Button onClick={() => router.replace("/")}>Return to Homepage</Button>
      </Box>
    </>
  );
}

export default Complete;
