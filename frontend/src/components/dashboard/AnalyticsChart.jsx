"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#2563EB", "#F59E0B"];

export default function AnalyticsChart({
  approvedStudents = 0,
  pendingStudents = 0,
  totalManagers = 0,
}) {
  const data = [
    {
      name: "Approved",
      value: approvedStudents,
    },
    {
      name: "Pending",
      value: pendingStudents,
    },
  ];

  const totalStudents = approvedStudents + pendingStudents;

  const approvalRate =
    totalStudents === 0
      ? 0
      : Math.round((approvedStudents / totalStudents) * 100);

  return (
    <div className=" rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800 "
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Student Analytics
      </h2>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Overall system overview
      </p>

      <div className="mt-8 flex items-center justify-evenly">
        <div
          className=" h-52 w-52 transition-all duration-300 hover:scale-105 "
        >
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={95}
                dataKey="value"
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-64 space-y-1">
          {/* Approved */}

          <div className=" flex items-center justify-between border-b border-slate-200 py-3 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-cyan-600"></span>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Approved Students
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-cyan-600">
              {approvedStudents}
            </h3>
          </div>

          {/* Pending */}

          <div className=" flex items-center justify-between border-b border-slate-200 py-3 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-yellow-500"></span>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Pending Students
              </p>
            </div>

            <h3 className="text-xl font-bold text-yellow-500">
              {pendingStudents}
            </h3>
          </div>

          {/* Managers */}

          <div className=" flex items-center justify-between border-b border-slate-200 py-3 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-emerald-500"></span>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Managers
              </p>
            </div>

            <h3 className="text-xl font-bold text-emerald-500">
              {totalManagers}
            </h3>
          </div>

          {/* Approval Rate */}

          <div className=" flex items-center justify-between border-b border-slate-200 py-3 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-violet-500"></span>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Approval Rate
              </p>
            </div>

            <h3 className="text-xl font-bold text-violet-500">
              {approvalRate}%
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
