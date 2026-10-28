# CONVO-AUDIT: 7HL Promo / Mike OpenBot capture

**Opus · 26 Oct 2026 · ~14:30 Asia/Saigon** · Builds on `refs/openbot/AUDIT-7hl-promo.md` and does not repeat its event log. Inputs: the files listed in AUDIT-BRIEF, the Oct 24 `mike-video/mock/requests.jsonl`, still `takes/03-mockllm-dialogue.png`, and the live mockllm state on `:8765`.

> **Bottom line.** "Gazette watch" is the symptom. The cause is that the room treated a plumbing failure (`logging off` failed inside OpenBot Local) as a copy problem. It then fixed the copy problem by typing a debug key on camera. The tainted still shows three more problems: an unrelated seeded routine header, a mock-miss line (`On it — say which matter.`) and red `failed` chips, all under an agent named "Chief". None of it is a good take with one bad line. The whole take is rejected. Re-shoot it from a clean profile, with a hidden trigger, on Meera's desk, after a dry-run and a cold read.

---

## 1. Verdict on "gazette watch" and every other visible string

**"gazette watch": rejected on screen, with no exceptions.** No lawyer types that to a colleague, human or AI. On screen it reads as the human prompting Mike, which breaks beat 3 ("speaks first, unprompted"). It also breaks YP's written rule in the live yml header ("every message on screen is natural; no visible triggers").

**Where I disagree with the prior audit:** the key itself was not the crime. On Oct 24 (22:04–22:09), `gazette watch` was first used as the `last_user` text of a **routine-style delivery** (system + user roles, never rendered). The m1b comment in capture-v2 says the same thing ("masked routine delivery"). It was designed to be hidden. The failure came later: an operator typed a hidden payload into the composer, two reviewers passed it, and `STATUS.md` then wrote it down as one of the "lines that landed on screen". Writing it there turned the mistake into procedure. The fix has to cover what happens at the composer and the review step, not just the vocabulary.

Every string that was matchable or visible, in capture-v2 and in the takes:

| String (source) | As typed on camera | Verdict | Why |
|---|---|---|---|
| `gazette watch` (m1b) | bare | **REJECT** | Code word. Kills "speaks first." |
| `logging off` (m1) | bare, in the Oct 26 take | **KEEP the key, fix the plumbing** | The Oct 24 natural line "Logging off. Matrix v3 is the latest." matched m1 cleanly: 4 staged reads and after_tools. The Oct 26 failure was an integration problem, so the line should not have been swapped. |
| `send it to me` (m2) | bare imperative | **REJECT as a bubble.** The substring is fine inside a sentence. | Typed alone, it reads as a command key. It is also wrong once the chat is Meera's desk (§2), because the alert is already on her desk. |
| `don't wake kabir` (m2b) | not shot | **Retire** | It works inside "Send it to me. Don't wake Kabir until 6." (proven Oct 24), but the reply opens with "Locked.", which is room jargon in Mike's mouth. |
| `saw the matrix` (m3) | bare | **REJECT as a bubble** | Reads as a key. Even the full Oct 24 line ("Morning, saw the matrix. 11 rows?") gives away the answer. |
| `11 rows` (m3b) | not shot | **REJECT** | The human says the number Mike is supposed to report, which is the story backwards. |
| `morning check` (m3c) | not shot | **REJECT** | Command key. |
| `On it — say which matter.` (`unknown_response`) | **appeared on camera** in the "2 steps · 1 failed" bubble | **REJECT. This is a take-killer.** | A mock miss that looks like copy. Nobody noticed because it is plausible. |
| `Invoked routine · Friday launch review` (seeded demo profile) | on camera | **REJECT** | It names a routine from a different matter. A muted viewer reads it as Mike doing someone else's job. |
| `2 steps · 1 failed`, `8 steps · 4 failed` (OpenCode step chips) | on camera | **REJECT** | Red failures above the "Mike did the work overnight" message contradict the message itself. |
| `Chief`, `Chief of staff` | on camera in 03 | **REJECT** | Beat 5 is "It's called Mike." The rename came after the take, so the order of operations was wrong. |

