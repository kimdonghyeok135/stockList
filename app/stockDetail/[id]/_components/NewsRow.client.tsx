"use client"

type NewsRowParams = {
  title : string,
  meta : string
}

export default function NewsRow({ title, meta } : NewsRowParams){
    return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-bold text-gray-900">{title}</p>
        <p className="mt-1 text-xs text-gray-400">{meta}</p>
      </div>
      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#4fd1c5]" />
    </div>
  );
}