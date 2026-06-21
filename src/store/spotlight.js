import { create } from "zustand";

const useSpotlightStore = create((set) => ({
  isOpen: false,
  openSpotlight: () => set({ isOpen: true }),
  closeSpotlight: () => set({ isOpen: false }),
  toggleSpotlight: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSpotlightStore;
