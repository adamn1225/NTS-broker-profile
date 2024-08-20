import { ReactNode } from "react";
import Head from 'next/head';
import PageFooter from "@components/PageFooter";
import NavTop from '@components/navTop';
import NavBanner from './components/NavBanner';

type Metadata = {
  title: string;
  description: string;
};

export const metadata: Metadata = {
  title: "HH Noah Profile",
  description: "NTS Logistics",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="flex flex-col min-h-screen">
        <NavTop />
        {/* <NavBanner /> */}
        <main className="flex-grow relative max-h-max w-screen">
          {children}
        </main>
        <PageFooter />
      </body>
    </html>
  );
}