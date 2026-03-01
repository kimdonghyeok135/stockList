"use client";

import { Heart } from "lucide-react";
import { useToastStore } from "@/lib/toast";

const typeStyles: Record<
  "info" | "success" | "error",
  { container: string; dot: string }
> = {
  info: {
    container: "bg-[#1e2e3e]/95 border-[#2c4054] text-slate-100",
    dot: "bg-sky-400",
  },
  success: {
    container: "bg-[#2b1b24]/95 border-[#3c2631] text-rose-100",
    dot: "bg-[#ff5a8b]",
  },
  error: {
    container: "bg-[#2b1b1b]/95 border-[#3c2626] text-rose-100",
    dot: "bg-rose-400",
  },
};

export default function ToastHost() {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-[1000] flex w-[320px] -translate-x-1/2 flex-col gap-2"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => {
        const style = typeStyles[toast.type];
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur transition-all duration-1000 ease-out ${
              toast.closing ? "translate-y-2 opacity-0" : "opacity-100"
            } ${style.container}`}
          >
            {toast.type === "success" ? (
              <Heart
                className="mt-0.5 h-4 w-4 shrink-0 fill-[#ff5a8b] text-[#ff5a8b]"
                aria-hidden="true"
              />
            ) : (
              <span
                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${style.dot}`}
                aria-hidden="true"
              />
            )}
            <div className="flex-1">{toast.message}</div>
            {toast.type !== "success" && (
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="text-xs uppercase tracking-wider text-white/70 hover:text-white"
                aria-label="Dismiss notification"
              >
                Close
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
