import { create } from "zustand";

export const useSearchStore = create((set: any) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
}));
