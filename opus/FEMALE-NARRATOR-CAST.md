# Female Voice Pick

## Pick

**Mariana (Intimacy with Authority), from the Shared Voice Library**

- **voice_id:** `OB0Jj6v9DGLLgz8dD57i`
- **public_owner_id:** `375c86e675d6d8b2b50d4c33cc6b7ef407a68953e41de9fc9f98a70b88bb21d9`
- **Add to account (one-time):**

```bash
curl -X POST "https://api.elevenlabs.io/v1/voices/add/375c86e675d6d8b2b50d4c33cc6b7ef407a68953e41de9fc9f98a70b88bb21d9/OB0Jj6v9DGLLgz8dD57i" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"new_name": "Mariana - Female VO (Mike promo)"}'
```

> **Not yet heard.** This pick is based only on catalog descriptions and clone counts. Before you commit, play these three `preview_url`s back to back:
> 1. **Mariana:** `https://api.us.elevenlabs.io/v1/voices/OB0Jj6v9DGLLgz8dD57i/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiRTJVc1pUOHYxdWIycU9ITmdTRWdkSWlDUllNMiIsImZpbGVuYW1lIjoiWHhteFoxakV3dHlqQ0dpRmlOVTcubXAzIiwidGltZXN0YW1wIjoxNzkzMDMwNDAwMDAwMDAwfQ%3D%3D>
> 2. **Cate** (runner-up): `https://storage.googleapis.com/eleven-public-prod/database/user/boStwt9OjjVF5IMLZzDAEDppOmN2/voices/J64VNrjLE6uKFBKlxfSJ/1plEtjiUhiFCEuCTyfBj.mp3`
> 3. **Liberty X** (second alternate): `https://storage.googleapis.com/eleven-public-prod/database/user/TBCGBdfm5sahGkhMn2WcXK1i4Ya2/voices/iBo5PWT1qLiEyqhM7TrG/bJPHKvzPkMAcGWTdcxay.mp3`
>
> Listen for two things:
> - Does Mariana's "intimate" quality stay authoritative, or does it drift toward sultry?
> - Is the "warm Latin undertone" faint enough to pass as American?
>
> Then render **v3 ("Mike doesn't.")** and **v4 (the 46-word line)** with all three voices. v3 tests weight, and v4 tests whether the voice stays clear at speed. A preview can't tell you either.

## Why

- **It fits the brief on paper.** The catalog describes Mariana as an American **contralto** with "clean articulation and low-register impact", "Calm. Commanding." It lists executive voiceovers, luxury ads and **political messaging** as uses. Political spots are the female equivalent of trailer narration: weighty, persuasive and paced to fit a slot. A low-register female voice is what lets "Mike doesn't." and "Introducing Mike" land without a pitch shift. Executive and luxury reads are the premium-brand tone a legal audience trusts.
- **Pace.** v4 is about 46 words in ≤12.1 s (about 228 wpm). v5 is about 28 words in ≤9.3 s (about 180 wpm, with two short breaks). "Political messaging" voices are trained on tight broadcast slots, so Mariana should be more comfortable at speed 1.15–1.20 than the slow, gravelly "cinematic" voices. Expect the same treatment as Hank: speed 1.20 on v4, plus a little tempo stretch if needed.
- **Consistency.** About **24.4k clones**. That's the highest clone count among the American, middle-aged, low-register female voices whose descriptions are authoritative rather than soft or chirpy. The voices with more clones (Samara X 244k, Priyanka 219k, Christina 133k, Verity X 102k, Katherine Luxury 81k) all miss the brief on tone or accent.
- **It should sound premium dry.** "Clean articulation" and "intimate" usually mean a close-mic source with plenty of chest resonance. That kind of voice sounds expensive without reverb, which suits the near-dry mix.
- **Risks:**
  1. **Intimacy could read as sultry.** The settings below keep `style` low (0.30) and stability moderate to prevent that. If v3 or v5 still sound seductive, switch to Cate.
  2. **"Latin undertone".** It should be faint in English. If you can hear it on "photographic-memory associate" or "Harvey", switch.
  3. **It may be slower than Hank by default.** If v4 needs more than about 8% tempo stretch at speed 1.20, switch to Liberty X.
