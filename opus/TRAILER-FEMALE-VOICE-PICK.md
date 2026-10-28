# Mike Version B: female trailer VO pick

Nobody has auditioned any preview yet. This pick is based only on the catalog metadata.

## A. Chosen voice

**Mariana - Intimacy with Authority**
- voice_id: `OB0Jj6v9DGLLgz8dD57i`
- Source: **shared** (Voice Library). It has to be added to the account before TTS (see F).
- Metadata: middle_aged · American · narrative_story · confident · **24,398 clones**

**Why her:**
- **Authority and size:** her own description says "Contralto… Calm. Commanding… low-register impact." The new mix is near-dry, so the voice has to carry the size without hall echo. A contralto is the only female range that can do that. She is the closest female match to the Hank-plus-weight target.
- **Warmth without going soft:** her stated use cases are "executive voiceovers, luxury ads, political messaging." That is the premium, credible register lawyers will trust. She is not influencer, not e-learning, not IVR.
- **Clarity at speed 1.2:** "clean articulation" is called out explicitly. That matters most for v4 and v5, and for the final "t" in "doesn't."
- **Accent risk is low:** she reads as American, with a "warm Latin undertone." On a contralto that comes across as richness, not as an accent. It is nowhere near the Joshi problem.
- **Reliability:** 24k clones means the model reproduces her consistently across seeds. Low-clone voices (a few hundred) are more of a gamble from one take to the next.
- **The one risk:** the word "intimacy" in her name. With a high style setting she could drift towards breathy or seductive. The settings in C keep style low and stability moderate to prevent that.

**Why not the obvious others:**
- **Cate** (British RP, trailer use listed) is the best-scoring voice on paper. But British RP moves away from the American "movie" feel the brief asks for, so she is the runner-up.
- **std_mona** and the other Indian account voices are rejected. After the Joshi rejection, any Indian-sounding read risks the same note from YP's brother, and nothing in the account matches Mariana's low-register trailer weight.
- **Veronica, Velvet Noir and Valerie** are rejected because their descriptions ("smoky," "breathless," "sultry") all lean seductive.

## B. Runner-up and backup

**Runner-up: Cate - Resonant, Deep and Elegant**, `J64VNrjLE6uKFBKlxfSJ` (shared, British RP, 10,967 clones)
- She is the only female voice whose description lists "film trailers" alongside "gravitas, authority."
- She is deep and resonant, and RP diction protects final consonants very well.
- **Trade-off:** she is British, not American. RP still reads as premium and credible to lawyers, but less "Hollywood" than an American read.

**Switch to Cate if any of these happen:**
1. Mariana goes breathy or intimate across 3 or more seeds, even at style ≤ 0.25.
2. Mariana's "t" in "doesn't" will not land at any setting.
3. Mariana cannot fit v4 inside the window even at 1.20 speed plus a 5% stretch.

When using Cate, keep the same settings but drop style to 0.20, because RP gets theatrical quickly.

**Third backup:** **Katherine - Calm & Serious**, `J7gii3pWdApH2b9t8Q3G`. Canadian, so North American neutral; "deep, resonant… natural gravitas… documentaries, trailers." She has only 219 clones, so generate more seeds (8 or more per line).

## C. Modulation settings

**Base voice_settings:**
```json
{
  "stability": 0.45,
  "similarity_boost": 0.80,
  "style": 0.28,
  "use_speaker_boost": true,
  "speed": 1.00
}
```

