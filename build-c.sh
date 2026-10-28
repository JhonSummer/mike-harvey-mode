#!/usr/bin/env bash
# Mike Version C — "Can I come back to you?" (9:16 only, 1080x1920, 30 fps). Leaves Version A/B sources, scripts and masters untouched.
# VO: audio/vo_c (gen_c.py -> takes/, build_vo.py -> line wavs + cues.json + src/voC.ts). Narrator Mariana OB0Jj6v9DGLLgz8dD57i (eleven_multilingual_v2).
# Audio: audio/mix_c.py -> audio/mix_c.wav (-15 LUFS, <= -1.5 dBTP, near-dry).  Video: MikeVersionC916 rendered 2x and downscaled.
set -euo pipefail
cd "$(dirname "$0")"
(cd audio && python3 mix_c.py)
npx remotion render src/index.ts MikeVersionC916 out/master-c-916-2x.mp4 --scale=2 --crf=12 --timeout=180000 --concurrency=4
ENC="-c:v libx264 -profile:v high -preset slow -crf 16 -r 30 -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart"
ffmpeg -y -v error -i out/master-c-916-2x.mp4 -i audio/mix_c.wav -map 0:v -map 1:a -vf "scale=1080:1920:flags=lanczos,format=yuv420p" $ENC out/.tmp-mike-version-c-9x16.mp4
mv -f out/.tmp-mike-version-c-9x16.mp4 out/mike-version-c-9x16.mp4
