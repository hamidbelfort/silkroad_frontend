import AuthFooter from "../components/layout/authFooter";
import { ThemeProvider } from "../components/providers/themeProvider";
import { Toaster } from "sonner";
import "../globals.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {/* ThemeProvider برای تنظیم تم سایت */}
      <div className="min-h-screen flex flex-col justify-between">
        {/* در اینجا می‌توانید بک‌گراند متفاوتی برای صفحات auth قرار بدید */}
        <div className="flex-grow">{children}</div> {/* بخش اصلی صفحات auth */}
        <AuthFooter />
        <Toaster position="bottom-center" /> {/* Toast notification */}
      </div>
    </ThemeProvider>
  );
}
