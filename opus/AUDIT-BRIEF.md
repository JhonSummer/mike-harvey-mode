# Opus audit brief — 7HL Promo / Mike OpenBot capture (YP ask 26 Oct 2026 ~14:20 Asia/Saigon)

## YP's complaint (verbatim intent)
YP saw "gazette watch" used as an on-screen user prompt in the OpenBot dialogue take and rejected it: *what kind of prompt is this?* He wants the **entire convo audited by Opus** — film-room decisions + capture dialogue + what ended up on camera.

## Hard prior from YP (already in live mock v1 comments)
`/workspace/mike-video/mock/mike.responses.yml` header: "YP 10:07 PM: every message on screen is natural; no visible triggers."
So typed trigger strings that are match keys for mockllm must **never** appear as the human's visible chat line.

## What went wrong
- Product Marketer capture-v2 YAML added alternate match `gazette watch` (id m1b) for when `logging off` fails in OpenBot UI.
- Motion Director's take used on-screen lines: `gazette watch` → `send it to me` → `saw the matrix` (reported in 7HL Promo).
- They skipped `logging off` because it gave a weak reply + failed tool step in OpenBot Local.
- Result: a demo that looks like someone typed "gazette watch" at Mike — unnatural, breaks the "speaks first / unprompted" story.

## Desired story (mute watch)
1. Legal AI dies when laptop closes / lawyer leaves.
2. Mike keeps working (walk-away clock).
3. Speaks first with proof (sources + cl. 7.3 conflict).
4. One human yes — Review alert → nothing sent until Meera says yes.
5. Called Mike.

Remotion A-roll at `/workspace/mike-harvey-mode/out/mike-harvey-mode-{16x9,9x16}.mp4` is the locked ship face (spectator + decide lines). OpenBot is optional B-roll / refs.

## Files to audit
- `/workspace/mike-harvey-mode/refs/openbot/mike.responses.capture-v2.yml`
- `/workspace/mike-harvey-mode/refs/openbot/CAPTURE-PLAN.md`
- `/workspace/mike-video/mock/mike.responses.yml`
- `/workspace/mike-harvey-mode/refs/openbot/STATUS.md` (if present)
- `/workspace/mike-harvey-mode/opus/SHIP.md` and `CODE-NOTES.md`
- Takes under `/workspace/mike-harvey-mode/refs/openbot/takes/`

## Room arc (compressed, for audit — not a full transcript dump)
- VS/MD: OpenBot AppImage OTP wall → bun run dev bypass → mockllm on 8765.
- Canva MCP rejects MP4; site upload waiting YP sign-in.
- Spectator end card locked after debate.
- MD dialogue take with capture-v2; agent renamed Chief→Mike; title cleared.
- YP: anger at "gazette watch" + demand Opus audit of entire convo.

## Opus deliverable
Write `/workspace/mike-harvey-mode/opus/CONVO-AUDIT.md` with:
1. Verdict on "gazette watch" and every other visible match string in capture-v2 / takes.
2. What should appear on camera instead (natural Kabir/Meera lines OR true unprompted / hidden trigger — no match-key visible).
3. Failures vs YP's "natural messages, no visible triggers" rule across the room's capture plan.
4. Concrete rewrite of match keys + recommended re-take beat list (short).
5. What to keep from Remotion A-roll vs what OpenBot B-roll must fix before any fold into Canva.
6. Ranked list of other creative/process mistakes in the room arc (OTP thrash, dual ownership, Chief name, shipping without spectator, bland Done., etc.) — blunt, actionable.
