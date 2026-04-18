# Café Midori

The Midori team's home. A web app where Joshua can talk to each agent in their own room, create discussion topics the cognition runtime visibly reasons through, and view each agent's personality genome.

Not an operational surface — a back-door into the living team.

## Structure

```
cafemidori/
├── web/              Next.js 15 frontend (cafe view, rooms, chat, topic observer, genome viewer)
├── skill/add-cafe/   NanoClaw skill files — apply to a NanoClaw install to wire the `cafe` channel
└── docs/             Style bible + implementation spec
```

## Reading order

1. `docs/CAFE-MIDORI-BIBLE.md` — art / experience reference (characters, rooms, sprite spec)
2. `docs/CAFE-MIDORI-IMPLEMENTATION.md` — architecture, palace-wing isolation, channel skill, observability

## Running (development)

```bash
cd web
npm install
npm run dev
```

The web app talks to a local NanoClaw instance over WebSocket. NanoClaw needs the `add-cafe` skill applied — see `skill/add-cafe/SKILL.md`.

## IP

All character art and café visuals are original Midori assets. No Atlus/Persona 5 derivative material. See the Bible's "what to never generate" section.
