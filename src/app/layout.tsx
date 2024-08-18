import type { Metadata } from "next";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import { ReactNode } from "react";
import NavTop from '@components/navTop';
import Head from 'next/head';


export const metadata: Metadata = {
  title: "HH Direct Leads",
  description: "Generated SSTA",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Asterone&display=swap" rel="stylesheet" />
        <ThemeModeScript />
      </Head>
      <body>
        <NavTop />
        {children}
      </body>



    </html>
  );
}