Copy notes on the capture-v2 reply text. These are not match keys, but they are on camera:

- "Three things that actually move the needle" is consultant-speak. Cut it.
- "your draft still treated it as base fare" and "not 'when we feel ready'" have Mike sniping at the partner who approves the alert. Dry is fine. Condescending is not.
- "Indus GC stays dark" and "Kabir stays dark till 6" are room slang. Write "Nothing has gone to Indus" and "I won't ping Kabir before 6."
- "v2 was lying" is cute, and a lawyer hears it as unreliable. Write "v2 was out of date."
- "While Kabir was offline" is fine as story. On camera it is wrong, because it is posted as a reply in the thread where Kabir is the one signing off (see §2).

## 2. What should appear on camera instead

**Decision: this chat is Meera's desk.** Meera is the partner, the alert needs her yes, and OpenBot shows every human bubble with the same chrome. Two typists in one single-user app reads as one confused person. Consequences:

- Mike addresses **only Meera**. Kabir is always third person ("Kabir signed off at 9:48").
- **Every visible human bubble is Meera's**, with one exception: Kabir's sign-off in the fallback path, which gets a mandatory post lower-third, `Kabir · 9:48 PM`.

**The speaks-first beat has no human line.**

- **Primary: a hidden routine delivery.** Mike's own scheduled routine on the Indus matter fires at 10:09 PM. The only thing on screen is the product header `Invoked routine · Indus Air · overnight rules check`, which is product chrome and not a human line. The routine's prompt body is the match payload and is never rendered. It is still written as a sentence a partner would put in a standing instruction, so that if it ever leaks it still reads as lawyer speech.
- **Fallback, only if OpenBot renders the routine prompt body** (as a bubble, an expander, or hover text): use Kabir's proven sign-off, "Logging off. Matrix v3 is the latest.", with a lower-third. **Never a code word, under any circumstances.**

**Night gate: one natural line from Meera.**
"Good catch on 7.3. Hold the alert, I'll read it tonight."
Mike confirms that nothing goes to Indus or their GC until she says yes.

**Morning: Meera asks an open question, and Mike gives the number.**
"Morning. Where did we land overnight?"
Mike answers with 212 routes · 0 filings · 11 rows · 2 references fixed · alert still with you.

The test for every bubble: **would a partner type this to a sharp associate at 10 PM?** If not, it does not roll.

## 3. Failures against YP's rule ("natural messages, no visible triggers") across the capture plan

1. **CAPTURE-PLAN never wrote the human lines.** Beats 1, 4 and 6 say "Kabir signs off", "Meera … types approval" and "Kabir or Meera asks", with no copy. That left the operator to write the dialogue live, from the match keys. A capture plan for a dialogue take has to include the exact bubble text.
2. **CAPTURE-PLAN never decided whose desk the chat is.** That produced the "Meera —" reply to Kabir's sign-off.
3. **The plan's YAML line was ambiguous:** "proposed YAML below (or merge … after YP ok)". The first half let people run the draft. It should have said: draft runs on a side port for dry-runs only.
4. **The capture-v2 key design drifted toward command keys** (`11 rows`, `morning check`, the bare `send it to me` / `saw the matrix`). Several are keys that only work if the human types something unnatural.
5. **Plausible miss fallback.** `unknown_response: "On it — say which matter."` looks like copy, so a miss reached camera without anyone seeing it as a miss.
6. **The dry-run gate was skipped or ignored.** The plan says "Dry-run `requests.jsonl` before ffmpeg". If anyone had read the 14:01–14:06 requests, they would have seen the `logging off` miss and diagnosed it, instead of swapping the line.
7. **`STATUS.md` recorded the keys as dialogue** ("Dialogue take lines that landed on screen: `gazette watch` …"), and described the failed tool steps as "Soft". Both are hard fails against the rule and the story.
8. **Profile hygiene was skipped before rolling:** the seeded "Friday launch review" routine, the "Chief" name and the "Chief of staff" title were all on camera.
9. **An unapproved file is still live.** mockllm on `:8765` has been serving capture-v2 since 14:01 (`refs/openbot/mockllm-capture-v2.log`), not the YP-approved `mike-video/mock/mike.responses.yml`. Every OpenBot request right now runs on a draft. **Restore `:8765` to the approved yml now.** Run any draft on `:8766`.

