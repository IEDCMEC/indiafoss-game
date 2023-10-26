import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { TimerProvider } from "@/contexts/Timer";
import ApiContext from "@/contexts/ContextApi";
export default function App({ Component, pageProps }) {
  const theme = extendTheme({
    fonts: {
      heading: "Montserrat",
      body: "Montserrat",
    },
  });
  return (
    <TimerProvider>
      <ApiContext>
        <ChakraProvider theme={theme}>
          <Toaster position="top-right" />
          <Component {...pageProps} />
        </ChakraProvider>
      </ApiContext>
    </TimerProvider>
  );
}
