"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import {
  User,
  Mail,
  Lock,
  IdCard,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function RegisterForm() {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    name: "",

    rollNumber: "",

    email: "",

    password: "",

    confirmPassword: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.rollNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill all fields.");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          rollNumber: formData.rollNumber,
          email: formData.email,
          password: formData.password,
        }
      );

      toast.success("Registration Successful 🎉");

      router.push("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (

    <>

      {/* Logo */}

      <div className="flex justify-center">

        <Image
            src="/images/logo.png"
            width={220}
            height={55}
            style={{ width: "220px", height: "auto" }}
            alt="TokenTrack"
        />

      </div>

      {/* Heading */}

      <div className="mt-3 text-center">

        <h1 className="text-5xl font-bold text-slate-900">

          Create Account ✨

        </h1>

        <p className="mt-2 text-lg text-slate-500">

          Join TokenTrack to start managing
          your digital coupons.

        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-4"
      >
        {/* Full Name */}

<div>
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Full Name
  </label>

  <div className="relative">

    <User
      size={20}
      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter your full name"
      className="h-14 w-full rounded-2xl border border-slate-200 bg-[#F7FAFF] pl-14 pr-4 text-base outline-none transition focus:border-blue-500 focus:bg-white"
    />

  </div>
</div>

{/* Roll Number */}

<div>
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Roll Number
  </label>

  <div className="relative">

    <IdCard
      size={20}
      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      type="text"
      name="rollNumber"
      value={formData.rollNumber}
      onChange={handleChange}
      placeholder="Enter roll number"
      className="h-14 w-full rounded-2xl border border-slate-200 bg-[#F7FAFF] pl-14 pr-4 text-base outline-none transition focus:border-blue-500 focus:bg-white"
    />

  </div>
</div>

{/* Email */}

<div>
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Email Address
  </label>

  <div className="relative">

    <Mail
      size={20}
      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter email address"
      className="h-14 w-full rounded-2xl border border-slate-200 bg-[#F7FAFF] pl-14 pr-4 text-base outline-none transition focus:border-blue-500 focus:bg-white"
    />

  </div>
</div>

{/* Password */}

<div>
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Password
  </label>

  <div className="relative">

    <Lock
      size={20}
      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Create password"
      className="h-14 w-full rounded-2xl border border-slate-200 bg-[#F7FAFF] pl-14 pr-14 text-base outline-none transition focus:border-blue-500 focus:bg-white"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>

  </div>
</div>

{/* Confirm Password */}

<div>
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Confirm Password
  </label>

  <div className="relative">

    <Lock
      size={20}
      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      placeholder="Confirm password"
      className="h-14 w-full rounded-2xl border border-slate-200 bg-[#F7FAFF] pl-14 pr-14 text-base outline-none transition focus:border-blue-500 focus:bg-white"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
    >
      {showConfirmPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>

  </div>
</div>
        {/* Terms */}

        <div className="flex items-center gap-3 pt-2">

          <input
            type="checkbox"
            required
            className="h-4 w-4 rounded accent-blue-600"
          />

          <p className="text-sm text-slate-500">
            I agree to the{" "}
            <span className="font-semibold text-blue-600">
              Terms & Conditions
            </span>
          </p>

        </div>

        {/* Create Account Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-[#2563EB]
            to-[#1D4ED8]
            text-lg
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-[1.01]
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {loading ? (
            "Creating Account..."
          ) : (
            <>
              Create Account
              <ArrowRight size={20} />
            </>
          )}
        </button>

        {/* Divider */}

        <div className="relative py-2">

          <div className="absolute inset-0 flex items-center">

            <div className="w-full border-t border-slate-200"></div>

          </div>

          <div className="relative flex justify-center">

            <span className="bg-white px-4 text-sm text-slate-400">

              Already have an account?

            </span>

          </div>

        </div>

        {/* Login */}

        <Link href="/login">
          <button
            type="button"
            className="h-14 w-full rounded-2xl border border-slate-300 bg-white font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
          >
            Login
          </button>
        </Link>

      </form>

    </>

  );
}
