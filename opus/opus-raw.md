# Trailer Voice Pick

## Pick

**Hank (Deep and Engaging Narrator), from the Shared Voice Library**

- **voice_id:** `6F5Zhi321D3Oq7v1oNT4`
- **public_owner_id:** `e33eb547f8af39719b57253a6230915455d19c17d3f7781cabe273337a2e5df2`
- **Add to account (one-time):**

```bash
curl -X POST "https://api.elevenlabs.io/v1/voices/add/e33eb547f8af39719b57253a6230915455d19c17d3f7781cabe273337a2e5df2/6F5Zhi321D3Oq7v1oNT4" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"new_name": "Hank - Trailer (Mike promo)"}'
```

> **Not yet heard.** This pick is based on catalog descriptions and clone counts only. Before committing, play the `preview_url` for the pick and both alternates. Then render lines 3 and 4 with each voice as a quick test: line 3 shows how much weight the voice carries, and line 4 shows whether it can keep pace.

## Why

- **It's the brief.** The catalog description compares Hank to Don LaFontaine and James Earl Jones. That's the classic "In a world..." baritone the client asked for, and it moves away from the rejected Indian-accented narrator.
- **It can keep pace.** Line 4 is about 46 spoken words in 11.8 s, roughly 235 wpm. Line 5 is about 28 words in 8.2 s, roughly 205 wpm. Most "epic trailer" voices are slow and gravelly by design and would overrun. Hank is used mostly for social-media narration, which is fast, so it's the trailer-weight voice most likely to stay clear at this speed.
- **It's proven.** It has about 481k clones, the most of any trailer-style voice in the catalog. Voices used that widely tend to render the same way every time without artifacts, which matters when you're generating six lines and cutting them together.
- **Risk:** because it's so popular, some listeners may recognize it from Reels or TikTok. If the client hears it as "the social media voice", switch to Alternate 2. It sounds more premium.
- **Ruled out:**
  - Don (JJCR1…), both Davids (FF7K…, laTm…), Rex Thunder, Caelan and Atlas-gravelly: too slow or gravelly for line 4, or too heavy-metal for lawyers.
  - Stanley, Ed, Chuck Fresh and Guy: too campy or parody-adjacent.
  - Brian (in account): adds nothing, but has no trailer weight.

## Alternates

1. **Cinematic Trailer:** `ZGgk7KqsgEdrlwJ93DA8`, public_owner_id `dff6b1c14b2e27d8f3fa82c04009dc663c57af9658b79d1525181264a80b5d5e`. Built for trailers, described as having "crisp diction and strong dynamics". It's the most dramatic option that should still be understandable at line 4's speed. Use it if Hank sounds too warm or soft.
2. **Jax Meridian (Rich and Deep Storyteller):** `iB0m5bo5Htdz0t9yE0xq`, public_owner_id `84cda06e9b3e8c5549ed3bb9873d188926933cee854c35feec87c0091624b055`. Velvety and full of gravitas, explicitly pitched for "movie trailers… and sophisticated brand messaging". It's the most premium and credible fit for a legal audience. Use it if Hank sounds overexposed or too social-media.

Both use the same add-to-account call as above, with their own `{public_owner_id}/{voice_id}`.

## Recommended settings

**Model: `eleven_multilingual_v2`** for the delivered render.

- It supports `<break time="x.xs" />` tags, which give exact pauses.
- It has a dependable `speed` control. You'll need that to fit lines 4 and 5 to their slots.
- The same seed gives the same take, so re-renders are repeatable.
- `eleven_v3` modulates more expressively, but it doesn't support break tags, its takes vary a lot, and library voices not tuned for v3 are hit-and-miss on it. Try v3 only if the v2 takes still sound flat. If you do, render all six lines on v3 and don't mix models in the final cut, because the voice's timbre shifts between them.

**Base `voice_settings`:**

```json
{
  "stability": 0.38,
  "similarity_boost": 0.80,
  "style": 0.40,
  "use_speaker_boost": true,
  "speed": 1.0
}
```

