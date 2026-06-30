"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { LayoutDashboard, Bell } from "lucide-react";
import { getRecentNotices } from "@/services/noticeService";
import NoticeListCard from "@/components/notices/NoticeListCard";
import NoticeModal from "@/components/modals/NoticeModal";
import Modal from "@/components/ui/Modal";
import EditNoticeForm from "@/components/forms/EditNoticeForm";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Notice Management",
    path: "/admin/notices",
    icon: Bell,
  },
];

export default function NoticeManagementPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
const [openNoticeModal, setOpenNoticeModal] = useState(false);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const data = await getRecentNotices();
      setNotices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
today.setHours(0, 0, 0, 0);

const liveNotices = notices.filter((notice) => {
  const expiry = new Date(notice.expiryDate);
  expiry.setHours(0, 0, 0, 0);

  return expiry >= today;
});

const expiredNotices = notices.filter((notice) => {
  const expiry = new Date(notice.expiryDate);
  expiry.setHours(0, 0, 0, 0);

  return expiry < today;
});

const handleNoticeClick = (notice) => {
  setSelectedNotice(notice);
  setOpenNoticeModal(true);
};

const handleEditClick = (notice) => {
  setSelectedNotice(notice);
  setOpenEditModal(true);
};

  return (
    <DashboardLayout
      title="Notice Management"
      menuItems={menuItems}
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">

        <h2 className="text-2xl font-bold dark:text-white">
          Notice Management
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          View and manage all notices.
        </p>

        <div className="mt-8 space-y-4">

  {loading ? (

    <p className="text-center text-slate-500">
      Loading notices...
    </p>

  ) : notices.length === 0 ? (

    <p className="text-center text-slate-500">
      No notices available.
    </p>

  ) : (
  <>
    {/* Live Notices */}

    <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
      Live Notices
    </h3>

    {liveNotices.map((notice) => (
  <NoticeListCard
    key={notice._id}
    notice={notice}
    onView={handleNoticeClick}
    onEdit={handleEditClick}
  />
))}

 {expiredNotices.length > 0 && (
    <>
      <div className="my-8 border-t border-slate-300 dark:border-slate-700" />

      <h3 className="mb-4 text-xl font-bold text-slate-500">
        Expired Notices
      </h3>

    {expiredNotices.map((notice) => (
  <NoticeListCard
    key={notice._id}
    notice={notice}
    expired
    onView={handleNoticeClick}
  />
))}
      </>
)}
</>
  )}
</div>

      </div>

      <NoticeModal
  isOpen={openNoticeModal}
  onClose={() => setOpenNoticeModal(false)}
  notice={selectedNotice}
/>

<Modal
  isOpen={openEditModal}
  onClose={() => setOpenEditModal(false)}
  title="Edit Notice"
>
  {selectedNotice && (
    <EditNoticeForm
      notice={selectedNotice}
      onClose={() => {
        setOpenEditModal(false);
        loadNotices();
      }}
    />
  )}
</Modal>


    </DashboardLayout>
  );
}