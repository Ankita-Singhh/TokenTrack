"use client";

import { useEffect, useState } from "react";
import { getManagers, getMesses, assignManager } from "@/services/adminService";
import toast from "react-hot-toast";

export default function AssignManagerForm({ onClose }) {
  const [loading, setLoading] = useState(false);

  const [managers, setManagers] = useState([]);
  const [messes, setMesses] = useState([]);

  const [managerId, setManagerId] = useState("");
  const [messId, setMessId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const managerResponse = await getManagers();
      const messResponse = await getMesses();

      const availableManagers = managerResponse.managers.filter(
        (manager) => !manager.managedMess,
      );

      const assignedMessIds = managerResponse.managers
        .filter((manager) => manager.managedMess)
        .map((manager) => manager.managedMess._id);

      const availableMesses = messResponse.filter(
        (mess) => !assignedMessIds.includes(mess._id),
      );

      setManagers(availableManagers);
      setMesses(availableMesses);
    } catch (error) {
      toast.error("Failed to load data.");
    }
  };

  const isFormValid = managerId && messId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!managerId) {
      toast.error("Please select a manager.");
      return;
    }

    if (!messId) {
      toast.error("Please select a mess.");
      return;
    }

    try {
      setLoading(true);

      await assignManager({
        managerId,
        messId,
      });

      toast.success("Manager assigned successfully!");

      setManagerId("");
      setMessId("");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to assign manager.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Manager */}

      <div>
        <label className="mb-2 block font-medium dark:text-white">
          Select Manager
        </label>

        <select
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Choose a manager</option>

          {managers
            .filter((manager) => !manager.managedMess)
            .map((manager) => (
              <option key={manager._id} value={manager._id}>
                {manager.name}
              </option>
            ))}
        </select>
      </div>

      {/* Mess */}

      <div>
        <label className="mb-2 block font-medium dark:text-white">
          Select Mess
        </label>

        <select
          value={messId}
          onChange={(e) => setMessId(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Choose a mess</option>

          {messes.map((mess) => (
            <option key={mess._id} value={mess._id}>
              {mess.name}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
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
          {loading ? "Assigning..." : "Assign Manager"}
        </button>
      </div>
    </form>
  );
}
