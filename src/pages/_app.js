import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { TimerProvider } from "@/contexts/Timer";

export default function App({ Component, pageProps }) {
  const theme = extendTheme({
    fonts: {
      heading: "Montserrat",
      body: "Montserrat",
    },
  });
  return (
    <TimerProvider>
      <ChakraProvider theme={theme}>
      <Toaster />
        <Component {...pageProps} />
      </ChakraProvider>
    </TimerProvider>
  );
}
