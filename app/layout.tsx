import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TranslationProvider from "./components/providers/TranslationProvider";
import Footer from "./components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Silk Road Services",
  description: "Brand New Tourism Services in Iran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex-grow`}
      >
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
      <Footer />
    </html>
  );
}
