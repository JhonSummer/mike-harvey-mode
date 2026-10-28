# Mike promo · SHIP call (Opus, 26 Oct 2026)

## The call
**Ship the four-capability Remotion cut in `/workspace/mike-harvey-mode`, upgraded. No new path, no CONCEPT-v3 film.**

Why:
- **It already follows YP's script beat for beat:** the laptop closes, Mike works while you're on a coffee date, in a meeting or drafting a notice, reads the docs unprompted, has photographic memory, texts you, and closes on "Let Mike do its thing, you be the spectator." It's calm, near-black and one caption at a time, which is the Margin bar.
- **CONCEPT-v3 is the better *film*, but it isn't buildable from existing assets.** It needs about 7 i2v regenerations (H1, A2, C2, D, E, F-top, I), a VO casting pull with no senior female voice in the pack, and a new mix, and its own doc says "do not start any generation until YP picks." Honest estimate: **1–3 days** with re-gen risk. The four-flash cut is **about 1 hour** (roughly 40 minutes of edits plus about 20 of render and QA).
- **We take the two v3 ideas that cost nothing in code:** (1) **the problem happens on screen**: the AI's work freezes at 62% as the lid closes, and the hook isn't only a sentence; (2) **nothing goes out without your yes**: the review gate is built into the UI of beat 04, not just the caption.

## Heads-up: src is ahead of the masters
`src/Mike.tsx` (edited 13:43) already contains a partial Product Marketer fix: the beat 04 notification reads "ready for your review", it has `Review draft` / `Later` buttons, the caption says "Nothing goes out until you say yes.", and the end card has "You review. Then you decide." **The masters in `out/` (10:06) and `STATUS.md` (10:07) still show the old "Done…" cut.** That edit also **deleted YP's "You be the spectator."**, which this plan restores. Treat `src/` as the baseline and `STATUS.md` as stale.

## Timeline: unchanged (locks the audio)
`T = {intro: 0, b1: 66, b2: 201, b3: 336, b4: 471, end: 606, total: 810}` at 30 fps = 27.0 s. Whooshes and ticks, the ping (16.45 s) and the chime (21.4 s) in `audio/mix27n.wav` stay in sync. **No audio rebuild.**

## Beat sheet: final on-screen copy (✱ = change vs current src)

| t (s) | Beat | Visual | Exact on-screen copy |
|---|---|---|---|
| 0.0–2.2 | **Hook** | Laptop line icon. ✱ **A status chip under the laptop counts 58→62% while the lid closes, then freezes and greys at 62%.** The screen glow dies. | ✱ chip: `Your AI · drafting brief… 62%` → `Your AI · paused at 62%` · line: `Most legal AI stops when you close the laptop.` |
| 2.2–6.7 | **01 Works while you're away** | Unchanged. Away chip cycles. Ordinary AI card idle, Mike card ticks 8→94%. | `CAPABILITY 01 / 04` · `Works while` / `you’re away.` · `You: coffee date` → `You: in a meeting` → `You: drafting a notice` · `Ordinary AI` `idle` `Waiting for a prompt` `Ask anything…` / `Mike` `working` `Indexing exhibits` `Cross-checking dates` `Flagging clauses` `Drafting summary` `Progress NN%` · caption: `Ordinary AI waits.` / `Mike keeps going.` |
| 6.7–11.2 | **02 Reads the docs unprompted** | Unchanged. | `CAPABILITY 02 / 04` · `Reads the docs` / `unprompted.` · `☾ 11:42 PM → ☀ 6:10 AM` · `✕ No prompt · no chat box` · `MATTER FOLDER` `48 exhibits added` · `UNREAD` `READ` · `Page N of 1,280` · caption: `All night. Nobody asked.` |
| 11.2–15.7 | **03 Photographic memory** | Unchanged. | `CAPABILITY 03 / 04` · `Photographic` / `memory.` · `All 1,280 pages kept — not summarised away.` · `CONNECTING ACROSS THE SET` · `p. 12  Notice period: 30 days` · `p. 388  Amended to 45 days` · `p. 1,041  Waiver requires writing` · caption: `Every page, recalled.` |
| 15.7–20.2 | **04 Texts you: the REVIEW GATE** | Lock screen. The notification springs in (+22f, on the ping). ✱ A dim proof line inside the card ties back to beat 03. ✱ **A gold lock chip under the card (+50f): nothing has been sent.** Caption (+60f). No tap and no "sent" state; the lawyer hasn't decided yet, which is the point. | `CAPABILITY 04 / 04` · ✱ `Texts you` / `when it’s ready.` · `Tuesday` `8:06` · `M` `Mike` `now` · ✱ `Notice draft ready for your review.` · ✱ `1,280 pages read · 1 flag (p. 388)` · `Review draft` `Later` · ✱ chip: `🔒 Nothing sent yet` (lock drawn as SVG, not emoji) · caption (gold): `Nothing goes out until you say yes.` |
| 20.2–27.0 | **End card** | Builds line by line and holds. ✱ Restores YP's spectator line, ✱ with the review line as a small sign-off underneath. | `Mike.` · `Your 24/7 photographic-memory associate.` · gold rule · `Let Mike do its thing.` · ✱ `You be the spectator.` (gold) · ✱ `You review. Then you decide.` (small, dim) |

