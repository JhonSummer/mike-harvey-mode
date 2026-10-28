# DIALOGUE-PLAN: Mike OpenBot B-roll (capture-v3)

**Opus · 26 Oct 2026 · Asia/Saigon.** This is a plan only. No camera has rolled from it, and Motion shoots only after YP's ok on the YAML.
**Inputs:** the room's watch notes on the Remotion 9:16 ship, the quarantined take 02, the quarantined still 03 and the clean stills 05/02, plus the product locks. I did not watch the pixels myself. Every visual claim below comes from those notes.

---

## 0. Call

**B-roll: yes.** It is a separate **~38 s 9:16 clip**. It is **never intercut into the 27 s Remotion cut**, which stays the only ship face and stays untouched.

**Why, based on the watch notes:**
- **Remotion already lands the whole story with a cold lawyer.** That covers the hook, the four capabilities and the review gate, with no chat UI and no debug strings. So the B-roll has one job only: **show that it's real software doing the same thing**. Remotion can't do that, because it is code-drawn.
- **The quarantined OpenBot take failed for reasons we can fix. The product was not the problem.** The failures were:
  - wiring and Settings were on screen;
  - the agent was named "Chief", and the seeded "Friday launch review" routine was showing;
  - the step chips were red ("failed");
  - a mock miss posed as copy;
  - someone typed the code word "gazette watch".

  Each of these has a pre-roll gate in §5. None of them is a reason to drop the asset.
- **Why 9:16 suits the story:** the viewer reads it as Meera's phone while she is away from her desk, which echoes the Remotion Cap04 lock screen ("Texts you when done").
- **Kill switch:** if two complete takes die after fixes (§5), stop. This call flips to **skip B-roll, Remotion only**, and one line goes in STATUS.

**Cold-lawyer success test (one muted watch):**
> "Mike read the new rules overnight without being asked, connected them to clause 7.3 and the matrix, pinged Meera, and nothing went to the client until she says yes."

---

## 1. Beat list (9:16, ~38 s)

