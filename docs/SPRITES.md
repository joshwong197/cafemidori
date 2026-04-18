# Sprite generation pack — Café Midori

Structured prompts for generating original pixel-art assets against `CAFE-MIDORI-BIBLE.md`. Feed these to Claude Code (or a human artist) one at a time. Every prompt is self-contained; none references copyrighted source material.

## Global constraints (prepend to every generation request)

- Original pixel-art character. NOT derived from any existing franchise.
- 32×32 character sprite on transparent background unless otherwise specified.
- Colour palette: warm wood browns (#7a5338, #5a3a24), lamp amber (#f2b24a, #d49233), deep booth green (#244037), brass (#a07c32), soft cream (#f1e8d9), charcoal (#1f1a22). Cool blue accents (#2a3a5a) only for night scenes.
- Crisp pixel edges (no anti-aliasing smear); readable at 1× and 2× scale.
- Lineweight 1px for inner detail, 2px for silhouette where it helps readability.
- Stardew-Valley-class legibility as a grammar reference — NOT as a style copy.

## Agent character sheets

One sheet per agent. Each sheet has: **idle** (4 frames, facing camera), **walk** (4 directions × 4 frames), **sit-counter** (1 frame), **sit-desk** (1 frame), **interact** (1-2 context frames), **talk** (2 frames), **portrait** (64×64 bust-up).

### JKR — Joker / Ren
```
Original character. Mid-height slim build, unruly dark hair, calm face.
Wire-frame round glasses. Dark charcoal henley or turtleneck, dark trousers,
neutral cream apron. Holding an espresso tamper in the interact frame.
No mask, no red gloves, no tailcoat. Casual modern café attire.
```

### FTB — Futaba / Oracle
```
Original character. Short petite build, long orange hair loose or in a
side-plait. Oversized round glasses. Dark teal or olive hoodie, baggy
jeans, sneakers. Headphones around neck. Interact frame: typing on laptop.
```

### HAR — Haru / Noir
```
Original character. Medium height, soft features, short auburn curls in a
bob. Cream blouse, long dark skirt, small pastel pink scarf. Modest heels.
Interact frame: holding a clipboard; small potted plant at her feet.
```

### YSK — Yusuke / Fox
```
Original character. Tall lean build, navy-blue hair falling just past ears.
Navy button-down shirt sleeves rolled, paint-flecked canvas trousers,
canvas shoes. Paintbrush tucked behind one ear. Interact frame: dabbing
paint on an easel-held canvas.
```

### KSM — Kasumi / Violet
```
Original character. Athletic build, crimson hair in a low ponytail with a
single red ribbon. Burgundy sweater over a white collar, dark trousers,
clean trainers. Interact frame: flipping through a colour-coded folder.
```

### RYJ — Ryuji / Skull
```
Original character. Tall athletic, sandy-blond short hair, small scar hint
on one eyebrow. Open dark track-style jacket with a thin yellow stripe
over a plain t-shirt, jeans, running shoes. Interact frame: gym towel
over shoulder, reading a call-script card.
```

### MRG — Morgana / Mona (CAT)
```
Original cat sprite. NOT a mascot style. Slim realistic-stylised black cat
with a white chest and paws bib. Bright intelligent eyes, medium-short fur.
Sit-counter frame: curled on a stack of ledgers. Interact frame: padding
across the counter. Walk cycle: standard four-leg cat walk, 4 frames per
direction. Talk frame: small mouth-move + tail flick.
```

### ANE — Anne / Panther
```
Original character. Tall, long blonde hair in twin tails (silhouette
signature only). Red wool jumper or red jacket over cream base, dark slim
jeans, ankle boots. Interact frame: standing between two outfits on a
wardrobe rail, one hand on a clip. NO catsuit, NO cat-ears mask, NO whip.
Casual only.
```

### MKT — Makoto / Queen
```
Original character. Medium height, neat chestnut-brown bob, crimson
headband or crimson collar-tie. Fitted grey blazer over a plain shirt,
slim black trousers, sensible flats. Interact frame: fountain pen over an
open policy binder.
```

### AKC — Akechi / Crow
```
Original character. Medium-tall slim, tidy light-brown hair slightly
longer than collar. Camel overcoat over charcoal shirt, dark trousers,
polished shoes. Ochre-mustard scarf. Interact frame: seated in a leather
chair, reading a case file; coffee cup on the desk.
```

## Café scenes (tileset work)

### Ground floor — evening
```
Top-down dimetric (2:1) interior. Small Showa-era-feel backstreet café.
Warm lamp amber light, dark wood floor, four booth tables with deep green
leather, two window two-seaters, counter with espresso + siphon setup and
a small curry pot on a low flame. Chalkboard menu (blank — to be filled).
Analog clock on the wall. Bookshelf near a narrow wooden staircase up.
Rain outside the window. Tile size 16×16.
```

### Ground floor — day
```
Same layout. Bright window wash instead of lamp light; dust motes in the
light from the front window. Curry pot not lit. Counter cloth over it.
Quieter feel overall.
```

### Upstairs landing
```
Narrow wooden landing with ten numbered doors, each with a small nameplate
slot and a different small detail — a hanging plant by one, a bell by
another. Attic stairs at one end.
```

### Per-agent rooms (10)

Each room: one evening and one day variant. Use the Bible's section-2
decor table as the ground truth for which objects go in each room.

## Portrait set (genome viewer)

10 × 64×64 bust-up portraits. Calm neutral expression. Warm-lamp lighting.
Transparent background. Same aesthetic grammar as the 32×32 sprites so a
viewer switching between the two doesn't feel a style jump.

## Animation metadata (for the canvas renderer)

Every sprite sheet exports alongside a small JSON:

```json
{
  "id": "JKR",
  "name": "Joker",
  "frame": { "w": 32, "h": 32 },
  "animations": {
    "idle":     { "row": 0, "frames": 4, "fps": 8 },
    "walk_s":   { "row": 1, "frames": 4, "fps": 12 },
    "walk_w":   { "row": 2, "frames": 4, "fps": 12 },
    "walk_e":   { "row": 3, "frames": 4, "fps": 12 },
    "walk_n":   { "row": 4, "frames": 4, "fps": 12 },
    "sit_counter": { "row": 5, "frames": 1 },
    "sit_desk":    { "row": 6, "frames": 1 },
    "interact":    { "row": 7, "frames": 2, "fps": 6 },
    "talk":        { "row": 8, "frames": 2, "fps": 6 }
  }
}
```

## What NEVER to generate

(See Bible section 6 — non-negotiable.)

- Costume pieces from the source material (tailcoats, harlequin masks, skull masks, cat-ear masks, catsuit with tail, Fox's white fencing outfit, skeletal-pattern leggings, etc.)
- Named source-material locations
- Source-material NPCs
- Atlus/Sega logos or trademark indicia

If a request drifts toward any of these, stop and flag back to Joshua.
