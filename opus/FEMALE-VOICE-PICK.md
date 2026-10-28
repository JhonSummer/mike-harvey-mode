Mariana is the top pick, with Belle B and std_tripti_tvc as runners-up. While I was working, someone else wrote a 17 KB `opus/FEMALE-VOICE-PICK.md` that also picks Mariana (`OB0Jj6v9DGLLgz8dD57i`). I didn't overwrite it, so my full document is below. Choose which version to keep.

---

# Female VO pick for Mike Version B ("Coffee date, sun → moon")

This step only picks a voice; nothing has been generated. I read all 1,803 rows of `opus/_voice_data/female_compact_part1–7.txt`. Full descriptions and preview URLs come from `opus/ELEVENLABS-FEMALE-VOICES.md` and `opus/female_raw/shared_female_ranked_all.json`.

> **AUDITION NOTE: nobody has listened to any preview yet.** The picks are based only on metadata: name, accent tag, age, use case, description, usage and clone count. Treat the ranking as a hypothesis until someone has listened (§5).

## 1. Picks

### Top pick: Mariana - Intimacy with Authority

| Field | Value |
|---|---|
| voice_id | `OB0Jj6v9DGLLgz8dD57i` |
| Age / accent | middle_aged / american |
| Use case / descriptive | narrative_story / confident |
| In account? | **No.** Add it from the shared library: `POST /v1/voices/add/375c86e675d6d8b2b50d4c33cc6b7ef407a68953e41de9fc9f98a70b88bb21d9/OB0Jj6v9DGLLgz8dD57i` |
| Usage (1y) / clones | 36.9M chars / 24,398 |
| preview_url | https://api.us.elevenlabs.io/v1/voices/OB0Jj6v9DGLLgz8dD57i/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiRTJVc1pUOHYxdWIycU9ITmdTRWdkSWlDUllNMiIsImZpbGVuYW1lIjoiWHhteFoxakV3dHlqQ0dpRmlOVTcubXAzIiwidGltZXN0YW1wIjoxNzkzMDMwNDAwMDAwMDAwfQ%3D%3D |

**Why:**
- **Fit:** Her description reads "Contralto… Calm. Commanding. Intimate… bold, emotionally grounded narration with clean articulation and low-register impact… executive voiceovers, luxury ads." That is the female version of Hank's trailer gravitas. The low register gives authority to "Mike doesn't." and "You be the spectator," and the warmth keeps the coffee-date story from feeling cold.
- **Track record:** She is the most heavily used American voice with this profile, so she is well tested on multilingual_v2.
- **Accent risk:** Her description says she was "trained in English with a warm Latin undertone." The audition has to clear this.
- **Speed risk:** Calm contralto voices tend to run slow. She has to fit v4 into about 12 s at the 1.20 speed cap.

### Runner-up 1: Belle B - Premium Ad Narrator

| Field | Value |
|---|---|
| voice_id | `SQQyvkXssth4s6HD2OuR` |
| Age / accent | young / american |
| Use case / descriptive | advertisement / classy |
| In account? | **No.** Add it: `POST /v1/voices/add/7398804d9eaf2f463899a907587c33a390591775784f87857b6d0e1e4e3e66f6/SQQyvkXssth4s6HD2OuR` |
| Usage (1y) / clones | 7.0M chars / 7,632 |
| preview_url | https://storage.googleapis.com/eleven-public-prod/database/workspace/ed9b05e6324c457685490352e9a1ec90/voices/SQQyvkXssth4s6HD2OuR/GXFzEQkzG2gJtzbmJmbO.mp3 |

**Why:**
- **Fit:** Its description is the closest match to the brief in the whole list: "Polished, cinematic, and calm… luxury TVCs, product launch films… heritage brand narration… watch and jewellery reveals." Voices trained on ads usually keep clean diction when sped up.
- **Risk 1:** It is tagged "calm" and "young," so it may lack trailer punch on v3 and v6.
- **Risk 2:** The same studio also publishes the Indian voices Devi, Tripti and Ziina. Confirm in the preview that the American accent is fully native.

### Runner-up 2 (polished Indian English, already in the account): std_tripti_tvc