Why these differ from Hank's settings:
- **Stability is higher** (0.45 against Hank's 0.38). That keeps consonants consistent at speed and stops a contralto from drifting into breathy dips.
- **Style is lower** (0.28 against 0.40). Style exaggerates the speaker's own traits, and for Mariana that trait is "intimacy." Keep it at 0.35 or below.

**Per-line table:**

| Line | Cue → hard end | Speed | Overrides | Notes |
|---|---|---|---|---|
| v1 | 0.25 → ~2.25 s | 1.05 | none | Statement, flat confident landing |
| v2 | 2.30 → **4.04 s** | 1.15 | none | Tight. If it runs long, shorten the break gap in post to about 0.22 s. Do not change the text. |
| v3 | 6.13 s | 0.92 | stability 0.55, style 0.22 | The weight line. Slow, low, final "t" must land (see D). |
| v4 | 8.10 → ~20.4 s | 1.20 | stability 0.50, style 0.22 | Dense. A time-stretch of up to 6% in post is fine (formant-preserving, e.g. rubberband or `atempo`). Stretching more than that audibly thins her. |
| v5 | 20.20 → **29.1 s** | 1.17 | stability 0.48, style 0.30 | Lift slightly on "Introducing Mike"; land "Harvey of the game" with a smile, not a sell |
| v6 | 33.60 → ~36.9 s | 1.00 | stability 0.48, style 0.32 | Button line, relaxed authority |

**Seeds:** generate 4–6 seeds per line, lock the winner's seed, and re-render from that seed if you change any settings.

**Post: pitch**
- Leave her at **natural pitch**. Pitch-shifting a female voice down introduces formant artifacts and quickly sounds uncanny or "processed AI."
- The most you should ever do is −0.5 semitone with formant preservation, and only if YP's brother asks for "deeper." The default is 0.
- Get the size from EQ and dynamics, not from pitch.

**Post: EQ and dynamics for a near-dry mix**
- HPF at 75 Hz (12 dB/oct).
- +2 dB low shelf at about 180 Hz for chest and body.
- Narrow −2 dB cut at 300–400 Hz if it sounds boxy.
- +1.5–2 dB presence bell at about 3.5–4.5 kHz. This is where intelligibility at 1.2 speed lives.
- +1 dB air shelf at 11 kHz.
- De-esser at 6–8 kHz, set gently. Bypass it or raise its threshold on v3 so it does not eat the "t."
- Compression: 3:1, attack 10–15 ms so consonant transients pass through, release about 80 ms, 3–5 dB of gain reduction. Optionally add 10–15% parallel saturation for density.
- Space: no hall. If anything, a short plate or room (0.6–0.8 s) at 5–8% wet, pre-delay 20 ms, with the low end of the return cut below 300 Hz.

## D. Sample direction

**v1, "Your assistant works on your laptop."**
- A calm, matter-of-fact setup, almost understated. Mid-low pitch, no upward inflection.
- "laptop" lands down with a crisp final "p."
- This is the voice of someone who already knows the twist.

**v2, "But what if… you close it?"**
- "But what if" leans forward slightly and is a touch quicker. The 0.3 s break is a held breath.
- "you close it?" is a soft but pointed question with a short "it." It is not a sing-song rise.
- It must be clean before the 4.04 s slam. Pick a seed where "it" stops crisply with no trailing breath.

**v3, "Mike doesn't."**
- Lowest, slowest read in the spot, delivered with total certainty. "Mike" sits slightly forward; "doesn't" drops and closes.

How to make the "t" land:
1. Use `next_text` on the API request (see E), for example `"That is the difference."`. Without following context, multilingual_v2 tends to trail off the end of a phrase and drop final stops. With context, it articulates through the end of the word.
2. Raise stability to 0.55 for this line so the release is consistent.
3. Generate at least 6 seeds and pick by ear (and on a waveform) for an audible "t" burst. You should see a small transient roughly 60–120 ms after the "n."
4. In post:
   - Do not gate, fade or trim the tail until about 120 ms after that burst.
   - Bypass the de-esser on this line.
   - If the "t" is present but weak, apply a +2 dB 4 kHz bell automated onto the "t" only, or use a transient shaper.
5. Never leave a `<break>` after "doesn't."

**v4 (dense):**
- Keep the momentum and do not rush the list. Give a micro-lift on each item: "coffee date / high-stakes meeting / busy drafting a notice."
- "And when it's done, it texts you" eases off with a knowing half-smile and a crisp "you."
- Reject any seed that blurs "twenty-four seven" or "prompted."

**v5:**
- "Introducing Mike" carries brand-film pride, followed by the 0.2 s beat.
- "photographic-memory associate" must be clearly hyphen-grouped.
- "overnight, and during the day" contrasts.
- "the Harvey of the game" is the payoff. Warm, confident, not cheesy.
- It must clear 29.1 s.

**v6:**
- "Let Mike do its thing" is relaxed and assured. After the beat, "You be the spectator" is the closer: low and a little slower in feel even at speed 1.0. "spectator" lands fully closed.

## E. CODE-NOTES

```
voice_id:  OB0Jj6v9DGLLgz8dD57i   # Mariana - Intimacy with Authority (after add-to-account, use the returned voice_id if it differs)
model_id:  eleven_multilingual_v2
endpoint:  POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}?output_format=pcm_48000   (or mp3_44100_192)
```

**Base voice_settings:**
```json
{"stability": 0.45, "similarity_boost": 0.80, "style": 0.28, "use_speaker_boost": true, "speed": 1.00}
```

**Per-line requests.** The `text` values are exact. Each line's `voice_settings` is the base object merged with that line's overrides.
```json
[
  {"id":"v1","text":"Your assistant works on your laptop.",
   "voice_settings":{"stability":0.45,"similarity_boost":0.80,"style":0.28,"use_speaker_boost":true,"speed":1.05}},

  {"id":"v2","text":"But what if <break time=\"0.3s\" /> you close it?",
   "voice_settings":{"stability":0.45,"similarity_boost":0.80,"style":0.28,"use_speaker_boost":true,"speed":1.15}},

  {"id":"v3","text":"Mike doesn't.",
   "next_text":"That is the difference.",
   "voice_settings":{"stability":0.55,"similarity_boost":0.80,"style":0.22,"use_speaker_boost":true,"speed":0.92}},

  {"id":"v4","text":"But what if you had a twenty-four seven assistant that learns on its own, doesn't need to be prompted, and keeps working while you're on a coffee date, in a high-stakes meeting, or busy drafting a notice. And when it's done, it texts you.",
   "voice_settings":{"stability":0.50,"similarity_boost":0.80,"style":0.22,"use_speaker_boost":true,"speed":1.20}},

  {"id":"v5","text":"Introducing Mike, <break time=\"0.2s\" /> your twenty-four seven photographic-memory associate, that goes through the docs overnight, and during the day, and lets you be the Harvey of the game.",
   "voice_settings":{"stability":0.48,"similarity_boost":0.80,"style":0.30,"use_speaker_boost":true,"speed":1.17}},

  {"id":"v6","text":"Let Mike do its thing. <break time=\"0.25s\" /> You be the spectator.",
   "voice_settings":{"stability":0.48,"similarity_boost":0.80,"style":0.32,"use_speaker_boost":true,"speed":1.00}}
]
```

**Executor notes:**
- `next_text` is used on v3 only. It shapes the prosody but is not spoken. Do not add it to any other line.
- Pass `"seed": <int>` per request. Generate 4–6 seeds per line (6 or more for v3) and record the winning seeds.
- Timing gates:
  - v2 ends ≤ 4.04 s
  - v4 ends ≤ about 20.4 s (stretch ≤ 6% allowed)
  - v5 ends ≤ 29.1 s
- If v4 overruns at 1.20 speed plus 6% stretch, escalate to Cate (B). Do not change the text.
- If Mariana is rejected, swap the voice_id to Cate `J64VNrjLE6uKFBKlxfSJ` with style −0.08 on every line, or to Katherine `J7gii3pWdApH2b9t8Q3G` with identical settings.

## F. Add-to-account curl

Executor note: the public_owner_ids were filled in from `opus/ELEVENLABS-FEMALE-VOICES-TRAILER.json` in the curls below. All three voices were added to the account at about 23:31 ICT.

```bash
# Chosen: Mariana
curl -X POST "https://api.elevenlabs.io/v1/voices/add/375c86e675d6d8b2b50d4c33cc6b7ef407a68953e41de9fc9f98a70b88bb21d9/OB0Jj6v9DGLLgz8dD57i" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"new_name": "Mariana - Trailer Female (Mike promo)"}'

# Runner-up: Cate (add now so a switch costs nothing)
curl -X POST "https://api.elevenlabs.io/v1/voices/add/479ab2a2bcf64d1c95e8bb45a026c29f4212adf5b94f5af410d3039cd58cc917/J64VNrjLE6uKFBKlxfSJ" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"new_name": "Cate - Trailer Female (Mike promo)"}'

# Third: Katherine - Calm & Serious
curl -X POST "https://api.elevenlabs.io/v1/voices/add/34883c8a2a97f7688e9e728e23136741ad8b91f4eac9e41a6b6adea63286d999/J7gii3pWdApH2b9t8Q3G" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"new_name": "Katherine - Trailer Female (Mike promo)"}'
```

Use the `voice_id` returned by each add call in the TTS requests. It is usually the same id, but confirm it.
