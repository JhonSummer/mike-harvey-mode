#!/usr/bin/env bash
# Rebuild both masters (overnight re-roll, 28 s). Audio bed: audio/mix28.wav (built by audio/mix28.py: pad, lid slam 2.67 s (f80), whooshes, ticks, ping 17.55 s, chime 22.4 s; then gain to ≈-18 LUFS).
# 16:9 = composition MikePromo (1920x1080). 9:16 = composition MikePromo916 (native 1080x1920; no crop). Both rendered at 2x and downscaled.
set -euo pipefail
cd "$(dirname "$0")"
npx remotion render src/index.ts MikePromo out/master-2x.mp4 --scale=2 --crf=12
npx remotion render src/index.ts MikePromo916 out/master-916-2x.mp4 --scale=2 --crf=12
ENC="-c:v libx264 -profile:v high -preset slow -crf 16 -r 30 -c:a aac -b:a 192k -shortest -movflags +faststart"
ffmpeg -y -v error -i out/master-2x.mp4 -i audio/mix28.wav -map 0:v -map 1:a -vf "scale=1920:1080:flags=lanczos,format=yuv420p" $ENC out/mike-harvey-mode-16x9.mp4
ffmpeg -y -v error -i out/master-916-2x.mp4 -i audio/mix28.wav -map 0:v -map 1:a -vf "scale=1080:1920:flags=lanczos,format=yuv420p" $ENC out/mike-harvey-mode-9x16.mp4
