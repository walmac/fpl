import "../styles/globals.css";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import ContextProvider from "../context/Context";
import Layout from "../src/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <ChakraProvider theme={theme}>
        <Layout {...pageProps} >
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ContextProvider>
  );
}

export default MyApp;
