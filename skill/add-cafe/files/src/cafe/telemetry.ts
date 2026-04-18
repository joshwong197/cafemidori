export type CafeEventName =
  | "cafe.message"
  | "cafe.topic_run"
  | "cafe.palace_write"
  | "cafe.purge"
  | "cafe.room_entered";

export function emit(name: CafeEventName, payload: Record<string, unknown>): void {
  const line = JSON.stringify({ ts: new Date().toISOString(), name, ...payload });
  console.log(`[telemetry] ${line}`);
}
