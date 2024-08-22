import { ReactNode } from "react";
import AdminNav from '@components/AdminNav';
import Head from 'next/head';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <html suppressHydrationWarning>
      <Head>
        <title>Admin - HH Direct Leads</title>
      </Head>
      <body>
        <AdminNav />
        <div className="admin-container">
          {children}
        </div>
      </body>
    </html>
  );
}