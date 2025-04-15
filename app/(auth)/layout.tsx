import AuthFooter from "../components/layout/authFooter";
import "../globals.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-1 py-8">
      <div className="w-full max-w-md">{children}</div>
      <AuthFooter />
    </div>
  );
}
