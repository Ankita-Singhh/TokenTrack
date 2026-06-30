"use client";

import Link from "next/link";
import { Bell, ArrowRight, Paperclip} from "lucide-react";
import { useEffect, useState } from "react";
import { getRecentNotices } from "@/services/noticeService";
import NoticeModal from "@/components/modals/NoticeModal";

const badgeColors = {
 urgent: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
 normal: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
};


export default function RecentNotices({
    refresh
}) {
    const [notices, setNotices] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedNotice, setSelectedNotice] = useState(null);
const [openNoticeModal, setOpenNoticeModal] = useState(false);

useEffect(() => {
  loadNotices();
}, [refresh]);

const loadNotices = async () => {
  try {
    const data = await getRecentNotices();
    setNotices(data.slice(0, 5));
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const handleNoticeClick = (notice) => {
  setSelectedNotice(notice);
  setOpenNoticeModal(true);
};

  return (
    <div
      className="
      h-full
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      dark:border-slate-800
      dark:bg-slate-800
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Recent Notices
        </h2>

        <Link
          href="/admin/notices"
          className="
          flex
          items-center
          gap-1
          text-sm
          font-semibold
          text-blue-600
          hover:underline
          "
        >
          View All
          <ArrowRight size={16} />
        </Link>

      </div>

      {/* Notices */}
    {loading ? (

<p className="mt-8 text-center text-slate-500">

Loading notices...

</p>

) : notices.length === 0 ? (

<p className="mt-8 text-center text-slate-500">

No notices available.

</p>

) : (
    
      <div className="mt-6 space-y-4">

        {notices.map((notice) => (

          <div
            key={notice._id}
            onClick={() => handleNoticeClick(notice)}
            className="cursor-pointer rounded-2xl bg-slate-50 p-4 border transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:bg-blue-50 hover:border-blue-500 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-400 "
          >

            <div className="flex items-start justify-between">

              <div className="flex items-start gap-3">

                <div
                  className="
                  mt-1
                  rounded-full
                  bg-blue-100
                  p-2
                  dark:bg-blue-900/30
                  "
                >
                  <Bell
                    size={16}
                    className="text-blue-600"
                  />
                </div>

                <div>

                  <div className="flex items-center gap-2">

{notice.attachment?.trim() && (
<Paperclip
size={15}
className="text-slate-400"
/>

)}

<h3 className="font-semibold text-slate-900 dark:text-white">

{notice.title}

</h3>

</div>

                  <p className="text-sm text-slate-500 dark:text-slate-400">

{notice.mess?.name}

</p>

<p className="mt-1 text-xs text-slate-400">

{new Date(notice.createdAt).toLocaleDateString()}

</p>

                </div>

              </div>

              <span
                className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${badgeColors[notice.priority]}
                `}
              >
                {notice.priority === "urgent"
? "Urgent"
: "Normal"}
              </span>

            </div>

          </div>

        ))}

      </div>
)}

<NoticeModal
  isOpen={openNoticeModal}
  onClose={() => setOpenNoticeModal(false)}
  notice={selectedNotice}
/>

    </div>

  );
}