All times below are post lower-thirds in the Remotion look (#060608, gold #E6B04B, Inter, one caption at a time). In-app timestamps show the capture-time clock, so they are always hidden. Captions are reused **verbatim from the Remotion cut**, with no new tagline.

| t (s) | Beat | On screen | Hidden / cropped |
|---|---|---|---|
| 0.0–3.5 | **B1 You leave** | A clean Mike thread at 9:16. The header reads **Mike** with no title. The composer is empty and the frame is dimmed. Post chip: `9:48 PM · You leave the office`. Caption: `Works while you're away.` | Sidebar (agent list), window title bar ("OpenBot Local Dev Host"), model picker (`mockllm-…`), in-app timestamps, user avatar/name if it isn't "Meera" |
| 3.5–6.0 | **B2 Mike starts on its own** | Post chip: `10:09 PM`. The product header `Invoked routine · Indus Air · overnight rules check` lands. **There is no human bubble.** Caption: `Reads the docs unprompted.` | Routine prompt body (bubble, expander or hover). Never hover the header. |
| 6.0–11.0 | **B3 Reads the sources** | The sources pill lands 4 reads one at a time: Gazette G-1187 · DGCA circulars · Falcon Gulf codeshare cl. 7.3 · Compliance matrix v3. The pill stays closed. Step chip shows a count only, with **0 failed**. | Pill contents and raw file previews. If any chip says "failed", the take is dead (§5), not cropped. |
| 11.0–20.0 | **B4 Speaks first, connects across the set** | M1 streams (§3). Post adds one gold underline that travels from `per route (r.7)` to `cl. 7.3` to `11 rows`. Caption: `Every page, recalled.` Hold on **`Review alert →`**. | Nothing taps `Review alert →`. No cursor in frame. |
| 20.0–26.0 | **B5 The gate, from her phone** | Meera types her line live (§2), sped up 2× in post, and sends. M2 streams. Caption (gold): `Nothing goes out` / `without your yes.` | In-app timestamps |
| 26.0–28.0 | **B6 Overnight** | Full-frame post card: `☾ 10:16 PM → ☀ 6:02 AM` | n/a |
| 28.0–34.5 | **B7 Morning number** | Meera types her line (§2), sped up 2×. M3 streams. It ends on `Nothing's gone out.` | In-app timestamps |
| 34.5–38.0 | **B8 Close** | 1 s hold on `Nothing's gone out.`, then the end card in the Remotion look: `Mike.` / gold rule / `You review. Then you decide.` (gold) / tiny `Fictional matter, parties and data.` | No Harvey, no product or vendor names, no "sent" state |

**Fallback, only if the routine prompt body renders anywhere or the run opens in a separate thread:** B1 shows Meera's standing-instruction bubble at 9:48 (§2, fallback line), and the post chip `10:09 PM` covers the jump into Mike's reply. In the fallback, **drop the B2 caption** `Reads the docs unprompted.` because she asked. Keep `Works while you're away.` Kabir never types, in any path.

---

## 2. On-screen user lines (verbatim). `[[ ]]` marks the match key; brackets never appear on screen

| Beat | On-screen line | Match key(s) |
|---|---|---|
| B1 | none (post chip only) | n/a |
| B2 | **none — hidden trigger.** Routine `Indus Air · overnight rules check`. The prompt is never rendered: *"Overnight, check the Gazette for the final airfare rules and [[flag anything that changes the Indus matter]]."* | `flag anything that changes the indus matter` |
| B3 / B4 | none | n/a |
| B5 | Meera: **"Good catch on 7.3. [[Hold the alert]], I'll [[read it tonight]]."** | `hold the alert` (primary) · `read it tonight` (backup, same reply) |
| B6 | none | n/a |
| B7 | Meera: **"Morning. [[Where did we land]] [[overnight?]]"** (backup key spans the boundary: "land overnight") | `where did we land` (primary) · `land overnight` (backup, same reply) |
| B8 | none | n/a |
| B1 fallback only | Meera: **"Heading out. If the final rules drop tonight, [[flag anything that changes the Indus matter]]."** | same m1 key, so no separate entry is needed |

**Rules:**
- Every key is a multi-word fragment inside a full sentence a partner would type. **No key is ever typed alone.**
- Retired and never typed: `gazette watch`, `logging off`, `send it to me`, `saw the matrix`, `11 rows`, `morning check`, `don't wake kabir`.

---

## 3. Mike replies (verbatim)

**M1 (after the 4 staged reads, B4)**
> Meera, the final airfare rules are out (Gazette G-1187). Three changes from the draft:
>
> • Seat selection is now an ancillary fee (r.4).
> • The 30-day filing clock starts tonight (r.6).
> • Fare ceilings are per route (r.7). Falcon Gulf **cl. 7.3** still assumes one network-wide ceiling. It breaks on DEL–AUH.
>
> Matrix v3 updated (11 rows), 7.3 redlined for Arjun, client alert drafted. Nothing has gone to Indus.
>
> **Review alert →**

**M2 (B5)**
> Holding it. It's on your desk only: alert, 7.3 redline, the 11 matrix rows.
>
> Nothing goes to Indus or their GC until you say yes. I won't ping Kabir before 6.

**M3 (B7)**
> Overnight: 212 routes checked, 0 filings against Indus. One rival tariff hit the portal at 3:02 AM. It doesn't touch us.
>
> Kabir's matrix: 11 rows changed, 2 stale references fixed (used v3, not v2).
>
> The alert is still with you. Nothing's gone out.

**M1-plain (used only if tool chips can't reach 0 failed; there is no sources pill, so B3 folds into B4)**
> Read overnight: Gazette G-1187 · DGCA circulars · Falcon Gulf codeshare · Kabir's matrix v3.
>
> *(then the M1 body above, unchanged from "Meera, the final airfare rules are out…")*

**Gate check:** there is no "Done.", no "sent", no "filed" and no "approved" anywhere. Mike never says anything has left Meera's desk. The decision is still pending at the end, the same as Remotion Cap04.

---

## 4. mockllm YAML sketch: `/workspace/mike-harvey-mode/refs/openbot/mike.responses.capture-v3.yml`

```yaml
# DRAFT — NOT MERGED — not served on :8765; dry-run on throwaway :8766 only; merge only after YP ok.
# Mike OpenBot B-roll dialogue — capture-v3 (Opus, 26 Oct 2026). 9:16, Meera's desk only.
# `match` = case-insensitive substring of the last user message. Every key sits inside a
# natural lawyer sentence (or the hidden routine prompt) — never typed alone on camera.
# NO entry may match "gazette watch" — it must fall through to unknown_response.
#
# TOOL SCHEMA (blocking before camera): `read_file` + `path` below are placeholders carried
# from the approved v1 yml. Replace name AND argument keys with the file-read tool exactly as
# the OpenBot/OpenCode runtime advertises it in the `tools` array of requests.jsonl, and make
# sure the fixture paths are readable from the runtime's workspace (copy fixtures in if needed).
# Target: 0 failed step chips. If that can't be reached, use the M1-PLAIN swap at the bottom
# (no tool_calls, plain reply, no chips) — never show "failed" on camera.
# FICTIONAL: Indus Air / Falcon Gulf / Gazette G-1187 / Meera / Kabir / Arjun.

scripted:
  # --- B2, 10:09 PM: hidden routine "Indus Air · overnight rules check" (prompt never rendered) ---
  # Routine prompt: "Overnight, check the Gazette for the final airfare rules and flag anything
  # that changes the Indus matter."
  # Fallback bubble (B1, only if routine body renders): "Heading out. If the final rules drop
  # tonight, flag anything that changes the Indus matter."
  - id: m1
    match: "flag anything that changes the indus matter"
    staged: true
    think_ms: 1200
    round_think_ms: 650
    tool_calls:
      - name: read_file            # TODO: runtime's read tool name
        arguments: {path: "/workspace/mike-video/fixtures/sources/Gazette of India · notification G-1187.txt"}
      - name: read_file
        arguments: {path: "/workspace/mike-video/fixtures/sources/DGCA portal · circulars, none conflicting.txt"}
      - name: read_file
        arguments: {path: "/workspace/mike-video/fixtures/sources/Falcon Gulf codeshare · clause 7.3.md"}
      - name: read_file
        arguments: {path: "/workspace/mike-video/fixtures/sources/Compliance matrix · Kabir v3.csv"}
    after_think_ms: 700
    cps: 58
    chunk: [2, 4]
    after_tools: |
      Meera, the final airfare rules are out (Gazette G-1187). Three changes from the draft:

      • Seat selection is now an ancillary fee (r.4).
      • The 30-day filing clock starts tonight (r.6).
      • Fare ceilings are per route (r.7). Falcon Gulf **cl. 7.3** still assumes one network-wide ceiling. It breaks on DEL–AUH.

      Matrix v3 updated (11 rows), 7.3 redlined for Arjun, client alert drafted. Nothing has gone to Indus.

      **Review alert →**

  # --- B5, 10:14 PM. Meera: "Good catch on 7.3. Hold the alert, I'll read it tonight." ---
  - id: m2
    match: "hold the alert"
    think_ms: 850
    cps: 40
    chunk: [1, 2]
    reply: |
      Holding it. It's on your desk only: alert, 7.3 redline, the 11 matrix rows.

      Nothing goes to Indus or their GC until you say yes. I won't ping Kabir before 6.
  - id: m2b                        # backup substring of the same line
    match: "read it tonight"
    think_ms: 850
    cps: 40
    chunk: [1, 2]
    reply: |
      Holding it. It's on your desk only: alert, 7.3 redline, the 11 matrix rows.

      Nothing goes to Indus or their GC until you say yes. I won't ping Kabir before 6.

  # --- B7, 6:02 AM. Meera: "Morning. Where did we land overnight?" ---
  - id: m3
    match: "where did we land"
    think_ms: 900
    cps: 52
    chunk: [2, 4]
    reply: |
      Overnight: 212 routes checked, 0 filings against Indus. One rival tariff hit the portal at 3:02 AM. It doesn't touch us.

      Kabir's matrix: 11 rows changed, 2 stale references fixed (used v3, not v2).

      The alert is still with you. Nothing's gone out.
  - id: m3b                        # backup substring of the same line
    match: "land overnight"
    think_ms: 900
    cps: 52
    chunk: [2, 4]
    reply: |
      Overnight: 212 routes checked, 0 filings against Indus. One rival tariff hit the portal at 3:02 AM. It doesn't touch us.

      Kabir's matrix: 11 rows changed, 2 stale references fixed (used v3, not v2).

      The alert is still with you. Nothing's gone out.

  # --- M1-PLAIN swap (only if failed chips can't be eliminated): replace m1 above with this ---
  # - id: m1
  #   match: "flag anything that changes the indus matter"
  #   think_ms: 1600
  #   cps: 58
  #   chunk: [2, 4]
  #   reply: |
  #     Read overnight: Gazette G-1187 · DGCA circulars · Falcon Gulf codeshare · Kabir's matrix v3.
  #
  #     Meera, the final airfare rules are out (Gazette G-1187). Three changes from the draft:
  #
  #     • Seat selection is now an ancillary fee (r.4).
  #     • The 30-day filing clock starts tonight (r.6).
  #     • Fare ceilings are per route (r.7). Falcon Gulf **cl. 7.3** still assumes one network-wide ceiling. It breaks on DEL–AUH.
  #
  #     Matrix v3 updated (11 rows), 7.3 redlined for Arjun, client alert drafted. Nothing has gone to Indus.
  #
  #     **Review alert →**

responses: {}

defaults:
  unknown_response: "[MOCK MISS — cut take]"

settings:
  lag_enabled: true
  lag_factor: 7
```

**Key hygiene, checked against the sketch:**
- No key contains or is contained in `gazette watch`. The routine prompt says "check the Gazette", which doesn't match any key, and `gazette watch` matches nothing.
- No bare keys.
- The keys don't overlap each other.
- The m1 key changed from the 14:35 executor dry-run ("mark" became "flag"), so **every key must be re-dry-run**.

---

## 5. Motion shoot checklist

**Viewport**
- 9:16 mobile. Use an app window or browser viewport of **720×1280** (or 1080×1920 at 150%), with the chat column filling the frame.
- If OpenBot won't collapse the sidebar at that width, set the x11grab region to the chat column only. Agent list, title bar and model picker are **outside the capture region**.
- Body text must be readable on a phone at 100%. If a Mike reply wraps past about 14 lines, cut and raise zoom. Don't shrink the text.

**Seed state (off camera, before anything records)**
- Start from the clean-still state (`takes/05-mike-title-cleared.webp` / `takes/02-dev-seeded-home.png`): agent **Mike**, title **empty**.
- Delete the seeded chats **Launch room / Chief / Research / Builder / Launch** and the **Friday launch review** routine.
- Use a fresh thread with no scroll-back.
- Set the profile display name to **Meera**, or hide it. It must never show "OpenBot Local" or a real name.
- Create the routine **`Indus Air · overnight rules check`** on Mike using the hidden prompt from §2.
- Do provider wiring only off camera. Settings and Providers never appear in a take.

**Pre-roll dry-run on :8766 (off camera, every session)**
1. Confirm `:8765` serves the **YP-approved** `/workspace/mike-video/mock/mike.responses.yml`, not capture-v2. Restore it if not.
2. Start a throwaway mockllm on **:8766** with `refs/openbot/mike.responses.capture-v3.yml`. Point the existing custom provider's base URL at `:8766` off camera.
3. Read the `tools` array in the :8766 `requests.jsonl`. Set m1's tool name and argument keys to match, and confirm the fixture paths are readable.
4. Run B2 → B5 → B7 through OpenBot (routine fires, then type both Meera lines). For every request, `last_user` must hit the intended id. `grep -c "MOCK MISS"` must be **0**. Send `gazette watch` through mockllm with curl (never through the composer) and confirm it returns `[MOCK MISS — cut take]`.
5. Screen-grab the dry-run and check it:
   - 0 failed chips;
   - the routine body is not rendered anywhere;
   - Meera's lines land in the same thread as the routine run.
   - If the routine body renders or the run opens in a new thread, use the B1 fallback.
   - If chips still fail after the schema fix, use the M1-PLAIN swap.
6. Send YP the YAML diff. **No camera before YP's ok.** After the ok: merge into the live yml, restart `:8765` on the merged file, switch the provider back to `:8765`, repeat step 4 once, then roll.

**Fail conditions. Any one kills the take; cut, don't patch on camera**

| Fail on screen | Action |
|---|---|
| `[MOCK MISS — cut take]` visible | Cut. Check `requests.jsonl` `last_user` against the keys and fix the plumbing or typing. Don't change copy unless the copy is wrong. Full re-dry-run. |
| Any "failed" step chip | Cut. Fix the tool name/schema/paths. If it can't be fixed, use M1-PLAIN. Re-dry-run. |
| Settings, Providers, the model picker, `mockllm`, base URLs, `bun run check` or any debug string | Cut. Re-crop or reset the viewport. |
| "Chief" / "Chief of staff", any title text, seeded chats or "Friday launch review" | Cut. Redo the seed state. |
| Red `@` chips | Cut. Fresh thread, seed state again. |
| Visible match key or code word (a key typed alone, the routine body rendered) | Cut. Switch to the fallback or retype the full §2 line. |
| `gazette watch` typed anywhere | Cut and discard the file. Log it in STATUS. |
| Live model, or any reply not word-for-word as in §3 | Cut. Stop the session and check the provider points only at the mock port. |
| Real names, real clients or real timestamps | Cut. Rename or hide them. |
| Anything reads as sent, filed or approved without Meera's yes, or anyone taps `Review alert →` | Cut. |
| Harvey anywhere (on screen, captions, file names inside the frame) | Cut. |

**On any fail:** stop recording, fix it off camera, and re-run the full dry-run before the next take. Don't continue the take, don't edit text in place, and don't send "one more message" to recover. **After two dead takes post-fix, skip the B-roll and ship Remotion only.**

**Post:**
- Typing sped up 2×.
- Lower-thirds and captions only from §1, verbatim Remotion copy.
- One gold underline in B4.
- End card as in B8.
- The B-roll gets its own export. **It is never placed into the 27 s timeline.**

=====NEXT-CAMERA=====
# NEXT-CAMERA: Mike OpenBot B-roll (9:16, ~38 s, separate from the 27 s Remotion cut)

1. Check that `:8765` serves `/workspace/mike-video/mock/mike.responses.yml` (the YP-approved file). Restore it if capture-v2 is still live.
2. Start a throwaway mockllm on `:8766` with `refs/openbot/mike.responses.capture-v3.yml`.
3. Off camera, point the custom provider at `:8766`. Settings never record.
4. Seed state: agent Mike, empty title, display name Meera or hidden. Delete the Launch room / Chief / Research / Builder / Launch chats and the "Friday launch review" routine. Fresh thread.
5. Create the routine `Indus Air · overnight rules check` with the hidden prompt in DIALOGUE-PLAN §2.
6. Read the `tools` array in the `requests.jsonl` from `:8766`. Set m1's tool name and arguments to match, and make sure the fixture paths are readable.
7. Dry-run: fire the routine, then type "Good catch on 7.3. Hold the alert, I'll read it tonight." and "Morning. Where did we land overnight?"
8. Pass means every request hits m1/m2/m3, `grep -c "MOCK MISS"` = 0, 0 failed chips, and the routine body isn't rendered anywhere.
9. Use curl to send `gazette watch` to `:8766` (never through the composer). It must return `[MOCK MISS — cut take]`.
10. If chips still fail, switch to M1-PLAIN. If the routine body renders, use the B1 fallback line. Then re-dry-run.
11. Send YP the YAML diff and wait for the ok. No camera before it.
12. After the ok: merge into the live yml, restart `:8765`, switch the provider back to `:8765`, and repeat step 7 once.
13. Set the viewport to 9:16 (720×1280). The capture region holds the chat column only: no sidebar, title bar, model picker or timestamps.
14. Roll B2 to B7 in one continuous take. Type at human speed, never hover the routine header, never tap `Review alert →`.
15. Cold-read every frame against the fail table in DIALOGUE-PLAN §5. Any hit: cut, fix off camera, re-dry-run.
16. If two takes die after fixes, stop. The call becomes Remotion only; log one line in STATUS.
17. Post: chips, captions and end card exactly as in §1. Export as its own 9:16 file under `refs/openbot/takes/`.
18. Write one STATUS line with the take path and the cold-read result. Not intercut into the 27 s cut.
