export type CafeEventIn =
  | { kind: "hello"; room: string }
  | { kind: "message"; from: string; text: string; ts: string }
  | { kind: "agent_stream"; agent: string; chunk: string }
  | { kind: "agent_done"; agent: string }
  | { kind: "topic_event"; event: string; payload: unknown };

export type CafeEventOut =
  | { kind: "join"; room: string }
  | { kind: "message"; text: string }
  | { kind: "topic_start"; question: string; participants: string[]; domain: string };

const WS_URL =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_CAFE_WS ?? "ws://localhost:3722/cafe")
    : "";

export function connectCafe(
  room: string,
  onEvent: (e: CafeEventIn) => void,
): { send: (e: CafeEventOut) => void; close: () => void } {
  let ws: WebSocket | null = null;
  let closed = false;
  let retry = 0;

  const open = () => {
    if (closed) return;
    ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      retry = 0;
      ws?.send(JSON.stringify({ kind: "join", room } satisfies CafeEventOut));
    };
    ws.onmessage = (ev) => {
      try { onEvent(JSON.parse(ev.data) as CafeEventIn); }
      catch { /* ignore malformed */ }
    };
    ws.onclose = () => {
      if (closed) return;
      const delay = Math.min(1000 * 2 ** retry, 15000);
      retry += 1;
      setTimeout(open, delay);
    };
  };
  open();

  return {
    send: (e) => ws?.readyState === WebSocket.OPEN && ws.send(JSON.stringify(e)),
    close: () => { closed = true; ws?.close(); },
  };
}
