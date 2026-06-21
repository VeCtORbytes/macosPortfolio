import { create } from "zustand";

const useSystemStore = create((set) => ({
  isWifiOn: true,
  brightness: 100,
  volume: 80,
  toggleWifi: () => set((state) => ({ isWifiOn: !state.isWifiOn })),
  setBrightness: (val) => set({ brightness: val }),
  setVolume: (val) => set({ volume: val }),
}));

export default useSystemStore;