- **Ruled out:**
  - **Account voices.** All the `std_*` and Indian-accented voices (Mona, Tripti, Devi, Ziina, Rashi, Vidya, Surabhi, Aakancha, Yashvi G, Sonal, Kareena, Navya) are too close to Joshi. Bella is medium-high pitched and built for e-learning, so it lacks weight. Sarah is young. Jen is somber, meditative and slow. Alice is e-learning. Matilda is a pleasant alto but generic and "upbeat". Laura and Jessica are quirky or playful. Maria Mysh is soft and conversational. **Lily** (velvety British) was a near miss: polished, but lighter than Cate in the same lane.
  - **Near misses in the library:**
    - **Liberty X:** kept as the second alternate.
    - **Sloane, Bold and Polished** (`m8AHWg36…`, American, commanding executive, 2.4k clones): good tone, but tagged conversational/upbeat, so it has less trailer weight.
    - **Nayva** (`cfc7wVYq…`, deep, cinematic, 32k clones): tagged young and aimed at fiction and teen drama, so it risks a moody "Vice doc" read instead of brand authority.
    - **Katherine, Calm & Serious** (`J7gii3pW…`, Canadian, explicitly "trailers"): only 219 clones, so consistency is unproven.
    - **Veronica, Cinematic Luxury** (`Zg5uAMn2…`): smoky and raspy texture, only 1.5k clones.
    - **Samara X** (`19STyYD1…`, 244k clones): relaxed social-media calm with no weight.
    - **Deborah** (`lVpo6IOL…`): broadcast polish, but leans toward compliance video.
  - **Wrong tone:**
    - Too breathy, sultry or ASMR-adjacent: Velvet Noir ("slightly breathless"), Cameo, Becca, Valerie, Mary, Lauren B and Juliet (romantic or late-night).
    - Too chirpy or bright-commercial: Christina, Kristen Upbeat, Piper, both Emma Youthful voices, Sia Energetic and Melinda.
    - Too slow or meditative: Fernanda, Ella, Susan Kathleen, Carol, Katherine Luxury and Verity X.
    - Too theatrical or genre: Elariel X (fantasy queen), Kate Velvet Midnight (horror), Raven Ashcroft (character), Ethereal Husk (gravel).
    - Too announcer-y: Riley (news anchor), Manay Shania.
  - **Wrong accent or language:** İrem (Turkish), Kaisa (Finnish), Koraly (French), Paloma (Mexican), Andrea Lot (Brazilian), Raven (German), Olusola (subtle African accent, tagged young).
  - **Same publisher as the Indian-accented account voices** (`7398804d…`): Belle B, Reva, Riya Rao and Kanika. Their accents are labelled "american" or "standard" but haven't been checked, so they carry Joshi-adjacent risk.

## Runner-up

**Cate (Resonant, Deep and Elegant):** voice_id `J64VNrjLE6uKFBKlxfSJ`, public_owner_id `479ab2a2bcf64d1c95e8bb45a026c29f4212adf5b94f5af410d3039cd58cc917`, add as `"Cate - Female VO (Mike promo)"`. Cate scored highest on brief fit in the catalog. She's a deep British RP voice with "gravitas, authority, and elegance" and a "cinematic tone reminiscent of classic drama and documentary". She has about 11k clones.

- **Switch to Cate if:**
  - Mariana tips sultry or her undertone shows.
  - The client wants more prestige. RP carries well with lawyers, especially outside the US.
- **Risk:** deep RP narrators tend to be measured. Check v4 at speed 1.20 straight away.

