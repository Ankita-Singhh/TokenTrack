"use client";

import Link from "next/link";
import {
  UserPlus,
  Building2,
  Link2,
  Bell,
} from "lucide-react";

const actions = [
  {
  title: "Create Manager",
  description: "Add a new mess manager",
  icon: UserPlus,
  action: "manager",
  color: "#2563EB",
},
{
  title: "Create Mess",
  description: "Register a new mess",
  icon: Building2,
  action: "mess",
  color: "#10B981",
},
{
  title: "Assign Manager",
  description: "Assign manager to mess",
  icon: Link2,
  action: "assign",
  color: "#F59E0B",
},
{
  title: "Create Notice",
  description: "Publish new notice",
  icon: Bell,
  action: "notice",
  color: "#F43F5E",
},
];

export default function QuickActions({
    onAction,
}) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm dark:bg-slate-800">

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Quick Actions
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Frequently used administrator actions.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {actions.map((action) => (
          <button
          key={action.title}
          type="button"
    onClick={() => onAction(action.action)}
            className="
group
relative
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
transition-all
duration-300
ease-in-out
hover:-translate-y-2
hover:shadow-2xl
hover:border-blue-500
dark:bg-slate-900
dark:border-slate-800
dark:hover:border-slate-400
"
>
    <div
  className="
  absolute
  -right-10
  -top-10
  h-32
  w-32
  rounded-full
  opacity-10
  blur-3xl
  transition-all
  duration-500
  group-hover:opacity-20
  "
  style={{
    background: action.color.replace("bg-", ""),
  }}
/>
            <div
  className="
  flex
  h-16
  w-16
  items-center
  justify-center
  rounded-2xl
  text-white
  shadow-lg
  transition-all
  duration-300
  group-hover:scale-110
  "
  style={{
    background: action.color,
  }}
>
  <action.icon size={28} />
</div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {action.description}
            </p>

          </button>
        ))}

      </div>

    </div>
  );
}