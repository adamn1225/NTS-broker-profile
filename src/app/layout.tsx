import { ReactNode } from "react";
import Head from 'next/head';

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
    <html suppressHydrationWarning>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}