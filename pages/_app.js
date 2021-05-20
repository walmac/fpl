import "../styles/globals.css";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import ContextProvider from "../context/Context";
import AuthState from '../context/auth/authState';
import Layout from "../src/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <ContextProvider>
        <ChakraProvider theme={theme}>
          <Layout {...pageProps} >
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ContextProvider>
    </AuthState>
  );
}

export default MyApp;
