import Link from "next/link";
import { notFound } from "next/navigation";
import { AGENTS, AGENT_BY_KEY, type AgentKey } from "@/lib/agents";
import { loadGenome } from "@/lib/genome";
import { Bar } from "@/components/Bar";

export async function generateStaticParams() {
  return AGENTS.map((a) => ({ agent: a.key }));
}

export default async function GenomeDetail({ params }: { params: Promise<{ agent: string }> }) {
  const { agent } = await params;
  const meta = AGENT_BY_KEY[agent as AgentKey];
  if (!meta) notFound();
  const genome = await loadGenome(agent as AgentKey);
  if (!genome) notFound();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/genome" className="text-xs text-cafe-lamp/60 hover:underline">← genome viewer</Link>
      <header className="mb-6 mt-1">
        <h1 className="font-mono text-2xl text-cafe-lamp">{genome.given_name}</h1>
        <p className="text-sm text-cafe-lamp/70">
          {genome.codename} · {genome.role.replace(/_/g, " ")} · arcana: {genome.arcana}
        </p>
        <p className="text-xs text-cafe-lamp/50">
          genome v{genome.version}, locked {genome.locked_at}
        </p>
      </header>

      <section className="mb-6 rounded-lg border border-cafe-brass/40 bg-black/40 p-4">
        <h2 className="mb-3 text-sm uppercase tracking-wide text-cafe-lamp/70">Traits</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(genome.traits).map(([k, v]) => (
            <Bar key={k} label={k} value={v} />
          ))}
        </div>
      </section>

      <section className="mb-6 rounded-lg border border-cafe-brass/40 bg-black/40 p-4">
        <h2 className="mb-3 text-sm uppercase tracking-wide text-cafe-lamp/70">Council voice weights</h2>
        <p className="mb-3 text-xs text-cafe-lamp/60">
          Eight brain-metaphor voices. Weights &gt; 1.0 speak louder in this agent&apos;s council.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(genome.council_weights).map(([k, v]) => (
            <Bar key={k} label={k} value={v} max={1.5} />
          ))}
        </div>
      </section>

      <section className="mb-6 rounded-lg border border-cafe-brass/40 bg-black/40 p-4">
        <h2 className="mb-3 text-sm uppercase tracking-wide text-cafe-lamp/70">Directors</h2>
        <p className="text-xs text-cafe-lamp/60">Default selector: <span className="font-mono text-cafe-lamp">{genome.directors.default}</span></p>
        <p className="text-xs text-cafe-lamp/60">Primary pool: {genome.directors.primary.map((d) => <span key={d} className="mr-2 font-mono text-cafe-lamp">{d}</span>)}</p>
        <ul className="mt-3 space-y-1 text-xs">
          {Object.entries(genome.directors.rules).map(([k, v]) => (
            <li key={k}><span className="text-cafe-lamp/60">{k}:</span> <span className="font-mono text-cafe-lamp/90">{v}</span></li>
          ))}
        </ul>
      </section>

      <section className="mb-6 rounded-lg border border-cafe-brass/40 bg-black/40 p-4">
        <h2 className="mb-3 text-sm uppercase tracking-wide text-cafe-lamp/70">Emotional baseline</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <Bar label="valence" value={genome.emotional_baseline.valence} max={1} />
          <Bar label="arousal" value={genome.emotional_baseline.arousal} max={1} />
          <Bar label="focus" value={genome.emotional_baseline.focus} max={1} />
          <div className="flex items-center gap-2 text-xs">
            <div className="w-28 shrink-0 text-cafe-lamp/70">decay_seconds</div>
            <div className="font-mono text-cafe-lamp/80">{genome.emotional_baseline.decay_seconds}s</div>
          </div>
        </div>
      </section>

      <p className="text-xs text-cafe-lamp/40">
        Private-layer fields are stripped at load. This view shows only public genome.
      </p>
    </main>
  );
}
