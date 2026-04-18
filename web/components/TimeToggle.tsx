"use client";
import { useEffect } from "react";
import { usePrefs } from "@/lib/prefs";

export function TimeToggle() {
  const { timeOfDay, toggleTimeOfDay, load } = usePrefs();
  useEffect(() => { load(); }, [load]);
  return (
    <button
      onClick={toggleTimeOfDay}
      className="rounded-md border border-cafe-brass/60 bg-black/30 px-3 py-1 text-sm hover:bg-black/50"
      aria-label="Toggle time of day"
    >
      {timeOfDay === "day" ? "Day" : "Evening"}
    </button>
  );
}
