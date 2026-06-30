"use client";

import { useState, useEffect } from "react";
import { Paperclip } from "lucide-react";
import { updateNotice } from "@/services/noticeService";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";

export default function EditNoticeForm({
    onClose,
    notice,
}) {
  const today = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

const [formData, setFormData] = useState({
  title: notice?.title || "",
  description: notice?.description || "",
  priority: notice?.priority || "normal",
  expiryDate: notice?.expiryDate
    ? notice.expiryDate.split("T")[0]
    : today,
  attachment: null,
});

useEffect(() => {
  if (!notice) return;

  setFormData({
    title: notice.title || "",
    description: notice.description || "",
    priority: notice.priority || "normal",
    expiryDate: notice.expiryDate
      ? notice.expiryDate.split("T")[0]
      : today,
    attachment: null,
  });
}, [notice]);

const originalExpiry = notice?.expiryDate
  ? notice.expiryDate.split("T")[0]
  : "";

const hasChanges =
  formData.title.trim() !== (notice?.title || "") ||
  formData.description.trim() !== (notice?.description || "") ||
  formData.priority !== (notice?.priority || "normal") ||
  formData.expiryDate !== originalExpiry ||
  formData.attachment !== null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const formattedValue =
  files
    ? files[0]
    : ["title", "description"].includes(name)
    ? value.replace(/\s+/g, " ")
    : value;

setFormData((prev) => ({
  ...prev,
  [name]: formattedValue,
}));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.title.trim()) {
    toast.error("Please enter a notice title.");
    return;
  }

  if (!formData.description.trim()) {
    toast.error("Please enter a description.");
    return;
  }

  if (
  formData.attachment &&
  formData.attachment.size > 5 * 1024 * 1024
) {
  toast.error("Maximum file size is 5 MB.");
  return;
}

  try {
    const originalExpiry = notice.expiryDate
  ? notice.expiryDate.split("T")[0]
  : "";

if (
  formData.title.trim() === notice.title &&
  formData.description.trim() === notice.description &&
  formData.priority === notice.priority &&
  formData.expiryDate === originalExpiry
) {
  toast("No changes made.");
  return;
}
    setLoading(true);

    await updateNotice(notice._id, {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      expiryDate: formData.expiryDate,
    //   attachment: "",
    //   attachmentType: "",
    });

toast.success("Notice updated successfully!");
onClose();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to update notice."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Title */}

      <div>
        <label className="mb-2 block font-medium dark:text-white">
          Notice Title
        </label>
        <div className="mt-1 flex justify-end">
  <span className="text-xs text-slate-400">
    {formData.title.length}/80
  </span>
</div>

        <input
          type="text"
          name="title"
          maxLength={80}
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter notice title"
          className="w-full rounded-xl border border-slate-300 outline-none hover:border-blue-400 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block font-medium dark:text-white">
          Description
        </label>

        <div className="mt-1 flex justify-end">
  <span className="text-xs text-slate-400">
    {formData.description.length}/500
  </span>
</div>

        <textarea
          rows={5}
          name="description"
          maxLength={500}
          value={formData.description}
          onChange={handleChange}
          placeholder="Write the notice..."
          className="w-full rounded-xl border border-slate-300 outline-none hover:border-blue-400 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      {/* Priority */}

      <div>

  <label className="mb-3 block font-medium dark:text-white">
    Priority
  </label>

  <div className="grid grid-cols-2 gap-4">

    <label
      className={`
      cursor-pointer
      rounded-2xl
      border
      p-4
      transition-all
      duration-300

      ${
        formData.priority === "normal"
  ? "border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-900/40"
  : "border-slate-300 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:hover:border-emerald-400 dark:hover:bg-slate-800"
      }
      `}
    >

      <input
        type="radio"
        name="priority"
        value="normal"
        checked={formData.priority === "normal"}
        onChange={handleChange}
        className="hidden"
      />

      <h4 className="font-semibold text-emerald-600 dark:text-emerald-300">
  📢 Normal
</h4>

      <p className="mt-1 text-sm dark:text-slate-300 text-slate-500">
        Regular announcement
      </p>

    </label>

    <label
      className={`
      cursor-pointer
      rounded-2xl
      border
      p-4
      transition-all
      duration-300

      ${
        formData.priority === "urgent"
          ? "border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-900/30"
          : "border-slate-300 hover:border-red-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-red-400 dark:hover:bg-slate-800"
      }
      `}
    >

      <input
        type="radio"
        name="priority"
        value="urgent"
        checked={formData.priority === "urgent"}
        onChange={handleChange}
        className="hidden"
      />

      <h4 className="font-semibold text-red-600 dark:text-red-400">
  🚨 Urgent
</h4>

      <p className="mt-1 text-sm dark:text-slate-300 text-slate-500">
        Immediate attention
      </p>

    </label>

  </div>

</div>

      {/* Expiry */}

      <div>
        <label className="mb-2 block font-medium dark:text-white">
          Visible until
        </label>

        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          min={today}
          className="w-full rounded-xl border border-slate-300 outline-none hover:border-blue-400 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      {/* Attachment */}

      <div>

  <label className="mb-3 block font-medium dark:text-white">
    Attachment (Optional)
  </label>
  
  <label
    className="
      flex
      cursor-pointer
      items-center
      justify-between
      rounded-2xl
      border-2
      border-dashed
      border-slate-300
      bg-slate-50
      px-5
      py-4
      transition-all
      duration-300
      hover:border-blue-500
      hover:bg-blue-50

      dark:border-slate-600
      dark:bg-slate-800
      dark:hover:border-blue-400
      dark:hover:bg-slate-700
    "
  >

    <div className="flex items-center gap-3">

      <Paperclip
        size={20}
        className="text-blue-500"
      />

      <div>

        <p className="font-medium text-slate-800 dark:text-white">
  {formData.attachment
    ? formData.attachment.name
    : "Choose Attachment"}
</p>

{formData.attachment && (
  <p className="text-xs text-slate-500">
    {(formData.attachment.size / 1024).toFixed(1)} KB
  </p>
)}

        <p className="text-sm text-slate-500">
          PDF, Image or Document
        </p>

      </div>

    </div>

    <span
      className="
        rounded-xl
        bg-blue-600
        px-4
        py-2
        text-sm
        font-semibold
        text-white
      "
    >
      Browse
    </span>

    <input
      type="file"
      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
      hidden
      name="attachment"
      onChange={handleChange}
    />

  </label>

</div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 pt-4">

       <button
  type="button"
  onClick={() => {
  if (hasChanges) {
    setShowDiscardConfirm(true);
  } else {
    onClose();
  }
}}
  className=" rounded-xl
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
  disabled={loading}
className={` rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 
${
  loading
    ? "cursor-not-allowed bg-blue-400"
    : "bg-blue-600 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl dark:hover:bg-blue-500"
}
`}>
{loading ? "Saving..." : "Save Changes"}
</button>

<Modal
  isOpen={showDiscardConfirm}
  onClose={() => setShowDiscardConfirm(false)}
  title="Discard Changes?"
>
  <div className="space-y-6">

    <p className="text-slate-600 dark:text-slate-300">
      You have unsaved changes.
      If you leave now, your edits will be lost.
    </p>

    <div className="flex justify-end gap-3">

      <button
        onClick={() => setShowDiscardConfirm(false)}
className="
rounded-xl
border
border-slate-300
bg-white
px-5
py-2
font-medium
text-slate-700
transition-all
duration-300

hover:-translate-y-0.5
hover:border-slate-400
hover:bg-slate-100
hover:shadow-md

dark:border-slate-500
dark:bg-slate-800
dark:text-slate-200

dark:hover:border-slate-400
dark:hover:bg-slate-700
dark:hover:shadow-lg
"      >
        Keep Editing
      </button>

      <button
        onClick={() => {
          setShowDiscardConfirm(false);
          onClose();
        }}
className="
rounded-xl
bg-red-600
px-5
py-2
font-medium
text-white
transition-all
duration-300

hover:-translate-y-0.5
hover:bg-red-700
hover:shadow-lg

active:scale-95

dark:hover:bg-red-500
"      >
        Discard
      </button>

    </div>

  </div>
</Modal>

      </div>

    </form>
  );
}