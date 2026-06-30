import Image from "next/image";
import {
  ShieldCheck,
  Ticket,
  BarChart3,
} from "lucide-react";

function Feature({ icon, title, description }) {
  return (
    <div className="flex items-start gap-5">

      <div
        className="
        flex
        h-[68px]
        w-[68px]
        shrink-0
        items-center
        justify-center
        rounded-[22px]
        bg-gradient-to-br
        from-[#4C86FF]
        to-[#2745F5]
        shadow-xl
        "
      >
        {icon}
      </div>

      <div>

        <h3 className="text-[28px] font-bold text-white">

          {title}

        </h3>

        <p className="mt-2 max-w-[340px] text-[18px] leading-8 text-blue-100">

          {description}

        </p>

      </div>

    </div>
  );
}

export default function AuthLayout({
  children,
}) {
  return (

    <main
      className="
      grid
      min-h-screen
      lg:grid-cols-2
      overflow-hidden
      "
    >
              {/* ================= LEFT PANEL ================= */}

      <section className="relative hidden lg:flex overflow-hidden bg-gradient-to-br from-[#0736B8] via-[#1756E8] to-[#2E6CFF]">

  {/* Background Effects */}

  <div className="absolute -top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-white/8" />

  <div className="absolute top-12 right-20 grid grid-cols-6 gap-3 opacity-20">
    {Array.from({ length: 36 }).map((_, i) => (
      <span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-white"
      />
    ))}
  </div>

  <div className="relative z-20 flex h-full w-full flex-col px-14 pt-12">

    {/* Logo */}

    <Image
      src="/images/logo.png"
      alt="TokenTrack"
      width={220}
      height={55}
      style={{ width: "220px", height: "auto" }}
      priority
      className="object-contain"
    />

    {/* Heading */}

    <div className="mt-10">

      <h1 className="text-[68px] font-extrabold leading-[72px] tracking-tight text-white">

        Smart Digital

        <br />

        <span className="text-[#78AEFF]">

          Coupon

        </span>{" "}

        Management

      </h1>

      <p className="mt-7 max-w-[520px] text-[21px] leading-9 text-blue-100">

        Manage students, coupons and hostel
        transactions securely with one centralized
        platform.

      </p>

    </div>

    {/* Features */}

    <div className="mt-12 space-y-9">

      <Feature
        icon={<ShieldCheck size={30} color="white" />}
        title="Role Based Access"
        description="Separate dashboards for Admin, Manager and Student."
      />

      <Feature
        icon={<Ticket size={30} color="white" />}
        title="Digital Coupons"
        description="Create and manage coupons digitally without paperwork."
      />

      <Feature
        icon={<BarChart3 size={30} color="white" />}
        title="Real-time Analytics"
        description="Track balances and transactions instantly."
      />

    </div>

  </div>

  {/* Illustration */}
{/* Illustration */}

<div
  className="
  absolute
  bottom-[-20px]
  right-[-70px]
  z-10
  w-[62%]
  "
>
  <Image
    src="/images/login_leftpanel.png"
    alt="Illustration"
    width={900}
    height={700}
    priority
    className="w-full object-contain"
  />
</div>

  {/* Footer */}

  <p className="absolute bottom-6 left-12 text-sm text-blue-200">

    © 2026 TokenTrack. All rights reserved.

  </p>

</section>
      {/* ================= RIGHT PANEL ================= */}

      <section className="relative flex items-center justify-center overflow-hidden bg-[#F8FAFC]">

        {/* Background Glow */}

        <div className="absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-blue-100/70 blur-[120px]" />

        <div className="absolute -left-24 bottom-[-100px] h-[350px] w-[350px] rounded-full bg-sky-100/60 blur-[120px]" />

        {/* Login Card */}

        <div
          className="
          relative
          z-10
          w-full
          max-w-[700px]
          rounded-[40px]
          bg-white
          px-20
          py-8
          shadow-[0_40px_120px_rgba(15,23,42,0.10)]
          "
        >
          {children}
        </div>

      </section>
          </main>
  );
}