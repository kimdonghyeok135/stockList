import { create } from "zustand";

export type ToastType = "info" | "success" | "error";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  closing: boolean;
};

type ToastInput = {
  message: string;
  type?: ToastType;
  duration?: number;
};

type ToastState = {
  toasts: Toast[];
  show: (input: ToastInput) => string;
  dismiss: (id: string) => void;
  clear: () => void;
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  show: (input) => {
    const id = createId();
    const toast: Toast = {
      id,
      message: input.message,
      type: input.type ?? "info",
      duration: input.duration ?? 2400,
      closing: false,
    };

    set((state) => ({ toasts: [...state.toasts, toast] }));

    if (toast.duration > 0) {
      window.setTimeout(() => {
        get().dismiss(id);
      }, toast.duration);
    }

    return id;
  },
  dismiss: (id) => {
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, closing: true } : t
      ),
    }));

    window.setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 1000);
  },
  clear: () => set({ toasts: [] }),
}));

export const toast = {
  show: (input: ToastInput) => useToastStore.getState().show(input),
  info: (message: string, options: Omit<ToastInput, "message" | "type"> = {}) =>
    useToastStore.getState().show({ message, type: "info", ...options }),
  success: (
    message: string,
    options: Omit<ToastInput, "message" | "type"> = {}
  ) => useToastStore.getState().show({ message, type: "success", ...options }),
  error: (
    message: string,
    options: Omit<ToastInput, "message" | "type"> = {}
  ) => useToastStore.getState().show({ message, type: "error", ...options }),
  dismiss: (id: string) => useToastStore.getState().dismiss(id),
  clear: () => useToastStore.getState().clear(),
};