**Second alternate: Liberty X (Transatlantic Global Narration):** voice_id `iBo5PWT1qLiEyqhM7TrG`, public_owner_id `6643afd1d55a6987b18e340e00bb89ed60329c878a01823e0c10a50fb522bd76`, add as `"Liberty X - Female VO (Mike promo)"`. A mid-Atlantic accent (the closest to "global-neutral" in the catalog), "authoritative yet warm", with about 48k clones. Its social-media use case suggests a naturally brisk pace.

- **Switch to Liberty X if:** both Mariana and Cate overrun v4 or v5 by more than 8% even at speed 1.20.
- **Trade-off:** it has less low-end weight on "Mike doesn't."

All three use the same add-to-account call with their own `{public_owner_id}/{voice_id}`.

## Recommended settings

**Model: `eleven_multilingual_v2`** for the delivered render, the same as the Hank bake.

- It supports `<break time="x.xs" />` tags. The v2 and v5 pauses depend on them.
- It has a dependable `speed` control (up to 1.20), which v4 and v5 need.
- The same seed gives the same take, so re-renders are repeatable.
- `post.py`, the seed and pick workflow and `make_ts.py` alignment all stay unchanged.

`eleven_v3` modulates more, but it has no break tags, its takes vary more, and its timing is harder to control. Try v3 only if the v2 takes sound flat. If you do, render all six lines on v3 and don't mix models.

**Base `voice_settings`:**

```json
{
  "stability": 0.40,
  "similarity_boost": 0.80,
  "style": 0.30,
  "use_speaker_boost": true,
  "speed": 1.0
}
```

- **stability 0.40:** slightly higher than Hank's 0.38. Low-register female voices with an "intimate" quality get breathy and wobble in pitch sooner as stability drops. Raise it to 0.45 on v4 (the long line) and on v3 if it ends with an upturn. Don't go below 0.32.
- **similarity_boost 0.80:** keeps the contralto body and the clean consonants close to the source. Above 0.85 it can pick up mouth noise from the original recordings, which you'd hear in a dry mix.
- **style 0.30:** lower than Hank's 0.40. Style exaggerates whatever character the speaker has. For Mariana that's intimacy, so too much style means sultry. Go up to 0.35 for v5 only if "Introducing Mike" sounds flat.
- **use_speaker_boost true:** gives more presence and focus. It matters more when there's no reverb to hide a thin take.
- **speed 1.0 base:** set per line in the table below. Lines with long budgets stay near 1.0, and v4 and v5 are pushed.

**Workflow:**

- Make one request per line.
- Pass `previous_text` and `next_text` (the neighbouring locked VO lines) so the intonation flows across cuts.
- Use seeds **11 / 23 / 37 / 53**: four takes per line, logged in `audio/vo_b/takes/mariana/PICKS.txt`.
- Use `output_format: "pcm_44100"`, or `mp3_44100_192` if the tier doesn't allow PCM.
- Write "24/7" as **"twenty-four seven"** in the TTS input only. Captions and locked copy stay "24/7".
- After picking, re-run `make_ts.py` (Whisper alignment) so `src/voB.ts` word times follow the new voice.

## Modulation notes

- **Trailer cadence without the announcer voice.** A female trailer read gets its weight from going down and slowing down. Getting louder or brighter doesn't help.
  - Anchor each sentence low.
  - Stress content words ("**laptop**", "**close** it", "**Mike**", "**texts** you", "**Harvey**").
  - End statements with a falling terminal. Never use upspeak except on v2's real question.
- **Before a reveal, pause instead of pushing.** Silence before "you close it?" and the comma after "Introducing Mike" do the work a male baritone would do with growl.
- **Punctuation and break-tag rules (v2):**
  - Commas give short lifts. Periods give firm drops. "?" gives a rise.
  - Use a `<break>` tag instead of em-dashes or "…". v2 handles those inconsistently, and they can produce a breathy trail.
  - No ALL CAPS and no "!". They push a female voice toward a bright, announcer-style commercial read.
  - Use no more than 2 break tags per line.
