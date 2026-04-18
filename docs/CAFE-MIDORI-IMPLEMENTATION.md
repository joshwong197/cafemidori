# Café Midori — Implementation Spec

Companion to `CAFE-MIDORI-BIBLE.md` (art/experience). This doc covers code: architecture, data model, integration with NanoClaw, palace-wing isolation, and the observability contract the team agreed to in the roundtable.

Status: design-ready; awaiting repo to scaffold.

---

## 1. Top-level architecture

```
┌──────────────────────────────────────────────────────────┐
│  Café Midori (Next.js, web-first, mobile-web parity)     │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  Café view   │  │ Room view    │  │ Genome viewer│    │
│  │ (ambient +   │  │ (per-agent)  │  │ (read-only,  │    │
│  │  sprites)    │  │              │  │  Joshua-only)│    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         └─────────┬───────┘                 │            │
│                   ▼                         ▼            │
│           ┌──────────────┐         ┌──────────────┐      │
│           │ Chat surface │         │ Topic desk   │      │
│           │ (per agent)  │         │ (cognition   │      │
│           └──────┬───────┘         │  observer)   │      │
│                  │                 └──────┬───────┘      │
└──────────────────┼────────────────────────┼──────────────┘
                   │  WebSocket             │  WebSocket
                   ▼                        ▼
┌──────────────────────────────────────────────────────────┐
│  NanoClaw orchestrator (new `cafe` channel skill)        │
│  - Registers as a channel at startup                     │
│  - Routes inbound to per-agent container contexts        │
│  - Cognition topic runs spawn a Session (cognition/)     │
│  - Emits observability events                            │
└──────────────────────────────┬───────────────────────────┘
                               │  existing container runner
                               ▼
             ┌──────────────────────────────────┐
             │  Per-agent containers (10)       │
             │  MemPalace mount: /workspace/    │
             │    palace      (operational, RO) │
             │    palace-cafe (casual, RW)      │
             └──────────────────────────────────┘
```

The café app is a rendering layer and an orchestrator plug-in. Agents themselves are the same containers used in the operational stack — they just mount the palace differently.

---

## 2. NanoClaw `cafe` channel skill

A new channel type, self-registering via the existing skill mechanism (see `nanoclaw/src/channels/registry.ts` and existing channels like `telegram.ts`).

