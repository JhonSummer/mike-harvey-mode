#!/usr/bin/env bash
# Gary Agents · Version C2 trust cut (9:16 only, 1080x1920, 30 fps). Version A/B/C sources, scripts and masters untouched.
# VO: audio/vo_c2 (gen_c2.py -> takes/, build_vo_c2.py -> line wavs + cues.json + src/voC2.ts). Narrator Mariana OB0Jj6v9DGLLgz8dD57i.
# Audio: audio/mix_c2.py -> audio/mix_c2.wav (-14 LUFS / <=-1 dBTP per sound brief, near-dry; sleep SFX audio/c2s_assets). Picture uses public/gary-face-av.png. Video: GaryAgentsVersionC2916 rendered 2x, lanczos-downscaled.
set -euo pipefail
cd "$(dirname "$0")"
(cd audio && python3 mix_c2.py)
npx remotion render src/index.ts GaryAgentsVersionC2916 out/master-c2-916-2x.mp4 --scale=2 --crf=12 --timeout=180000 --concurrency=4
ENC="-c:v libx264 -profile:v high -preset slow -crf 16 -r 30 -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart"
ffmpeg -y -v error -i out/master-c2-916-2x.mp4 -i audio/mix_c2.wav -map 0:v -map 1:a -vf "scale=1080:1920:flags=lanczos,format=yuv420p" $ENC out/.tmp-gary-agents-version-c2-9x16.mp4
mv -f out/.tmp-gary-agents-version-c2-9x16.mp4 out/gary-agents-version-c2-9x16.mp4
