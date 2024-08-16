import type { Metadata } from "next";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import { ReactNode } from "react";
import NavTop from '@components/navTop';

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
      <head>
        <ThemeModeScript />
      </head>
      <body>
        <NavTop />
        {children}
      </body>
    </html>
  );
}