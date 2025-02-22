import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "burnifyy",
  description: "get roasted for your music taste",
};

const googleFonts = IBM_Plex_Sans({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body
        className={`${googleFonts.className} antialiased overflow-x-hidden bg-background`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
