import { TranslationProvider } from "../components/providers/TranslationProvider";
import { ThemeProvider } from "../components/providers/themeProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TranslationProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
            <Toaster position="bottom-center" />
          </ThemeProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
