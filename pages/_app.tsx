import "../styles/globals.css";

import { Noto_Sans } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

import { fetcher } from "../utils/fetcher";

const notoSans = Noto_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-noto_sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${notoSans.variable} font-sans`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </div>
  );
}
