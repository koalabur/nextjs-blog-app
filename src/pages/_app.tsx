import type { AppProps } from "next/app";
import { EB_Garamond } from "next/font/google";

// Styles
import "@/styles/globals.scss";

// Components
// @ts-ignore
import Layout from "/components/layout";

const gfont = EB_Garamond({
  weight: ["400", "700"],
  preload: true,
  style: ["normal", "italic"],
  subsets: ["latin"],
  fallback: ["arial"],
  variable: "--main-font",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={gfont.variable}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
