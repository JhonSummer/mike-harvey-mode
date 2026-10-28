# C2 sleep stretch: edit notes (Gary Agents, 9:16)

The project runs at **30 fps** (`const FPS = 30` at `src/GaryC2.tsx:9` and `fps={30}` in `src/Root.tsx:14`). Frame numbers are absolute unless marked "local", which means frames since that key.

One point of interpretation first. The dedicated trio demos (07 Mark, 08 Gary, 09 Fiona) already sit at f720–975 (24.00–32.50 s). I've read the greenlit change as a change of transitions only: hard cuts instead of the `Beat` zoom-blur. It doesn't change timing. So the join in Q1 is the last trio frame (Fiona) into n11 at f975.

## MOTION BRIEF (bake from this)

1. **Trio is hard-cut throughout:** Meet → Mark at f720, Mark → Gary at f803, Gary → Fiona at f884, Fiona → Sleep at f975. Each cut sits in the breath, 4 f after one line ends and 4 f before the next starts. No zoom-blur and no whip.
2. **Fiona holds settled for 35 f** (stamp lands f940, hold to f974), then hard cut to the sleep shot at f975 on the breath before "Brief".
3. **Pre-roll f975–1039:** three rows read "Briefed". On "once." (f994) they flip to Reading…/Scanning…/Queued and the progress bars start. Lids close f1037–1042, the lamp clicks off at f1057.
4. **New keys (from "eyes." at f1040):** K1 1040 · K2 Mark 1073 · K3 Gary 1178 · K4 Fiona 1313 · K5 regroup 1433 · K6 chip+stretch 1463 · **HARD 1487**. The hard cut is still at the top of the stretch, and the 7:12 lock is unchanged.
5. **Windows:** K1 33 f (1.1 s), Mark 105 f (3.5 s), Gary 135 f (4.5 s), Fiona 120 f (4.0 s), regroup 30 + 24 f (1.8 s). Total 447 f = 14.9 s.
6. **Rohan jumps** on every K with a 2 f linear dissolve, unchanged. **Cards glide** for 9 f with the `io` ease. Outgoing expanded content is gone by glide frame 4, and incoming content starts at frame 4.
7. **Micro-animations keep their native speed** (pops, ticks, sweeps). The extra time goes into holds and one new beat per associate. Never slow down an ease to fill time.
8. **Hits (local):** Mark at K2+62 (f1135), Gary at K3+88 (f1266), Fiona's stamp at K4+76 (f1389), regroup chord at K5+1 (f1434). All four land on Rohan's exhale.
9. **Read time:** every hit gets at least 29 f of hold before the next key. The next glide never starts within 40 f of a hit.
10. **Gags:** the snore starts at f1355 and is cut dead by the stamp at f1389; Rohan's mouth snaps from 'o' to 'line' on that frame. The yawn-stretch runs into HARD.
11. **Duration:** the new total is 2118 f = 70.60 s, up 207 f / 6.9 s from 1911 f / 63.70 s.

---

## 1. Join from Meet chips + VO into "Brief them once / close your eyes"

**Meet → Mark (f720), hard cut.** The n06 speech ends at 23.85 s (f716) and "Mark" starts at 24.13 s (f724). Set `hardOut` on Team and `hardIn` on Mark. The chips beat holds through "…working for you." and never straddles the cut.

**Fiona → Sleep (f975), hard cut. The smoothness comes from the audio and the layout, not from a picture dissolve.**

| Item | Frame | Time | Note |
|---|---|---|---|
| Fiona's last motion (Mark stamp pop) | f940 | 31.33 s | "Held for Rohan" lock at f930–938 |
| Hold Fiona settled | f940–974 | 35 f | gentle `push` continues |
| n09 "note." speech end | f971 | 32.36 s | |
| **J-cut:** night room tone pre-laps | f969 | 32.30 s | under the "note." tail, 0.4 s fade |
| **Picture hard cut** | **f975** | 32.50 s | `cut('n11')` |
| "Brief" | f979 | 32.64 s | |
| "Brief" beat: statuses flip | f994 | 33.13 s | on "once." |
| Pre-roll hold (rows working, lamp on) | f1000–1036 | 37 f | |
| Lids close / "eyes." = K1 | f1037–1042 / f1040 | 34.67 s | |
| **L-cut:** associates music runs over the cut and dies on the lamp click | f975 → f1057 | 35.23 s | already in the mix; keep it |

