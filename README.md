# mike-harvey-mode

Remotion project for short **Gary Agents** (formerly Mike) product promos: story board → composition → ElevenLabs VO → mix → bake → Studio KEEP.

Companion recipe (Grok Bot / Cursor skill): **Remotion short promo** (`remotion-short-promo`).

## What’s in here

| Path | Role |
|------|------|
| `src/GaryC2.tsx` | Current KEEP composition (`GaryAgentsVersionC2916`, 9:16) |
| `src/Mike*.tsx` | Earlier cuts (leave KEEP’d sources alone; fork a new file for the next cut) |
| `audio/vo_c2/` | VO generate / build scripts + line wavs for C2 |
| `audio/mix_c2.py` | Mix for C2 |
| `build-c2.sh` | Bake: mix → Remotion 2× render → lanczos 1080×1920 → mux |
| `refs/version-c2*` | Boards / sleep / face refs |
| `out/gary-agents-version-c2-9x16.mp4` | Latest KEEP master (reference) |
| `STATUS.md` | Bake log / judgment calls |

## Setup

```bash
npm install
export ELEVENLABS_API_KEY=…   # see .env.example; voices are in audio/vo_c2/gen_c2.py
npx remotion studio src/index.ts
./build-c2.sh                  # needs ffmpeg + python3
```

## Next cut

1. Stage new refs under `refs/<version>/`.
2. Copy the nearest KEEP composition to a **new** file + register in `Root.tsx` (do not overwrite KEEP sources).
3. VO → mix → new `build-<cut>.sh` → cold-check → KEEP.

## Runtime

- Node 20+, Remotion 4.x, ffmpeg, Python 3
- `ELEVENLABS_API_KEY` for new VO (narrator Mariana `OB0Jj6v9DGLLgz8dD57i`)
