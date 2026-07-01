"use client";

export default function EntityListCard({
  icon,
  title,
  subtitle,
  extra,
  badge,
  badgeClassName,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
        dark:border-slate-700
        dark:bg-slate-800
      "
    >
      <div className="flex items-center gap-4">

        {icon}

        <div>

          <h3 className="font-semibold dark:text-white">
            {title}
          </h3>

          {subtitle && (
            <p className="text-sm text-slate-500">
              {subtitle}
            </p>
          )}

          {extra && (
            <p className="text-sm text-slate-500">
              {extra}
            </p>
          )}

        </div>

      </div>

      {badge && (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClassName}`}
        >
          {badge}
        </span>
      )}

    </div>
  );
}