**Responsibilities**:
- Listen on a local HTTP/WebSocket port for messages from the Next.js frontend
- Route inbound messages to per-agent group contexts (each agent = one group in NanoClaw's group model)
- Relay agent responses back to the frontend over WebSocket
- Accept `topic_start` events → spawn a cognition `Session` and stream its progress
- Emit lifecycle events to the stack for Morgana's observability contract

**Group naming convention**:
- `cafe_agent_{name}` — per-agent private chat (one per Thief)
- `cafe_topic_{session_id}` — one per discussion topic run

**Implementation pattern**: mirror `src/channels/telegram.ts` — `start`, message-in handler, message-out router. Swap Grammy/Baileys for `ws` + `fastify` (or the existing web server if NanoClaw already has one).

**NOT in scope for the channel**: the sprite animation, the genome viewer, the UI. Those are pure frontend.

---

## 3. Palace-wing isolation (Makoto's decision)

Two palace mounts per container:

| Mount | Path inside container | RW | What goes here |
|-------|-----------------------|----|----|
| Operational | `/workspace/palace` | **read-only** | Existing MemPalace; agent diaries for ops; knowledge graph; credit framework |
| Café | `/workspace/palace-cafe` | read-write | Casual conversation diaries; topic-run traces; low-stakes banter |

**Write-through rule** (the one Makoto held the line on):
> If an agent, during a café conversation, produces a claim that is operational in nature (policy decision, account fact, compliance ruling, recovery action), that claim MUST be **mirrored-written** to the operational palace with full audit metadata. The cafe wing alone is not authoritative for operational facts.

**How to enforce**: a small write-interceptor layer in the MemPalace MCP calls. When an agent calls `mempalace_add_drawer` inside a cafe session:
1. Classify the drawer content (a tiny classifier prompt in the agent-runner, or a set of regex rules for MVP) — operational or casual
2. If casual: write to `palace-cafe` only
3. If operational: write to BOTH `palace-cafe` (audit trail) AND `palace` (authoritative), with `origin: cafe-session-{id}` metadata

**Purge policy**:
- Purge authority: Joshua (user) + Joker (agent gate, via override log)
- Purge trigger: manual (Joshua deletes a conversation from the UI), TTL (default 90 days for cafe messages with no operational spillover), or spam-detection hook
- Purge scope: cafe wing only. Operational mirrors are NEVER purged by a cafe purge — that's a separate operational-palace lifecycle with its own rules.
- Audit: every purge writes a redacted-stub drawer in the operational palace noting `cafe_purge_event` with timestamp, scope, and reason. You can see that a purge happened without being able to see what was purged.

---

## 4. Per-agent chat surface

Each agent's room has a chat panel. Behaviour:

- Chat is over WebSocket, end-to-end simple JSON: `{ kind: 'message', from, text, ts }`
- The `cafe` channel reads the message, routes it to group `cafe_agent_{name}`, spawns/attaches to that agent's container session
- Agent responds; response is streamed back to the frontend as it's generated (use the existing streaming mechanism Claude Agent SDK supports)
- Frontend renders response in the chat panel + triggers a `talk` sprite frame + a tiny room animation cue (Joker pours a cup; Yusuke sets down brush; etc.)

**Identity discipline**: the agent in the cafe is the SAME agent identity as the operational one. Same SOUL, same genome, same council voices, same epistemic discipline. The only thing different is the palace wing it writes to and the channel context.

---

## 5. Discussion topic surface (cognition observer)

Joshua clicks a "start a topic" button, types a question, and picks participants + domain routing (or accepts auto-routing).

Backend flow:
1. Frontend posts `POST /api/topic` with `{ question, participants, question_domain }`
2. Cafe channel calls into the cognition runtime: construct a `Session` object per `container/agent-runner/src/cognition/session.ts`, attach `AgentRuntime` adapters backed by per-agent containers
3. Stream session events to the frontend via WebSocket:
   - `retrieval_gate_started` / `retrieval_gate_complete` per agent
   - `position_posted` per agent (with validator flags)
   - `synthesis_started` / `synthesis_complete`
   - `joker_gate_verdict`
   - `shipped` with final trace URL
4. Frontend renders the roundtable as it happens — agents light up as they speak, validator flags show as small icons next to positions, the final synthesis appears in a shared panel

This is the backdoor Joshua wanted. The cognition runtime is operational, not a toy — so every topic run has the same discipline as an operational session. The cafe just lets you WATCH.

**Topic run storage**: full trace written to `palace-cafe` by default. If the topic produces an operational decision (e.g. Joshua says "ship this"), trace is mirrored into `palace` under `operational_decisions/cafe_topic_{id}`.

---

## 6. Genome viewer

Laverne.ai-style read-only UI. Joshua-only. Shows per agent:

- Trait vector (with bar chart)
- Arcana shadow (narrative description)
- Council voice priors (which of the 8 voices dominates, with weights)
- Director pool (which 2-3 selectors are active)
- Emotional baseline (3D vector)
- `synthesis_domains` list
- Example claim patterns (pulled from the agent's recent positions)

Data source: `Midori/palace/genomes/{name}/001.json` + aggregate stats from recent sessions. Purely read. Never exposes the private_shadow field (Joker-only; see project_joker_private_layer memory).

**Not shown publicly** while the team is private (which it is today). The viewer is gated behind a Joshua-only auth check at the channel layer.

---

## 7. Observability contract (Morgana's line)

Cafe emits the following events into NanoClaw's existing telemetry path (SQLite or the event log, whichever the project currently uses):

| Event | Payload |
|-------|---------|
| `cafe.message` | `{ agent, direction: 'in'/'out', length, ts }` — no content |
| `cafe.topic_run` | `{ topic_id, participants, domain, duration_ms, outcome }` |
| `cafe.palace_write` | `{ wing: 'cafe'/'operational', drawer_id, classifier_verdict }` |
| `cafe.purge` | `{ scope, actor, reason, drawer_count }` |
| `cafe.room_entered` | `{ room, ts }` — useful for ambient behaviour tuning |

Morgana consumes this from the operational side to keep her portfolio-monitor picture honest.

---

## 8. Frontend stack

- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind for UI chrome; sprite rendering via `<canvas>` with a small hand-rolled layer (requirements are modest — no full game engine needed)
- **Sprite engine options** (pick during repo scaffold):
  - Hand-rolled canvas renderer (~600 LOC, total control, no dep) — RECOMMENDED for the scale of this app
  - Phaser 3 (overkill; brings a whole game loop) — reject
  - PixiJS (middle ground; only if the hand-rolled gets messy)
- **State**: Zustand (tiny, unopinionated, fine for this)
- **WebSocket**: `ws` client; auto-reconnect
- **Auth**: Joshua-only for MVP — simple shared-secret in env, upgradable later if the app is ever shared

**Mobile-web parity** (Ryuji's line held):
- Chat surface MUST be fully usable on mobile at launch
- Sprite ambient layer is a progressive enhancement — on narrow viewports, the room shrinks to a tight portrait-frame + chat panel
- Day/evening toggle available on mobile

---

## 9. Day/Evening toggle

A user preference (not tied to real-world clock) stored in localStorage. Each room and the cafe ground floor has two fully arted variants. Transition is a 400ms crossfade, not instant.

`GET /api/prefs` returns current time-of-day; `PATCH /api/prefs` updates.

---

## 10. Build order (when repo exists)

1. Scaffold Next.js app + basic layout
2. Implement `cafe` NanoClaw channel skill (stub: no cognition, just echo)
3. Hook per-agent chat end-to-end (one agent first — pick Joker — then generalise)
4. Add palace-cafe mount in `container-runner.ts`; add write-interceptor in agent-runner
5. Static cafe ground floor (sprite ambient; no agents animated yet)
6. Add room views per agent (one at a time, starting with Joker's counter)
7. Cognition topic surface (needs Phase 1's `agent.ts` complete — live Claude swap)
8. Genome viewer (read-only from palace/genomes)
9. Observability events
10. Day/evening toggle
11. Mobile parity pass
12. Purge UI + audit log view
13. Art pipeline — the Bible's sprite sheets arrive in batches; swap placeholders

Phases 7 and onwards depend on cognition `agent.ts` being done. Phases 1-6 do not and can start immediately.

---

## 11. Open decisions (defer to Joshua)

1. **Hosting**: self-hosted on the same box as NanoClaw initially, or separate process? (I recommend same-box same-process for MVP; same skill pattern as telegram channel.)
2. **Message retention default**: 90 days for cafe wing. Acceptable?
3. **Topic-run participant limits**: cap at 9 for now (all except Akechi, unless legal is on the topic)? Or unlimited?
4. **Joshua auth**: shared-secret for MVP, or do we want proper OAuth from day 1?
5. **Art placeholders**: use solid-colour 32×32 rectangles tagged with agent initial until the Bible sprites arrive, or wait for first sprite batch before going live?
