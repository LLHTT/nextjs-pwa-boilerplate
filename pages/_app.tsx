import { useEffect } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Determine whether it's day or night based on the user's local time
    const hours = new Date().getHours();
    if (hours < 6 || hours > 18) {
      document.body.classList.add("night");
      document.body.classList.remove("day");
    } else {
      document.body.classList.add("day");
      document.body.classList.remove("night");
    }
  }, []);

  return <Component {...pageProps} />;
}