- **stability 0.38:** low enough for real pitch movement. The rejected take used 0.6, which is part of why it sounded flat. Don't go below 0.30, or the voice starts to wobble and change character.
- **style 0.40:** pushes the speaker's trailer delivery. Above 0.5, takes become unstable and can tip into parody.
- **Per-line overrides** (see the table below): only `speed`, plus stability 0.42 on line 4 to keep that long read steady.

**Workflow:**

- Render one request per line.
- Pass `previous_text` and `next_text` (the neighbouring VO lines) so the intonation flows from line to line.
- Use `output_format: "pcm_44100"` or `mp3_44100_192` for the mix.
- Render 3–4 takes per line with different `seed` values and pick the best.
- In the TTS input only, write "24/7" as **"twenty-four seven"**. This affects pronunciation only. The captions and locked copy stay "24/7".

## Delivery notes per line

| # | TTS input (copy unchanged; tags/normalisation only) | speed | Target | Delivery |
|---|---|---|---|---|
| 1 | `Your assistant works on your laptop.` | 1.00 | ~2.2 s | Low and matter-of-fact. This is the setup, not a sell. Put light weight on "**laptop**" and let the period pull the pitch down. |
| 2 | `But what if <break time="0.5s" /> you close it?` | 1.00 | ~2.5 s | This is the "In a world" beat. Hang "what if" slightly up, give it a real breath of silence, then land "**close** it" with a soft question that rises and then settles. The break tag stands in for the ellipsis because v2 treats a bare "…" inconsistently. |
| 3 | `Mike doesn't.` | 0.92 | ~1.3 s | **This is the line with the most weight.** It's the lowest pitch in the spot: flat, final and certain, with stress on "**Mike**". Render it on its own. If it ends on an upturn, re-roll the seed or raise stability to 0.45. Leave about 0.5 s of air after it in the edit. |
| 4 | `But what if you had a twenty-four seven assistant that learns on its own, doesn't need to be prompted, and keeps working while you're on a coffee date, in a high-stakes meeting, or busy drafting a notice. <break time="0.3s" /> And when it's done, it texts you.` | 1.10 (cap 1.15) | ≤11.8 s | Start conversational and build. Let the commas carry the rhythm. Read the three scenarios as an ascending list, getting slightly brighter on each: coffee date → **high-stakes** meeting → drafting a **notice**. Drop the pitch for the payoff, "it **texts** you", with a hint of a smile. Don't add any other pauses. If it's still long at 1.15, time-stretch it by up to 5% in post rather than cutting the breath before "And". |
| 5 | `Introducing Mike, <break time="0.3s" /> your twenty-four seven photographic-memory associate, that goes through the docs overnight, and during the day <break time="0.4s" /> and lets you be the Harvey of the game.` | 1.05 | ≤8.2 s | This is the second trailer moment. "Introducing **Mike**" should be big and slow, with the pitch landing on the name. Keep "photographic-memory associate" crisp and fluent. Suspend the pitch on "during the day", pause, then resolve down on "the **Harvey** of the game". If it overruns, shorten the first break to 0.2 s before raising the speed. |
| 6 | `Let Mike do its thing. <break time="0.4s" /> You be the spectator.` | 0.95 | ~3.3 s | Relaxed confidence, like closing an argument. Give the first sentence a level close, then lean back for "You be the **spectator**", with a falling final cadence and no upturn. |

**General punctuation rules for v2:**

- Commas give short lifts in pitch. Periods give firm drops. A question mark gives a rise.
- Avoid ALL CAPS and exclamation marks. They push the voice toward an announcer or comedy read.
- Use no more than 2 break tags per line. More than that causes speed drift and artifacts.

## Handoff for Motion Director

VO is Hank (`6F5Zhi321D3Oq7v1oNT4`, eleven_multilingual_v2), rendered one line at a time: line 4 fits in 11.8 s or less, line 5 in 8.2 s or less, and the two weight beats ("Mike doesn't." and "Introducing Mike") each get about 0.5 s of air after them; final per-line timings will follow once takes are picked.
