import { create } from "zustand";

export type TimeOfDay = "day" | "evening";

type PrefsState = {
  timeOfDay: TimeOfDay;
  setTimeOfDay: (t: TimeOfDay) => void;
  toggleTimeOfDay: () => void;
  load: () => void;
};

const LS_KEY = "cafe-midori.timeOfDay";

export const usePrefs = create<PrefsState>((set, get) => ({
  timeOfDay: "evening",
  setTimeOfDay: (t) => {
    if (typeof window !== "undefined") window.localStorage.setItem(LS_KEY, t);
    set({ timeOfDay: t });
  },
  toggleTimeOfDay: () => {
    const next: TimeOfDay = get().timeOfDay === "day" ? "evening" : "day";
    get().setTimeOfDay(next);
  },
  load: () => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(LS_KEY);
    if (raw === "day" || raw === "evening") set({ timeOfDay: raw });
  },
}));
