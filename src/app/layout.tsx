import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaibhav Pandey | Developer Portfolio",
  description: "Computer Science Engineer, Full Stack Developer, and AI/ML Enthusiast",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Background3D from "@/components/Background3D";
import AnnouncementBar from "@/components/AnnouncementBar";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen selection:bg-purple-500/30 overflow-x-hidden`}
      >
        <Background3D />
        <CustomCursor />
        <AnnouncementBar />
        <Navbar />
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
