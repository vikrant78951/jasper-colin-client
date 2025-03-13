
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";
import { Toaster } from "@components/ui/sonner";
import Provider from "@redux/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className}  antialiased w-screen`}>
        <Header />
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
