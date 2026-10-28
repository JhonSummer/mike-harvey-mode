# ElevenLabs voice pick: 7HL Promo, VO Version B (trailer baritone)

I chose these from the labels and descriptions in `opus/ELEVENLABS-VOICES-FOR-TRAILER.md`. I didn't listen to the previews, so audition the three before you lock one in.

## 1. Top pick: Brian, `nPczCjzI2devNBz1zQrb`
- **Fit:** It's labelled "Deep, Resonant," it's a middle-aged American male, and it's meant for "narrations and advertisements." That matches the classic US trailer sound.
- **Low-end weight:** It's a premade voice with a lot of chest resonance, and it holds a low register well when you slow it down.
- **Skip these:** Adam (`pNInz6obpgDQGcFmaJgB`) and Eric (`cjVigY5qzO86Huf0OWal`) are described as **tenors**, which is wrong for this read.

## 2. Runners-up
- **Runner-up 1: Dr Joshi, Deep Cinematic Male, `WkJcHHkxVUZl4ua7fWlW`**
  - Its description is the closest match on paper: "deep, cinematic, rich, resonant baritone… authoritative, serious."
  - Its accent is Indian English, not American. That's the only reason it isn't the top pick. If the promo is for an Indian audience, it could be the better choice.
- **Runner-up 2: Bill, Wise, Mature, `pqHfZKP75CvOlQylNhV4`**
  - It's an older American male voice meant for advertising, so it brings age and gravitas, like a veteran trailer narrator.
  - It's less deep than Brian and leans warm rather than ominous. Use it for a "legendary narrator" feel.

## 3. Model: `eleven_multilingual_v2`
- **The deep voice stays consistent:** v2 keeps a premade baritone steady across takes. v3's expressive range can sometimes make the voice drift or sound brighter, especially with emotional tags.
- **You can control pauses exactly:** v2 supports `<break time="1.2s" />`. v3 doesn't support break tags; it only takes cues from punctuation and audio tags. Trailer cadence depends on exact pause lengths.
- **All five settings apply:** In v3, stability is a three-step choice (Creative, Natural or Robust), and some of the other settings matter less, so the JSON below wouldn't map cleanly.
- **When to try v3 instead:** If v2 sounds too flat, A/B it on v3 with stability set to "Natural" and tags like `[dramatic]`, `[ominous]` or `[low, slow]`. Expect to generate more takes and pick the best.

## 4. voice_settings
```json
{"stability": 0.40, "similarity_boost": 0.85, "style": 0.35, "use_speaker_boost": true, "speed": 0.88}
```
- **stability 0.40:** Lower stability gives more pitch movement for dramatic swells. Below about 0.30 you risk artifacts and the voice drifting.
- **similarity_boost 0.85:** Keeps Brian's deep timbre locked in.
- **style 0.35:** Exaggerates the delivery a bit for gravitas. Higher than about 0.5 tends to go hammy and become unstable.
- **use_speaker_boost true:** Gives more presence and body to the voice.
- **speed 0.88:** The slow, deliberate trailer pace, without sounding stretched. Don't go below about 0.8.

## 5. Delivery and script tips
- **Generate one line per request.** Then stitch the lines together in the edit, which is how a real trailer VO is cut. If you need continuity across lines, pass `previous_text`/`next_text`, and fix the `seed` so takes are repeatable.
- **Use real breaks for beats:**
  `In a world… <break time="1.0s" /> where one man… <break time="0.8s" /> must choose.`
  Keep each break under 3s, and use only a few per request; too many make the output unstable.
- **Pause types:**
  - Ellipses (`…`) give a trailing, suspenseful pause.
  - A period gives a hard stop.
  - An em dash (`—`) gives an abrupt cut.
  - Commas give short breaths only.
- **Phrasing:**
  - Use short declarative lines and end each with a period so the pitch falls at the end. Avoid question marks, because the pitch goes up.
  - Put the title or payoff line on its own, after a longer break of about 1.5s.
  - Use caps only on single words you want stressed (e.g. "ONE man"). Too many caps makes the voice shout.
- **Post-processing for the "trailer" sound:**
  - Pitch down 1–2 semitones, keeping the formants.
  - Add a low-shelf boost around 100–150 Hz.
  - Compress firmly, around 4:1.
  - Add a touch of hall reverb.
- **If you switch to v3:**
  - Put tags at the start of each line, e.g. `[deep, slow, ominous] In a world…`.
  - Use `[pause]` or ellipses for beats.
  - Avoid stacking more than two tags per line.
