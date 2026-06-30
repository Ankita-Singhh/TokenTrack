"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LogOut } from "lucide-react";

export default function Sidebar({
  menuItems = [],
}) {
  const pathname = usePathname();

  return (

    <aside
      className="
w-[250px]
flex
flex-col
justify-between
border-r
border-slate-200
bg-white
shadow-sm
transition-colors
duration-300
dark:border-slate-800
dark:bg-slate-800
"
    >

      {/* Top Section */}

      <div>

        {/* Logo */}

<div
  className="
  flex
  justify-center
  border-b
  border-slate-200
  py-8
  dark:border-slate-500
  "
>
          <Image
            src="/images/logo.png"
            alt="TokenTrack"
            width={180}
            height={50}
            style={{
              width: "180px",
              height: "auto",
            }}
            priority
          />

        </div>

        {/* Menu */}

        < nav className="mt-6 px-5 space-y-2">
        {menuItems.map((item) => {

  const active = pathname === item.path;

  return (

    <Link
      key={item.path}
      href={item.path}
      className={`
        group
        flex
        items-center
        gap-4
        rounded-2xl
        px-4
        py-3.5
        text-[15px]
        font-semibold
        transition-all
duration-300
ease-in-out

        ${
          active
            ? "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-lg"
: `
text-slate-600
hover:bg-blue-50
hover:text-blue-600

dark:text-slate-300
dark:hover:bg-slate-800
dark:hover:text-white
`        }
      `}
    >

      <span
        className={`
          transition-all

          ${
            active
              ? "text-white"
: `
text-slate-400
group-hover:text-blue-600

dark:text-slate-500
dark:group-hover:text-white
`          }
        `}
      >
        <item.icon size={22} />
      </span>

      <span>{item.label}</span>

    </Link>

  );

})}

        </nav>

      </div>
            {/* Bottom Section */}

<div
  className="
  border-t
  border-slate-200
  p-5
  dark:border-slate-500
  "
>
        <button
          className="
            flex
            w-full
            items-center
            gap-4
            rounded-2xl
            px-4
            py-3.5
            font-semibold
            text-red-500
dark:text-red-400
transition-all
duration-300
ease-in-out
            hover:bg-red-200
dark:hover:bg-red-700/40
          "
        >

          <LogOut size={22} />

          Logout

        </button>

      </div>

    </aside>

  );
}