import Link from "next/link";
import { notFound } from "next/navigation";
import { AGENT_BY_KEY, type AgentKey } from "@/lib/agents";
import { ChatPanel } from "@/components/ChatPanel";
import { TimeToggle } from "@/components/TimeToggle";

export default async function RoomPage({ params }: { params: Promise<{ agent: string }> }) {
  const { agent } = await params;
  const meta = AGENT_BY_KEY[agent as AgentKey];
  if (!meta) notFound();

  return (
    <main className="mx-auto grid min-h-screen max-w-6xl grid-rows-[auto_1fr] p-6">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <Link href="/" className="text-xs text-cafe-lamp/60 hover:underline">← café</Link>
          <h1 className="font-mono text-xl text-cafe-lamp">{meta.display}&apos;s room</h1>
          <p className="text-xs text-cafe-lamp/60">{meta.codename} · {meta.role}</p>
        </div>
        <TimeToggle />
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_3fr]">
        <section className="rounded-lg border border-cafe-brass/40 bg-black/40 p-4">
          <p className="text-sm text-cafe-lamp/80">{meta.roomBlurb}</p>
          <div className="mt-3 h-72 rounded bg-[#1a1218] ring-1 ring-cafe-brass/30 flex items-center justify-center text-cafe-lamp/50">
            [room sprite — placeholder]
          </div>
        </section>

        <section className="h-[70vh] md:h-auto">
          <ChatPanel room={`cafe_agent_${meta.key}`} title={`chat with ${meta.display}`} />
        </section>
      </div>
    </main>
  );
}
