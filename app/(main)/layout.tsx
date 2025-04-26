// app/(main)/layout.tsx
import "../globals.css";
import { Navbar } from "../components/layout/navbar";
import Footer from "../components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" suppressHydrationWarning>
    //   <body className="min-h-screen flex flex-col bg-background text-foreground">
    //     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    //       <div className="flex flex-col min-h-screen">
    //         <Navbar />
    //         <main className="flex-1 container mx-auto px-4 py-6">
    //           <TranslationProvider>{children}</TranslationProvider>
    //         </main>
    //         <Toaster richColors position="bottom-center" />
    //         <Footer />
    //       </div>
    //     </ThemeProvider>
    //   </body>
    // </html>
    // {}
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
