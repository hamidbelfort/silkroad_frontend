// app/(main)/layout.tsx
import type { ReactNode } from "react";
import { Navbar } from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { ThemeProvider } from "../components/providers/themeProvider";
import TranslationProvider from "../components/providers/TranslationProvider";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Silk Road Services",
  description: "Brand New Tourism Services in Iran",
};
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6">
              <TranslationProvider>{children}</TranslationProvider>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
