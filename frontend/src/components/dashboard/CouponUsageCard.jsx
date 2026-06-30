"use client";

import {
  ReceiptText,
  IndianRupee,
  Package,
  Trophy,
} from "lucide-react";

export default function CouponUsageCard({
  totalTransactions = 0,
  totalCouponValueUsed = 0,
  totalItemsSold = 0,
  mostActiveMess = "-",
}) {
  const stats = [
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: ReceiptText,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Coupon Value Used",
      value: `₹${totalCouponValueUsed}`,
      icon: IndianRupee,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      title: "Coupon Items Sold",
      value: totalItemsSold,
      icon: Package,
      color: "text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      title: "Most Active Mess",
      value: mostActiveMess,
      icon: Trophy,
      color: "text-violet-600",
      bg: "bg-violet-100 dark:bg-violet-900/30",
    },
  ];

  return (
    <div
      className="
      mt-1
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
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Coupon Usage Overview
      </h2>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Overall coupon activity across all messes.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="
            rounded-2xl
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
              className={`
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              ${stat.bg}
              `}
            >
              <stat.icon
                className={stat.color}
                size={22}
              />
            </div>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              {stat.title}
            </p>

            <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </h3>
          </div>
        ))}

      </div>
    </div>
  );
}