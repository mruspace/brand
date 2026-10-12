# Mru brand kit

The Mru mark, the lockup, the wordmarks, the colors and the animated mark. The guide with
previews is at [mru.space/brand](https://mru.space/brand/).

Download everything: [main.zip](https://github.com/mruspace/brand/archive/refs/heads/main.zip).

## Contents

| Folder | Files |
| --- | --- |
| `mark/` | The mark as SVG, and PNG at 512 and 1024 px. `on-light` has dark ink for light backgrounds; `on-dark` has light ink for dark backgrounds. Transparent. |
| `lockup/` | The mark with the word "Mru", as SVG and PNG. Same two versions. |
| `wordmark/` | The names alone, with no mark: "Mru", "Mru Aerospace", "Mru Field" and "Mru Flight". SVG and PNG, same two versions. |
| `motion/` | The animated mark, as GIF and MP4. `mru` is for dark backgrounds, `mru-light` for light ones. |
| `colors.json` | The site colors for light and dark mode. |

Every letter in the SVGs is an outline, so they look the same without the font.

## Colors

| Token | Light | Dark |
| --- | --- | --- |
| Ink | `#16161a` | `#ecece8` |
| Paper | `#fafaf8` | `#121214` |
| Signal (ochre) | `#87650a` | `#d8a54a` |
| Accent | `#3a4a5a` | `#9fb4cb` |

## Type

- Headings, the word "Mru" and the wordmarks: Futura, medium. Jost 500 is the open fallback.
- Body text: Charter. Source Serif 4 is the open fallback.
- Labels, numbers and code: IBM Plex Mono.

## Use

- Keep clear space around the mark of at least half the ring's diameter.
- Use the mark at 16 px or larger, and the lockup at 24 px tall or larger.
- Use the "Mru" wordmark where the mark cannot go. Use "Mru Aerospace" for
  the company, for example in a document or a listing. Use "Mru Field" and
  "Mru Flight" for the products.
- Use the files as they are. Do not recolor, rotate, stretch, outline or add
  effects to the mark, and do not set "Mru" in another typeface.
- Use ink on paper: the `on-light` files on light backgrounds and the
  `on-dark` files on dark ones.

The name and the mark are trademarks of Binns Pte. Ltd. Read
[TRADEMARK.md](TRADEMARK.md) before you use them. Questions:
[contact@mru.space](mailto:contact@mru.space).

## Rebuild

```sh
npm ci
npm run build       # outlined SVGs, from fonts/jost-500.ttf
./scripts/png.sh    # PNGs (needs rsvg-convert)
```

The geometry matches the mark on mru.space: a 100-unit box, a ring of radius
34, an orbit of 30 by 14 at -22 degrees, and an M in Jost 500 at 16 units.
