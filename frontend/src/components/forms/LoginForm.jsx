"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import api from "@/services/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter your email.");
    }

    if (!password.trim()) {
      return toast.error("Please enter your password.");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      login(data.user, data.token);

      switch (data.user.role) {
        case "admin":
          router.push("/admin/dashboard");
          break;

        case "manager":
          router.push("/manager/dashboard");
          break;

        default:
          router.push("/student/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <Image
          src="/images/logo.png"
          width={220}
          height={55}
            style={{ width: "220px", height: "auto" }}
          alt="TokenTrack"
        />
      </div>

      <div className="mt-6 text-center">
        <h1 className="text-5xl font-bold text-slate-900">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-lg text-slate-500">
          Sign in to continue to your dashboard
        </p>
      </div>

      <form onSubmit={handleLogin} className="mt-10 space-y-7">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <Input
            type="email"
            placeholder="Enter your email"
            icon={<Mail size={20} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            icon={<Lock size={20} />}
            rightIcon={
              showPassword ? (
                <EyeOff
                  size={20}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  size={20}
                  onClick={() => setShowPassword(true)}
                />
              )
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 accent-blue-600"
            />
            Remember me
          </label>

          <button
            type="button"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <Button loading={loading}>
          Login
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-slate-400">
              New to TokenTrack?
            </span>
          </div>
        </div>

        <Link href="/register">
          <button
            type="button"
            className="h-14 w-full rounded-2xl border border-slate-300 bg-white font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
          >
            Create Account
          </button>
        </Link>
      </form>
    </>
  );
}