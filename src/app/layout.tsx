import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iwaiter service",
  description: "iWaiter -  Digital Waiter",
  icons: {
    icon: 'https://digital-waiter-service.s3.eu-north-1.amazonaws.com/favicon.ico',
    shortcut: "https://digital-waiter-service.s3.eu-north-1.amazonaws.com/favicon.ico",
    apple: "https://digital-waiter-service.s3.eu-north-1.amazonaws.com/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          {children}
          <ToastContainer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
