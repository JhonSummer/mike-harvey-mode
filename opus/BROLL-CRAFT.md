<!-- BROLL-GRADE · take 06 · 2026-10-26 Asia/Saigon (UTC+7) · Opus via `claude -p --model opus` (prompt-broll-grade.txt, raw opus-raw-broll-grade.md, log run.log) -->
**Source:** `refs/openbot/takes/06-mike-openbot-broll-9x16.mp4` (= `06-openbot-broll-9x16.mp4`) · ffprobe: 37.99 s · 720×1280 h264 · no audio · 457,942 B.
**Frames read by Grok Bot (opus/broll-grade-frames/):** f01–f12 (12 even, montage.png) + first/last/full_2/10/20/34. Verified in pixels: letterboxed landscape window, grey "OpenBot" title bar, left edge clipped ("eera", "atrix", "EL-AUH"), "Today 4:03 PM" / 04:05 PM routine rows in every frame, M1 already complete at t=0, Meera's lines only in the composer (never a thread bubble — empty gaps instead), clipped "…ing up something useful… 5s" placeholder, I-beam cursor, ~16 s static tail, no captions/chips/end card.
**Producer note:** Opus's kill-switch fallback "2–3 s inserts inside the Remotion cut" conflicts with DIALOGUE-PLAN §0 ("never intercut"); YP to decide — default stays Remotion untouched.

# Grade: Take 06, OpenBot / Mike B-roll (9:16, 37.99 s)

## A. Call

**RE-ROLL**

Take 06 can't be kept: Meera never appears in the thread, so it fails the KEEP condition by definition. It can't be fixed in the edit either. M1 is already on screen at frame 0, B1 to B3 and B6 to B8 were never shot, the 4 PM timestamps are in every frame, and the source is too low-resolution to zoom into. As an asset, take 06 is a drop. Only take 07 decides whether this B-roll stays in the project.

## B. Story

**It doesn't tell a story.** A cold, muted viewer sees this:

- A dark desktop chat window shrunk into the middle of a phone screen, with black bars above and below.
- A wall of text they can't read, already finished when the clip opens.
- Something typed into a tiny box at the bottom that disappears.
- A second wall of text.
- About 16 s where nothing moves.

What they take away is "some chatbot app." They don't get "works while you're away," "reads the docs unprompted," "every page, recalled," or "nothing goes out without your yes."

Scored against DIALOGUE-PLAN, **0 of 8 beats land in a way a viewer can follow.**

- **Content exists but can't be read (3 beats):** B4 (M1), B5 (M2) and B7 (M3). The copy is good, but it's at 10–11 px, B5 and B7 are missing Meera's half, and M1 never streams.
- **Missing entirely (5 beats):** B1 (leave), B2 (routine fires), B3 (sources land), B6 (overnight card) and B8 (end card).
- **Works against the story:** "Today 4:03 PM" and "04:05 PM" are on screen the whole time. The pitch is "overnight," and the footage says "this afternoon."

There's no setup and no resolution, and the pacing is backwards: everything has already happened by the opening frame, and the last 42% of the runtime is a still screen. The ending has no end card and doesn't land.

## C. User dialogue

**What's wrong**
- Meera's two lines appear only in the composer at the bottom of the window, at about 10 px, for a moment. When she sends, the composer clears and **no user bubble ever renders.**
- The thread then shows an **empty gap** where her bubble should be. That suggests the bubble is being laid out but drawn invisibly: zero opacity, the same colour as the background, or pushed off the clipped left edge. It doesn't look like the message was never sent. Check the theme CSS and the user-role render path before rolling again.
- Without her lines this isn't a dialogue. It's Mike talking to himself. "Holding it" and "Overnight: 212 routes…" answer questions the viewer never sees asked, so the "you're in control" message disappears. Her line is what M2 is consent *to*.

**What's needed**
1. Two persistent, right-aligned user bubbles in the thread, labelled **Meera**, styled clearly differently from Mike's (different fill, same type size as Mike).
   - "Good catch on 7.3. Hold the alert, I'll read it tonight."
   - "Morning. Where did we land overnight?"
2. Typing shown at a readable pace: about 15 chars/s, sped up in post to no more than 2x. The bubble lands, then holds **≥ 1.5 s** before Mike starts streaming.
3. Each bubble stays on screen and in frame for **≥ 2.5 s** in total.
4. A pre-flight check before the real take: send one test message, take a screenshot, and confirm the bubble renders. Don't start recording until it does.

## D. Cleanliness

| Issue | Take 06 | Target for take 07 |
|---|---|---|
| **Body text size** | ~10–11 px at 720 wide (≈ 15–16 px at 1080) | **≥ 30 px line height at 1080×1920** (≥ 20 px at 720), so about **2x larger**. Test: you can read the M1 line on a real phone at 100% without pinching. |
| **Caption size** | none | **56–64 px at 1080**, semibold, inside the top safe zone (y ≈ 220–420 px). Nothing important in the bottom 300 px (platform UI covers it). |
| **Framing** | Landscape window letterboxed; ~12% top and ~13% bottom black bars; app area ~720×750 | **Full-bleed portrait, no bars.** Resize the OpenBot window to portrait 1080×1920 physical (540×960 logical at 2x DPR). Thread column only, sidebar hidden. |
| **Zoom** | none; static wide shot all the way through | Get most of the size **in the capture**: app zoom **175–200%**, plus cropping to the thread column (≈ 1.7x). **Don't upscale capture footage by more than 1.2x in post.** Use slow punch-ins on top of that: **1.0 → 1.2x** on the gold underline r.7 → cl. 7.3 (B4), **1.0 → 1.15x** on each Meera bubble (B5/B7), with eases of 0.5 s or longer. |
| **OS chrome** | Grey "OpenBot" title bar visible | Not visible: run kiosk/full-screen, or crop it out at capture. |
| **Clipped edges** | Left edge cut off: "eera, the final…", "atrix v3 updated", "EL-AUH", "ouch us" | **≥ 48 px safe margin on both sides at 1080.** The first letter of every line must be fully inside the frame. |
| **Timestamps** | "Today 4:03 PM", "Created routine … 04:03 PM", "Completed routine … 04:05 PM", "Invoked/Started 04:05 PM" | **Zero clock times inside the app.** Hide timestamp elements and the system-event rows with a CSS override, *and* set the machine clock to 21:48 as a backstop. The only times on screen are the post chips: 9:48 PM (B1) and 10:16 PM → 6:02 AM (B6). |
| **Status placeholder** | Cut-off "…ing up something useful… 5s" | Hide it. "5s" reads as a timer and the clipping looks like a bug. |
| **Cursor** | I-beam visible near composer in the back half | Cursor hidden in the recorder settings. No cursor in any frame. |
| **Dead air** | ~16 s static ending | No static hold over 2 s, except the end card (2.5 s). |
| **Look** | No captions, chips, cards or gold; doesn't match the Remotion cut | Same gold, type and card style as the Remotion cut, so the two pieces look like one campaign. |

