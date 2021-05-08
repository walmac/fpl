import "../styles/globals.css";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from '../src/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
		
			<Component {...pageProps} />
		
    </ChakraProvider>
  );
}

export default MyApp;
