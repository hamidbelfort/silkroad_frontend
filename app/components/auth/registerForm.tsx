"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { TermsCheckbox } from "./termsCheckbox";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    setError("");

    try {
      // درخواست ارسال اطلاعات به سرور
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to register");
      // عملیات موفق - شاید redirect یا پیام موفقیت
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create your account
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Name */}
        <div>
          <label className="block mb-1">Full Name</label>
          <div className="relative">
            <User
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="John Doe"
              className="pl-10"
              {...register("name", {
                required: "Name is required",
              })}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />
            <Input
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <div className="relative flex justify-baseline">
            <Lock
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />
            <Input
              type="password"
              placeholder="••••••••"
              className="pl-10"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}
        <TermsCheckbox
          onChange={(checked) => setIsAgreed(checked)}
        />
        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={!isAgreed || loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              SigninUp...
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </div>
  );
}
