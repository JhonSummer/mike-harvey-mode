# Version B (Hank): VO cold-grade

I couldn't listen to the audio. Everything below comes from the measurements in `EVIDENCE.md`, the pick doc, the line lock, and the `post.py` / `mix37b.py` / `cues.json` parameters. Delivery, timbre and artifacts still need a human ear (section 5).

## 1. Voice identity: Hank, not Joshi. Confidence: very high (about 98%)
- **Generation records:** the API history shows 31 renders on Hank `6F5Zhi321D3Oq7v1oNT4` and none on Joshi `WkJc…`. The picks are byte-identical to the `vX_raw.wav` files, and all six `.model` files are `eleven_multilingual_v2`.
- **Speaker embedding:** every master and dry segment scores 0.66–0.86 against the Hank preview and about 0 against the Joshi preview. The two previews score 0.09 against each other, so the embedding does tell these two voices apart. The archived Joshi master scores the other way (0.27 Joshi / 0.11 Hank).
- **Pitch:** median 90–95 Hz, the same as the Hank preview (95 Hz). Joshi sits at 134–152 Hz. Line endings fall to 58–75 Hz, which is the falling trailer cadence the ask wants.
- **Accent:** the accent classifier labels every segment "us" (it's a weak signal, but it agrees with everything else).
- **Caveat:** the −1 semitone shift and compression in post lower the master scores a little (0.66 on 0–8 s). That's expected and doesn't affect the verdict.

## 2. VO grade vs the trailer-baritone ask: **B**
**Strengths:**
- It's the right voice, American, in the right register.
- The falling line endings suit a trailer read.
- Intelligibility on the master is good: Whisper transcribes v1, v2, v4 and v5 word for word (v4 mean word confidence 0.95, v5 0.90).
- The mix is clean: −15.1 LUFS, −2.1 dBTP, and the VO sits 10.7–19.8 dB over the bed.

**What costs it the A:**
- **v3 "Mike doesn't." (the line with the most weight):**
  - The pick (seed 11) is creaky and close to unvoiced (pyin voicing max 0.13, about 85 Hz).
  - On the master, Whisper hears **"Mike Dozen"**, meaning the final *t* is weak. The dry take reads correctly (p=0.76), so the bed or the chord hit at 6.12 s is probably masking it.
  - Vocal fry can sound like trailer gravel or like a swallowed word. Only an ear can decide, but the measurements lean toward swallowed.
- **v5 "Introducing Mike" (the second trailer moment):**
  - It's spoken in 0.76 s, which is about 6.6 syllables per second. The ask was "big and slow."
  - It gets 0.42 s of air afterwards (the target was about 0.5 s).
  - The pause after "during the day" is about 0.18 s instead of 0.4 s, so the build-and-release is flattened.
  - It's also the line with the least headroom over the bed: +10.7 dB overall, "overnight" +5.1, "Mike," +8.2.
- **Processing stack:** ElevenLabs speed 1.20, then a tempo stretch (×1.12 on v5, more than double the doc's 5% limit), on top of a −1 semitone pitch shift. That raises the risk of phasey, warbly artifacts.
- **v6 is unverified:** Whisper failed to decode it on the master window, even though the VO is 11–55 dB over the bed there. It's probably a decoder quirk, since the full-file pass reads it correctly, but it isn't confirmed.

## 3. Are the sped mid-lines (v4 at 1.26×, v5 at 1.34× effective) blocking? **No**
- **Intelligibility:** the actual rates are 213 wpm (v4) and 192 wpm (v5), well under the pick doc's own estimate of about 235 wpm, because Hank's natural pace is slow. Whisper transcription is verbatim at p ≥ 0.90 on the mixed master. "docks" for "docs" is a homophone and the context resolves it.
- **v4's trailer feel:** v4 is meant to "start conversational and build," and a fast read suits that. Every list pause survived (0.32–0.74 s).
- **v5's trailer feel:** this is the real cost. The speed takes the slow weight out of "Introducing Mike." That's a quality ding, not a blocker. The slot is fixed by locked picture and the 29.6 s ping, and the patch below recovers about 4% of the speed.

## 4. CALL: **PATCH** (small, audio-only, about 20 minutes). KEEP if the ear check in section 5 clears v3.
1. **v3 take swap (only if the ear confirms a weak "doesn't"):**
   - In `audio/vo_b/takes/hank/PICKS.txt`, change `v3_doesnt s11` to `s23` or `s37`. Choose whichever take has pyin voicing above 0.5 and reads "doesn't" in Whisper on the dry file.
   - If neither qualifies, re-render v3 with `stability` 0.45, as the pick doc specifies (via `audio/vo_b/gen.py`).
   - Then run `post.py`, then `make_ts.py`, which regenerates `src/voB.ts` so the 6.2 s text stays in sync.
2. **Bring v5 up over the bed:** in `audio/mix37b.py:76`, change `GAIN['v5_intro']` from `0` to `1.5`, matching what v3 already gets. Loudness normalization keeps the master at −15 LUFS. The aim is "overnight" at about +6.5 dB or more over the bed.
3. **Optional, only if the ear says v5 sounds rushed:**
   - In `audio/vo_b/post.py:4`, change `TEMPO['v5_intro']` from `1.12` to `1.08`.
   - In `audio/vo_b/cues.json`, change `v5_intro` from `20.80` to `20.70`.
   - Predicted result: speech runs about 20.86 to 29.30 s. That's 0.32 s after v4 ends and 0.32 s before the ping, but recheck the ping clearance after the change.
   - Then run `make_ts.py`, `mix37b.py`, and re-render both aspects.
4. **Re-verify after any of the above:** v5 ends before 29.6 s, v2 ends before the slam at 4.063 s, −15 LUFS / ≤ −1.5 dBTP, and the captions are still word-synced.

**Doc drift to correct (cosmetic):**
- `LINE-LOCK.md` says v2 has a 0.3 s break. The pick doc said 0.5 s, and history shows v2 at speed 1.05, not 1.00.
- v5 used one 0.2 s break instead of 0.3 + 0.4 s, which explains the clipped "during the day" pause.

## 5. What a human must ear-check before posting
Listen once on a phone speaker and once on earbuds. Audio is identical in both aspects, so one aspect is enough.
1. **v3 (6.13 s):** does "Mike doesn't." land low and final with an audible *t*, or does it sound like "Mike dozen"? Does the chord hit cover "Mike"? Does the fry sound like gravel or like a weak voice?
2. **v5 (about 21 s):** does "Introducing Mike" feel like a trailer moment or a rushed one? Can you hear "overnight" over the music? Does the "Harvey of the game" ending resolve downward?
3. **Artifacts, mostly v5 and v4:** warble, phasiness or smeared sibilants from the stretch combined with the pitch shift.
4. **v4 at 213 wpm:** can a first-time listener follow the coffee date → meeting → notice list, and does "it texts you" land?
5. **v6:** "You be the spectator" should be clear, with a falling final cadence and no upturn. This matters because Whisper couldn't decode it on the master.
6. **v2:** "close it?" shouldn't be clipped by the slam (only 23 ms of clearance).
7. **Character:** it should sound like a premium trailer voice, not parody, and not "that TikTok voice." The pick doc flags overexposure as Hank's risk; Jax Meridian is the fallback.
8. **Picture, not VO:** at 24.4–25.9 s two text blocks are on screen at once (the title and the VO caption). Confirm that still reads acceptably.
