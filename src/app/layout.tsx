"use client";

import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    // Remove extra attributes added by browser extensions or client-side scripts
    document.body.removeAttribute('data-new-gr-c-s-check-loaded');
    document.body.removeAttribute('data-gr-ext-installed');
  }, []);

  return (
    <html lang="en" data-lt-installed="true">
      <Head>
        <title>Your App Title</title>
        <meta name="description" content="Your App Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body suppressHydrationWarning={true} className="flex flex-col min-h-screen ">
        <header>stuff</header>
        <main className="flex-grow relative">
          {children}
        </main>
        <footer>other stuff</footer>
      </body>
    </html>
  );
}