- **Avoiding breathiness:** keep style ≤0.35, re-roll seeds rather than lowering stability, and reject takes with audible inhales before "Mike" or a vocal-fry tail on "spectator".
- **Pitch: do NOT pitch-shift down** the way Hank had −1 st. On a female voice even −0.5 st sounds processed and uncanny, and it shifts gender cues. Weight comes from voice choice, delivery and EQ only.
- **Near-dry post chain (replaces Hank's in `post.py`):**
  1. HPF at 80 Hz (12 dB/oct).
  2. +1.5 dB low shelf at 180–200 Hz for chest. Not Hank's +3 dB at 120 Hz, which would only add mud.
  3. −2 dB bell around 350 Hz if boxy.
  4. +1.5 dB presence at 4.5 kHz.
  5. De-esser at 6–8 kHz, −3 to −4 dB of reduction maximum.
  6. 3:1 compression with about 3–4 dB of gain reduction, medium attack.
  7. Optional: a short plate or small room at **≤8% wet**, 15–20 ms pre-delay, under 0.8 s decay, high-cut at 6 kHz. It should glue, not be heard.
  8. Tempo stretch only where a line overruns: ≤6% with formants preserved. More than that causes phasiness, which is audible on a dry female voice.

## Delivery notes per line

| # | TTS input (locked copy; tags/normalisation only) | speed | Target duration | Delivery |
|---|---|---|---|---|
| v1 (0.25 s) | `Your assistant works on your laptop.` | 1.05 | ≤2.0 s (aim ~1.7 s) | Low, matter-of-fact setup, not a sell. Light weight on "**laptop**" and let the period pull the pitch down. |
| v2 (2.30 s) | `But what if <break time="0.3s" /> you close it?` | 1.10 | ≤1.75 s, **must end by 4.04 s** | Suspend "what if" slightly up, then give it real silence. Land "**close** it" as a soft, controlled question that rises without squeaking. If it's long, cut the break to 0.2 s before raising the speed. |
| v3 (6.13 s) | `Mike doesn't.` | 0.95 (stability 0.45) | ~1.3–1.8 s | **The weight line.** The lowest pitch in the spot: flat, final and certain, stress on "**Mike**", clipped "doesn't" with no trailing air. Re-roll any take that ends with an upturn or a breath. |
| v4 (8.10 s) | `But what if you had a twenty-four seven assistant that learns on its own, doesn't need to be prompted, and keeps working while you're on a coffee date, in a high-stakes meeting, or busy drafting a notice. And when it's done, it texts you.` | 1.20 (stability 0.45) | ≤12.1 s | Conversational start that builds. Commas carry the rhythm. Read the scenarios as an ascending list: coffee date → **high-stakes** meeting → drafting a **notice**. No break tag before "And", so it flows like Hank's take. Drop the pitch for "it **texts** you" with a hint of a smile. If it's over, add up to 6% tempo stretch. If it needs more than 8%, switch voices. |
| v5 (20.20 s) | `Introducing Mike, <break time="0.25s" /> your twenty-four seven photographic-memory associate, that goes through the docs overnight, and during the day <break time="0.2s" /> and lets you be the Harvey of the game.` | 1.12 | ≤9.3 s, **must end before 29.6 s** | The second trailer moment. "Introducing **Mike**" is slower and lower, with the pitch landing on the name. Keep "photographic-memory associate" crisp. Suspend the pitch on "during the day", then resolve down on "the **Harvey** of the game". If it's over: cut the second break to 0.15 s, then raise the speed to 1.15, then stretch ≤5%. Never cut the break after Mike. |
| v6 (33.60 s) | `Let Mike do its thing. <break time="0.3s" /> You be the spectator.` | 1.00 | ≤3.2 s | Relaxed confidence, like a closing argument. Level close on the first sentence, then lean back on "You be the **spectator**" with a falling cadence. No upturn and no fry tail. |

## CODE-NOTES

```text
# Female VO — Mike Version B (replaces Hank 6F5Zhi321D3Oq7v1oNT4)
voice_name:       "Mariana - Female VO (Mike promo)"
voice_id:         OB0Jj6v9DGLLgz8dD57i
public_owner_id:  375c86e675d6d8b2b50d4c33cc6b7ef407a68953e41de9fc9f98a70b88bb21d9
model_id:         eleven_multilingual_v2
output_format:    pcm_44100            # fallback mp3_44100_192
seeds:            [11, 23, 37, 53]
voice_settings:   {"stability": 0.40, "similarity_boost": 0.80, "style": 0.30, "use_speaker_boost": true, "speed": 1.0}

per_line_overrides:
  v1_open:    {speed: 1.05}                    # start 0.25 s, <=2.0 s
  v2_close:   {speed: 1.10}                    # start 2.30 s, end <=4.04 s; break 0.3s
  v3_doesnt:  {speed: 0.95, stability: 0.45}   # start 6.13 s, ~1.3-1.8 s
  v4_mid:     {speed: 1.20, stability: 0.45}   # start 8.10 s, <=12.1 s; tempo stretch <=6%
  v5_intro:   {speed: 1.12}                    # start 20.20 s, <=9.3 s; breaks 0.25s + 0.2s
  v6_end:     {speed: 1.00}                    # start 33.60 s, <=3.2 s; break 0.3s

request: one per line; previous_text/next_text = neighbouring locked lines;
         "24/7" -> "twenty-four seven" in TTS input only
post:    NO pitch shift; HPF 80 Hz; +1.5 dB shelf @190 Hz; +1.5 dB @4.5 kHz;
         de-ess 6-8 kHz; 3:1 comp; optional plate <=8% wet; tempo only if over budget (<=6%)
after:   re-run audio/vo_b/make_ts.py -> src/voB.ts

add_to_account:
curl -X POST "https://api.elevenlabs.io/v1/voices/add/375c86e675d6d8b2b50d4c33cc6b7ef407a68953e41de9fc9f98a70b88bb21d9/OB0Jj6v9DGLLgz8dD57i" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"new_name": "Mariana - Female VO (Mike promo)"}'

# --- runner-up ---
runner_up:
  name:            "Cate - Female VO (Mike promo)"
  voice_id:        J64VNrjLE6uKFBKlxfSJ
  public_owner_id: 479ab2a2bcf64d1c95e8bb45a026c29f4212adf5b94f5af410d3039cd58cc917
  same model/settings; check v4 at speed 1.20 first (RP tends slow)
  curl -X POST "https://api.elevenlabs.io/v1/voices/add/479ab2a2bcf64d1c95e8bb45a026c29f4212adf5b94f5af410d3039cd58cc917/J64VNrjLE6uKFBKlxfSJ" \
    -H "xi-api-key: $ELEVENLABS_API_KEY" -H "Content-Type: application/json" \
    -d '{"new_name": "Cate - Female VO (Mike promo)"}'

alternate_2:
  name:            "Liberty X - Female VO (Mike promo)"
  voice_id:        iBo5PWT1qLiEyqhM7TrG
  public_owner_id: 6643afd1d55a6987b18e340e00bb89ed60329c878a01823e0c10a50fb522bd76
  use if both above need >8% stretch on v4/v5
```

## Handoff for Motion Director

The VO is being recast to Mariana (`OB0Jj6v9DGLLgz8dD57i`, eleven_multilingual_v2, no pitch shift, near-dry), with each line held to the locked starts and budgets (v2 ends by 4.04 s, v4 ≤12.1 s, v5 ends before the 29.6 s ping) so picture stays as is, but caption word timings in `src/voB.ts` will change once the new takes are picked and `make_ts.py` is re-run.