| Field | Value |
|---|---|
| voice_id | `ET6E1GmpkG4a6Sotpwm3` |
| Age / accent | middle_aged / indian |
| Use case / descriptive | advertisement / confident |
| In account? | **Yes** (account row 8) |
| preview_url | https://api.us.elevenlabs.io/v1/voices/ET6E1GmpkG4a6Sotpwm3/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJlZDliMDVlNjMyNGM0NTc2ODU0OTAzNTJlOWExZWM5MCIsImZpbGVuYW1lIjoiYjIzSWhUd1dsSnozbVVqUWtTOGgubXAzIiwidGltZXN0YW1wIjoxNzkzMDMwNDAwMDAwMDAwfQ%3D%3D |

**Why:**
- **Fit:** Its library name is "Tripti - Luxury TVC & Brand Films," described as "Polished, aspirational, and cinematic… the weight of a heritage label without ever sounding staged… prestige voiceovers where restraint sells more than volume." It is the best premium brand-film voice for the polished-Indian option.
- **Cost:** It is already in the account, so trying it costs nothing.
- **Accent risk:** This is the riskiest accent of the three, given that the Dr Joshi take was rejected for reading as Indian. Use it only if the client accepts a clearly premium Indian read. Listen for how it handles "Harvey" and "photographic-memory".

## 2. Also considered

| voice_id | Name | Reason |
|---|---|---|
| `mKn4iVyn09DrJ8cFw5Rn` | std_mona (in account) | "Deep, resonant, commandingly calm… global neutral accent." The most neutral Indian option, but its "measured pacing" may fight speed 1.2. |
| `q1eMiEpfmoW18ppbTyct` | std_devi (in account) | Indian luxury-ad voice with "calm certainty." It is young, so it has less gravitas than Tripti. |
| `m8AHWg36LJTQWKmfeGVv` | Sloane - Bold and Polished | American, "commanding yet approachable… executive narration, brand storytelling." Its usage_1y is 0, so it is unproven. |
| `z7U1SjrEq4fDDDriOQEN` | Vivie - Powerful and Commanding | American, cultured and warm, 274M chars a year so very reliable. Leans toward e-learning. |
| `7H4vk4UjjbKDZiGTgH8K` | DellaRayne - Smooth and Assertive | 600M chars a year, so proven at speed. Sounds more like news or social than luxury. |
| `J7gii3pWdApH2b9t8Q3G` | Katherine - Calm & Serious | Canadian: "deep, resonant… gravitas… trailers." Only 219 clones. |
| `Zg5uAMn2AyrBAbtY7Ivp` | Veronica - Cinematic Luxury Narrator | Canadian with a luxury tone. Her raspiness may smear at 1.2. |
| `lVpo6IOLjDX4LxkYRZyj` | Deborah - Trustworthy, confident | Polished, warm broadcast authority. More corporate than cinematic. |
| `99Hm6N8psCBzc1JwEVR2` | Riley - Charismatic News Anchor/Host | Broadcast authority, but may read as news. |
| `KLdWtAstZMPBbfqaBs59` | Klara - Tech Executive & Scientist | Crisp executive voice that suits legal tech. Cooler, with less warmth. |
| `3dzJXoCYueSQiptQ6euE` | Alexandra - Confident, Clear and Steady | Neutral North American with a "C-Suite" pitch. Plainer. |
| `EXAVITQu4vr4xnSDxMaL` | Sarah (in account, premade) | The most stable voice on v2. A baseline for checking timing, not a trailer voice. |

**Rejected categories:**
- **British RP / posh:** This includes Cate `J64VNrjLE6uKFBKlxfSJ`, which has the top heuristic score. These can read as "European," which the client already rejected.
- **Non-native accented English:** For the same reason.
- **US Southern or other regional accents:** Too regional for a premium film.
- **ASMR, whisper, sultry or meditation voices:** Excluded by the brief, and breathy voices break down at speed.
- **Influencer, UGC or bubbly voices:** The brief rules them out.
- **Customer care, IVR and recovery agents:** These are many of the Indian rows. They are trained on phone-call rhythm, not narration.
- **Character voices:** Villains, witches, kids and cartoons.
- **Heavy rasp or vocal fry:** These become unclear at 1.1–1.2.

