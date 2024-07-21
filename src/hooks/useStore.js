import { create } from "zustand";

export const useStore = create(set => ({
    showCheck: false,
    setShowCheck: phone => set(state => ({ showCheck: phone || !state.showCheck })),
    category: "all",
    setCategory: category => set(state => ({ category })),
}));
