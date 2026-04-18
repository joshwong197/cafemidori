import Link from "next/link";
import { AGENTS } from "@/lib/agents";

export default function GenomePage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/" className="text-xs text-cafe-lamp/60 hover:underline">← café</Link>
      <h1 className="mt-1 font-mono text-xl text-cafe-lamp">Genome viewer</h1>
      <p className="mb-4 text-sm text-cafe-lamp/70">
        Each agent&apos;s personality genome: traits, arcana shadow, council voice priors, director pool, emotional baseline.
        Joshua-only. Joker&apos;s private_shadow field is never surfaced.
      </p>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {AGENTS.map((a) => (
          <li key={a.key}>
            <Link
              href={`/genome/${a.key}`}
              className="block rounded-lg border border-cafe-brass/40 bg-black/30 p-4 hover:bg-black/50"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-cafe-lamp">{a.display}</span>
                <span className="text-xs text-cafe-lamp/60">{a.codename}</span>
              </div>
              <div className="mt-1 text-xs text-cafe-lamp/60">{a.role}</div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-cafe-lamp/50">
        Data source: <code>Midori/palace/genomes/{'{'}agent{'}'}/001.json</code> — loaded server-side by the cafe channel skill.
      </p>
    </main>
  );
}
