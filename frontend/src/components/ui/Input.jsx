"use client";

export default function Input({
  icon,
  rightIcon,
  className = "",
  ...props
}) {
  return (
    <div className="relative">

      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}

      <input
        {...props}
        className={`h-16 w-full rounded-[18px] border border-[#D8E4F8] bg-white pl-14 pr-12 text-base outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-200 ${className}`}
      />

      {rightIcon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400">
          {rightIcon}
        </div>
      )}

    </div>
  );
}