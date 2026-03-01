"use client"

type ActionPillParams = {
  icon : React.ReactNode,
  label : string,
  active ? : boolean
}

export default function ActionPill({ icon, label, active } : ActionPillParams){
    return (
        <>
        <button
        type="button"
        className={`rounded-2xl py-3 ring-1 transition flex flex-col items-center justify-center  gap-1
            ${
            active
                ? "bg-[#4fd1c5] text-[#1a2b3c] ring-[#4fd1c5] shadow-md"
                : "bg-white text-gray-900 ring-gray-200 shadow-sm hover:shadow-md"
            }`}
        >
            <span className={active ? "text-[#1a2b3c]" : "text-[#4fd1c5]"}>{icon}</span>
            <span className="text-xs font-extrabold">{label}</span>
        </button>
        </>
    )
}