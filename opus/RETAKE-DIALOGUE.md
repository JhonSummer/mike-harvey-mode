# RETAKE-DIALOGUE: Mike OpenBot capture v3

> **DRAFT. Not merged into the live mock.** Do not point `:8765` at this. Run it only on `:8766` for dry-runs. Merge into `/workspace/mike-video/mock/mike.responses.yml` **only after YP's ok**, then restart `:8765` on the merged file.

**Desk:** Meera's. Mike addresses only Meera. Kabir is third person, except for one labelled bubble in the fallback path.
**Trigger:** a hidden routine. No human types anything to make Mike speak first.

## Hidden trigger: how it stays off-screen

- Create a routine on the Mike agent named **`Indus Air · overnight rules check`**. Delete the seeded `Friday launch review` routine and all demo chats first.
- Routine prompt (never on screen; it is the m1 payload): *"Overnight, check the Gazette for the final airfare rules and mark anything that changes the Indus matter."* It is a full sentence a partner would write, so it still reads as lawyer speech if it ever leaks.
- On screen, the only result is the product header `Invoked routine · Indus Air · overnight rules check`, followed by Mike's reply. This matches how OpenBot rendered the seeded routine in still 03 (header only).
- **Check in the dry-run screen grab:** no user bubble, no expander and no hover text showing the prompt body. Also confirm Meera's later lines land in the same thread as the routine run.
- **If OpenBot renders the prompt body anywhere, or opens the run in a separate thread:** switch to the fallback, Kabir's proven sign-off "Logging off. Matrix v3 is the latest." (matched m1 cleanly on Oct 24), with a post lower-third `Kabir · 9:48 PM`. **Never type a code word.**

## Mock YAML (copy this to `refs/openbot/mike.responses.capture-v3.yml`)

```yaml
# Mike OpenBot capture dialogue — v3 DRAFT (Opus, 26 Oct 2026). NOT MERGED.
# Run on :8766 for dry-runs only. Merge into mike-video/mock/mike.responses.yml after YP ok.
# YP 10:07 PM: every message on screen is natural; no visible triggers.
# Desk = Meera. Every match is a substring of a natural line (or the hidden routine prompt).
# `match` = case-insensitive substring of the last user message.
# tool_calls: replace `read_file` + `path` with the file-read tool name/schema the
# OpenCode runtime advertises in requests.jsonl `tools` — target 0 failed chips.
# FICTIONAL: Indus Air / Falcon Gulf / Gazette G-1187 / Kabir / Meera / Arjun.

scripted:
  # --- 10:09 PM: hidden routine fires; Mike speaks first to Meera ---
  # Routine "Indus Air · overnight rules check" prompt (never rendered):
  # "Overnight, check the Gazette for the final airfare rules and mark anything that changes the Indus matter."
  - id: m1
    match: "mark anything that changes the indus matter"
    staged: true
    think_ms: 1200
    round_think_ms: 650
    tool_calls:
      - name: read_file
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

      • Seat selection now counts as an ancillary fee (r.4).
      • The 30-day filing clock starts tonight (r.6).
      • Fare ceilings are per route (r.7). Falcon Gulf **cl. 7.3** still assumes one network-wide ceiling. It breaks on DEL–AUH.

      Kabir signed off at 9:48, so I took it from there: matrix v3 updated (11 rows), 7.3 redlined for Arjun, client alert drafted.

      Nothing has gone to Indus.

      **Review alert →**

  # --- FALLBACK ONLY (routine prompt renders on screen): Kabir's proven sign-off ---
  # On-screen: "Logging off. Matrix v3 is the latest."  + post lower-third "Kabir · 9:48 PM"
  - id: m1f
    match: "logging off"
    staged: true
    think_ms: 1200
    round_think_ms: 650
    tool_calls:
      - name: read_file
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

      • Seat selection now counts as an ancillary fee (r.4).
      • The 30-day filing clock starts tonight (r.6).
      • Fare ceilings are per route (r.7). Falcon Gulf **cl. 7.3** still assumes one network-wide ceiling. It breaks on DEL–AUH.

      Kabir signed off at 9:48, so I took it from there: matrix v3 updated (11 rows), 7.3 redlined for Arjun, client alert drafted.

      Nothing has gone to Indus.

      **Review alert →**

  # --- 10:14 PM gate. Meera: "Good catch on 7.3. Hold the alert, I'll read it tonight." ---
  - id: m2
    match: "hold the alert"
    think_ms: 850
    cps: 40
    chunk: [1, 2]
    reply: |
      Holding it. It's on your desk only: alert, 7.3 redline, the 11 matrix rows.

      Nothing goes to Indus or their GC until you say yes. I won't ping Kabir before 6.
  - id: m2b                      # backup substring of the same line
    match: "read it tonight"
    think_ms: 850
    cps: 40
    chunk: [1, 2]
    reply: |
      Holding it. It's on your desk only: alert, 7.3 redline, the 11 matrix rows.

      Nothing goes to Indus or their GC until you say yes. I won't ping Kabir before 6.

  # --- 6:02 AM. Meera: "Morning. Where did we land overnight?" ---
  - id: m3
    match: "where did we land"
    think_ms: 900
    cps: 52
    chunk: [2, 4]
    reply: |
      Overnight: 212 routes checked, 0 filings against Indus. One rival tariff hit the portal at 3:02 AM. It doesn't touch us.

      Kabir's matrix: 11 rows changed, 2 stale references fixed (used v3, not v2).

      The alert is still with you. Nothing's gone out.
  - id: m3b                      # backup substring of the same line
    match: "land overnight"
    think_ms: 900
    cps: 52
    chunk: [2, 4]
    reply: |
      Overnight: 212 routes checked, 0 filings against Indus. One rival tariff hit the portal at 3:02 AM. It doesn't touch us.

      Kabir's matrix: 11 rows changed, 2 stale references fixed (used v3, not v2).

      The alert is still with you. Nothing's gone out.

responses: {}

defaults:
  unknown_response: "[MOCK MISS — cut take]"   # loud on purpose; must never reach camera

settings:
  lag_enabled: true
  lag_factor: 7
```

