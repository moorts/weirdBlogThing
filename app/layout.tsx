import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

import Header from '@/app/components/header.tsx';
import Sidebar from '@/app/components/sidebar.tsx';

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular & Bold
  variable: "--font-eb-garamond", // optional CSS variable
});

export const metadata: Metadata = {
  title: "Some weird blog.",
  description: "idk what to put here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ebGaramond.className} antialiased`}
      >

        <Header />
        <div className="flex flex-col md:flex-row justify-center items-start min-h-screen p-4 bg-[url('/images/books.jpg')]">
          <Sidebar />

          <div className="w-4/7 min-h-screen flex flex-col border-3 border-[#5A3A22] gap-4 max-w-4xl p-8 bg-[#1B1B1B] text-[#F5F5F5] shadow-lg text-left items-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
