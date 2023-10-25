import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const theme = extendTheme({
    fonts: {
      heading: "Montserrat",
      body: "Montserrat",
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Toaster />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