- **Why not a soft transition:** today's 8 f out-blur on Fiona overlaps the 8 f zoom-in on the sleep shot (f967–983). Once the trio is hard-cut, that would be the only soft transition in the run, and it is exactly the mush to avoid.
- **Graphic match:** Fiona's coral card (x70, w940) cuts to the K1 rows at the same column (x80, w920). The eye stays in the same column, with Fiona's row third in the list.
- **Remove the whip whoosh at the cut:** `mix_c2.py:169` puts a `whoosh_whip` on 'n11' at f968, and a whip into a quiet bedroom fights the cut. I'd also drop the n07/n08/n09 whips, because a whip sound over a hard cut doesn't match. Each card's own landing sound can carry those cuts instead.

## 2. Retiming the expands without mush

Three rules make up most of the fix:

- Keep the micro-animation durations as they are.
- Give each associate one new beat to fill the extra time.
- Fix the crossfade during glides. At glide g=0.5, both cards are about 328 px tall, so both expanded panes show at about 16 % opacity on top of each other.

**Mark, K2 = f1073, 105 f.** n10 runs over this window.

| Local | Absolute | Event | Easing / spec |
|---|---|---|---|
| 0–9 | 1073–1082 | glide in, gold tab | `io`, 9 f |
| 8–55 | 1081–1128 | VO "All at once, in the background." | — |
| 20–30 | 1093–1103 | Rule 9(2) highlight (`hl`) | `out` |
| 30–56 | | hold on the rule, under "background." | 26 f read |
| 56 | 1129 | source tag pop | spring 12/220 |
| 60–68 | | tick draw | `io` |
| **62** | **1135** | **HIT: "Read ✓", D4 chime, check tick** | 7 f after the VO ends |
| 76 | 1149 | "Clashes with cl. 7.3" pop | 14 f after the hit so it doesn't stack |
| 76–105 | | hold | 29 f |

**Gary, K3 = f1178, 135 f.**

| Local | Absolute | Event | Easing / spec |
|---|---|---|---|
| 0–9 | 1178–1187 | glide in, blue tab | `io` |
| 12 | 1190 | page riffle SFX | — |
| 6–74 | | count 120 → 212 | `Easing.out(quad)` |
| 12, 19, 26, 33, 40 | | rows fade in (`r(at-6, at)`), 7 f stagger instead of 4 | `out` |
| at+5 | | ¶ tags pop | spring 12/220 |
| **58** | **1236** | **Overruled: pill pop, strike 58–66, felt thunk** | the "judgment" beat, now on its own |
| 80–88 | | "6 that matter ✓" | `out` |
| **88** | **1266** | **HIT: F#4 chime, status ✓** | |
| 100–112 | 1278–1290 | **new:** the excluded row re-ranks to the bottom and dims to 0.45 | `io`, 12 f; this makes "ranked" visible |
| 112–135 | | hold | 23 f |

**Fiona, K4 = f1313, 120 f.**

| Local | Absolute | Event | Easing / spec |
|---|---|---|---|
| 0–9 | 1313–1322 | glide in, coral tab | `io` |
| 10 + i×6 → 18 + i×6 | 1323–1361 | six redline strokes; the "redlined" count r(10,50) 0 → 11 | linear count, `io` strokes |
| 36–46 | | client note fades in | `out` |
| 42 | 1355 | snore starts | — |
| **76** | **1389** | **HIT: "Checked by Mark" stamp, A4, slam, sub; snore cut; mouth 'o' → 'line'** | spring 10/230 |
| 82–88 | | "Held for Rohan" lock; lock click at 82 | `out` |
| 88–120 | | hold | 32 f |

**Regroup.**

| Key | Local | Event |
|---|---|---|
| K5 = f1433 | 0–9 | cards glide to "done" rows |
| | +1 | D+F#+A chord with shimmer |
| | +4 | content hum; birds fade in |
| K6 = f1463 | 0–9 | cards merge |
| | +3 | "All done — held for your review" chip pop |
| | +2 → 23 | stretch |
| | 24 | **HARD cut (f1487)** |

**Overlap rules**

