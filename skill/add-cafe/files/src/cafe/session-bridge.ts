import type { TopicStream } from "./router.js";

type StartArgs = { topicId: string; question: string; participants: string[]; domain: string };

export async function startCafeSession(args: StartArgs, stream: TopicStream): Promise<void> {
  stream({ name: "session_started", payload: { topicId: args.topicId, participants: args.participants, domain: args.domain } });

  for (const name of args.participants) {
    stream({ name: "retrieval_gate_started", payload: { agent: name } });
    stream({ name: "retrieval_gate_complete", payload: { agent: name, hits: 0, gaps: 0 } });
  }

  for (const name of args.participants) {
    stream({ name: "position_posted", payload: {
      agent: name,
      status: "DEFERRED",
      note: "cognition/agent.ts live swap pending — scripted stub response",
    }});
  }

  stream({ name: "synthesis_complete", payload: {
    synthesiser: "joker",
    output: `(stub) cafe session ${args.topicId} will run live once cognition/agent.ts is wired to Claude.`,
  }});

  stream({ name: "shipped", payload: { topicId: args.topicId } });
}