## On-screen beats (re-take)

1. Post card, 9:48 PM: *Kabir signs off.* Clean thread, agent **Mike**, no title.
2. 10:09 PM: header `Invoked routine · Indus Air · overnight rules check`, with no human bubble. *(Fallback: Kabir's "Logging off. Matrix v3 is the latest." + lower-third.)*
3. The sources pill lands 4 reads one by one, with no failed chips.
4. Mike speaks first to Meera: 3 changes, cl. 7.3 vs the per-route ceiling, "Nothing has gone to Indus.", **Review alert →**
5. Meera: "Good catch on 7.3. Hold the alert, I'll read it tonight." Mike: desk only, nothing to Indus or their GC until she says yes.
6. Post card: *8 hours later* (10:16 PM → 6:02 AM).
7. Meera: "Morning. Where did we land overnight?" Mike: 212 routes · 0 filings · 11 rows · alert still with you.
8. Hold on "Nothing's gone out." + fictional disclaimer.

## Pre-roll checklist (every item, every take)

- [ ] `:8765` serves the **YP-approved** yml, not capture-v2. The v3 draft runs only on `:8766` until YP's ok.
- [ ] Profile: agent name **Mike**, empty title, model `mockllm-mike`. The seeded `Friday launch review` routine and all demo chats are deleted. Fresh thread, no scroll-back from the tainted take.
- [ ] Read the runtime's `tools` array in `requests.jsonl`. Set `tool_calls` to that exact file-read tool name and schema, and confirm the fixture paths are readable from the runtime.
- [ ] **Full dry-run** of beats 2–7. For every request in `requests.jsonl`, `last_user` hits the intended id. `grep -c "MOCK MISS"` = **0**.
- [ ] **`unknown_response` never appears on camera.** If it appears once, the take is dead. It is never a "soft nit".
- [ ] **No "failed" step chips visible.** If any survive the tool fix, crop the step chrome in the capture region or don't roll.
- [ ] Routine prompt body is not rendered anywhere (bubble, expander, hover). If it is, switch to the fallback.
- [ ] **Read every user bubble as a cold lawyer.** Would a partner type this at 10 PM? If not, stop.
- [ ] Nowhere on screen: `gazette watch`, `Chief`, `Chief of staff`, `Friday launch review`, `Done.`
- [ ] YP ok on this yml → merge → restart `:8765` on the merged file → roll.

---
_Executor dry-run, 26 Oct 2026 ~14:35 Asia/Saigon: the YAML above was served on a throwaway mockllm on `:8766` (stream=false, since killed). The routine prompt matched m1, "Logging off. Matrix v3 is the latest." matched m1f, "Good catch on 7.3. Hold the alert, I'll read it tonight." matched m2, "Morning. Where did we land overnight?" matched m3, and `gazette watch` fell through to `[MOCK MISS — cut take]`. This checks only that the match keys work. It does not test the OpenBot tool-step failures or how routines render._
