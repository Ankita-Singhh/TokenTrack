"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "max-w-2xl",
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-slate-950/75
      backdrop-blur-sm
      p-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full
          ${size}
          rounded-3xl
          bg-white
          shadow-2xl
          dark:bg-slate-600
          animate-in
          fade-in
          zoom-in-95
          duration-200
        `}
      >
        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          px-6
          py-5
          dark:border-slate-700
          "
        >
          <h2 className="text-2xl font-bold dark:text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
            rounded-xl
            p-2
            transition
            hover:bg-slate-200
            dark:hover:bg-slate-300
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="max-h-[75vh] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}