---
name: add-cafe
description: Register a `cafe` channel in NanoClaw so Café Midori can talk to per-agent containers. Creates per-agent groups, spawns cognition Sessions on topic-start, emits observability events, and mounts the cafe palace wing with write-through rules.
triggers: ["add cafe", "add cafe midori", "cafe channel"]
---

# add-cafe

Wires Café Midori into a NanoClaw install as a new channel skill. After applying, NanoClaw listens on HTTP + WebSocket for the Café Midori frontend.

## What this skill adds

1. **Channel file**: `src/channels/cafe.ts` — registers the `cafe` channel. Listens on a local port (default `3722`). Accepts WebSocket connections from the Café Midori web app.
2. **Per-agent group bootstrap**: on first run, creates `groups/cafe_agent_{name}` for all 10 agents, populating `CLAUDE.md` with the agent's Café Midori persona (warm, low-stakes, but still epistemically disciplined).
3. **Container-runner extension**: mounts `Midori/palace-cafe/` at `/workspace/palace-cafe` (RW) in cafe-bound containers; keeps `Midori/palace/` at `/workspace/palace` (read-only from cafe).
4. **Write-through interceptor**: a small wrapper around the MemPalace MCP so that operational-classified drawers written during a cafe session also land in the operational palace with `origin: cafe-session-{id}` metadata.
5. **Topic-run handler**: `POST /topic` spins up a `cognition/Session` (per `container/agent-runner/src/cognition/session.ts`), attaches per-agent container adapters, streams events to the frontend over WebSocket.
6. **Observability events**: emits `cafe.message`, `cafe.topic_run`, `cafe.palace_write`, `cafe.purge`, `cafe.room_entered` into NanoClaw's telemetry path.

## Dependencies

- NanoClaw core (`src/index.ts`, `src/channels/registry.ts`, `src/container-runner.ts`, `src/ipc.ts`)
- cognition modules already ported at `nanoclaw/container/agent-runner/src/cognition/`
- `agent.ts` in the cognition module MUST be live (the Claude-SDK swap point). If it is still the mock, topic-runs will error with "agent.ts not live" and the frontend will show a deferred-state banner.

## Apply

Run inside a NanoClaw checkout:

```bash
cd path/to/nanoclaw
cp -r path/to/cafemidori/skill/add-cafe/files/src/channels/cafe.ts src/channels/cafe.ts
cp -r path/to/cafemidori/skill/add-cafe/files/src/cafe/ src/cafe/
# then merge the patch instructions in PATCHES.md manually (they're small, deliberately)
npm install ws
npm run build
```

Then add to `.env`:

```
CAFE_PORT=3722
CAFE_SHARED_SECRET=<same value as web/.env.local>
CAFE_PALACE_WING=palace-cafe
```

## Palace wing

`Midori/palace-cafe/` is created on first run. Structure mirrors the main palace:

```
palace-cafe/
  drawers/
  diaries/
    wing_joker/ wing_futaba/ wing_haru/ ...
  trace/
    topic_runs/
```

## Purge

Purge authority: Joshua (via the Café Midori UI) or Joker (via override log). Purges write a redacted stub into the operational palace so that "a purge happened" is always visible even when contents are gone.

## Not in scope for this skill

- Frontend art pipeline (sprites live in `cafemidori/web/public/sprites/` — handled by art commissioning, not this skill)
- Genome viewer data source (reads directly from `Midori/palace/genomes/` — no skill plumbing needed beyond an auth gate)
