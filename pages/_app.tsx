import { useEffect } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours < 18) {
      document.body.classList.add("day");
      document.body.classList.remove("night");
    } else {
      document.body.classList.add("night");
      document.body.classList.remove("day");
    }
  }, []);

  return <Component {...pageProps} />;
}
