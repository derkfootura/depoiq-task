import type { Metadata } from "next";
import "./globals.css";

import Header from '../components/Header';
import Toolbar from '../components/Toolbar';
import Tagsbar from '../components/Tagsbar';
import { ClerkProvider } from "@clerk/nextjs";
import DataProvider from "./_components/DataProvider";

export const metadata: Metadata = {
  title: "DepoIQ Task",
  description: "DepoIQ Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className='main-layout'>
            <Header />
            <Toolbar />
            <Tagsbar />
            <DataProvider>
              <div className='main-content'>{children}</div>
            </DataProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
