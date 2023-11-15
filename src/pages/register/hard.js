import React, { useContext, useState } from "react";
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
import { PulseLoader } from "react-spinners";

function Register() {
  const [loading, setLoading] = useState(false);

  const { formData, setFormData, validationErrors, setValidationErrors } =
    useContext(ContextProvider);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newValidationErrors = {};

    if (!formData.email) {
      newValidationErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newValidationErrors.email = "Invalid email format";
    }

    if (newValidationErrors.email) {
      setValidationErrors(newValidationErrors);
    } else {
      setLoading(true);

      const r = await axios.post("/api/saveEmail", {
        email: formData.email,
        secret: Buffer.from(process.env.NEXT_PUBLIC_MAIL_SECRET).toString(
          "base64"
        ),
      });

      if (r.status !== 200) {
        toast.error("Something went wrong");
      }

      // const res = await axios.post("/api/sendEmail", {
      //   toEmail: formData.email,
      //   secret: Buffer.from(process.env.NEXT_PUBLIC_MAIL_SECRET).toString(
      //     "base64"
      //   ),
      // });
      // setLoading(false);
      // if (res.status === 200) {
      //   toast.success("Email sent successfully!");
      //   setFormData({ email: "" });
      // }
    }
  };

  const isValidEmail = (email) => {
    return email.includes("@");
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        backgroundColor="#c2d0dd"
      >
        <Heading as="h1" size="2xl" mb={6}>
          {"CTF (Hard) Register 🚩 !"}
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
            <FormControl id="email" isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
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
              {loading ? <PulseLoader color={"#ffffff"} size={10} /> : "Submit"}
            </Button>
          </form>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Register;
