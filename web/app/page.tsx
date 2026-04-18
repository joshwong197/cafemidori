import Link from "next/link";
import { AGENTS } from "@/lib/agents";
import { TimeToggle } from "@/components/TimeToggle";

export default function CafePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl text-cafe-lamp">Café Midori</h1>
          <p className="text-sm text-cafe-lamp/70">Home of the team. Warm lamps, slow rain, curry on a low flame.</p>
        </div>
        <TimeToggle />
      </header>

      <section className="mb-6 rounded-lg border border-cafe-brass/40 bg-black/40 p-4">
        <p className="text-sm text-cafe-lamp/80">
          Ambient sprite layer loads here (placeholder while art is being commissioned against the style bible).
          Sit at the counter — or pick a room upstairs.
        </p>
        <div className="mt-3 h-60 rounded bg-[#1a1218] ring-1 ring-cafe-brass/30 flex items-center justify-center text-cafe-lamp/50">
          [café ground floor — placeholder]
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm uppercase tracking-wide text-cafe-lamp/70">Rooms</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <li key={a.key}>
              <Link
                href={`/room/${a.key}`}
                className="block rounded-lg border border-cafe-brass/40 bg-black/30 p-4 hover:bg-black/50"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-cafe-lamp">{a.display}</span>
                  <span className="text-xs text-cafe-lamp/60">{a.codename}</span>
                </div>
                <div className="mt-1 text-xs text-cafe-lamp/60">{a.role}</div>
                <p className="mt-2 text-sm text-cafe-lamp/80">{a.roomBlurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <nav className="mt-8 flex gap-4 text-sm text-cafe-lamp/80">
        <Link href="/topic" className="underline-offset-4 hover:underline">Start a discussion topic →</Link>
        <Link href="/genome" className="underline-offset-4 hover:underline">Genome viewer →</Link>
      </nav>
    </main>
  );
}