- **Content crossfade:** in the expanded pane, multiply `exp` by `1 - r(f,K,K+4)` for the outgoing card and by `r(f,K+4,K+9)` for the incoming card.
- **Spacing:** no two pops within 6 f of each other, and no chime within 40 f of a K (each card gets read time before it shrinks).
- **Dead frames:** no hold longer than 36 f without something moving. The phone pulse, the breathing and the push already cover this.
- **Exhale timing:** the chest is falling while `f mod 43` is between 11 and 32. The hit frames give 1135→17, 1266→19, 1389→13 and 1434→15, so all four land on the exhale. **If anything upstream moves by even 1 frame, recheck this.**

## 3. VO and breath handling

- **Trio:** each hard cut sits in the gap between lines, at least 3 f after the previous speech ends and 3–5 f before the next first word:
  - f716 | 720 | 724
  - f799 | 803 | 807
  - f880 | 884 | 888
  - f971 | 975 | 979

  If the Meet VO ever has to sit over a cut, allow only the unstressed tail ("…for you."), at most 6 f past the cut, and never a name.
- **The alignment end times are misleading.** For example, the "you." word in n06 ends at 24.782 s in the alignment, but speech actually ends at 23.85 s. Use the line's `end` field, not the word end times, when you check overlaps.
- **In the sleep shot:**
  - n11 covers the pre-roll.
  - The breath after "eyes." is 0.78 s (35.26 → 36.05 s), with the lamp click at f1057 inside it.
  - n10 moves to K2+8 (start 36.05 s, f1081; end 37.60 s, f1128). Set `K2_VO = 1.37` (currently 1.55).
- **Then 12.2 s with no VO** (37.60 → 49.84 s). The snore, chimes and stamp all fall in this stretch, which satisfies "no snore over VO". But it's the main risk; see Q6.
- **After the cut:** "By morning" stays at HARD+8 f (f1495, 49.84 s), unchanged relative to the cut.

## 4. Audio and SFX retiming (`audio/mix_c2.py`)

| Cue | Old | New |
|---|---|---|
| Piano on "you" | f582 / 19.39 s | unchanged |
| Lamp click | f1057 | unchanged |
| Mark D4 + tick (`HIT_M`) | f1119 / 37.30 s | **f1135 / 37.83 s** (K2+62) |
| Gary riffle | K3+8 | K3+12 → f1190 / 39.67 s |
| Gary thunk | f1157 | **f1236 / 41.20 s** (K3+58) |
| Gary F#4 (`HIT_G`) | f1173 / 39.10 s | **f1266 / 42.20 s** (K3+88) |
| Snore | K4+0.12 s → stamp (1.15 s) | **f1355 → f1389** (start = HIT_F − 1.15 s, the same cut point that works now) |
| Fiona stamp + A4 (`HIT_F`) | f1225 / 40.83 s | **f1389 / 46.30 s** (K4+76); lock click at f1395 |
| Regroup chord | f1239 | **f1434 / 47.80 s** |
| Reversed swells, glides, rustles, sigh, hum, birds, stretch, pad, half-time piano, room tone | keyed to `KS`/`HIT` | follow automatically once the constants change |
| Morning buzz / ping | HARD+2 / +5 f | f1489 / f1492 |
| End triad (`LOGO`) | 62.40 s | **69.30 s (f2079)**: arpeggio at 69.30/69.41/69.52, chord at 69.70 s |
| Room tone (`rt2`) | starts at `cut('n11')` | start 6 f earlier with a 0.4 s fade (the J-cut) |

- **Snore length.** `snore_big_v3.wav` is about 1.6 s. I estimated that from the file size, assuming the same 48 kHz/24-bit stereo format as `stretch_1` (generated at 1.5 s). If you start it at K4+0.12 s as now, it ends around K4+52 and the stamp lands in silence, which kills the gag. So it has to be anchored back from the stamp, as in the table.
- **New total: 2118 f = 70.60 s** (`TOTAL_S` 70.615).

## 5. Remotion implementation

**Source of truth is `audio/vo_c2/build_vo_c2.py`.** It generates `src/voC2.ts` and `cues.json`.

