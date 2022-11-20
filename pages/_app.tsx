import type { AppProps } from "next/app";
import { FilecoinProvider } from "../components/providers/FilecoinProvider";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FilecoinProvider>
      <Component {...pageProps} />
    </FilecoinProvider>
  );
}
