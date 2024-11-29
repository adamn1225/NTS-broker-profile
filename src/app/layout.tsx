"use client";

import React, { ReactNode } from 'react';
import Head from 'next/head';
import PageFooter from '@components/PageFooter';
import NavTop from '@/app/components/NavTop';
import './globals.css';
import Script from 'next/script';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <title>shipper-connect</title>
        <meta name="description" content="Your App Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body suppressHydrationWarning={true} className="flex flex-col min-h-screen">
        <NavTop />
        <main className="flex-grow relative">
          {children}
        </main>
        <PageFooter />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-178VD9EM9D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-178VD9EM9D');
          `}
        </Script>
      </body>
    </html>
  );
}