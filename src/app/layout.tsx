"use client";
import React, { useState, useEffect, ReactNode } from 'react';
import PageFooter from "@components/PageFooter";
import NavTop from '@/app/components/navTop';
import { metadata } from './metadata'; // Import metadata
import ScrollToTopButton from './components/ScrollToTopButton';
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
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
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