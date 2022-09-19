import "../styles/globals.css";
import {
  ChakraProvider,
  ColorModeScript,
  ColorModeScriptProps,
} from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MsalProvider instance={msalInstance}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Component {...pageProps} />
        </ChakraProvider>
      </MsalProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
