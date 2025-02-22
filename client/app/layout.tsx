import type { Metadata } from "next";
import "./globals.css";
import {IBM_Plex_Sans} from 'next/font/google'
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "burnifyy",
  description: "get roasted for your music taste",
};

const googleFonts = IBM_Plex_Sans({ subsets: ['latin'], weight: '400' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${googleFonts.className} antialiased overflow-x-hidden bg-background`}
      >
        {children}
        <Footer/>
      </body>
    </html>
  );
}