## 3. Verdict on Yashvi G `iPyMoGJCQabaH9UW93N1`

**Not for this promo.**
- It is a conversational "Senior & Blunt Recovery Voice," built to sound like a firm debt-recovery call. That is phone-call authority, not trailer or brand-film authority.
- It is Indian-accented, which is the same issue that sank the Dr Joshi take.
- If the client likes Yashvi G's timbre, try the same artist's narration-trained version instead: **Yashvi G - Engaging & Mature Storyteller `S8MT6A6xoE9CbVbkYWwu`** (middle_aged, indian, narrative_story, shared library). Even that one would at best tie with Runner-up 2.

## 4. eleven_multilingual_v2 settings (Mariana)

```json
{
  "model_id": "eleven_multilingual_v2",
  "voice_id": "OB0Jj6v9DGLLgz8dD57i",
  "voice_settings": {
    "stability": 0.45,
    "similarity_boost": 0.80,
    "style": 0.30,
    "use_speaker_boost": true,
    "speed": 1.00
  }
}
```

These differ from Hank's settings (0.38 / 0.80 / 0.40) on purpose. An "intimate" contralto tends to turn breathy and over-acted at low stability and high style, especially when sped up.

Per-line settings (ElevenLabs caps speed at 1.20):

| Line | Window | Speed | Stability / style | Note |
|---|---|---|---|---|
| v1 | 0.25→2.30 | **1.05** | base | Matter-of-fact setup. |
| v2 | 2.30→<4.07 (≤1.77 s) | **1.05** | 0.42 / 0.30 | If it overruns, raise speed to 1.10 before shortening the break. |
| v3 | 6.13→8.10 | **0.92** | 0.40 / 0.40 | The weight line. |
| v4 | 8.10→~20.1 (~46 words in about 12 s ≈ 230 wpm) | **1.20** | 0.50 / 0.25 | Raised stability keeps diction clear. This is the line most likely to fail the fit. |
| v5 | 20.20→≤29.1 (~28 words) | **1.15** | 0.45 / 0.30 | Lift on "Introducing Mike." |
| v6 | 33.60→<37.0 | **0.97** | 0.40 / 0.40 | Confident sign-off with no flourish. |

**Runner-up adjustments:**
- **Belle B:** stability **0.40**, similarity 0.80, style **0.40**, same speeds. The lower stability and higher style add lift so the calm voice doesn't go flat. Belle B will probably fit v4 more easily.
- **Tripti TVC:** stability **0.48**, similarity 0.80, style 0.30, same speeds. If "Harvey" comes out wrong, respell it as "Harr-vee" for that line only.

## 5. Audition (about 60 seconds)

Nobody has heard any of these voices yet.

1. **0–20 s, Mariana:** Is there any Latin or non-American colouring? Does the low register sound commanding or sleepy? Is there breathiness at the ends of phrases?
2. **20–40 s, Belle B:** Is the American accent fully native? Does she still project, or does "calm" turn into a whisper? Are the consonants crisp?
3. **40–60 s, Tripti TVC:** Is the Indian accent premium and clear, or strong enough to repeat the Joshi problem? Does the restraint sound cinematic or corporate-flat?

**Any one of these disqualifies a voice:**
- A noticeable non-American accent (for the two American picks)
- Breathy, ASMR or sultry delivery
- Upbeat, sing-song or customer-service intonation
- Vocal fry or rasp
- Flat, robotic TTS

**Fallback order:**
- If Mariana fails the preview, or v4 runs over 12.0 s at speed 1.20 with stability 0.50, move to **Belle B**.
- If Belle B is too soft or not natively American, move to **Tripti TVC**, but only if the client accepts an Indian read.
- If none of the three works, try Sloane `m8AHWg36LJTQWKmfeGVv`, then Vivie `z7U1SjrEq4fDDDriOQEN`.
- Don't time-stretch audio more than about 5% to make it fit. Move to the next voice instead.

**First generation step:** render only v4 and v5. Those two lines show whether the timing fits and whether "photographic-memory" and "Harvey" are pronounced correctly.
inhales before "Mike" or a vocal-fry tail on "spectator".
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
