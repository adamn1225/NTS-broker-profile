"use client";
import React, { ReactNode } from 'react';
import PageFooter from "@components/PageFooter";
import NavTop from '@/app/components/NavTop';
import { metadata } from './metadata';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen ">
        <NavTop />
        <main className="flex-grow relative">
          {children}
        </main>
        <PageFooter />
      </body>
    </html>
  );
}