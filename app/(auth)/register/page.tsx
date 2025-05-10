import RegisterForm from "@/components/auth/registerForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col w-full min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