## What changes vs STATUS.md (net, after the rebuild)
1. **Hook:** add the frozen-at-62% "Your AI" chip. The hook line moves down 30 px to make room.
2. **Beat 04 title:** `Texts you / when done.` → `Texts you / when it’s ready.` "Done" implied unsupervised output.
3. **Beat 04 notification:** `Done. All 1,280 pages reviewed. Your notice draft is ready.` → `Notice draft ready for your review.` + `1,280 pages read · 1 flag (p. 388)` + `Review draft` / `Later` buttons.
4. **Beat 04 gate:** add the `Nothing sent yet` lock chip. Caption `You didn’t ask. It’s done.` → `Nothing goes out until you say yes.`
5. **End card:** `Let Mike do its thing.` / `You be the spectator.` / `You review. Then you decide.`. That's YP's tagline intact, plus the PM's gate line as a quiet third line.
6. Rewrite `STATUS.md` to match, re-render both masters, regenerate the contact sheets.

## What NOT to touch
- **Timeline `T`, `BEAT`, and `audio/mix27n.wav`.** Any timing shift breaks the ping and chime sync.
- **Beats 01, 02, 03:** visuals, copy and timings stay as they are. They work cold.
- **The look:** #060608, gold #E6B04B, Inter, one caption at a time, the progress ticks, the vignette.
- **The 9:16 safe column:** every new element stays inside x 656–1264 (≤ 580 px wide). Leave the `build.sh` crop alone.
- **Harvey:** zero on screen. No "Harvey", no Suits reference, no competitor names, no Claude/Codex names. The tool is "Your AI" / "Ordinary AI".
- **No "Works while you don't."** It's a good line, but YP's tagline is the close, and two taglines is clutter.
- **No tap, no "Sent ✓", no "Approved" state** in beat 04. Showing the decision still pending is the review story.

## Success criteria: one muted watch by a cold lawyer
They can say back, unprompted:
1. "My AI stops when I close the laptop." (hook: the 62% freezes)
2. "Mike keeps working while I'm out, without me prompting it." (01 + 02)
3. "It reads everything and remembers every page, and it caught the 45-day amendment." (03 + the p. 388 flag in 04)
4. "It texts me a draft to review. **Nothing goes out until I say yes.**" (04)
5. "It's called Mike."

Fail conditions: any frame reads as Mike sending or filing without approval; any text a 9:16 viewer can't read; any Harvey mention; the end card missing "You be the spectator."

Gates for the Motion Director:
- `rg -i harvey src/` = 0
- `rg -n "when done|It’s done|Done\." src/Mike.tsx` = 0
- ffprobe on both masters: 27.000 s / 810 frames, H.264 High, yuv420p, faststart
- 9:16 frames at t = 1.6, 19.0, 19.8, 26.5 s: chip, gate chip and end card are fully inside the frame with no overlaps
