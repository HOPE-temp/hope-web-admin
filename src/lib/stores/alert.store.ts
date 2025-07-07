import { create } from "zustand";

type AlertVariant = "default" | "destructive";

interface AlertUIState {
  open: boolean;
  title: string;
  description: string;
  variant: AlertVariant;
  showAlert: (args: {
    title: string;
    description: string;
    variant?: AlertVariant;
    duration?: number; // nuevo: duración opcional
  }) => void;
  hideAlert: () => void;
}

export const useAlertUIStore = create<AlertUIState>((set) => ({
  open: false,
  title: "",
  description: "",
  variant: "default",
  showAlert: ({ title, description, variant = "default", duration = 4000 }) => {
    set({ open: true, title, description, variant });

    // Auto cierre después del tiempo especificado
    setTimeout(() => {
      set({ open: false });
    }, duration);
  },
  hideAlert: () => set({ open: false }),
}));