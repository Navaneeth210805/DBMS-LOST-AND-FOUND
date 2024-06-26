import Head from 'next/head';
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const faviconUrl = "/next.svg"; 

export const metadata = {
  title: "Lost And Found Platform",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <link rel="icon" type="image/svg+xml" href={faviconUrl} />
        <title>{metadata.title}</title>
        <style>{inter.css}</style>
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
