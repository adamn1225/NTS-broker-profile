"use client";

import { ReactNode, useEffect, useState } from "react";
import Head from 'next/head';
import PageFooter from "@components/PageFooter";
import NavTop from '@components/navTop';
import { metadata } from './metadata'; // Import metadata

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="flex flex-col min-h-screen">
        <NavTop />
        <main className="flex-grow relative max-h-max w-screen">
          {children}
        </main>
        <PageFooter />
      </body>
    </html>
  );
}