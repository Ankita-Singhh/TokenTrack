"use client";

import Modal from "@/components/ui/Modal";

export default function NoticeModal({
  isOpen,
  onClose,
  notice,
  showDelete = false,
  onDelete,
}) {
  if (!notice) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Notice Details"
    >
      <div className="space-y-6">

  {/* Title */}

  <div>

    <div className="flex items-center justify-between gap-4">

      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        {notice.title}
      </h2>

      <span
        className={`rounded-full px-4 py-1 text-sm font-semibold ${
          notice.priority === "urgent"
            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        }`}
      >
        {notice.priority === "urgent"
          ? "🚨 Urgent"
          : "📢 Normal"}
      </span>

    </div>

  </div>

</div>

{/* Information */}

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
    <p className="text-sm text-slate-500 dark:text-slate-400">
      Posted By
    </p>

    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
      {notice.createdBy?.name || "Admin"}
    </p>
  </div>

  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
    <p className="text-sm text-slate-500 dark:text-slate-400">
      Mess
    </p>

    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
      {notice.isGlobal
        ? "Global Notice"
        : notice.mess?.name || "-"}
    </p>
  </div>

  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
    <p className="text-sm text-slate-500 dark:text-slate-400">
      Posted On
    </p>

    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
      {new Date(notice.createdAt).toLocaleDateString()}
    </p>
  </div>

  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
    <p className="text-sm text-slate-500 dark:text-slate-400">
      Visible Until
    </p>

    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
      {new Date(notice.expiryDate).toLocaleDateString()}
    </p>
  </div>

</div>

{/* Description */}

<div>

  <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
    Description
  </h3>

  <div
    className="
      rounded-2xl
      border
      border-slate-200
      bg-slate-50
      p-5
      leading-7
      text-slate-700
      dark:border-slate-700
      dark:bg-slate-800
      dark:text-slate-300
      whitespace-pre-wrap
    "
  >
    {notice.description}
  </div>

</div>

{/* Attachment */}

{notice.attachment && notice.attachment.trim() && (
  <div>

    <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
      Attachment
    </h3>

    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
        dark:border-slate-700
        dark:bg-slate-800
      "
    >
      <div>

        <p className="font-medium text-slate-900 dark:text-white">
          {notice.attachment.split("/").pop()}
        </p>

        <p className="text-sm text-slate-500">
          Attached File
        </p>

      </div>

      <a
        href={notice.attachment}
        target="_blank"
        rel="noopener noreferrer"
        className="
          rounded-xl
          bg-blue-600
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-blue-700
        "
      >
        Open
      </a>

    </div>

  </div>
)}

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
    "
  >
    Close
  </button>

  {showDelete && (
    <button
      type="button"
      onClick={onDelete}
      className="
        rounded-xl
        bg-red-600
        px-6
        py-3
        font-semibold
        text-white
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-red-700
        hover:shadow-xl
      "
    >
      Delete
    </button>
  )}

</div>



    </Modal>
  );
}