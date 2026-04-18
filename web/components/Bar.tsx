export function Bar({ value, max = 1, label }: { value: number; max?: number; label: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="w-28 shrink-0 text-cafe-lamp/70">{label}</div>
      <div className="flex-1 h-2 rounded bg-black/50 ring-1 ring-cafe-brass/30">
        <div className="h-full rounded bg-cafe-lamp/80" style={{ width: `${pct}%` }} />
      </div>
      <div className="w-10 text-right font-mono text-cafe-lamp/80">{value.toFixed(2)}</div>
    </div>
  );
}
