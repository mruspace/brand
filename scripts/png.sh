#!/usr/bin/env bash
# PNGs from the outlined SVGs. Needs rsvg-convert (librsvg).
set -euo pipefail
cd "$(dirname "$0")/.."
for f in mark/*.svg; do
  for s in 512 1024; do rsvg-convert -w "$s" -h "$s" "$f" -o "${f%.svg}-$s.png"; done
done
for f in lockup/*.svg; do rsvg-convert -h 400 "$f" -o "${f%.svg}.png"; done
echo "PNGs written"