## 4. Match-key rewrite and re-take beat list

**Key rewrite.** Full YAML is in `opus/RETAKE-DIALOGUE.md`. It is a draft, unmerged, and needs YP's ok.

| Old id / key | New id / key | On-screen line that contains it |
|---|---|---|
| m1b `gazette watch` | **m1** `mark anything that changes the indus matter` | *None.* This is the hidden routine prompt: "Overnight, check the Gazette for the final airfare rules and mark anything that changes the Indus matter." |
| m1 `logging off` | **m1f** `logging off` (fallback only) | Kabir: "Logging off. Matrix v3 is the latest." (proven Oct 24) + lower-third |
| m2 `send it to me` / m2b `don't wake kabir` | **m2** `hold the alert`, with backup **m2b** `read it tonight` (same reply) | Meera: "Good catch on 7.3. Hold the alert, I'll read it tonight." |
| m3 `saw the matrix` / m3b `11 rows` / m3c `morning check` | **m3** `where did we land`, with backup **m3b** `land overnight` (same reply) | Meera: "Morning. Where did we land overnight?" |
| `unknown_response: "On it — say which matter."` | `unknown_response: "[MOCK MISS — cut take]"` | Must never appear. It is loud on purpose so the dry-run catches it. |

Backup keys are just a second substring of the same natural line. They give robustness without adding anything visible.

**Fix the plumbing before re-shooting.** The tainted still shows the `logging off` request falling through to `unknown_response` after a failed step. The likely cause, which is not yet verified, is that the OpenCode runtime's tool round changes what mockllm sees as the last user message, or rejects the `read_file` name/schema. Before the re-take:

- Read the 14:01–14:06 requests in the capture-v2 log.
- Find the file-read tool the runtime actually advertises in its `tools` array, and use that tool name and argument schema in `tool_calls`.
- Make sure the fixture paths can be read from the runtime's workspace.
- Target: **0 failed chips.**

**Re-take beats (on screen):**

1. Post card, 9:48 PM: *Kabir signs off.* The chat is Mike (no title) on a clean thread.
2. 10:09 PM: routine header `Indus Air · overnight rules check`, with no human bubble.
3. The sources pill lands 4 reads (Gazette G-1187 · DGCA · Falcon Gulf cl. 7.3 · matrix v3), all clean.
4. Mike speaks first to Meera: 3 changes, cl. 7.3 vs the per-route ceiling, "Nothing has gone to Indus.", **Review alert →**
5. Meera: "Good catch on 7.3. Hold the alert, I'll read it tonight." Mike: holding, nothing to Indus until her yes.
6. Post card: *8 hours later* (10:16 PM → 6:02 AM).
7. Meera: "Morning. Where did we land overnight?" Mike: 212 routes · 0 filings · 11 rows · alert still with you.
8. Hold on "Nothing's gone out." + fictional disclaimer.

## 5. Remotion A-roll: what to keep, and what OpenBot B-roll must fix before any Canva fold

**Keep the A-roll as the only ship face. Do not touch it.**

- `out/mike-harvey-mode-{16x9,9x16}.mp4`: 27.000 s, 810 frames, the 62% freeze hook, the beat-04 review gate ("Nothing sent yet" / "Nothing goes out until you say yes."), and the end card with **"You be the spectator."** plus "You review. Then you decide." Zero Harvey.
- The `T` timeline and `mix27n.wav` are locked. There is no room in 27 s to intercut anything without breaking the ping and chime sync.

**My judgement: do not intercut OpenBot into the 27 s cut.** The A-roll's matter is a notice draft with the p. 388 45-day flag. The B-roll's matter is G-1187 and cl. 7.3. A muted viewer who sees two matters in 30 s retains neither. The B-roll is a **separate 35–40 s "see it work" asset**, 16:9 only. A desktop chat cropped to 9:16 is unreadable at 125% zoom unless it is reframed in post. It goes through the site-upload path. The Canva connector takes stills only, and the MP4 rejection has been rediscovered three times already, so write it in STATUS once.

