"use client";

import {
  Bell,
  Paperclip,
  Pencil,
  CalendarDays,
  Eye,
} from "lucide-react";

const badgeColors = {
  urgent:
    "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  normal:
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export default function NoticeListCard({
  notice,
  expired = false,
  onView,
  onEdit,
}) {
  return (
    <div
      onClick={() => onView(notice)}
      className={`
        relative
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        bg-white
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        dark:bg-slate-900

        ${
          expired
  ? "border border-slate-200 dark:border-slate-700"
  : notice.priority === "urgent"
  ? "border border-slate-200 border-l-4 border-l-red-500 dark:border-slate-700 dark:border-l-red-500"
  : "border border-slate-200 border-l-4 border-l-emerald-500 dark:border-slate-700 dark:border-l-emerald-500"
        }
      `}
    >
      <div className="flex items-start justify-between gap-6">
        {/* Left Side */}

        <div className="flex items-start gap-5">
          {/* Bell */}

          <div
            className={`
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl

              ${
                expired
                  ? "bg-slate-100 dark:bg-slate-800"
                  : notice.priority === "urgent"
                  ? "bg-red-100 dark:bg-red-900/30"
                  : "bg-emerald-100 dark:bg-emerald-900/30"
              }
            `}
          >
            <Bell
              size={24}
              className={
                expired
                  ? "text-slate-500"
                  : notice.priority === "urgent"
                  ? "text-red-600"
                  : "text-emerald-600"
              }
            />
          </div>

          {/* Content */}

          <div>
            <div className="flex items-center gap-2">
              {notice.attachment?.trim() && (
                <Paperclip
                  size={16}
                  className="text-slate-400"
                />
              )}

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {notice.title}
              </h3>
            </div>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {notice.isGlobal
                ? "Global Notice"
                : notice.mess?.name}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                Posted{" "}
                {new Date(
                  notice.createdAt
                ).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2">
                <Eye size={16} />
                Visible until{" "}
                {new Date(
                  notice.expiryDate
                ).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="flex flex-col items-end gap-4">
          {expired ? (
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              Expired
            </span>
          ) : (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColors[notice.priority]}`}
            >
              {notice.priority === "urgent"
                ? "Urgent"
                : "Normal"}
            </span>
          )}

          {!expired && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(notice);
              }}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-blue-500
                px-4
                py-2
                text-sm
                font-semibold
                text-blue-600
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-blue-600
                hover:text-white
                hover:shadow-lg
                dark:border-blue-400
                dark:text-blue-400
                dark:hover:bg-blue-500
                dark:hover:text-white
              "
            >
              <Pencil size={16} />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}