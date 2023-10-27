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
} from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "@/Components/Footer";
import { ContextProvider } from "@/contexts/ContextApi";

// Footer
import iedclogo from "@/assets/iedc mec.png";
import fossmeclogo from "@/assets/fossmec.png";
import Image from "next/image";
import meclogo from "@/assets/mec logo.png";
import { BsInstagram } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import { FiFacebook, FiLinkedin, FiYoutube } from "react-icons/fi";

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
      {/* Footer */}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        position="absolute"
        backgroundColor="#c2d0dd"
        bottom={"0"}
        width={"100vw"}
        minHeight={{ base: "50px", md: "100px" }}
        mb={"0px"}
      >
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
          width={{ base: "95vw", md: "85vw" }}
          flexDirection={{ base: "column", md: "row" }}
          height="100px"
        >
          <Link href="https://www.iedcmec.in/" isExternal>
            <Image
              src={iedclogo}
              style={{ height: "50px", width: "calc(400/115 * 50px)" }}
              alt=""
            />
          </Link>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            width={{ base: "95vw", md: "40vw" }}
            flexDirection={"column"}
            height={"100%"}
            style={{
              marginRight: "65px",
            }}
          >
            <Link href="https://www.mec.ac.in/" isExternal>
              <Image
                src={meclogo}
                style={{ height: "60px", width: "calc(340/170 * 60px)" }}
                alt=""
              />
            </Link>
            <p
              style={{
                fontSize: "1.3rem",
                color: "black",
              }}
            >
              Made with 💙 MEC
            </p>
          </Box>
          <Link href="https://fossmec.netlify.app/" isExternal>
            <Image
              src={fossmeclogo}
              style={{
                height: "80px",
                width: "100px",
                backgroundColor: "#0c2445",
                borderRadius: "5%",
              }}
              alt=""
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Level2Submission;