**What the B-roll must fix before it goes anywhere near Canva:**

1. No visible match keys. Every bubble passes a cold read as Meera (or Kabir with a lower-third in the fallback).
2. Zero `failed` chips. Fix the tool name and schema, or crop the step chrome. Better still, fix it so the sources pill can be shown.
3. `unknown_response` never on camera, verified in `requests.jsonl` and not by eye.
4. Identity: agent **Mike**, empty title, no seeded routines or demo chats, a fresh thread with no scroll-back from the tainted session.
5. Voice consistency: Mike addresses only Meera, and says "until you say yes" to echo the A-roll gate line.
6. Driven by the **YP-approved** yml (v3 merged after his ok), served on `:8765`.
7. Quarantine `takes/02-dev-mockllm-ux.mp4` and `takes/03-mockllm-dialogue.png` → `takes/_rejected/`. Pull Canva `MAHZF1u6goE` once YP agrees.

## 6. Other creative and process mistakes in the room arc, worst first

1. **No cold-read gate on what was on camera.** Three agents watched a take with "gazette watch", "On it — say which matter.", red failed chips and "Chief", and called it right. *Fix:* before any take is reported, one agent reads every bubble and chip as a cold lawyer and lists each one in STATUS. Any fail kills the take. It is never filed as a "soft nit".
2. **A plumbing bug was diagnosed as a copy problem.** `logging off` had been proven natural and working on Oct 24. When it failed inside OpenBot, the room changed the line rather than reading the request log. *Fix:* a mock miss sends you to `requests.jsonl` first. Copy changes only when the copy is wrong.
3. **The approval gate was bypassed, and the draft is still live.** capture-v2 said "after YP ok". Grok Bot routed the take to it anyway, and `:8765` still serves it now. *Fix:* restore the approved yml on `:8765` today. Drafts run only on `:8766`.
4. **Miss behaviour that looks like copy.** A believable `unknown_response` hides failures. *Fix:* sentinel misses (`[MOCK MISS — cut take]`), and grep for the sentinel in every dry-run.
5. **The take was shot before the set was dressed.** The name, title and seeded routine were fixed after the dialogue take. *Fix:* profile hygiene is pre-roll item one.
6. **YP's tagline was deleted in `src` without YP.** The Product Marketer's 13:43 edit removed "You be the spectator." It was caught by SHIP.md and restored, but only by luck. *Fix:* any change to a YP-authored line goes to YP as a diff before it reaches `src`.
7. **The bland v1 "Done." was answered with a bypass instead of a proposal.** "Done." in the approved m2 really does clash with the gate story (SHIP.md bans "Done." in the A-roll). The right move was a one-line delta to YP, not running a whole unapproved file. *Fix:* propose small diffs against approved copy, and keep a reason line for each.
8. **Nobody decided whose desk the chat was.** That produced "Meera —" in reply to Kabir's sign-off. *Fix:* the capture plan names the desk owner and the exact text of every bubble.
9. **OTP thrash and dual ownership.** The AppImage OTP wall was fought before the source `bun run dev` path was tried, then ownership went MD → VS → MD, and Canva went VS → MD → VS. Every handoff cost a round. *Fix:* one owner per track, written in STATUS, with a 15-minute timebox on any wall before switching path.
10. **Rename theater.** Chief → Mike had to happen, and here I disagree with the prior audit: on camera it is beat 5. But it took 6+ messages, 2 stills and 3 Canva uploads. *Fix:* do it pre-roll, silently, and log one line.
11. **Ceremony noise:** "Locked" re-posted 8+ times, Canva ids announced one by one, soft nits narrated, "reply only if essential" ignored. *Fix:* STATUS is the only place for state. Room posts carry new information or nothing.
12. **Two fictional matters across A-roll and B-roll** with no decision about how they relate. *Fix:* §5. Separate assets, never intercut.
