export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg">
        T
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          TokenTrack
        </h1>

        <p className="text-sm text-blue-100">
          Digital Coupon Management
        </p>
      </div>
    </div>
  );
}