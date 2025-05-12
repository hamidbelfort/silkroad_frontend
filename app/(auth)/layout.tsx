import AuthFooter from "../../components/layout/authFooter";
import "../globals.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background px-1 py-8">
      <div>{children}</div>
      <AuthFooter />
    </div>
  );
}
