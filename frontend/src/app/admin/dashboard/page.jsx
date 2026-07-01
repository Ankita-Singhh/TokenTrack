"use client";

import { useEffect, useState } from "react";
import QuickActions from "@/components/dashboard/QuickActions";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Building2,
  ReceiptText,
} from "lucide-react";
import RecentNotices from "@/components/dashboard/RecentNotices";
import HeroSection from "@/components/dashboard/HeroSection";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { getAnalytics } from "@/services/adminService";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import CouponUsageCard from "@/components/dashboard/CouponUsageCard";
import Modal from "@/components/ui/Modal";
import CreateNoticeForm from "@/components/forms/CreateNoticeForm";
import CreateManagerForm from "@/components/forms/CreateManagerForm";
import CreateMessForm from "@/components/forms/CreateMessForm";
import AssignManagerForm from "@/components/forms/AssignManagerForm";
import StudentList from "@/components/dashboard/StudentList";
import ManagerList from "@/components/dashboard/ManagerList";
import MessList from "@/components/dashboard/MessList";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
];

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openNoticeModal, setOpenNoticeModal] = useState(false);
  const [refreshNotices, setRefreshNotices] = useState(0);
  const [openMessModal, setOpenMessModal] = useState(false);
  const [openManagerModal, setOpenManagerModal] = useState(false);
  const [openAssignManagerModal, setOpenAssignManagerModal] = useState(false);
  const [openStudentsModal, setOpenStudentsModal] = useState(false);
const [studentType, setStudentType] = useState("approved");
const [openManagersModal, setOpenManagersModal] = useState(false);
const [openMessesModal, setOpenMessesModal] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Analytics Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
 switch (action) {
  case "notice":
    setOpenNoticeModal(true);
    break;

  case "manager":
    setOpenManagerModal(true);
    break;

  case "mess":
  setOpenMessModal(true);
  break;

  case "assign":
    setOpenAssignManagerModal(true);
    break;

  default:
    console.log(action);
  }
};

const handleNoticeCreated = () => {
  setOpenNoticeModal(false);
  setRefreshNotices((prev) => prev + 1);
};

const handleManagerCreated = () => {
  setOpenManagerModal(false);
  loadAnalytics();
};

const handleMessCreated = () => {
  setOpenMessModal(false);
  loadAnalytics();
}

const handleManagerAssigned = () => {
  setOpenAssignManagerModal(false);
  loadAnalytics();
};

const handleStudentCardClick = (type) => {
  setStudentType(type);
  setOpenStudentsModal(true);
};

const handleManagerCardClick = () => {
  setOpenManagersModal(true);
};

const handleMessCardClick = () => {
  setOpenMessesModal(true);
};

  return (
    <DashboardLayout
      title="Admin Dashboard"
      menuItems={menuItems}
    >
      <HeroSection />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
  title="Approved Students"
  value={loading ? "..." : analytics?.approvedStudents}
  status="Approved"
  color="#2563EB"
  icon={Users}
  onClick={() => handleStudentCardClick("approved")}
/>

<StatsCard
  title="Pending Students"
  value={loading ? "..." : analytics?.pendingStudents}
  status="Waiting Approval"
  color="#F59E0B"
  icon={UserCog}
  onClick={() => handleStudentCardClick("pending")}
/>

<StatsCard
  title="Managers"
  value={loading ? "..." : analytics?.totalManagers}
  status="Active Managers"
  color="#10B981"
  icon={UserCog}
  onClick={handleManagerCardClick}
/>

<StatsCard
  title="Messes"
  value={loading ? "..." : analytics?.totalMesses}
  status="Running"
  color="#8B5CF6"
  icon={Building2}
  onClick={handleMessCardClick}
/>

      </div>
      <div className="mt-8">
  <QuickActions onAction={handleQuickAction} />

<div
  className="
  mt-8
  grid
  grid-cols-1
  gap-6
  xl:grid-cols-[1.6fr_1fr]
"
>
  {/* Analytics */}

    <AnalyticsChart
      approvedStudents={analytics?.approvedStudents || 0}
      pendingStudents={analytics?.pendingStudents || 0}
      totalManagers={analytics?.totalManagers || 0}
    />


  {/* Recent Notices */}


<RecentNotices refresh={refreshNotices} />

<CouponUsageCard
  totalTransactions={analytics?.totalTransactions}
  totalCouponValueUsed={analytics?.totalCouponValueUsed}
  totalItemsSold={analytics?.totalItemsSold}
  mostActiveMess={analytics?.mostActiveMess}
/>

<Modal
  isOpen={openNoticeModal}
  onClose={() => setOpenNoticeModal(false)}
  title="Create Notice"
>
 <CreateNoticeForm
    onClose={handleNoticeCreated}
  />
</Modal>

<Modal
  isOpen={openManagerModal}
  onClose={() => setOpenManagerModal(false)}
  title="Create Manager"
>
  <CreateManagerForm
    onClose={handleManagerCreated}
  />
</Modal>

<Modal
  isOpen={openMessModal}
  onClose={() => setOpenMessModal(false)}
  title="Create Mess"
>
  <CreateMessForm
    onClose={handleMessCreated}
  />
</Modal>

<Modal
  isOpen={openAssignManagerModal}
  onClose={() => setOpenAssignManagerModal(false)}
  title="Assign Manager"
>
  <AssignManagerForm
    onClose={handleManagerAssigned}
  />
</Modal>

<Modal
  isOpen={openStudentsModal}
  onClose={() => setOpenStudentsModal(false)}
  title={
  studentType === "approved"
    ? "Approved Students"
    : "Pending Students"
}
>
  <StudentList status={studentType} />
</Modal>

<Modal
  isOpen={openManagersModal}
  onClose={() => setOpenManagersModal(false)}
  title="Managers"
>
  <ManagerList />
</Modal>

<Modal
  isOpen={openMessesModal}
  onClose={() => setOpenMessesModal(false)}
  title="Messes"
>
  <MessList />
</Modal>

</div>

</div>

    </DashboardLayout>
  );
}