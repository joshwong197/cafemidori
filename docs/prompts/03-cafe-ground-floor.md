# Sprite prompt 03 — Café Midori ground floor (shared space)

This is the landing scene — what loads when the app opens. Evening variant is primary; day variant follows the same layout.

---

## Prompt (evening — primary)

```
Original pixel-art interior scene, top-down dimetric (2:1) projection, for a Stardew-Valley-class web app. Scene canvas 480×320 pixels. Tile size 16×16. Crisp pixel edges, warm evening light, lamp-pool rendering.

LOCATION: Ground floor of a small Showa-era-feel Tokyo backstreet café — customer-facing floor. Narrow gabled building. The space is cozy but not cramped — four booth tables along one wall, two two-seaters at the front window, a counter running along the back wall. A narrow wooden staircase leads up from the back-right corner.

LAYOUT (left to right as viewed):
- FRONT WALL (bottom of canvas): two window two-seaters with deep-green leather booth seating. Window shows evening city rain. Subtle lamplight reflection on wet glass.
- LEFT WALL: four booth tables lined against the wall, each with deep-green (#244037) leather bench seating and a pale wood table. Small brass lamp on each table.
- BACK WALL (top of canvas): the counter. Espresso machine, siphon coffee setup, curry pot on a low flame (faint steam). Chalkboard menu above the counter — blank/unreadable text lines, no specific menu items (to be filled in dev). Small analog clock on the wall.
- BACK-RIGHT: narrow wooden staircase going up to the agents' rooms; bannister of dark wood, the first three steps visible before the stairs curve out of view.
- RIGHT WALL: bookshelf near the stairs (leather spines, decorative only). A small wall-mounted TV showing faint static or a muted analog signal.
- FLOOR: warm wood planks (#7a5338 with #5a3a24 seams), slightly darker near the entrance (wet footprints, barely visible).

PALETTE (hex):
- wood floor: #7a5338 / #5a3a24
- booth leather: #244037
- wall wainscoting: #244037 (lower) and cream plaster #f1e8d9 (upper)
- lamp amber: #f2b24a / #d49233
- brass: #a07c32
- charcoal iron: #1f1a22
- window night-blue: #2a3a5a
- curry pot / steam: #d49233 on #1f1a22

LIGHTING: evening. Three pendant lamps over the counter and booths, each casting a warm amber pool. Window lamps on each booth table. Areas between pools are dim but not black — the whole space reads as lamp-lit and warm, with cool blue bleed through the window.

MOOD: the café is already alive. Curry simmering. Rain against the window. A seat is waiting.

NO characters in the scene — the ambient sprite layer will composite Joker at the counter and (later) Morgana on the ledger stack on top of this background. The raw background should be empty of people.

Include one small decorative touch: a single folded newspaper on one two-seater table. One brass bell by the entrance doorframe. Nothing else named or specific.
```

## Prompt (day variant)

```
Same layout, same palette, same dimensions. Variant changes:
- No rain on window; soft morning daylight (pale cream-white #f1e8d9 wash through the front windows).
- Pendant lamps off or dimmer; space is day-lit rather than lamp-lit.
- Curry pot unlit, small cloth draped over.
- Subtle dust motes in the window light beams.
- Chalkboard menu has the faintest ghost of yesterday's writing still on it.
- Mood: quieter, slower, pre-lunch rhythm.
```

## Negative / never include

- No Persona 5 / Atlus café design. This is an original Showa-era Japanese backstreet café, not a reproduction of any specific café in any existing franchise.
- No recognisable real-world brand signage (no actual coffee brand logos, etc.).
- No "cafe LeBlanc" or any source-material café name on the sign — the sign (if shown at all) says "Café Midori" in plain English/Japanese typography.
- No mascot characters, no chibi stylisation.

## Deliverable filenames

- `web/public/sprites/scenes/cafe-evening.png`
- `web/public/sprites/scenes/cafe-day.png`

## Animation overlays (optional)

- Rain on window — 4-frame loop, 6 fps — deliver as `cafe-rain-overlay.png` (same dimensions, transparent where no rain).
- Curry steam wisp — 2-frame loop, 3 fps — `curry-steam.png` (32×48).
- Lamp flicker — 2-frame loop, 0.5 fps — on one specific lamp.
