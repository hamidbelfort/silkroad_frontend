import AuthFooter from "../components/layout/authFooter";
import "../globals.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html>
    //   <body>
    //     <TranslationProvider>
    //       <ThemeProvider enableSystem={true} attribute="class">
    //         {/* ThemeProvider برای تنظیم تم سایت */}
    //         <div className="min-h-screen flex flex-col justify-between">
    //           <div className="flex-grow">{children}</div>{" "}
    //           {/* بخش اصلی صفحات auth */}
    //           <AuthFooter />
    //           <Toaster position="bottom-center" /> {/* Toast notification */}
    //         </div>
    //       </ThemeProvider>
    //     </TranslationProvider>
    //   </body>
    // </html>
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-1 py-8">
      <div className="w-full max-w-md">{children}</div>
      <AuthFooter />
    </div>
  );
}