- **L18:** set `SLEEP_LEN=14.9` and `K2_VO=1.37`.
- **Keys:** add `KEYS=[0,1.1,4.6,9.1,13.1,14.1]`. The keys list is currently written out twice, at L58 and L61. Use the one constant in both places.
- **Hit offsets:** add `HITS={'mark':62,'gary':88,'fiona':76,'thunk':58}` (local frames) to the exported `SLEEP` dict, so the TSX and the mix read the same numbers.

**`src/GaryC2.tsx`:**
- L32: build `HIT` from `SLEEP.hits`. If you don't add them to the builder, the offsets are 62/88/76/58.
- L650, L670/676/683/688 and L692/698/702: replace the frame literals with the tables in Q2.
- L766: replace `prog`'s `K2+40`/`K3+40`/`K4+38` with `HIT.mark`/`HIT.gary`/`HIT.fiona`.
- L783: add the content-crossfade gate from Q2.
- L609: the sprawl pose's mouth becomes `f >= HIT.fiona ? 'line' : 'o'`.
- Transitions:
  - L969 Team: `hardOut`.
  - L971, L975, L976 (Mark, Gary, Fiona): `hardIn hardOut`.
  - L978 Sleep: add `hardIn` (it already has `hardOut`).
- Pre-roll: status reads "Briefed" until `wf('n11',2)` (f994).

**`audio/mix_c2.py`:**
- L14: hit offsets, or read them from `SL['hits']`.
- L137: room-tone J-cut.
- L169: drop `'n11'` from the whoosh list, and optionally n07–n09.
- L195: riffle at +12/30.
- L198–199: snore anchored to `HIT_F - 1.15`.

**Composition props:** add none. The mix reads `cues.json`, not Remotion props, so any timing exposed as `defaultProps` would drift away from the audio.

**Span math.** `BC` uses `Beat` spans instead of `<Sequence>`, but they're equivalent: `from = span[0]` and `durationInFrames = span[1] - span[0]`.

| Beat | from | durationInFrames | Change |
|---|---|---|---|
| team | 612 | 108 | — |
| mark | 720 | 83 | — |
| gary | 803 | 81 | — |
| fiona | 884 | 91 | — |
| **sleep** | 975 | **512** | was 305 |
| digest (7:12) | **1487** | 174 | duration unchanged |
| source | 1661 | 79 | |
| call2 | 1740 | 213 | |
| end | 1953 | 165 | |

Inside the sleep span, the local key frames are EYES 65, K2 98, K3 203, K4 338, K5 458, K6 488, HARD 512.

**Root:** no edit needed. `durationInFrames={TC2.total}` becomes **2118** on its own.

**Build order:** `build-c2.sh` does **not** regenerate the VO cues. Run `cd audio/vo_c2 && python3 build_vo_c2.py` first, then `./build-c2.sh`. If you skip that step, the render uses the old 1911 f timeline.

## 6. Risks and caveats

1. **12.2 s with no VO** (37.6–49.8 s) is the longest stretch in the film without narration. With the sound off, the caption band is empty for that whole time. The cards and time pill carry the story, but watch retention. Fallback: Gary to 3.8 s and Fiona to 3.5 s (−36 f), which gives a 13.7 s shot.
2. **The work is shown twice.** Rule 9(2), "Overruled" and "Checked by Mark" appear in the hard-cut demos (07–09) and again about 10 s later in the expands. The new beats (Clashes pill, re-rank, snore-stamp) are what keep the second pass from feeling like a rerun, so don't cut them for time.
3. **Gary's count runs backwards.** Frame 08 counts to **228** (L426), and the sleep shot then shows 120 → 212 (L670). Change the sleep count to run 228 → 312, or end frame 08 lower.
4. **The lullaby gets thin.** The synth pad has to hold for about 14.3 s, and the half-time piano notes are now about 3.5–4.5 s apart. It's acceptable until the D-major score arrives. Optionally add one piano note per window, about one bar after each K.
5. **Timing lives in two files.** The hit offsets are hard-coded in both the TSX and the mix today. Unless they move into `cues.json`, a one-frame edit on either side breaks the chime-to-picture sync and the exhale alignment.
6. **Rerunning `build_vo_c2.py` re-trims every line wav.** Check the md5s against the current files, as STATUS did last time, before you trust the mix.
7. **The snore is a guess.** It was picked from the waveform envelope only (STATUS: no ear listen). Someone needs to listen to the snore→stamp cut and the stretch into HARD before a KEEP.
