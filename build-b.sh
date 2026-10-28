#!/usr/bin/env bash
# Mike Version B — "Coffee date, sun to moon" (37 s, 1110 f @30). Leaves MikePromo/MikePromo916 + ./build.sh untouched.
# VO: audio/vo_b (ElevenLabs, Mariana OB0Jj6v9DGLLgz8dD57i "Mariana - Female VO (Mike promo)", eleven_multilingual_v2; gen_f.py mariana -> takes/mariana/PICKS.txt -> post.py; Hank archived in audio/vo_b/_archive_hank) -> src/voB.ts via audio/vo_b/make_ts.py (whisper word times).
# Audio: audio/mix37b.py -> audio/mix37b.wav (-15 LUFS, <= -1.5 dBTP).  Video: MikeVersionB (16:9) + MikeVersionB916 (9:16), native, rendered 2x and downscaled.
set -euo pipefail
cd "$(dirname "$0")"
(cd audio && python3 mix37b.py)
npx remotion render src/index.ts MikeVersionB916 out/master-b-916-2x.mp4 --scale=2 --crf=12 --timeout=180000 --concurrency=4
npx remotion render src/index.ts MikeVersionB out/master-b-169-2x.mp4 --scale=2 --crf=12 --timeout=180000 --concurrency=4
ENC="-c:v libx264 -profile:v high -preset slow -crf 16 -r 30 -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart"
ffmpeg -y -v error -i out/master-b-916-2x.mp4 -i audio/mix37b.wav -map 0:v -map 1:a -vf "scale=1080:1920:flags=lanczos,format=yuv420p" $ENC out/.tmp-mike-version-b-9x16.mp4
ffmpeg -y -v error -i out/master-b-169-2x.mp4 -i audio/mix37b.wav -map 0:v -map 1:a -vf "scale=1920:1080:flags=lanczos,format=yuv420p" $ENC out/.tmp-mike-version-b-16x9.mp4
mv -f out/.tmp-mike-version-b-9x16.mp4 out/mike-version-b-9x16.mp4 && mv -f out/.tmp-mike-version-b-16x9.mp4 out/mike-version-b-16x9.mp4  # atomic replace
