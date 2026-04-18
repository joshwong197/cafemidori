"use client";
import { useEffect, useRef, useState } from "react";
import { connectCafe, type CafeEventIn } from "@/lib/ws";

type Msg = { from: string; text: string; ts: string };

export function ChatPanel({ room, title }: { room: string; title: string }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState<string>("");
  const sendRef = useRef<((e: { kind: "message"; text: string }) => void) | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const conn = connectCafe(room, (ev: CafeEventIn) => {
      if (ev.kind === "message") setMessages((m) => [...m, { from: ev.from, text: ev.text, ts: ev.ts }]);
      else if (ev.kind === "agent_stream") setStreaming((s) => s + ev.chunk);
      else if (ev.kind === "agent_done") {
        setStreaming((s) => {
          if (s) setMessages((m) => [...m, { from: ev.agent, text: s, ts: new Date().toISOString() }]);
          return "";
        });
      }
    });
    sendRef.current = (e) => conn.send(e);
    return () => conn.close();
  }, [room]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, streaming]);

  const submit = () => {
    const text = draft.trim();
    if (!text || !sendRef.current) return;
    sendRef.current({ kind: "message", text });
    setMessages((m) => [...m, { from: "joshua", text, ts: new Date().toISOString() }]);
    setDraft("");
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-cafe-brass/40 bg-black/40">
      <div className="border-b border-cafe-brass/30 px-4 py-2 text-sm text-cafe-lamp">{title}</div>
      <div className="flex-1 overflow-y-auto px-4 py-3 text-sm space-y-2">
        {messages.map((m, i) => (
          <div key={i}><span className="text-cafe-brass">{m.from}:</span> {m.text}</div>
        ))}
        {streaming && <div className="text-cafe-lamp/80 italic">{streaming}</div>}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2 border-t border-cafe-brass/30 p-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="say something"
          className="flex-1 rounded bg-black/50 px-2 py-1 outline-none"
        />
        <button onClick={submit} className="rounded bg-cafe-brass/70 px-3 py-1 text-black hover:bg-cafe-brass">send</button>
      </div>
    </div>
  );
}
