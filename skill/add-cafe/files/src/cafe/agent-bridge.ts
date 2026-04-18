import type { CafeAgentReply } from "./router.js";

export async function runCafeAgentMessage(agent: string, text: string): Promise<CafeAgentReply> {
  async function* stream() {
    yield `(café stub) ${agent} received: ${text.slice(0, 80)}`;
  }
  return { agent, stream: stream() };
}
