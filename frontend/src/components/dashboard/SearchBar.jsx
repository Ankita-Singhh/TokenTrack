"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="relative mb-5">

      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border
          border-slate-300
          bg-white
          py-3
          pl-11
          pr-4
          outline-none
          transition-all
          duration-300

          hover:border-blue-400

          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200

          dark:border-slate-700
          dark:bg-slate-800
          dark:text-white
          dark:hover:border-blue-500
        "
      />

    </div>
  );
}