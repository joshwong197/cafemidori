import { randomUUID } from "node:crypto";
import { runCafeAgentMessage } from "./agent-bridge.js";
import { startCafeSession } from "./session-bridge.js";

export type CafeAgentReply = { agent: string; stream: AsyncIterable<string> };

export async function handleCafeMessage(room: string, text: string): Promise<CafeAgentReply> {
  const agent = room.replace(/^cafe_agent_/, "");
  return runCafeAgentMessage(agent, text);
}

export type TopicRun = { topicId: string; participants: string[]; domain: string };
export type TopicEvent = { name: string; payload: unknown };
export type TopicStream = (ev: TopicEvent) => void;

export async function startTopicRun(req: Record<string, unknown>, stream: TopicStream): Promise<TopicRun> {
  const topicId = randomUUID();
  const participants = Array.isArray(req.participants) ? req.participants as string[] : [];
  const domain = String(req.domain ?? "cross_cutting");
  const question = String(req.question ?? "");
  startCafeSession({ topicId, question, participants, domain }, stream).catch((err) => {
    stream({ name: "error", payload: { topicId, error: String(err) } });
  });
  return { topicId, participants, domain };
}
