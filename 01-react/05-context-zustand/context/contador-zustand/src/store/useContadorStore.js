import { create } from "zustand";

export const useContadorStore = create((set) => ({
  count: 0,
  aumentar: () => set((state) => ({ count: state.count + 1 })),
  disminuir: () => set((state) => ({ count: state.count - 1 })),
  reiniciar: () => set({ count: 0 }),
}));
