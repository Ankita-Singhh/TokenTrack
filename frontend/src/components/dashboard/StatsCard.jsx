"use client";

import { Clock3, ChevronRight } from "lucide-react";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  status,
}) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      ease-in-out
      hover:-translate-y-2
      hover:shadow-2xl

      dark:border-slate-800
      dark:bg-slate-800
      dark:hover:border-slate-700
      "
    >
      {/* Glow */}

      <div
        className="
        absolute
        -right-8
        -top-8
        h-36
        w-36
        rounded-full
        opacity-10
        blur-3xl
        transition-all
        duration-500
        group-hover:opacity-20
        "
        style={{
          background: color,
        }}
      />

      {/* Top */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            text-white
            shadow-lg
            transition-all
            duration-300
            group-hover:scale-110
            "
            style={{
              background: color,
            }}
          >
            <Icon size={30} />
          </div>

          <div>

            <p className="text-sm text-slate-500 dark:text-slate-400">

              {title}

            </p>

            <h2 className="mt-2 text-5xl font-bold text-slate-900 dark:text-white">

              {value}

            </h2>

          </div>

        </div>

        <ChevronRight
          size={22}
          className="
          text-slate-400
          transition-transform
          duration-300
          group-hover:translate-x-1
          dark:text-slate-500
          "
        />

      </div>

      {/* Bottom */}

      <div className="mt-8 flex items-center justify-between">

        <div
          className="
          flex
          items-center
          gap-2
          rounded-full
          px-3
          py-2
          text-sm
          font-semibold
          "
          style={{
            color,
            background: `${color}15`,
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: color,
            }}
          />

          {status}

        </div>

        <div className="flex items-center gap-2">

          <Clock3
            size={15}
            className="text-slate-400 dark:text-slate-500"
          />

          <span className="text-sm text-slate-500 dark:text-slate-400">

            Updated just now

          </span>

        </div>

      </div>
    </div>
  );
}