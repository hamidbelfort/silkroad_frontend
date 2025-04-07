import AuthFooter from "../components/layout/authFooter";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col justify-between">
          <main className="flex-1 flex items-center justify-center">
            {children}
          </main>
          <AuthFooter />
        </div>
      </body>
    </html>
  );
}
