# `add-cafe` — manual merge steps

The skill ships new files. These edits to existing NanoClaw files have to be applied by hand (they're small and they touch stable integration points we don't want to clobber with a file copy).

## 1. Register the `cafe` channel

**File**: `nanoclaw/src/channels/registry.ts`

Add alongside other channel imports:

```ts
import { cafeChannel } from "./cafe.js";
```

And register in the list of channels that `start()` at boot (keeping whatever conditional-start pattern the file currently uses — match the style of `telegramChannel`).

## 2. Mount the café palace wing in the container runner

**File**: `nanoclaw/src/container-runner.ts`

Find the existing mount list (where `Midori/palace` is mounted at `/workspace/palace`). Add:

```ts
// Café wing — read-write; writes through to operational palace for operational-classified content
{ source: path.join(projectRoot, "Midori/palace-cafe"), target: "/workspace/palace-cafe", readOnly: false }
```

And change the existing main-palace mount from RW to **RO** for cafe-bound containers (the operational runtime keeps its RW mount as today). A `mode: "cafe" | "operational"` option on the runner is the cleanest split.

## 3. Env vars

Add to `nanoclaw/.env`:

```
CAFE_PORT=3722
CAFE_SHARED_SECRET=<32 random hex>
CAFE_PALACE_WING=palace-cafe
```

## 4. Bootstrap per-agent groups

On first `cafe` channel start, call a one-shot bootstrap that creates `groups/cafe_agent_{name}/CLAUDE.md` for each agent in `AGENTS`, populated with the Café Midori persona prompt (see `cafemidori/web/lib/agents.ts` for the list). Put this inside `cafeChannel.start()` — a simple `if (!fs.existsSync(groupDir)) writeBootstrap(name)` loop.

## 5. agent-bridge.ts — replace the stub

`src/cafe/agent-bridge.ts` currently returns a stub echo. Replace `runCafeAgentMessage` with a real call into the existing container runtime (see `src/container-runner.ts` and `src/ipc.ts` for how the existing channels send prompts in). Key constraint: the container must be spawned with `mode: "cafe"` so the palace mounts are correct.

## 6. session-bridge.ts — wire cognition/Session

`src/cafe/session-bridge.ts` is currently a stub that emits fake events. Replace with a real `Session` run once `container/agent-runner/src/cognition/agent.ts` is live:

1. Construct `AgentRuntime` adapters backed by per-agent containers
2. Instantiate `new Session({ question, question_domain: domain, participants, mode: "gwt" })`
3. Stream session.log events as `topic_event` payloads
4. On shipped: write master trace to `palace-cafe/trace/topic_runs/{topicId}.json`; if any operational-classified drawer was written during the run, mirror under `palace/operational_decisions/cafe_topic_{topicId}.json`

## 7. Telemetry

`src/cafe/telemetry.ts` currently writes to console.log. Replace with a call into NanoClaw's existing SQLite/event-log path (see `src/db.ts`).
