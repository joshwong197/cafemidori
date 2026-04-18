# Sprite prompt 02 — Joker's room (café kitchen / behind-the-counter space)

Two variants: **evening** (primary) and **day**. Both use the same tile grid.

---

## Prompt (evening variant)

```
Original pixel-art interior scene, top-down dimetric (2:1) projection, for a Stardew-Valley-class web app. Tile size 16×16. Scene canvas 320×240 pixels. Crisp pixel edges, warm evening light, lamp-pool rendering.

LOCATION: Behind-the-counter space of a small Showa-era-feel Tokyo backstreet café. This is both the café kitchen AND Joker's room — a single lived-in working space where he brews and sleeps. Narrow gabled building, ground-floor space.

CONTENTS (rendered as pixel tiles/props):
- Wooden counter running most of the width, viewed from behind so the player sees the backside (shelves, espresso machine, siphon coffee setup, small curry pot on a low flame with faint rising steam animation hint).
- Shelves stacked with coffee bags, demitasse cups, two brass-rimmed jars.
- A small low futon rolled up against the far wall with a dark grey blanket folded on top.
- A narrow bookshelf labelled visibly as a "coffee library" — leather-spined books on coffee chemistry, extraction theory; also a personal ledger notebook (small, brown cover) lying on top.
- One small analog clock on the wall above the ledger shelf.
- Warm wood flooring (#7a5338 planks, #5a3a24 seams).
- Lamp-amber pool light (#f2b24a) from two hanging pendant lamps — light falls in soft circles on the floor; areas outside the pools are dimmer but not black.
- Deep booth-green wall panelling (#244037) at wainscoting height; cream plaster above (#f1e8d9).
- Brass details (#a07c32) on lamp fittings and one drawer pull.

PALETTE (hex):
- wood floor: #7a5338 / #5a3a24
- wall wainscoting: #244037
- wall plaster: #f1e8d9
- lamp amber: #f2b24a / #d49233
- brass: #a07c32
- charcoal iron: #1f1a22
- accent blue (rain window): #2a3a5a (one small window visible in upper corner showing evening rain)

MOOD: warm, quiet, inhabited. The place was already living before the player arrived. Curry pot simmering gently. One lamp brighter than the other. Rain on the window.

NO extra characters in the scene — this is an empty-room render; the Joker sprite will be composited over it by the app.
```

## Prompt (day variant)

```
Same scene, same layout, same palette. Variant changes:
- Lamps are off or dimmer. Primary light is bright white-cream window wash from the upper-corner window (morning sun, no rain).
- Curry pot is unlit, with a cloth draped over it.
- Counter cloth folded at one end.
- Dust motes visible in the window light beam.
- Overall mood quieter, brighter, more "pre-opening" feel.
```

## Negative / never include

- No named café from Persona 5 or any existing franchise. This is an original Showa-era-feel Japanese backstreet café.
- No Atlus/Sega trade dress. No yellow-and-wood branding that would resemble a specific real or fictional café.
- No named signage in Japanese or English that references a specific source café.
- No chibi/mascot stylisation.

## Deliverable filenames

- `web/public/sprites/rooms/joker-room-evening.png`
- `web/public/sprites/rooms/joker-room-day.png`

## Animation layer (optional, nice-to-have)

- Faint steam wisp from the curry pot (2-frame loop, 3 fps) — can be delivered as a separate 32×32 overlay PNG sequence.
- Slight lamp flicker (2-frame loop, 0.5 fps) on one pendant lamp.
