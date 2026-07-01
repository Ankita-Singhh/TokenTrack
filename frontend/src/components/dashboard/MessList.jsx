"use client";

import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { getMesses } from "@/services/adminService";
import EntityListCard from "@/components/dashboard/EntityListCard";
import SearchBar from "@/components/dashboard/SearchBar";

export default function MessList() {
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMesses();
  }, []);

  const loadMesses = async () => {
    try {
      const data = await getMesses();
      setMesses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="py-10 text-center text-slate-500">
        Loading messes...
      </p>
    );
  }

  if (messes.length === 0) {
    return (
      <p className="py-10 text-center text-slate-500">
        No messes found.
      </p>
    );
  }

  const filteredMesses = messes.filter((mess) =>
  mess.name
    .toLowerCase()
    .includes(search.trim().toLowerCase())
);

if (filteredMesses.length === 0) {
  return (
    <>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search mess..."
      />

      <p className="py-10 text-center text-slate-500">
        No matching mess found.
      </p>
    </>
  );
}

  return (
    <div>
    <SearchBar
      value={search}
      onChange={setSearch}
      placeholder="Search mess..."
    />

    <div className="space-y-4">
      {filteredMesses.map((mess) => (
  <EntityListCard
    key={mess._id}
    icon={
      <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
        <Building2
          size={18}
          className="text-purple-600"
        />
      </div>
    }
    title={mess.name}
    subtitle={mess.manager?.name || "No Manager Assigned"}
    badge={
      mess.manager
        ? "Managed"
        : "Vacant"
    }
    badgeClassName={
      mess.manager
        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
    }
  />
))}
    </div>
    </div>
  );
}