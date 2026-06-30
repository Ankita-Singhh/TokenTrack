"use client";

import { useState } from "react";
import { createMess } from "@/services/adminService";
import toast from "react-hot-toast";

export default function CreateMessForm({ onClose }) {
  const [loading, setLoading] = useState(false);

  const [messName, setMessName] = useState("");

  const isFormValid = messName.trim().length > 0;

  const handleCancel = () => {
    setMessName("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!messName.trim()) {
      toast.error("Please enter a mess name.");
      return;
    }

    try {
      setLoading(true);

      await createMess({
        name: messName.trim(),
      });

      toast.success("Mess created successfully!");

      setMessName("");

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create mess."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Mess Name */}

      <div>
        <label className="mb-2 block font-medium dark:text-white">
          Mess Name
        </label>

        <div className="mt-1 flex justify-end">
          <span className="text-xs text-slate-400">
            {messName.length}/50
          </span>
        </div>

        <input
          type="text"
          maxLength={50}
          value={messName}
onChange={(e) => {
  const value = e.target.value.replace(/\s+/g, " ");
  setMessName(value);
}}
          placeholder="Enter mess name"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 pt-4">

        <button
          type="button"
          onClick={handleCancel}
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100 hover:shadow-md active:scale-95 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-700 dark:hover:shadow-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className={`rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 ${
            loading || !isFormValid
              ? "cursor-not-allowed bg-blue-400"
              : "bg-blue-600 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl dark:hover:bg-blue-500"
          }`}
        >
          {loading ? "Creating..." : "Create Mess"}
        </button>

      </div>

    </form>
  );
}