import http from "node:http";
import { WebSocketServer, type WebSocket } from "ws";
import type { Channel } from "./registry.js";
import { handleCafeMessage, startTopicRun } from "../cafe/router.js";
import { emit } from "../cafe/telemetry.js";

type Sub = { ws: WebSocket; room: string };

const CAFE_PORT = Number(process.env.CAFE_PORT ?? 3722);
const SHARED = process.env.CAFE_SHARED_SECRET ?? "";

const subs = new Set<Sub>();

export const cafeChannel: Channel = {
  name: "cafe",
  async start() {
    const server = http.createServer((req, res) => {
      if (!authOk(req)) { res.statusCode = 401; return res.end("unauthorized"); }
      if (req.method === "POST" && req.url === "/topic") return handleTopicRoute(req, res);
      res.statusCode = 404; res.end("not found");
    });

    const wss = new WebSocketServer({ server, path: "/cafe" });
    wss.on("connection", (ws, req) => {
      if (!authOk(req)) { ws.close(1008, "unauthorized"); return; }
      const sub: Sub = { ws, room: "" };
      subs.add(sub);
      ws.on("message", async (raw) => {
        const msg = safeParse(String(raw));
        if (!msg) return;
        if (msg.kind === "join") { sub.room = String(msg.room ?? ""); return; }
        if (msg.kind === "message") {
          emit("cafe.message", { agent: sub.room, direction: "in", length: String(msg.text ?? "").length });
          const reply = await handleCafeMessage(sub.room, String(msg.text ?? ""));
          for (const chunk of reply.stream) ws.send(JSON.stringify({ kind: "agent_stream", agent: reply.agent, chunk }));
          ws.send(JSON.stringify({ kind: "agent_done", agent: reply.agent }));
        }
      });
      ws.on("close", () => subs.delete(sub));
    });

    server.listen(CAFE_PORT, () => console.log(`[cafe] listening :${CAFE_PORT}`));
  },
};

function authOk(req: http.IncomingMessage): boolean {
  if (!SHARED) return true;
  const got = req.headers["x-cafe-secret"];
  return typeof got === "string" && got === SHARED;
}

function safeParse(s: string): Record<string, unknown> | null {
  try { return JSON.parse(s); } catch { return null; }
}

async function handleTopicRoute(req: http.IncomingMessage, res: http.ServerResponse) {
  const body = await new Promise<string>((resolve) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
  const parsed = safeParse(body);
  if (!parsed) { res.statusCode = 400; return res.end("bad json"); }
  const run = await startTopicRun(parsed, (event) => {
    for (const s of subs) s.ws.send(JSON.stringify({ kind: "topic_event", event: event.name, payload: event.payload }));
  });
  emit("cafe.topic_run", { topicId: run.topicId, participants: run.participants, domain: run.domain });
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({ topicId: run.topicId }));
}
