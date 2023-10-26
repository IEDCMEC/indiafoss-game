import { Box, Heading, Text, Button, Flex, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "@/Components/Navbar";
function Complete() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        color="teal"
      >
        <Heading as="h1" size="xl" mb={4} color="black">
          Thank You for Playing!
        </Heading>
        <Text fontSize="lg" mb={6} color="black">
          We appreciate your participation in our game.
        </Text>
        <Button
          backgroundColor="#094074" 
          sx={{
              '&:hover':{
              backgroundColor:"#094074" 
          }
          }}
          color="white"
          onClick={() => {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("timer");
            router.replace("/");
          }}
        >
          Return to Homepage
        </Button>
      </Box>
    </>
  );
}

export default Complete;
