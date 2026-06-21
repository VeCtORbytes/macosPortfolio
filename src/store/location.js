import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "#constants";

const DEFAULT_LOCATION = locations.work;
const DEFAULT_PATH = [
  { id: DEFAULT_LOCATION.id, name: "Work", location: DEFAULT_LOCATION },
];

const useLocationStore = create(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    path: DEFAULT_PATH,
    history: [DEFAULT_PATH],
    historyIndex: 0,

    // Use this for any navigation (sidebar click, breadcrumb click, folder open)
    navigateTo: (location, path) =>
      set((state) => {
        state.activeLocation = location;
        state.path = path;
        // drop any "forward" history once you navigate somewhere new
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(path);
        state.historyIndex = state.history.length - 1;
      }),

    goBack: () =>
      set((state) => {
        if (state.historyIndex === 0) return;
        state.historyIndex -= 1;
        const path = state.history[state.historyIndex];
        state.path = path;
        state.activeLocation = path[path.length - 1].location;
      }),

    goForward: () =>
      set((state) => {
        if (state.historyIndex >= state.history.length - 1) return;
        state.historyIndex += 1;
        const path = state.history[state.historyIndex];
        state.path = path;
        state.activeLocation = path[path.length - 1].location;
      }),

    // Kept for backward compatibility / other callers, routes through navigateTo logic
    setActiveLocation: (location) =>
      set((state) => {
        state.activeLocation = location;
        const path = [{ id: location.id, name: location.name, location }];
        state.path = path;
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(path);
        state.historyIndex = state.history.length - 1;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
        state.path = DEFAULT_PATH;
        state.history = [DEFAULT_PATH];
        state.historyIndex = 0;
      }),

    trashedItems: [],

    moveToTrash: (item, fromLocationId) =>
      set((state) => {
        state.trashedItems.push({ item, fromLocationId });
      }),

    restoreFromTrash: (itemId) =>
      set((state) => {
        state.trashedItems = state.trashedItems.filter((t) => t.item.id !== itemId);
      }),

    emptyTrash: () =>
      set((state) => {
        state.trashedItems = [];
      }),
  })),
);

export default useLocationStore;
