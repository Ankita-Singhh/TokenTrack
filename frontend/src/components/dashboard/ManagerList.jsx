"use client";

import { useEffect, useState } from "react";
import { UserCog } from "lucide-react";
import { getManagersList } from "@/services/adminService";
import EntityListCard from "@/components/dashboard/EntityListCard";
import SearchBar from "@/components/dashboard/SearchBar";

export default function ManagerList() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadManagers();
  }, []);

  const loadManagers = async () => {
    try {
      const data = await getManagersList();
      setManagers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="py-10 text-center text-slate-500">
        Loading managers...
      </p>
    );
  }

  if (managers.length === 0) {
    return (
      <p className="py-10 text-center text-slate-500">
        No managers found.
      </p>
    );
  }

  const filteredManagers = managers.filter((manager) => {
  const query = search.trim().toLowerCase();
  return (
    manager.name.toLowerCase().includes(query) ||
    manager.email.toLowerCase().includes(query)
  );
});

if (filteredManagers.length === 0) {
  return (
    <>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by name or email..."
      />

      <p className="py-10 text-center text-slate-500">
        No matching managers found.
      </p>
    </>
  );
}

  return (
    <div>

  <SearchBar
    value={search}
    onChange={setSearch}
    placeholder="Search by name or email..."
  />
    <div className="space-y-4">
      {filteredManagers.map((manager) => (
  <EntityListCard
    key={manager._id}
    icon={
      <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
        <UserCog
          size={18}
          className="text-blue-600"
        />
      </div>
    }
    title={manager.name}
    subtitle={manager.email}
    extra={manager.managedMess?.name || "Not Assigned Yet"}
    badge={
      manager.managedMess
        ? "Assigned"
        : "Unassigned"
    }
    badgeClassName={
      manager.managedMess
        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
    }
  />
))}
    </div>
    </div>
  );
}