## E. Re-roll brief for take 07

**Capture**
1. **Window:** OpenBot in kiosk/full-screen, portrait, 1080×1920 physical. Thread column only, sidebar off, no OS title bar. App zoom 175–200%, tuned so a body line measures ≥ 30 px at 1080.
2. **Recorder:** 1080×1920 at 60 fps, cursor hidden, OS notifications off, Do Not Disturb on.
3. **Clock and timestamps:** set the system clock to 21:48. Load the CSS override that hides message timestamps, "Today …" dividers, and the Created/Completed/Invoked/Started routine rows, plus the "…something useful… Ns" status line.
4. **Clean start:** frame 0 is an empty thread, or only earlier context. **M1 must not exist at frame 0.**
5. **Fire the routine live** so the routine header renders (B2) and the sources pill lands the 4 reads one at a time (B3): Gazette G-1187 → DGCA circulars → Falcon Gulf codeshare → Kabir's matrix v3.
6. **M1 streams live**, showing r.7 → cl. 7.3 → 11 rows. Make sure the gold underline (or a hook for it in post) lands on cl. 7.3.
7. **Meera, line 1:** scripted typing at about 15 chars/s → send → **the bubble renders in the thread** → hold 1.5 s → M2 streams.
8. **Meera, line 2:** same process → M3 streams, ending "Nothing's gone out."
9. **Pre-flight (required):** a 10-second test send before the real take. Screenshot it and confirm the user bubble is visible and in frame. If it isn't, fix the render path before rolling.

**Post (target 28 s)**

10. **Beat map:**

| Beat | Time | Content |
|---|---|---|
| B1 | 0–2.5 s | 9:48 PM chip + "Works while you're away." |
| B2 | 2.5–5 s | Routine fires + "Reads the docs unprompted." |
| B3 | 5–8 s | Sources pill, 4 reads |
| B4 | 8–13 s | M1 + gold underline punch-in + "Every page, recalled." |
| B5 | 13–18.5 s | Meera bubble + M2 + gold "Nothing goes out / without your yes." |
| B6 | 18.5–20 s | Card "10:16 PM → 6:02 AM" |
| B7 | 20–25.5 s | Meera bubble + M3 |
| B8 | 25.5–28 s | "Mike." / "You review. Then you decide." / "Fictional matter, parties and data." |

11. Typing may be sped up to 2x and streaming to 1.5x. Each finished message still has to be readable at hold.
12. Captions 56–64 px, gold accents and card style taken directly from the Remotion cut's tokens.

**Pass/fail gates (all must pass; one fail means take 07 fails)**
- [ ] G1: Both Meera bubbles visible in the thread, in frame, ≥ 2.5 s each.
- [ ] G2: Body text ≥ 30 px line height at 1080, and M1 is readable on a real phone at 100%.
- [ ] G3: No clipped glyphs on any edge; ≥ 48 px side margins.
- [ ] G4: An OCR pass for "AM"/"PM"/"\d:\d\d" on every frame finds only the two post chips.
- [ ] G5: No cursor in any frame.
- [ ] G6: Frame 0 contains no M1 text; M1, M2 and M3 are all seen streaming.
- [ ] G7: All 8 beats present, in order; no static hold over 2 s outside B8.
- [ ] G8: Duration ≤ 30 s; no letterbox bars; no OS title bar.
- [ ] G9: The disclaimer "Fictional matter, parties and data." is on the end card.

**Kill switch**
- If take 07 fails **G1 or G2**, there is **no take 08.** Drop the standalone B-roll and ship the 27 s Remotion cut alone.
- If G1 and G2 pass but other gates fail, use the real-app footage only as **2–3 s inserts** inside the Remotion cut (Meera bubble landing, M1 streaming, sources pill). Don't fix them in a second standalone cut.
- Time-box take 07 to one capture session. If the bubble bug isn't fixed in pre-flight within that window, trigger the kill switch.

## F. For YP

You're right to reject it. As it stands this is a screen recording, not a story. The text is too small to read on a phone, the conversation is already over when the clip starts, Meera's side of it never shows up, and the last 16 seconds are a frozen screen. It also shows "4:03 PM" the whole way through, which works against the "while you were asleep" idea we're selling. The words Mike says are actually good and a lawyer would trust them, but nobody can read them at this size. My honest view: the 27-second animated cut already tells the story better than any screen recording will. This footage is only worth having if it proves "this is a real app" with Meera visibly in the conversation. If take 07 doesn't manage that clearly, we should drop it and ship the animated cut on its own.
