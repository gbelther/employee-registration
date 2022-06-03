import { ReduxProvider } from "../providers";
import GlobalStyle from "../styles/GlobalStyle";

export default function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
