import { ReactNode } from "react";
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
      <body>
        {children}
      </body>
    </html>
  );
}