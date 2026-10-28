# Gary Agents: VERSION C2 polish, "Sleep shot + Gary face" (9:16 only) · STATUS (2026-10-28 ~02:26 ICT) · not KEEP until Studio cold-checks

- **C2 trio-drop + sleep stretch (03:16 ICT, soft-drop ready, not KEEP):** Mark/Gary/Fiona UI demos (07–09) DROPPED; Meet chips hold f612–974 under n06–n09 with a per-line role spotlight, hard cut f975 into "Brief them once"; sleep stretched to 14.9 s (447 f; keys K1 1040 · K2 1073 · K3 1178 · K4 1313 · K5 1433 · K6 1463 · HARD 1487; hits M1135/G1266/F1389, thunk 1236, snore 1355→stamp) per opus/C2-SLEEP-STRETCH-EDIT.md §2–5 (Clashes pill, re-rank, snore→stamp, glide content gate, J-cut room tone, no whips into/around sleep). Master `out/gary-agents-version-c2-9x16.mp4` 1080×1920 30 fps **70.60 s / 2118 f**, −14.1 LUFS, −1.5 dBFS peak; VO line wavs md5-identical after `build_vo_c2.py` rerun. Proof `out/_c2-proof/{sleep-stretch-contact,meet-roles-join-contact}.png` + `sleep-stretch/f*.png`; prior master archived `out/_archive/gary-agents-c2-pretriodrop-20261028-0300/`. No ear listen.
This bake adds two YP updates to the C2 KEEP. The prior KEEP (master, src, mix, VO cues/wavs, proofs, STATUS, build script) is archived in `out/_archive/gary-agents-c2-keep-20261028/`. Its master md5 3ef6951f… matches the original.
- **Studio PATCH (02:37 ICT):** the end-card Gary avatar ring is now **blue** (`C.blue` #5B9BE6, the same blue as Gary digs), replacing gold. Only `src/GaryC2.tsx` L898 changed. The mix is untouched (md5 OK) and the master was re-rendered and re-muxed: 63.70 s, −14.0 LUFS. The ring samples at #5792D8 in `out/_c2-proof/last-frame.png` (zoom in `endcard-ring-zoom.png`).
- **Master:** `out/gary-agents-version-c2-9x16.mp4`. It is 1080×1920 at 30 fps, **63.70 s / 1911 f**, H.264 High with AAC 256k 48 kHz and +faststart. Rendered 2x, then lanczos-downscaled. Build: `./build-c2.sh` (log `out/build-c2.log`, exit 0). The stale `.m4v` sidecar was removed; the archive keeps a copy.
- **Loudness:** the master measures **−14.0 LUFS integrated, −1.7 dBFS peak, LRA 4.8**. The target moved from −15 to −14 because the sound brief specifies it.
- **Update A, sleep shot:** frames 10 and 11 (the async rows, the closed laptop and the "close your eyes" close-up) are replaced by `SleepShot` in `src/GaryC2.tsx`. It is built from `refs/version-c2/sleep/Mike_C2_SleepShot_keyframes.png` (2224×946). The motion-guide mp4 was ignored per correction. The screen is split: the associates are on top and Rohan's bed, seen from overhead, is below.
  - **Timing:** the shot opens on "Brief them once. Then close your eyes." (32.66 s). The **"eyes." onset at 34.675 s = K1** (local 0.0): the lids shut on the word, and the lamp clicks off at 35.23 s. The remaining keys are K2 35.98, K3 37.78, K4 39.57, K5 41.27 and K6 41.97. The **HARD cut to the 7:12 lock comes at 42.67 s**, at the top of the stretch. "By morning" starts at 42.95 s.
  - **VO:** "All at once, in the background." moved to *after* n11, over K2 (Mark expands), at 36.23–37.78 s. No line wavs were changed (md5 checked). The build script now has a `SLEEP` anchor (`audio/vo_c2/build_vo_c2.py`, which exports `SLEEP` to `src/voC2.ts`).
  - **Two rhythms:** Rohan **jumps** on every K, with a hard time-lapse plate change and a 2-frame dissolve. The light belongs to each plate: lamp gold → moonlight blue → deep blue/violet → violet → blue hour → sunrise with a sun shaft. His poses are back with hands on chest, side with arm over the blanket, other side with arm over his head, sprawled with mouth open and blanket kicked (the laugh beat), curled hugging a pillow, and the stretch with eyes open. His face is readable in every pose and never turned face-down. The cards **glide** over 9 frames (0.3 s, eased): the active associate expands, and the others shrink to 40 % chips in a tab row where the active tab is highlighted in its colour. K5 regroups into three "Done" rows, with Fiona's "🔒 held for Rohan · Not sent" in a gold border. K6 collapses everything into one chip, "All done — held for your review".
  - **Room details:** the phone on the nightstand pulses at its edge in the active associate's colour (gold, gold, blue, coral, green, gold). The time pill's clock runs continuously: 1:56 → 1:58 (eyes) → 2:31 → 4:10 → 5:40 → 6:30 → 7:08 → 7:12 on the cut. The pill reads "Rohan, lights out", then "Rohan's asleep", then "☀ Morning".
  - **Card content:** Mark expanded shows G-1187 p.4 with Rule 9(2) highlighted, the "✓ Gazette p.4 · Rule 9(2)" tag tick and "Clashes with cl. 7.3". Gary expanded shows the count ticking to 212 read, SC/Del HC/Bom HC/SC/DGCA rows with **citations blurred**, Bom HC marked "Overruled · excluded", and "6 that matter ✓". Fiona expanded shows 11 redlined, the DEL–AUH rows, the client note, the stamp "✓ Checked by Mark · 0 conflicts" and "Held for Rohan".
  - **Continuity fix:** frame 09's draft stamp now reads "Draft · overnight" instead of "2:04 AM", so it no longer contradicts the 5:40 drafting in the sleep shot.
- **Update B, Gary face:** `refs/version-c2/faces/gary-face.png` (1254², glasses, beard, suit) is cropped to `public/gary-face-av.png` (1000²). The `Avatar` component now renders Gary as that image in a circle on his colour disc, **everywhere**: the team reveal, the frame 08 header, the sleep chips, rows and expanded card, the TriAvatars, and the **end card on the gold disc**. The old generic dig SVG is gone.
- **Rename:** there are zero Mike/Garry strings on screen or in the VO. `rg` finds only comments naming the ref files, and a prompt-free Whisper pass (medium.en) on the mix found **MIKE-HITS 0** (`audio/vo_c2/qa_mix_c2.txt`). Board labels like "Mike on board" are rendered as Mark/Gary.
- **Sound (best-effort from the composer brief; mapped Mark D4 / Gary F#4 / Fiona A4):**
  - **No music from 0:00 to the black.** The music stem is exactly 0 before "you".
  - **The first felt-piano note lands on "you." (19.39 s).** It is an open D (no third), so it doesn't clash with the D-minor bed that follows.
  - **The sleep shot carries a synth lullaby:** a D-major pad and sparse half-time felt piano.
  - **The dopamine loop runs 3 times.** Each pass is a reversed-chime swell, then the note plus a tactile hit, then a soft air release. Mark gets D and the tag tick, Gary gets F# with the riffle and the overruled thunk, and Fiona gets A with the stamp thud and the lock click.
  - **Regroup:** at K5 the D+F#+A chord plays with a shimmer.
  - **The snore:** there is **one** warm snore at the sprawl, **cut dead by Fiona's stamp thud**.
  - **Rohan's jumps:** sheet rustles on every jump, a sigh at K3, a content hum and the first bird at K5, and a yawn into the cut.
  - **Morning:** the **phone buzz on the hard cut is the loudest non-VO sound since the freeze.** Music dips about 12 dB for the buzz, then returns.
  - **Board call:** faint birds outside, and a music swell under "Fast. And cited."
  - **End card:** the **D–F#–A sound-logo arpeggio plus chord on "yes."**, with the music giving way.
  - **The freeze hole** now holds only a faint ceiling fan, at −34 dB.
  - **Assets:** new SFX were made with ElevenLabs sound generation and live in `audio/c2s_assets/` (`gen_sleep_sfx.py`). The chimes, piano and pad are synthesized in `audio/mix_c2.py`.
- **Deferred (sound):**
  - Associate notes in frames 07–09 and the D/F#/A reveal pops. `c_assets/music2` is D minor/F, with F natural, so an F#4 over it would clash. The triad is first heard in the sleep shot, still before the logo.
  - A commissioned felt-piano score in D major. The associates, morning and end sections still use music2.
  - The hook clock tick that speeds 60→72→90, and pen scratches.
  - A tanpura drone.
- **Duration: 63.7 s (+5.0 s vs KEEP 58.7).** This is the 8 s sleep shot mandated by the sheet, plus the n11 pre-roll, replacing 5.2 s of frames 10–11. I chose natural breaths over squeezing it. Ways to trim if Studio wants it: drop the pre-roll by starting n11 under Fiona's tail (about −0.8 s), shorten the K-holds proportionally (it is currently exactly per sheet). Cutting "All at once, in the background." would not save time, because the shot runs on the fixed 8 s grid.
- **Proofs** (`out/_c2-proof/`):
  - `last-frame.png` (= `endcard-gary-only-last-frame.png`): the Gary face on the gold disc.
  - `sleep-contact-K1-K6.png` plus `sleep/K1..K6-*.png`.
  - `rename-check.txt`.
  - `trust-beats-contact.png`: black/"you", Fiona, the 7:12 hard cut, the flag, tap to source, and the board call.
  - `hardcut-pre-42.63.png` / `hardcut-42.67.png`.
  - Old KEEP stills moved to `_stale-keep/`.
- **Not done:** no ear listen (I can't play audio). In particular the ElevenLabs snore, hum and yawn takes were picked from envelope shape only. No KEEP claim.

---

# Gary Agents: VERSION C2 trust cut, "Close your eyes. It shows its work." · first bake (9:16 only) · STATUS (2026-10-28 ~01:20 ICT) · not KEEP until Studio cold-checks

New composition on top of Version C. None of the Version C KEEP files were touched: `src/MikeC.tsx`, `src/voC.ts`, `audio/vo_c/*`, `audio/mix_c.*` and `out/mike-version-c-9x16.mp4` all still carry their 2026-10-27 mtimes.
- **Master:** `out/gary-agents-version-c2-9x16.mp4`. It is 1080×1920 at 30 fps, **58.73 s / 1762 f**, H.264 High yuv420p with AAC 256k 48 kHz and +faststart. Rendered 2x, then lanczos-downscaled. Build: `./build-c2.sh` (`--timeout=180000`, log `out/build-c2.log`, exit 0).
- **Source:** `src/GaryC2.tsx` (composition `GaryAgentsVersionC2916`, registered in `src/Root.tsx`). `src/voC2.ts` is generated by `audio/vo_c2/build_vo_c2.py`, and the beat map `BC` is derived from those cues.
- **Brand lock:** the product is **Gary Agents**. The three associates are **Mark** (reads, gold, the old Mike avatar design), **Gary** (digs, blue, the old Garry design) and **Fiona** (drafts/redlines, coral). No other characters were added. The end card shows **Gary only**: the Gary design on a single gold disc, the "Gary Agents." wordmark and the tagline. The stamp reads "✓ Checked by Mark · matches cl. 7.3 · 0 conflicts".
- **Mike scan:** `rg -i mike src/GaryC2.tsx src/voC2.ts audio/vo_c2/cues.json` returns only code comments and no rendered strings. Whisper medium.en ran prompt-free on the full mix (`audio/vo_c2/qa_mix_c2.txt`) and found **0 "Mike"/"mic"/"Michael" words**. The only "associates" is in "Three associates, working for you."
- **VO:** Mariana `OB0Jj6v9DGLLgz8dD57i` (eleven_multilingual_v2) plus Priya (Ziina) and Rohan (Aaditya). New takes are in `audio/vo_c2/takes/` (3 seeds each, generator `gen_c2.py`). Every pick is Whisper-clean (`qa_best.txt`); the only miss is "cited" heard as "sighted", which is a homophone. The new lines and picks are n06 s37, n07 s11, n08 s37, n11 s11 (speed 1.0, stab 0.55), n12 s23, n13 s11, d2p2 s11 and n15 s23. n01–n05, d1*, n09, d2p and d2r reuse the C takes unchanged. n10 is the C take cut after "…in the background." (speech ends at 1.66 s in the source). There is no time-stretch.
- **Mix:** `audio/mix_c2.py` → `audio/mix_c2.wav`, near-dry (VO wet −24.5 dB). Music is c_assets/music2 (84 BPM), re-cut with 2-bar-aligned jumps: Night under 10–11, Morning blooms **on the hard cut**, and Resolve sits under the end card. **Master: −15.1 LUFS integrated, −2.0 dBFS true peak, LRA 2.7.**
- **Eyes → lock:** the "eyes." onset is at 36.83 s (f1105). The lids start closing at f1101 and are fully shut at f1107 (36.90 s). The lamp click lands at 37.40 s (f1122); music dies with it and the room drops to about −50 dBFS. The **hard cut to 7:12 comes at 37.70 s (f1131)** with no transition, the morning ping follows at 37.80 s, and "By morning" starts at 37.97. The n11 caption dies on the cut and does not tail over the lock.
- **Honest flag:** "Couldn't confirm: Rule 9 start date. Flagged for you." lands at 39.27 s, just before "Every line cited". It stays up until 43.50 s, which is **0.91 s after the VO ends**, under a slow 7 % push toward the flag.
- **Tap to source:** the tap lands on "Tap" (43.77 s). "Rule 9(2)" gets a gold box, a press and a hollow outline ripple *around* the word, with no filled dot, so the word is never covered. Then SOURCE 1 (Gazette p.4 · Rule 9(2), blurred quote) slides up, SOURCE 3 (Fare matrix v4 · rows 1–11) follows on "See", and the amber "Unconfirmed: Rule 9 start date" appears on "came". Proof: `out/_c2-proof/tap-rule92-zoom.png`.

| Frame | Picture in | Line: speech span (s) |
|---|---|---|
| 01–05 | as C (0.00 / 4.97 / 8.53 / 12.13 / 18.33) | as C; freeze 17.40, silence to 18.33 |
| 06 Meet Gary Agents | 20.40 | "Meet Gary Agents. Three associates, working for you." 20.56–23.85 |
| 07 Mark reads + source tag | 24.00 | "Mark reads the new rules the minute they drop." 24.15–26.62 |
| 08 Gary digs + judgment | 26.77 | "Gary digs through every court order that matters." 26.92–29.33 |
| 09 Fiona + Mark's check | 29.47 | "Fiona redlines your fares and drafts the client note." 29.63–32.36 |
| 10 All at once | 32.50 | "All at once, in the background." 32.66–34.22 |
| 11 Close your eyes (NEW) | 34.67 | "Brief them once. Then close your eyes." 34.82–37.42 · hard cut 37.70 |
| 12 Morning + honest flag | 37.70 (hard) | "By morning it's done. Every line cited, and nothing goes out without your yes." 37.97–42.59 · hold to 43.50 |
| 13 Tap to source (NEW) | 43.50 | "Tap any line. See where it came from." 43.64–45.83 |
| 14 Fast. And cited. | 46.13 | Priya "So, does it hit us?" 46.28–47.66 · Rohan "Eleven fares on DEL–AUH. Note's in your inbox." 47.88–50.58 · Priya "…Fast. And cited." 50.96–52.83 |
| 15 End card (Gary only) | 53.23 | "Gary Agents. Every answer cited. Nothing sent without your yes." 53.38–57.84 · hold to 58.73 |

- **Duration: 58.7 s, not 54 s.** That is +4.7 s over the board, kept as natural breaths per brief. Trims that would not touch the new trust beats: n05→n06 and the C-era gaps (about −0.8 s), end hold 0.9→0.5 (−0.4), the d2p2 s37 take ("Fast. And cited." with no hesitation, −0.4), and cutting "Gary Agents." from the end VO, leaving only the wordmark (about −1.0). Together that is about 56 s. Getting to 54 means atempo ≈×1.05 on the 01–03 narrator lines, which is the same breathless risk Studio flagged on B.
- **Judgment calls for Studio:** (1) End VO opens with "Gary Agents." as the brand sign-off, replacing C's "Mike and associates."; it is easy to drop. (2) The frame 10 pill reads "2:31 AM · Rohan, logging off" (the board says "Rohan's asleep") so that frame 11 can show him closing his eyes without breaking continuity. (3) Frame 12 has no "✓ Approved" tap any more, because approval now lives in frame 13 ("Approve & send"). (4) The end-card avatar is the blue-Gary character design on a gold disc, per "single gold avatar for the namesake product"; Mark keeps gold in the associate frames.
- **Proofs:** `out/_c2-proof/last-frame.png` (= `endcard-gary-only-last-frame.png`), `contact.png` (every 2 s), `key-moments.png` (eyes shut, lamp off, hard cut, flag hold, tap, end), and `at-*.png`. Stills in `qa/c2/`.
- **Not done:** no ear listen (I can't play audio). No KEEP claim.

---

# Mike: VERSION C, "Can I come back to you?" · first drop (9:16 only) · STATUS (2026-10-27 ~23:20 ICT) · not KEEP until Studio cold-checks

New composition. Versions A and B were not touched: `Mike.tsx`, `MikeB.tsx`, `voB.ts`, `build.sh`, `build-b.sh` and all `out/mike-version-b-*` / `mike-harvey-mode-*` masters are unchanged. Version B mid/v4 was not resumed.
- **Master:** `out/mike-version-c-9x16.mp4`. It is 1080×1920 at 30 fps, **50.97 s / 1529 f**, H.264 High yuv420p with AAC 256k 48 kHz and +faststart. Rendered 2x, then lanczos-downscaled. Build: `./build-c.sh` (`--timeout=180000`, log `out/build-c.log`).
- **Source:** `src/MikeC.tsx` (composition `MikeVersionC916`, registered in `src/Root.tsx`). `src/voC.ts` is generated. The beat map `BC` is derived from the VO cues, so the picture can't drift from the sound.
- **YP override applied:** frame 13 (the end card) shows **Mike only**: a single gold Mike avatar, "Mike & associates.", the tagline, and the VO lines. Garry and Fiona do not appear on the end card. Proof: `out/_c-proof/last-frame.png`, `out/_c-proof/endcard-48.5s.png`.
- **VO:** narrator **Mariana `OB0Jj6v9DGLLgz8dD57i`** on `eleven_multilingual_v2`, stability 0.45–0.60, style 0.20, speeds 1.12–1.18 on 01–03/06–11, 0.92 on "That doesn't have to be you.", 1.05 on the end line. There is **no post time-stretch**; every line keeps its natural breaths. Dialogue: **Priya** = Ziina `FaqthkZu1EWxXxUFbAfb` (Indian F) and **Rohan** = Aaditya Kapur `xMagNCpMgZ83QOEsHNre` (Indian M), both account voices. They get a light "on the call" EQ (HPF 160 / LPF 7.5k / +2 dB at 2.5k) to set them apart from the narrator. Generator `audio/vo_c/gen_c.py` uses the /with-timestamps endpoint, so word times come from the ElevenLabs alignment. Assembly is `audio/vo_c/build_vo.py` (picks, trims, the B post chain, cues.json, src/voC.ts). The spoken line is "Delhi–Abu Dhabi"; captions show **DEL–AUH**. "11:41" is spoken as "Eleven forty-one P.M."
- **Wording QA:** every pick was checked prompt-free with Whisper medium.en (`audio/vo_c/qa_best.txt`). A Whisper pass on the full mix reads every line in order. The only differences are spelling ones: "Gary", "fairs", "11".
- **Mix (`audio/mix_c.py` → `audio/mix_c.wav`):** near-dry. VO wet (ER + 0.35 s room) is −24.4 dB (0.36 % energy) vs dry, with no hall. Music is new ElevenLabs Music (`audio/c_assets/music2.wav`, 51 s). It is pulled −9 dB under the first call, **cut dead on the freeze**, and re-enters on "Mike doesn't work alone". Night room tone and typing run under 01–04. SFX come from b_assets: pings, buzz, whips, an EXPIRED stamp, a sub boom on the black, a chord hit on Mike, paper, checks, tap on "yes.", and the end chime. **Master: −15.0 LUFS integrated, −1.8 dBFS peak (−2.2 dBTP on the wav), LRA 2.6.**
- **Awkward-call beat:** after "At nine." (ends 17.34 s), the picture freezes at 17.40 s (desaturate, flash, slow push) with **true silence until 18.33 s**. Then comes a hard cut to black with a sub boom, and "That doesn't have to be you." at 18.59 s, with gold "you."

| Frame | Picture (beat in) | Line(s): speech span (s) |
|---|---|---|
| 01 Midnight ping | 0.00 | N "11:41 PM. New fare rules just dropped. Client wants answers by nine." 0.25–4.81 |
| 02 Upload limit | 4.97 | N "So you open your AI assistant. Upload… limit reached." 5.11–8.41 |
| 03 Session hopping | 8.53 | N "New chat. Re-upload. Another chat. Expired." 8.69–11.95 |
| 04 Awkward call | 12.13 | Priya 12.27–14.01 · Rohan "…Can I come back to you?" 14.51–15.46 · Priya "It's for the board. At nine." 15.74–17.34 · freeze 17.40 · silence to 18.33 |
| 05 Black | 18.33 | N "That doesn't have to be you." 18.59–20.16 |
| 06 Meet the team | 20.40 | N "Mike doesn't work alone. He brings associates." 20.56–23.36 |
| 07 Mike reads (gold) | 23.50 | N 23.66–25.57 |
| 08 Garry digs (blue, list blurred) | 25.73 | N 25.87–28.08 |
| 09 Fiona drafts (coral) | 28.23 | N 28.38–31.11 |
| 10 Async · he sleeps | 31.27 | N 31.41–35.35 |
| 11 Morning digest | 35.50 | N 35.65–38.65 (tap "Review note" → ✓ Approved on "yes.") |
| 12 Call, redone | 38.87 | Priya 39.03–40.41 · Rohan "Eleven fares on DEL–AUH. Note's in your inbox." 40.63–43.33 · Priya "…That was fast." 43.71–44.74 |
| 13 End card (Mike only) | 45.00 | N "Mike and associates. Let them do their thing. You review. Then you decide." 45.14–50.07 · hold to 50.97 |

- **Captions:** they sit about 3/4 down (top 1460, or 1428 with a speaker label) in karaoke style. Key words are gold, error words are red ("limit reached", "Expired"), Garry/digs are blue and Fiona/redlines/drafts are coral. Dialogue carries PRIYA (gold) or ROHAN (blue) labels. There are no captions during the freeze or black; the black frame *is* the type. 7HL watermark is bottom right, as in B.
- **Fiction / legal:** Indus Air, Falcon Gulf, Priya, Rohan, Gazette "G-1187". The rule is the "**Rule 9**" placeholder. Garry's court list is blurred, with only forum letters (SC/HC/TR) readable and no citations. No Etihad and no real names.
- **Duration: 50.97 s, not 46 s.** Mariana reads the board's lines in about 38 s of speech even at speed 1.12–1.18. Add the dialogue, the mandated 1 s freeze and natural breaths, and the cut runs about 5 s past the board. Rather than time-stretch the VO (which YP and Studio flagged as breathless on B v4), I kept the breaths. Ways to trim if Studio wants ~46 s: atempo ×1.06 on narrator lines (about −2 s), tighter gaps (about −1 s), or a shorter end hold.
- **Not done:** no ear listen (I can't play audio). Picks rest on Whisper wording checks, speech-span timing and mix-level metering. No KEEP claim.

---

# Mike: VERSION B · Studio EAR PATCH 3, v3/v4 (Mariana, near-dry) · STATUS (2026-10-27 ~01:05 ICT) · not KEEP

Studio's ear re-check of the 00:29 masters came back **PATCH**: the v3 t was still mushy and v4 still breathless. Picture is still KEEP; `MikeB.tsx` is untouched. Only the v3/v4 takes, `post.py`, `cues.json`, `words.json`/`src/voB.ts` (captions) and one duck-hold in `mix37b.py` changed. v1/v2/v5/v6 line wavs are bit-identical (md5 checked). Mariana `OB0Jj6v9DGLLgz8dD57i` is on every line; **Cate was not used**. The 00:29 state is archived in `out/_archive/mariana-patch-0029-20261027/` (masters, mix, mix37b.py, post.py, PICKS, cues, words, voB.ts, STATUS, LINE-LOCK, old v3/v4 line wavs).
- **v3 "Mike doesn't." (~0:06): why 00:29 failed.** The 00:29 pick `patch/v3_nonext_s3` released its t as about 50 ms of 4 kHz hiss with no clean stop before it. That reads as "doesn's", not a hard t. The burst metric scored it well only because the hiss was loud.
- **v3 new pick: `patch3/v3_st75brk_s71`.** Text `Mike doesn't. <break 0.6s/>`, stability 0.75, style 0, speed 0.90, previous_text only. It came from 24 new takes (`gen_patch3.py`: st75, st75brk, "Mike does not.") plus the 32 old ones. It was chosen for a real click release with a short burst and a voiced "ʌz" (LM-free phoneme CTC wav2vec2-espeak: `m aɪ k d ʌ z ə n t`).
- **v3 edit (`tsharp.py`, applied in post).** The nasal tail fades out, 40 ms of silence is added before the release (closure 43 → 81 ms), the 25 ms release gets +6 dB, and the aspiration fades out by +70 ms.
- **v3 result in the mix (release 6.92 s):** 2–10 kHz rise of 30.8 dB in 3 ms (00:29: 21.9). Closure floor −75 dBFS (00:29: −59). Aspiration 20 ms (00:29: 50 ms). The release sits 8 dB under the word's z/s peak; at 00:29 it was −3 dB, a hiss as loud as the "s".
- **v3 mute test.** Phoneme CTC on the mix: `m aɪ k d ʌ s ə n t` → with the release zeroed, `… ə n` (t gone). Whisper medium.en on the master: "doesn't" p 0.79 → "Dawson" 0.31 with the release muted (00:29: 0.97 → "Dawson" 0.86).
- **v3 evidence files:** `qa/v3t3/mix_t_compare.png`, `qa/v3t3/full.png`, `qa/v3t3/rank1.txt`, `rank_sharp.txt`.
- **v4 mid: new pick `patch3/v4_lb115_s23`.** Speed 1.15, stability 0.50, style 0.20, `<break>` 0.4/0.5/0.7/0.7/0.8 s. `post.py` now *sets* each clause pause to an exact length from its middle: own 500 · prompted 550 · coffee date 650 · high-stakes meeting 700 · notice 700 · done 300 ms.
- **v4 pauses on the posted line** (10 ms RMS < peak −35 dB; 00:29 in brackets): **460** (420) · **500** (440) · **630** (420) · **630** (410) · **680** (620) · 290 (500).
- **v4 mix duck-hold.** Music and café ambience used to swell back into each pause. They now hold the VO duck for 0.8 s inside the v4 span, so the full mix drops 6.8–16.4 dB in every gap. The coffee-date gap holds the picture-locked whip at 14.88 s.
- **v4 wording.** Prompt-free whisper, clause by clause on the master, reads every clause correctly ("learns on its own", "drafting a notice.").
- **Speed limit.** 1.12 does not fit. The 1.12 takes carry 9.8–11.3 s of speech, which with these pauses needs ≥13.2 s; locked picture leaves 12.9 s (v4 7.60 → 20.50 with v5 ending before the ping). 1.15 was kept.
- **Timing:** v1 0.36–1.77 · v2 2.30–4.02 (slam 4.067) · v3 6.17–6.97 (t 6.92) · **v4 7.60–20.50** (cue 7.90 → 7.54) · **v5 20.88–29.34** (cue 20.58 → 20.80, audio unchanged; ping 29.6, 0.26 s clear by word end, ~0.15 s by energy tail) · v6 33.64–36.27.
- **Side effects of the retime.** The v3 → v4 gap is now 0.63 s (was 1.05). The v4 caption band now appears ~7.48 s, under the "Mike doesn't." card for ~0.5 s. The v5 last caption still holds to ~29.9 s over the ping beat, as before.
- **Mix/masters:** `audio/mix37b.wav` −15.2 LUFS / −2.2 dBTP. Masters `out/mike-version-b-9x16.mp4` (1080×1920) and `out/mike-version-b-16x9.mp4` (1920×1080): 37.000 s / 1110 f, −15.2 LUFS, −2.2 dBFS peak. Build log `out/build-b-mariana-patch3.log` (`--timeout=180000`, exit 0). The final mux used the latest mix (corr 0.9998 vs `mix37b.wav`). Frames: `qa/v3t3/frames/contact.png`.
- **Not done:** nobody has listened by ear; I can't play audio. The picks rest on spectrograms, release shape, an LM-free phoneme model and pause/mix-drop numbers. No KEEP claim.

---

# Mike: VERSION B · Studio v3/v4 AUDIO PATCH (Mariana, near-dry) · STATUS (2026-10-27 ~00:35 ICT) · not KEEP

Studio cold-check returned PATCH on two audio softs. Picture is unchanged: MikeB.tsx beat map untouched; only `audio/vo_b/cues.json`, `src/voB.ts` (captions follow the words), post and mix inputs changed. Voice, near-dry `mix37b.py`, natural pitch (no Hank −1 st) and v1/v2/v5/v6 audio are kept (v1/v2/v5/v6 line wavs are bit-identical to the 23:47 build).
- **v3 "Mike doesn't." (~0:06):** re-picked from 32 takes (10 old + 16 `takes/mariana/patch/` + 6 new stability-0.60 `takes/mariana/patch2/`) on burst metric + spectrogram (`qa/v3t/spec_a.png`). Pick **`patch/v3_nonext_s3`**: stability 0.55, style 0.25, speed 0.92, previous_text only (phrase-final t). In the mix the t release at **6.880 s** is −11.7 dBFS in 3.5–10 kHz, **+49.5 dB over its closure gap** and −2.4 dB vs the line's own "s"; the rejected s37 was −25.3 dBFS, −17.9 dB vs its "s". Whisper small.en prompt-free on the mix window 6.0–7.4 s: "Mike doesn't." (p 0.93); with the burst muted, p drops to 0.61 (old s37: 0.93 → 0.89), so the t now carries the word.
- **v4 mid (~0:08–0:20):** re-rolled at speed **1.15** (was 1.20), stability 0.50, style 0.25, with `<break>` tags after each clause (0.15 s own/prompted, 0.2 s date/meeting, 0.4 s notice). Pick **`patch2/v4_b115_s37`** (whisper reads "notice." as a full stop, not uptalk). `post.py` trims four pauses from their middle (−80/−50/−80/−100 ms, 20 ms crossfades) to fit. Measured pauses on the posted line (10 ms RMS < peak −35 dB): after "own," 420 ms · "prompted," 440 · "date," 420 · "meeting," 410 · **"notice." → "And when it's done" 620** · "done," 500. Rejected s37: 330 · 220 · 300 · 180 · 500 · 430. Generator `audio/vo_b/gen_patch2.py`; QA `qa/vo_patch_measure.py`, `qa/vo_patch_check.py`.
- **Timing:** v1 0.36–1.77 · v2 2.30–4.02 (slam 4.067) · v3 6.15–6.93 · **v4 7.98–20.16** (cue 8.10 → 7.90) · **v5 20.66–29.12** (cue 20.20 → 20.58, audio unchanged; ping 29.6 still in the clear, 0.48 s) · v6 33.64–36.27. Limit: the locked picture leaves ~12.2 s for v4, so speed could not go below 1.15 without trimming pauses or pushing v5 into the ping.
- **Mix/masters:** `audio/mix37b.wav` −15.2 LUFS / −2.2 dBTP. Masters `out/mike-version-b-9x16.mp4`, `out/mike-version-b-16x9.mp4` (see the build log `out/build-b-mariana-patch2.log`). Pre-patch masters, mix, post, picks, cues, words, voB.ts, STATUS and LINE-LOCK are in `out/_archive/mariana-pre-v3v4patch-20261027/`.
- **Not done:** no ear listen; picks rest on Whisper, burst envelope and pause metrics. No KEEP claim.

---

# Mike: VERSION B · VO RECAST to FEMALE (Mariana), near-dry · STATUS (2026-10-26 ~23:55 ICT)

- **Voice:** ElevenLabs **Mariana** `OB0Jj6v9DGLLgz8dD57i`. It's the Shared Voice Library voice "Mariana - Intimacy with Authority" (American contralto, about 24k clones), added to the account as "Mariana - Female VO (Mike promo)". ElevenLabs history confirms every take was rendered on `OB0Jj6v9DGLLgz8dD57i` with `eleven_multilingual_v2`. Two independent Opus casts chose it: `opus/FEMALE-VOICE-PICK.md` (= `FEMALE-NARRATOR-CAST.md`) and `opus/TRAILER-FEMALE-VOICE-PICK.md` (= `TRAILER-FEMALE-CAST.md`). The catalogs are `opus/ELEVENLABS-FEMALE-VOICES-TRAILER.{md,json}` (25 account + 1,947 shared English females) and `opus/ELEVENLABS-FEMALE-VOICES.{md,json}`. Runner-up is Cate `J64VNrjLE6uKFBKlxfSJ` (British RP), then Liberty X `iBo5PWT1qLiEyqhM7TrG`. Both were added to the account, and their v3/v4 gate takes are in `audio/vo_b/takes/{cate,liberty}/`.
- **Settings:** stability 0.40 (v3 and v4 0.45), similarity 0.80, style 0.30, speaker boost on. Speeds: v1 1.05 · v2 1.10 · v3 0.95 · v4 1.20 · v5 1.12 · v6 1.00. Generator `audio/vo_b/gen_f.py`; picks `audio/vo_b/takes/mariana/PICKS.txt` (v1 s23 · v2 s11 · v3 s37 · v4 s37 · v5 s11 · v6 s23).
- **Post (`audio/vo_b/post.py`):** natural pitch, so the Hank −1 st shift is gone. **No tempo stretch on any line.** Hank needed ×1.05 on v4, ×1.045–1.12 on v5 and ×1.04 on v6. Chain: HPF 75 · +2 dB @180 Hz · −1.5 dB @350 Hz · 3:1 comp with 12 ms attack.
- **"Mike doesn't." t:** I picked s37 from 10 v3 takes. It has a 3.5–10 kHz release burst at 6.94 s, about 36 dB above the closure gap, and it survives in the mix (−27.5 dB vs −63.3 dB gap). The de-esser is bypassed on v3 in `mix37b.py`. Whisper on both masters, prompt-free: "Mike doesn't." and "...assistant that **learns** on its own...".
- **Timing (picture KEEP; only `cues.json`, `src/voB.ts` and captions changed):** v1 0.36–1.77 · v2 2.30–4.02 (slam 4.067) · v3 6.18–6.99 · v4 8.21–19.36 · v5 20.28–28.74 (ping 29.6) · v6 33.64–36.27 (cue 33.60 → 33.55). v4 and v5 now finish 0.6 s and 0.36 s earlier than Hank did, with no stretch.
- **Mix (`audio/mix37b.py`, near-dry from the dry patch, kept):** VO wet energy (ER+hall vs dry) went from −10.8 dB (8.4 %) on Hank-wet to **−24.8 dB (0.3 %)**. The hall alone went from −12.2 dB (6.0 %) to −27.7 dB (0.17 %): a 0.35 s room at −30 dB, no 2.2 s hall. Slam and ping are dry-centre. The slam peak is +5.4 dB over the preceding 0.5 s and the ping +9.2 dB.
- **Masters:** `out/mike-version-b-9x16.mp4` (1080×1920) and `out/mike-version-b-16x9.mp4` (1920×1080). Both are 37.000 s / 1110 f, −15.2 LUFS, −2.2 dBTP. `build-b.sh` now writes `out/.tmp-*` and then replaces the masters atomically. Proof: `out/_b-proof/mariana/contact-9x16.png`. Build log: `out/build-b-mariana.log`.
- **Archive:** Hank masters, mix, voB.ts, STATUS and LINE-LOCK are in `out/_archive/hank-pre-female/`. Hank line wavs, cues, words and post are in `audio/vo_b/_archive_hank/`. All Hank takes are kept in `audio/vo_b/takes/hank/`.
- **Not done:** nobody has listened by ear. The picks rest on Whisper, F0 contour and consonant-envelope metrics. No KEEP claim.

---

# Mike: VERSION B · VO RECAST to trailer baritone · STATUS (2026-10-26 ~22:40 ICT)

- **Voice:** ElevenLabs **Hank** `6F5Zhi321D3Oq7v1oNT4`, a Shared Voice Library voice added to the account as “Hank - Trailer (Mike promo)”. It runs on `eleven_multilingual_v2`, with settings and per-line speeds from `opus/TRAILER-VOICE-PICK.md` (the same content is in `TRAILER-BARITONE-CAST.md`). There are three seeds per line, and the picks are in `audio/vo_b/takes/hank/PICKS.txt`. The post chain is −1 st, a low shelf, and 4:1 compression (`audio/vo_b/post.py`); the hall comes from mix37b. v4 is at speed 1.20 plus a ×1.05 stretch, v5 at 1.20 plus ×1.12, and v6 at ×1.04, so every line fits the locked picture. v5 ends at 29.10 s, before the 29.6 s ping and “You decide.”; an earlier Hank take ran to 32.0 s and collided with that beat in 9:16.
- **Replaced:** Dr Joshi `WkJcHHkxVUZl4ua7fWlW`, which YP rejected (Indian/Euro male). The old STATUS line called it “Yashvi”, which was wrong. Its masters, mix and voB.ts are archived in `out/_archive/joshi-WkJcHHkxVUZl4ua7fWlW/`, and its line wavs are in `audio/vo_b/_archive_joshi/`. No female voice was used. The Brian takes are kept in `takes/brian/`.
- **Timing:** the cues moved: v1 0.40 → 0.25 and v2 2.75 → 2.30, so “close it?” ends at 4.04 s, before the slam at 4.067 s. The other cues are unchanged. `src/voB.ts` was regenerated with make_ts.py, which now runs whisper at temperature 0 with the copy as initial_prompt for alignment. Words were verified separately with whisper with no prompt: v4 reads “**learns** on its own”.
- **Mix:** −15.1 LUFS / −2.2 dBTP. The slam is +5.3 dB over the preceding VO, and the ping lands in the clear after the VO.

---

# Mike: VERSION B, “Coffee date, sun to moon” · STATUS (2026-10-26 ~22:05 ICT)

Version B is a new cut. The KEEP overnight cut is untouched: `src/Mike.tsx`, `MikePromo`/`MikePromo916`, `./build.sh` and `out/mike-harvey-mode-*.mp4` were not modified. `MikePromo916` still renders.
- **Masters:** `out/mike-version-b-9x16.mp4` (1080×1920) and `out/mike-version-b-16x9.mp4` (1920×1080). Both are 37.000 s, 1110 frames at 30 fps, H.264 High yuv420p, with AAC 256k 48 kHz and +faststart.
- **Source:** `src/MikeB.tsx` (compositions `MikeVersionB` 16:9 and `MikeVersionB916` 9:16, native per aspect, rendered 2x then downscaled). `src/voB.ts` holds the generated VO word times. Build: `./build-b.sh`.
- **Board:** `refs/version-b/storyboard-coffee-sun-moon.jpg`. All 15 panels are present in order. Beat frames: open 0–150 (lid 104→122, slam f122) · black 150–184 · Mike doesn’t 184–240 · café morning 240–330 · Gazette 330–390 · café afternoon 390–450 · links cl. 7.3 450–510 · catch 510–570 · golden hour 570–660 · alert drafted 660–720 · held / Nothing goes out 720–780 · café night 780–870 · phone lights up 870–990 (ping f888) · end 990–1110.
- **Café:** one `CafeScene`, lit by a single time-of-day value (`todAt(frame)`). That value also drives the clock pill (10:40 AM → 3:05 PM → 6:48 PM → 9:30 PM). Sky, sun arc, sunset, moon, stars, lit windows, string lights, table shadow, cups → cocktails → candle, and rim light all come from it. The silhouettes stay seated, with a breathing bob and cup lifts. Panel 14 is the same café at night, pushed in, with the phone glowing on the table.
- **Reused from `Mike.tsx`:** the open (3D hinge lid, readable Indus/Falcon screen, streaming assistant; retimed +42 f), Gazette card, cl. 7.3 card + ✕ Breaks line, gold thread, client alert + Held for Meera lock, notification card, end-card type system, Sweep/Words. **New:** black ember, Mike doesn’t, CafeScene, VO caption band, 7HL watermark, phone-on-table beat, time-of-day pill.
- **VO:** ElevenLabs TTS (key in env), voice ~~`WkJcHHkxVUZl4ua7fWlW` (Dr Joshi, mislabelled Yashvi)~~ → now Hank `6F5Zhi321D3Oq7v1oNT4` (see top), `eleven_multilingual_v2`, six lines in `audio/vo_b/` (`gen.py`; v3-model takes kept in `audio/vo_b/takes/`). Whisper medium.en checks every line word by word (the eleven_v3 takes misread “learns” as “lands” and dropped “works on”, so they were rejected). Copy and trims are in `refs/version-b/LINE-LOCK.md`.
- **Music + SFX:** ElevenLabs Music `audio/b_assets/music1.wav` (37 s, 90 BPM, A major, sectioned plan) and ElevenLabs SFX `audio/b_assets/{slam,boom,whoosh,ping,paper,riser,cafe_day,cafe_night}.wav`. Also reused: storyboard-916 `sfx_el` (copied into `audio/b_assets/el/`) and the legacy `slam/ping/chime.wav`.
- **Mix (`audio/mix37b.py` → `audio/mix37b.wav`):** The VO chain is HPF 90 Hz → 250 Hz −2 dB → +3 dB presence shelf / +1.5 dB air → dynamic de-ess (5.5–9 kHz) → 3:1 RMS comp. The dry VO stays centre, with Haas early reflections (11–37 ms L/R) and a 2.2 s stereo hall send at −15 dB. Music is M/S widened ×1.6, hard-stopped on the slam, silent through the black, and back in on “Mike”. It is sidechain-ducked −9 dB under VO and −7 dB under slam/boom/ping. Café ambience is M/S ×2.0, opens on café plates and pulls back −9 dB on proof beats. SFX have their own pans and L↔R whoosh sweeps, plus a 1.6 s room send. The ping sits right of centre (the phone on the table) with ping-pong echoes. Master: glue comp, then linear gain + limiter. **Result: −15.0 LUFS integrated, −2.2 dBTP** (measured on both mp4s). Whole-mix L/R correlation is 0.63. The slam lands +5.5 dB over the preceding 0.5 s and the ping +7 dB.
- **QA:** `qa/still_check.py <mp4> 0.6 15 990` finds no still runs over 0.5 s before the end card in either master. The 1 s black now carries a breathing ember. Proof frames: `out/_b-proof/` (16 timestamps × 2 ratios, `contact-9x16.png`, `contact-16x9.png`).

---

# Mike — OVERNIGHT SHIP PATCH · STATUS (2026-10-26 ~18:20 ICT)

The overnight story is unchanged: lid open, single camera pan, and no capability chrome. Only the end card changed. Both masters were re-rendered at 28.000 s (840 frames at 30 fps).
- **Cut:** “You be the spectator.” is gone. The end card now reads “Let Mike do its thing.” then “You review. Then you decide.” in gold with the underline sweep. The gold line moved up into the empty slot (y 738 → 684) and starts 10 frames earlier (word start 64 → 54, sweep 84 → 74), so there is no dead gap.
- **Mika → Mike:** no “Mika” was in src (case-insensitive grep), and the pre-patch render already shows “Mike” as the 6:58 AM notification sender (checked at 18.5 s). No change was needed. The note in the coldcheck doc was already out of date.
- **Grep proof:** `grep -rniE "spectator|mika" src` finds 0 matches (exit 1).
- **Pre-patch archive:** `out/_archive/*-prespectatorcut-20261026.mp4` and `out/_archive/Mike-prespectatorcut-20261026.tsx`.
- Audio is unchanged (`audio/mix28.wav`).

---

# Mike — OVERNIGHT RE-ROLL · STATUS (2026-10-26 ~18:25 ICT)

This re-roll replaces the kinetic cut, which was rejected because the capability-deck chrome still made it read as a slideshow. It runs 28.000 s (840 frames at 30 fps), and both masters in `out/` are overwritten. The kinetic cut is archived at `out/_archive/*kinetic-20261026.mp4`, with its source at `out/_archive/Mike-kinetic-20261026.tsx` and `build-kinetic.sh`.
- Removed: the `CAPABILITY 0n / 04` labels, the 4-dash progress bar, the feature headlines (Works while / Reads the docs / Photographic memory / Texts you), the Ordinary-AI-vs-Mike comparison cards, the per-beat captions, and the tell line after the lid ("Most legal AI stops when you close the laptop.").
- Structure: the open is kept as it was, then one continuous world canvas with a single camera that pans down through Gazette → cl. 7.3 → alert on desk → phone. A rolling time super is the only narration.
- Beats: 0–3.0 laptop mid-keystroke on cl. 7.3, lid shuts at 3.0 · 3.4 `Assistant · session ended` / `9:48 PM · Meera’s out` with a pull-back · 5.0–8.3 Gazette G-1187 lands (10:16 PM), `Mike · reading`, r.7 lit 7.1 · 8.3–10.0 gold thread down to codeshare · **cl. 7.3 punch-in 10.4–11.7** + `✕ Breaks on DEL–AUH under r.7` · 11.7–15.0 thread to client alert `On Meera’s desk · chair empty`, draft types, `Held for Meera · Not sent` 14.7 · **punch-in `Nothing goes out / without your yes.` 15.0–16.7** · 16.4–22.0 morning lock screen, Mike ping 6:58 AM at 17.5, proof lines, `Review alert` press 20.0 · 22.0–28.0 end card (unchanged, ends `You review. Then you decide.`).
- Source: `src/Mike.tsx`. Build: `./build.sh`. Audio: `audio/mix28.wav`, built by `audio/mix28.py` (lid slam 2.98 s, ping 17.55 s, chime 22.4 s, −18.1 LUFS, −1.9 dBFS peak).
- Still checks, both masters, end card starts at frame 660: `qa/still_check.py <mp4> 0.6 18 660` finds no still runs. `qa/global_motion.py` (whole-frame mean diff; thresholds 0.25 for 9:16, 0.09 for 16:9) finds no low-motion runs over 0.6 s before the end card. The old cut's weak spots at 3.5–5 s and 18–19.5 s now have a pull-back, a push-in and the button press.
- Proof frames: `out/_overnight-proof/` (15 timestamps × 2 ratios, `contact-9x16.png`, `contact-16x9.png`).

---

# Mike — KINETIC REBUILD · STATUS (2026-10-26 ~18:05 ICT)

The 27 s slideshow cut was rejected. This rebuild replaces it at 30.000 s (900 frames, 30 fps). Both masters are overwritten in `out/`. The rejected cut and its source are kept in `out/_archive/*slideshow*`, and dated copies of the kinetic cut are `out/_archive/*kinetic-20261026.mp4`.
- Source: `src/Mike.tsx`. Build: `./build.sh`. Audio: `audio/mix30.wav` (synth lid slam at 2.98 s; ping 20.13 s; chime 24.5 s; −18.4 LUFS).
- Timeline: Open/lid close 0–6.0 · 01 Works while away 6.0–11.0 · 02 Reads unprompted 11.0–15.2 · 03 Photographic memory 15.2–19.4 (cl. 7.3 punch-in ~17.3–18.9) · 04 Texts you 19.4–24.0 (punch-in on "Nothing goes out" from ~21.9) · End card 24.0–30.0.
- Hold check: `python3 qa/still_check.py <mp4>` (no 30×30 block changes >0.6 gray level). Result: no still run over 0.6 s before the end card in either master. The old cut had runs of 0.67–2.37 s.
- Proof frames: `out/_kinetic-proof/`.

---

# Mike — four-capability promo · STATUS

**Status:** SHIPPED, end-card rebuild (2026-10-26, 13:54 ICT): spectator line restored per PM lock, three end lines. Code-drawn in Remotion. No Grok Imagine, no paid APIs, nothing posted.
**Harvey is not on screen anywhere.** The old end-card line was cut. A case-insensitive grep of `src/` returns zero matches. The word survives only in the folder and output file names, which the brief fixed.

## Masters
| File | Resolution | fps | Duration | Codec |
|---|---|---|---|---|
| `/workspace/mike-harvey-mode/out/mike-harvey-mode-16x9.mp4` | 1920×1080 | 30 | 27.000 s (810 frames) | H.264 High, yuv420p, AAC 192k, +faststart |
| `/workspace/mike-harvey-mode/out/mike-harvey-mode-9x16.mp4` | 1080×1920 | 30 | 27.000 s (810 frames) | H.264 High, yuv420p, AAC 192k, +faststart |

Source: `src/Mike.tsx` (composition `MikePromo`). Rebuild with `./build.sh`. It renders at scale 2 to `out/master-2x.mp4`, downscales that for 16:9, and takes a centre crop (1216×2160 at x=1312, the 608px safe column) for 9:16.
Audio: `audio/mix27n.wav`, a synthesized pad with whooshes and ticks on each beat, a ping when the notification lands (16.45 s) and a chime on the end card (21.4 s). Loudnorm is set to −18 LUFS.
Look: near-black #060608, amber/gold #E6B04B, Inter, one caption at a time.

## Structure: hook, then four capability beats (4.5 s each), then end card
Product call is locked. Three changes since the last cut: (1) a walk-away clock: you leave at 6:42 PM, it rolls overnight from 11:42 PM to 6:10 AM, you are back at 8:06 AM; (2) Mike speaks first with proof: the notification shows what was read and the clause thread; (3) one human yes: a Review draft control, and nothing goes out without your yes.

| t (s) | Beat | Exact on-screen copy |
|---|---|---|
| 0.0–2.2 | Hook | `Most legal AI stops when you close the laptop.` |
| 2.2–6.7 | **01 Works while you're away** | `CAPABILITY 01 / 04` · `Works while` / `you’re away.` · chip: `6:42 PM · You leave for coffee` → `7:30 PM · You: in a meeting` → `9:15 PM · You: drafting elsewhere` · cards: `Ordinary AI` `idle` `Waiting for a prompt` `Ask anything…` / `Mike` `working` `Indexing exhibits` `Cross-checking dates` `Flagging clauses` `Drafting summary` `Progress NN%` · caption: `Ordinary AI waits.` / `Mike keeps going.` |
| 6.7–11.2 | **02 Reads the docs unprompted** | `CAPABILITY 02 / 04` · `Reads the docs` / `unprompted.` · clock `☾ 11:42 PM → ☀ 6:10 AM` · `✕ No prompt · no chat box` · intake: `MATTER FOLDER` `48 exhibits added`, with `EX 1` `EX 2` `EX 3` files dropping onto the pile · `UNREAD` → `READ` · `Page N of 1,280` · caption: `All night. Nobody asked.` |
| 11.2–15.7 | **03 Photographic memory** | `CAPABILITY 03 / 04` · `Photographic` / `memory.` · `All 1,280 pages kept — not summarised away.` · `CONNECTING ACROSS THE SET` · `p. 12  Notice period: 30 days` · `p. 388  Amended to 45 days` · `p. 1,041  Waiver requires writing` · caption: `Every page, recalled.` |
| 15.7–20.2 | **04 Texts you when done** | `CAPABILITY 04 / 04` · `Texts you` / `when done.` · lock screen: `Tuesday · you’re back` `8:06` `Away since 6:42 PM` · notification: `M` `Mike` `6:58 AM` · `Your notice draft is ready for your review.` · proof: `✓ Read 48 exhibits · 1,280 pages` `✓ Clause: p. 12 → 388 → 1,041` · buttons: `Review draft` (gold) `Later` · caption (gold): `Nothing goes out` / `without your yes.` |
| 20.2–27.0 | End card | `Mike.` · `Your 24/7 photographic-memory associate.` · gold rule · `Let Mike do its thing.` · `You be the spectator.` · `You review. Then you decide.` (gold) |

## QA (2026-10-26 13:57 ICT)
- `rg -i "harvey|all pages reviewed|filed|\bsent\b|7HL" src/` returns 0 matches. `spectator` is intentionally back (end card only, per PM lock).
- End card y-positions tightened (Mike 274, tagline 472, rule 590, lines 630/684/738); three lines fit without overlap in both ratios (see `qa/169/t24.png`, `qa/916/t24.png`).
- 04 asks for review only: `ready for your review`, a `Review draft` CTA, and `Nothing goes out without your yes`. No sent, filed or "all pages reviewed" copy.
- ffprobe, both masters: 27.000 s, 810 frames, 30/1, H.264 High, yuv420p, AAC 27.000 s, moov before mdat.
- Contact sheets: `qa/169-contact.png` and `qa/916-contact.png`. Frames are in `qa/169/` and `qa/916/` (tiles are in lexical filename order). 9:16 keeps everything in the centre column.
- The audio bed `audio/mix27n.wav` is unchanged. The beat timing is unchanged, so the ping still lands with the notification.
- 2026-10-26 15:49 (UTC+7): capture-v3 m1 swapped to M1-PLAIN (no tool_calls, plain reply) for 0 failed chips; mockllm :8766 restarted, m1 curl OK, gazette watch = MOCK MISS.

## KEEP — overnight A-roll (2026-10-26 ~18:15 Asia/Saigon)
- Studio KEEP: lid open, no CAPABILITY chrome, no post-lid tell line, one overnight story.
- Ship: `out/mike-harvey-mode-{16x9,9x16}.mp4` (28s). End-card spectator lines stay.
- B-roll side cut unchanged: `refs/openbot/takes/08-mike-openbot-broll-polished-9x16.mp4`.

## FINAL KEEP (2026-10-26 ~18:20 Asia/Saigon)
- Studio Final KEEP: A-roll patched (`Mike` on lock screen; no spectator line) + B-roll take 08 polished.
- Ship: `out/mike-harvey-mode-{16x9,9x16}.mp4` · `refs/openbot/takes/08-mike-openbot-broll-polished-9x16.mp4`

## First-scene grade (2026-10-26 ~20:20 Asia/Saigon)
- YP: open "isn't feeling"/sizing -> Opus+executor call **PATCH (heavy)** f0–150 only (16:9 laptop 30%W/11% area, 12 px screen text, ~88% void after close; scaleY lid squash; 9:16 deck 6–9 px from edge). Brief: `opus/FIRST-SCENE-GRADE.md`. Masters unchanged pending MD.

## Open PATCH shipped (2026-10-26 ~21:16 Asia/Saigon)
- Per `opus/FIRST-SCENE-GRADE.md` §E, f0–150 only. 9:16 is now a native composition (`MikePromo916`, 1080×1920); `build.sh` no longer crops. The 3D lid hinge closes over f62–80, the stream is cut at f72, the amber LED dies at f96, and the "session ended" pill is cut. TimeSuper is native per aspect, the slam is at 2.67 s (`mix28.wav`), and f150+ is unchanged.
- Executor fix: the f81–82 bare "9:47 PM ·" super frames are gone. The "· Meera's out" group now slides in on the right edge of the track.
- Measured: the 16:9 laptop fills 35–57 % of the frame from f50 to f72 and drops to ~12 % once the lid is shut (f77+). Assistant text line pitch is ≈43 px in 16:9 and ≈38 px in 9:16, so the font is ≥29 px. Minimum 9:16 side margin is 90 px from f0 to f149, and the laptop bottom never goes below y 1245.
- The previous patch render is archived at `out/_archive/*-openpatch-v1-20261026-2111.*`. The pre-patch masters are at `out/_archive/*-preopenpatch-20261026-2020.*`.
