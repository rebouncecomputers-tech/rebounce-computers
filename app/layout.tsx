import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-family",
  weight: ["500", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-family",
});

const dataFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-data-family",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rebounce Computers | Laptops, Desktops & Accessories in Mombasa",
  description:
    "Shop genuine laptops, desktops, printers, networking gear and mobile accessories. Fast delivery across Kenya, warranty included.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${dataFont.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}