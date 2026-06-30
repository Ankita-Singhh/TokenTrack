"use client";
import { useAuth } from "@/context/AuthContext";

export default function HeroSection() {
  const today = new Date();
const { user } = useAuth();
  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="
      mb-8
      flex
      items-center
      justify-between
      rounded-3xl
      bg-white
      p-8
      shadow-sm
      dark:bg-slate-800
      "
    >
      <div>

        <h1
          className="
          text-4xl
          font-bold
          text-slate-900
          dark:text-white
          "
        >
Hello, {user?.name || "Admin"} 👋
        </h1>

        <p
          className="
          mt-2
          text-slate-500
          dark:text-slate-400
          "
        >
          Welcome back! Here's today's overview.
        </p>

      </div>

      <div
        className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        px-6
        py-4
        text-right
        dark:border-slate-700
        dark:bg-slate-800
        "
      >
        <p className="text-sm text-slate-500">
          Today
        </p>

        <h3
          className="
          mt-1
          font-semibold
          text-slate-900
          dark:text-white
          "
        >
          {date}
        </h3>

      </div>
    </div>
  );
}