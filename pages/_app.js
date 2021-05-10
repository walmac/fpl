import "../styles/globals.css";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from '../src/theme';
import ContextProvider from '../context/Context';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <ChakraProvider theme={theme}>    
        <Component {...pageProps} />        
      </ChakraProvider>
    </ContextProvider>
    
  );
}

export default MyApp;
