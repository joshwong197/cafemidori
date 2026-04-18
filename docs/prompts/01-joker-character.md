# Sprite prompt 01 — Joker (character sheet)

Paste into your image pipeline (Midjourney, Stable Diffusion, Nano Banana, Claude.ai with image gen, etc.). The prompt is written for models that accept long instructions — trim as needed for models that prefer shorter prompts.

---

## Prompt

```
Original pixel-art character sprite sheet for a video-game-style web app. 32×32 pixel character on transparent background, crisp pixel edges, no anti-aliasing smear, readable at 1× and 2× scale. Stardew-Valley-class legibility as grammar reference only — NOT a style copy.

CHARACTER: Original male character. Mid-height, slim build. Unruly dark black hair falling just over the eyes. Calm neutral face. Round wire-frame glasses. Wearing a dark charcoal-grey henley shirt or soft turtleneck, dark slate trousers, and a neutral cream apron tied at the waist (he runs a small café).

MUST NOT include: no tailcoat, no red lining on any garment, no domino mask or any face mask, no red gloves, no harlequin silhouette, no long coat — standard casual café attire only. This is an original character; do not reproduce any existing franchise's character design.

PALETTE (hex):
- skin: #e8c9a4
- hair: #1f1a22 (near-black with a cool tilt)
- henley: #3a3740
- trousers: #2a2730
- apron: #f1e8d9
- glasses frame: #7a5338 (warm brown)

SHEET LAYOUT: 8 rows × 4 columns, 32×32 per frame, transparent background.
- Row 1 (idle, 4 frames, facing camera): subtle breathing; frames 1-2 relaxed, frame 3 slight lean, frame 4 neutral return.
- Row 2 (walk south / toward camera, 4 frames): standard 4-step walk cycle, arms swinging, apron edge moves with stride.
- Row 3 (walk west, 4 frames).
- Row 4 (walk east, 4 frames).
- Row 5 (walk north / away from camera, 4 frames).
- Row 6 (sit-at-counter, 1 frame centred + 3 blank): seated upright, hands on counter surface.
- Row 7 (interact, 2 frames + 2 blank): frame 1 holding an espresso tamper over tamping mat; frame 2 pressing tamper down.
- Row 8 (talk, 2 frames + 2 blank): near-identical to idle but mouth slightly different (closed vs slightly open), for chat-scene lip-sync feel.

Also produce a separate 64×64 portrait bust-up of the same character, transparent background, calm neutral expression, warm lamp lighting, same palette — for use in the genome viewer header.
```

## Negative / never include

- No tailcoat, domino mask, red gloves, or any piece resembling a "phantom thief" costume
- No Atlus / Persona 5 / Sega character resemblance — this is an original character
- No logos or trademark indicia
- No mascot stylisation (big head, chibi proportions) — keep human proportions at 32×32
- No anti-aliasing smear that blurs pixel edges

## Deliverable filename

`web/public/sprites/joker/joker-sheet.png` (sheet)
`web/public/sprites/joker/joker-portrait.png` (portrait)

## Metadata JSON (generate alongside)

```json
{
  "id": "JKR",
  "name": "Joker",
  "frame": { "w": 32, "h": 32 },
  "animations": {
    "idle":        { "row": 0, "frames": 4, "fps": 8 },
    "walk_s":      { "row": 1, "frames": 4, "fps": 12 },
    "walk_w":      { "row": 2, "frames": 4, "fps": 12 },
    "walk_e":      { "row": 3, "frames": 4, "fps": 12 },
    "walk_n":      { "row": 4, "frames": 4, "fps": 12 },
    "sit_counter": { "row": 5, "frames": 1 },
    "interact":    { "row": 6, "frames": 2, "fps": 6 },
    "talk":        { "row": 7, "frames": 2, "fps": 6 }
  }
}
```

Save to `web/public/sprites/joker/joker.json`.
