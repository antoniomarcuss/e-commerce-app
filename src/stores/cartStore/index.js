import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const storeCallback = (set) => ({
  total: 0,
  items: [],
  setItems: (items) => set(() => ({ items })),
  setTotal: (total) => set(() => ({ total })),
});

export const userCartStore = create(
  persist(storeCallback, {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
  })
);
