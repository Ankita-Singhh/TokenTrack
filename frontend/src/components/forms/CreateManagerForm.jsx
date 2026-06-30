"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createManager } from "@/services/adminService";
import toast from "react-hot-toast";

export default function CreateManagerForm({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

const formattedValue =
  name === "name"
    ? value.replace(/\s+/g, " ")
    : value;

setFormData((prev) => ({
  ...prev,
  [name]: formattedValue,
}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
  toast.error("Please enter the manager's name.");
  return;
}

if (!formData.email.trim()) {
  toast.error("Please enter an email address.");
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formData.email)) {
  toast.error("Please enter a valid email address.");
  return;
}

if (formData.password.length < 8) {
  toast.error("Password must be at least 8 characters long.");
  return;
}

if (formData.password !== formData.confirmPassword) {
  toast.error("Passwords do not match.");
  return;
}

    try {
      setLoading(true);

      await createManager({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      toast.success("Manager created successfully!");

setFormData({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

onClose();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create manager."
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
  formData.name.trim() &&
  formData.email.trim() &&
  formData.password.length >= 8 &&
  formData.confirmPassword &&
  formData.password === formData.confirmPassword;


  const handleCancel = () => {
  setFormData({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  setShowPassword(false);
  setShowConfirmPassword(false);

  onClose();
};

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

  {/* Full Name */}

  <div>
    <label className="mb-2 block font-medium dark:text-white">
      Full Name
    </label>

    <div className="mt-1 flex justify-end">
      <span className="text-xs text-slate-400">
        {formData.name.length}/60
      </span>
    </div>

    <input
      type="text"
      name="name"
      maxLength={60}
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter manager's full name"
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
    />
  </div>

  {/* Email */}

  <div>
    <label className="mb-2 block font-medium dark:text-white">
      Email Address
    </label>

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="manager@example.com"
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
    />
  </div>
{/* Password */}

<div>
  <label className="mb-2 block font-medium dark:text-white">
    Password
  </label>

  <div className="relative">

    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Enter password"
      className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition-all hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>

  </div>
   <p
  className={`mt-2 text-sm ${
    formData.password.length === 0
      ? "text-slate-400"
      : formData.password.length >= 8
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-red-400"
  }`}
>
  Password must be at least 8 characters long.
</p>

</div>

{/* Confirm Password */}

<div>
  <label className="mb-2 block font-medium dark:text-white">
    Confirm Password
  </label>

  <div className="relative">

    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      placeholder="Confirm password"
      className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition-all hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
    >
      {showConfirmPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>

    </div> 

     {formData.confirmPassword && (
  <p
    className={`mt-2 text-sm ${
      formData.password === formData.confirmPassword
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-red-400"
    }`}
  >
    {formData.password === formData.confirmPassword
      ? "Passwords match."
      : "Passwords do not match."}
  </p>
)}
</div> 

    {/* Buttons */}

<div className="flex justify-end gap-3 pt-4">

  <button
    type="button"
    onClick={handleCancel}
    className="
      rounded-xl
      border
      border-slate-300
      bg-white
      px-6
      py-3
      font-semibold
      text-slate-700
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:border-slate-400
      hover:bg-slate-100
      hover:shadow-md
      active:scale-95
      dark:border-slate-600
      dark:bg-slate-800
      dark:text-slate-200
      dark:hover:border-slate-500
      dark:hover:bg-slate-700
      dark:hover:shadow-lg
    "
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={loading || !isFormValid}
    className={`
      rounded-xl
      px-6
      py-3
      font-semibold
      text-white
      transition-all
      duration-300

      ${
        loading || !isFormValid
          ? "cursor-not-allowed bg-blue-400"
          : "bg-blue-600 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl dark:hover:bg-blue-500"
      }
    `}
  >
    {loading ? "Creating..." : "Create Manager"}
  </button>

</div>

</form>
  );
}