"use client";

import { Search, Bell, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [notificationCount, setNotificationCount] = useState(0);
  const { user, loading } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  return (
    <header
      className="
      sticky
      top-0
      z-40
      flex
      h-20
      items-center
      justify-between
      border-b
      border-slate-200
      bg-white/90
      px-8
      backdrop-blur-xl
      dark:border-slate-800
dark:bg-slate-800      "
    >
      {/* Left */}

      <div />

      {/* Right */}

      <div className="flex w-full items-center justify-between">
        {" "}
        {/* Search */}
        <div className="relative w-80">
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search managers, students..."
            className="
      w-full
      rounded-xl
      border
      border-slate-200
      bg-slate-50
      py-3
      pl-11
      pr-4
      outline-none
      transition-all
      focus:border-blue-500
      focus:ring-4
      focus:ring-blue-100
      dark:border-slate-700
      dark:bg-slate-800
      dark:text-white
      dark:focus:ring-blue-900/30
    "
          />
        </div>
        <div className="flex items-center gap-4">
          {/* Dark Mode */}

          <button
            onClick={toggleTheme}
            className="
          rounded-xl
          border
          border-slate-200
          p-3
transition-all
duration-300
          hover:bg-slate-300
          dark:border-slate-700
          dark:hover:bg-slate-400
          "
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-slate-600" />
            )}
          </button>

          {/* Notifications */}

          <button
            className="
          relative
          rounded-xl
          border
          border-slate-200
          p-3
          transition
          hover:bg-slate-300
          dark:border-slate-700
          dark:hover:bg-slate-400
          "
          >
            <Bell size={20} className="text-slate-600 dark:text-slate-300" />

            {notificationCount > 0 && (
              <span
                className="
  absolute
  -right-1
  -top-1
  flex
  h-5
  w-5
  items-center
  justify-center
  rounded-full
  bg-red-500
  text-[10px]
  font-bold
  text-white
  "
              >
                {notificationCount}
              </span>
            )}
          </button>

          {/* Profile */}

          <div
            className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-4
          py-2
          dark:border-slate-700
          dark:bg-slate-800
          "
          >
            <div
              className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-blue-600
            text-white
            font-bold
            "
            >
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            <div>
              <h3 className="font-semibold dark:text-white">
                {user?.name || "Loading..."}
              </h3>

              <p
                className="
              text-xs
              text-slate-500
              dark:text-slate-400
              "
              >
                {user?.role
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
