"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
  menuItems,
  title,
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F8FF]">

      {/* Sidebar */}

      <Sidebar
        menuItems={menuItems}
      />

      {/* Main */}

      <div className="flex flex-1 flex-col">

        <Navbar title={title} />

        <main
          className="
          flex-1
          overflow-y-auto
          p-8
          "
        >
          {children}
        </main>

      </div>

    </div>
  );
}