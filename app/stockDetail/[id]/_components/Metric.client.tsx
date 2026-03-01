"use client"
type MetricParams = {
  label : string,
  value : string
}
export default function Metric({ label, value } : MetricParams){
    return (
    <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-base font-extrabold text-gray-900">{value}</p>
    </div>
  );
}