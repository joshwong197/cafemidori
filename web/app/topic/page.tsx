"use client";
import Link from "next/link";
import { useState } from "react";
import { AGENTS } from "@/lib/agents";

const DOMAINS = ["credit", "recovery", "compliance", "growth", "orchestration", "cross_cutting"];

export default function TopicPage() {
  const [question, setQuestion] = useState("");
  const [domain, setDomain] = useState("cross_cutting");
  const [participants, setParticipants] = useState<string[]>(AGENTS.filter(a => a.key !== "akechi").map(a => a.key));
  const [events, setEvents] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const toggle = (k: string) => {
    setParticipants((p) => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);
  };

  const start = async () => {
    if (!question.trim() || running) return;
    setRunning(true);
    setEvents([]);
    try {
      const res = await fetch("/api/topic", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question, domain, participants }),
      });
      const data = await res.json();
      setEvents((e) => [...e, `topic id: ${data.topicId ?? "(no backend yet)"}`]);
    } catch (err) {
      setEvents((e) => [...e, `error: ${String(err)}`]);
    } finally {
      setRunning(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/" className="text-xs text-cafe-lamp/60 hover:underline">← café</Link>
      <h1 className="mt-1 font-mono text-xl text-cafe-lamp">Topic desk</h1>
      <p className="mb-4 text-sm text-cafe-lamp/70">
        Put a question in front of the team. The cognition runtime scores it live; validator flags show against each position.
      </p>

      <section className="space-y-4 rounded-lg border border-cafe-brass/40 bg-black/40 p-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-cafe-lamp/60">Question</span>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded bg-black/50 p-2 outline-none"
            placeholder="e.g. Should we tighten the scorecard weighting on payment history?"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide text-cafe-lamp/60">Domain</span>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="mt-1 rounded bg-black/50 p-2"
          >
            {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>

        <div>
          <div className="text-xs uppercase tracking-wide text-cafe-lamp/60">Participants</div>
          <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {AGENTS.map((a) => (
              <li key={a.key}>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={participants.includes(a.key)}
                    onChange={() => toggle(a.key)}
                  />
                  {a.display}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={start}
          disabled={running}
          className="rounded bg-cafe-brass/80 px-4 py-1.5 text-black hover:bg-cafe-brass disabled:opacity-50"
        >
          {running ? "running…" : "start"}
        </button>
      </section>

      <section className="mt-4 rounded-lg border border-cafe-brass/40 bg-black/40 p-4">
        <div className="text-xs uppercase tracking-wide text-cafe-lamp/60">Trace</div>
        <ul className="mt-2 space-y-1 font-mono text-xs text-cafe-lamp/80">
          {events.length === 0 && <li className="text-cafe-lamp/40">no events yet</li>}
          {events.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      </section>
    </main>
  );
}
