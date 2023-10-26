import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { TimerProvider } from "@/contexts/Timer";
import Head from "next/head";
import Script from "next/script";

import ApiContext from "@/contexts/ContextApi";
export default function App({ Component, pageProps }) {
  const theme = extendTheme({
    fonts: {
      heading: "Montserrat",
      body: "Montserrat",
    },
  });
  return (
    <ApiContext>
      <TimerProvider>
        <ChakraProvider theme={theme}>
          <Toaster position="top-right" />
          <Head>
            <title>Game | IEDC MEC</title>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=G-DY0PT292WB`}
            />
            <Script strategy="lazyOnload">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-DY0PT292WB', {
        page_path: window.location.pathname,
        });
    `}
            </Script>
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </TimerProvider>
    </ApiContext>
  );
}
