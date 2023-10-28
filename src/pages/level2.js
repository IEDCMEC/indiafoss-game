import React, { useContext } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Text,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "@/Components/Footer";
import { ContextProvider } from "@/contexts/ContextApi";

function Level2Submission() {
  const { formData, setFormData, validationErrors, setValidationErrors } =
    useContext(ContextProvider);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newValidationErrors = {};

    if (!formData.name) {
      newValidationErrors.name = "Name is required";
    }

    if (!formData.flag) {
      newValidationErrors.flag = "Flag is required";
    }

    if (!formData.email) {
      newValidationErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newValidationErrors.email = "Invalid email format";
    }

    if (
      newValidationErrors.name ||
      newValidationErrors.email ||
      newValidationErrors.flag
    ) {
      setValidationErrors(newValidationErrors);
    } else {
      const res = await axios.post("/api/level2_submit", formData);

      if (res.status === 200) {
        toast.success("Submission Successful !");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          flag: "",
        });

        return;
      }
    }
  };

  const isValidEmail = (email) => {
    return email.includes("@");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      backgroundColor="#c2d0dd"
    >
      <Heading as="h1" size="2xl" mb={6}>
        {"Capture The Flag (Hard)🚩 !"}
      </Heading>

      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        gap={6}
        width="100%"
      >
        <Box
          width={{ base: "95vw", md: "100%" }}
          maxW="400px"
          p={4}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
          border="2px solid #094074"
          mb={"50px"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text textAlign="center" fontSize={{ base: "1rem", md: "1.1rem" }}>
            Uncover the flag's covert sanctuary in the server's binary realm,
            where the cryptic guardian weaves secrets within the digital
            tapestry. To reveal the hidden standard-bearer, decipher the
            enigmatic echoes, for each mark and cipher is a note in the symphony
            of knowledge, unlocking the prized secret.
          </Text>
          <Link
            textAlign="center"
            textColor={"darkred"}
            href="http://20.219.107.74"
            isExternal
          >
            20.219.107.74
          </Link>
        </Box>
        <Box
          width={{ base: "95vw", md: "100%" }}
          maxW="400px"
          p={4}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
          border="2px solid #094074"
          mb={"50px"}
        >
          <form onSubmit={handleSubmit}>
            <FormControl id="name" isRequired mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                border="2px solid #094074"
                sx={{
                  "&:hover": {
                    border: "2px solid #190482",
                  },
                }}
              />
              {validationErrors.name && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  {validationErrors.name}
                </Alert>
              )}
            </FormControl>

            <FormControl id="email" isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                border="2px solid #094074"
                sx={{
                  "&:hover": {
                    border: "2px solid #190482",
                  },
                }}
              />
              {validationErrors.email && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  {validationErrors.email}
                </Alert>
              )}
            </FormControl>

            <FormControl id="phoneNumber" mb={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                border="2px solid #094074"
                sx={{
                  "&:hover": {
                    border: "2px solid #190482",
                  },
                }}
              />
            </FormControl>

            <FormControl id="flag" isRequired mb={4}>
              <FormLabel>Flag</FormLabel>
              <Input
                type="text"
                value={formData.flag}
                onChange={(e) =>
                  setFormData({ ...formData, flag: e.target.value })
                }
                border="2px solid #094074"
                sx={{
                  "&:hover": {
                    border: "2px solid #190482",
                  },
                }}
              />
              {validationErrors.flag && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  {validationErrors.flag}
                </Alert>
              )}
            </FormControl>

            <Button
              type="submit"
              backgroundColor="#094074"
              sx={{
                "&:hover": {
                  backgroundColor: "#094074",
                },
              }}
              color="white"
              w={"100%"}
            >
              Submit Flag
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Level2Submission;
