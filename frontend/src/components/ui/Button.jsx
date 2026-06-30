"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";

export default function Button({
  loading = false,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading}
      className="flex h-16 w-full items-center justify-center gap-4 rounded-[18px] bg-gradient-to-r from-[#2563EB] to-[#0F56F8] font-semibold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? (
        <>
          <LoaderCircle className="animate-spin" size={18} />
          Logging in...
        </>
      ) : (
        <>
          {children}
          <ArrowRight size={22} />
        </>
      )}
    </button>
  );
}