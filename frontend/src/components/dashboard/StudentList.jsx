"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getStudentsByStatus } from "@/services/adminService";
import EntityListCard from "@/components/dashboard/EntityListCard";
import SearchBar from "@/components/dashboard/SearchBar";

export default function StudentList({ status }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
 const [search, setSearch] = useState("");
  useEffect(() => {
    loadStudents();
  }, [status]);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const data = await getStudentsByStatus(status);

      setStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="py-10 text-center text-slate-500">
        Loading students...
      </p>
    );
  }
  
  if (students.length === 0) {
      return (
          <p className="py-10 text-center text-slate-500">
        No students found.
      </p>
    );
}
const filteredStudents = students.filter((student) => {
const query = search.trim().toLowerCase();

return (
  student.name.toLowerCase().includes(query) ||
  student.rollNumber.toLowerCase().includes(query)
);
});

  if (filteredStudents.length === 0) {
  return (
    <>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by name or roll number..."
      />

      <p className="py-10 text-center text-slate-500">
        No matching students found.
      </p>
    </>
  );
}


  return (
    <div>

    <SearchBar
      value={search}
      onChange={setSearch}
      placeholder="Search by name or roll number..."
    />
    <div className="space-y-4">
      {filteredStudents.map((student) => (
  <EntityListCard
    key={student._id}
    icon={
      <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
        <Users
          size={18}
          className="text-blue-600"
        />
      </div>
    }
    title={student.name}
    subtitle={`Roll No: ${student.rollNumber}`}
    extra={
      student.status === "approved"
        ? student.mess?.name || "No Mess Assigned"
        : "Awaiting Approval"
    }
    badge={
      student.status === "approved"
        ? "Approved"
        : "Pending"
    }
    badgeClassName={
      student.status === "approved"
        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    }
  />
))}
    </div>
    </div>
  );
}