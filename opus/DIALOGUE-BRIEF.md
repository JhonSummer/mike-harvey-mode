# Opus dialogue pack — demos + context (YP clear 26 Oct 2026 ~15:38 Asia/Saigon)

**Goal:** Watch demos (descriptions will be appended), keep product locks, plan OpenBot dialogue + mock YAML for a clean re-take. Ship face stays Remotion; OpenBot is a separate "see it work" B-roll. No camera until this plan lands; then re-take until that B-roll video exists. YP: "All is clear until video is made."

## Demos (watch these)
- Remotion 9:16: `/workspace/mike-harvey-mode/out/mike-harvey-mode-9x16.mp4`
- Remotion 16:9: `/workspace/mike-harvey-mode/out/mike-harvey-mode-16x9.mp4`
- Quarantined OpenBot take (junk, learn what NOT to do): `/workspace/mike-harvey-mode/refs/openbot/takes/_quarantine/02-dev-mockllm-ux.mp4`
- Quarantined end still: `/workspace/mike-harvey-mode/refs/openbot/takes/_quarantine/03-mockllm-dialogue.png`
- Clean stills: `takes/05-mike-title-cleared.webp`, `takes/02-dev-seeded-home.png` under refs/openbot/

## Context (read)
- `/workspace/mike-harvey-mode/STATUS.md` — Remotion ship face + exact on-screen copy
- `/workspace/mike-harvey-mode/refs/openbot/STATUS.md`
- `/workspace/mike-harvey-mode/refs/openbot/CAPTURE-PLAN.md`
- `/workspace/mike-video/mock/mike.responses.yml` — YP-approved live yml
- Prior plan to improve on: `/workspace/mike-harvey-mode/opus/RETAKE-DIALOGUE.md`
- Prior audit: `/workspace/mike-harvey-mode/opus/CONVO-AUDIT.md`

## Product locks
- Story: legal AI dies when you close the laptop; Mike is 24/7 associate that keeps working and texts you; nothing goes out without your yes.
- On screen: natural lines only — no visible match triggers / code words.
- Speaks-first beat: hidden routine or timer; never type a debug key.
- Agent name Mike, title cleared. Meera's desk only (one human chrome).
- mockllm only, fictional parties. No live model.
- Remotion A-roll is only ship face; do not intercut OpenBot into the 27s cut.
- Do not invent mid-shot match keys.

## Deliverables (write under opus/)
1. `DEMO-DIALOGUE-PLAN.md` — beat list for OpenBot B-roll (~35–40s, 16:9), cold-lawyer success test, exact on-screen lines, what to hide
2. `mike.responses.capture-v3.yml` ready to serve (natural matches + `[MOCK MISS — cut take]` sentinel; gazette watch must MISS)
3. Short `NEXT-CAMERA.md` — MD/VS shoot checklist only (no ceremony)

Do not edit Remotion src. Do not start OpenBot UI. Do not change live :8765 until plan is written.
