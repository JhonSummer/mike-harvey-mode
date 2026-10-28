# FIRST SCENE GRADE: Mike A-roll, 0–8 s (final KEEP masters)

Graded 2026-10-26 ~20:20 (UTC+7). Triggered by YP in 7HL Promo: the first scene "isn't feeling", plus a question about sizing. "Ask opus." YP was replying to the **16:9** attachment.

- **Masters:** `out/mike-harvey-mode-16x9.mp4` (1920×1080) and `out/mike-harvey-mode-9x16.mp4` (1080×1920). Both are 28 s at 30 fps.
- **How the 9:16 is made:** it is a hard crop of comp x 656–1264 (608 px), scaled 1.776× (`build.sh`).
- **Frames:** `opus/first-scene-frames/{16x9,9x16}/tNN.N.png`, one every 0.5 s from 0.0 to 8.0, plus 2.7 and 2.9 for the lid fold. 1:1 crops are in `opus/first-scene-frames/crop-*.png`.
- **Opus:** `opus/prompt-first-scene.txt` → `opus/opus-raw-first-scene.md` (`claude -p --model opus --allowedTools Read`; exit 0, ~160 s; Opus opened the frames itself).
- **Scope:** grade only. No source edit and no re-render.

## A. Call: **PATCH (heavy)**, first scene only (f0–150)

The story beat is right: she is mid-task, the lid closes, and the session dies. The fault is in the execution: the camera, the scale, the lid mechanics and the dead air. Keep the assets and the f150 Gazette handoff, and rebuild the camera and lid inside `Open`. Everything from f150 on is unchanged apart from one flagged item (Gazette scale in 16:9). Opus and I independently reached the same call.

## B. What YP means by "sizing" (verified px)

YP is saying **"I can't see anything,"** and the 16:9 is the worse master.

| Element | 16:9 (1920×1080) | 9:16 (1080×1920) |
|---|---|---|
| Laptop open, 0–2.5 s | 556×366 → 589×421 px. **29–31 % of width, 9.8–12.2 % of area.** Side margins ≈670–680 px each, top 260, bottom 390–447 | 988×738 → 1045×749 px. **91–97 % of width**, 35–39 % of area. Side margins shrink to **46 → 26 / 9 px** and the deck nearly bleeds off the right edge at 2.5 s (x-drift makes it asymmetric) |
| On-screen text (assistant stream, the 7.3 row) | ≈12 px font, ≈8 px cap height. The doc header is ≈10 px. Readable only at 1:1 on a monitor; illegible on a phone | ≈21 px, header ≈18 px. Readable |
| Closed slab, 3.0 s | 594×75 px = **2.1 % of area** | 1055×150 px. Right margin **6 px** |
| Slab + "session ended" pill, 3.5–5.0 s | 465–542 × 112–131 px = **2.5–3.4 % of area. About 88 % of the frame is black for about 2 s.** The camera is also pulling *out* (1.06 → 0.80) | ~460 px of void above, ~700–900 px below |
| "Assistant · session ended" pill | Text ≈20 px at **45 % opacity**. Reads as disabled UI | Text ≈36 px |
| Time super | Text block 300×19 px at y 68–87 | 532×33 px at y 122–155, **inside the Reels/TikTok top-UI zone** |
| Gazette card, 6–8 s | ≈460–500 px wide (24–26 % of width): same complaint | ≈820 px wide (76 %): fine |

Other things I found:

- **Keystroke UI:** there is none. The keyboard is grey dashed bars, and there are no hands and no typing. The only motion before the close is the assistant text streaming at 12 px.
- **Header collision:** "INDUS AIR · FALCON GULF CODESHARE" overlaps the scrolling skeleton bars from 2.0 to 2.7 s. The doc scrolls 46 px under a header with no background, so it looks broken at 1:1.
- **Empty super:** at 5.5 s the super pill shows "10:16 PM ·" with an **empty right half**, during the label crossfade.
- **Soft first frame:** f0 is blurred and dim. `Scene` enter gives about 5.6 px blur at 37 % opacity at f0, which makes a bad thumbnail.

## C. Feel and believability of the lid-close open

- **The squash isn't a hinge.** The lid uses `scaleY(cos θ)` with no perspective. At t02.9 the screen glyphs are visibly crushed vertically, so it reads as a "CRT power-off", not a lid. No edge comes toward camera and nothing has weight. The slam SFX (2.98 s) lands on a squash.
- **The closed state reads as a tray.** It is a trapezoid slab with a 4 px dot, no lid thickness and no front lip.
- **Prop scale against the void:** the hero object is a tenth of the frame. The emotional payload is the half-sentence "…may not hold once routes are▌" being cut off, and at 16:9 nobody can read it.
- **Show vs tell:** the close is *shown*, but the death is *told* by "Assistant · session ended", a dim label that arrives 0.5 s after the slam. Opus says cut it and replace it with a status LED going dark. I agree.
- **Momentum:** 0–0.5 s is dead (empty assistant pane plus the blur-in). 3.0–5.0 s is a static, tiny slab while the camera recedes, which is about 2 s of nothing before the Gazette arrives.
- **Who/when arrives late:** "Meera's out" lands at 3.3 s, after the money beat, so the first 3 s have no who and no when.

## D. 16:9 vs 9:16

- **Root cause:** one camera serves two crops. The 9:16 is a 608-px slice of the 16:9 comp, so any scale that makes the laptop big enough in 16:9 overflows the 9:16, and the current scale is tuned for the 9:16 crop.
- **16:9 is too small:** 30 % of width, 11 % of area, 12 px text, 88 % void after the close. **This is the attachment YP replied to.**
- **9:16 is too big at the edges:** 91–98 % of width with 6–9 px edge margins during the jolt and drift. The text is readable. The super sits in the platform top-UI zone, and there is ~700 px of void below the laptop.
- **The fix needs aspect-aware camera values.** That means either a second `Composition` at 1080×1920 or an `aspect` prop with a separate render pass, plus a `build.sh` change that stops the hard crop for 9:16, at least for f0–150.

## E. Fix brief for Motion Director

Scope: everything happens inside the `Open` component (f0–~165) plus the `TimeSuper` timing. The f150 Gazette handoff stays. Units are design px unless marked "delivered".

**0. Plumbing**
- Add `aspect: '16x9' | '9x16'`, via a second Composition (1080×1920) or a prop.
- Render 9:16 natively instead of `crop=1216:2160:1312:0`. If that is out of scope, keep the crop, but then the 9:16 safe rules below must hold inside comp x 656–1264.

**1. Camera.** Scale C applies to the laptop stage (deck 560 wide, lid 480×300). Lock camera x to the laptop centre with **no x-drift** (keep the y-drift ≤4 px). Never pull out in f0–150.

| Frames | 16:9 C | 9:16 C | Ease |
|---|---|---|---|
| f0–50 | 2.60 → 2.50 (screen ≈1250 px = 65 % W, assistant text ≈30 px delivered) | 1.35 → 1.30 (screen ≈1150 px delivered, bezel just off-frame, text ≈28 px delivered) | linear |
| f50–68 | → 1.75 (laptop ≈980×672 = 51 % W, 62 % H, **≈32 % of area**) | → 0.92 (laptop ≈915 px = **85 % W**, centre y ≈880) | inOut cubic |
| f80 | kick +0.04, y +6 px, spring (damping 12, stiffness 200), settled by f92 | same, y +10 px | — |
| f92–150 | slow push 1.75 → 1.90 | 0.92 → 0.98 | linear |

Delete the current `punch` 1.06 → 0.80 pull-back and the −90 px jolt pan.

**2. Stream**
- At f0 the assistant line 1 is already rendered ("Checking cl. 7.3 against the draft fare rules —").
- Stream at ~40 chars/s and **keep streaming into the close until f72**, so the lid cuts off "…once routes are".
- f0 is sharp. Remove the enter blur; if a focus-in is wanted, it is sharp by f6.

**3. Lid**
- Parent: `perspective: 1400px`, `perspectiveOrigin: '50% 25%'`, `transformStyle: 'preserve-3d'`.
- Lid: `transformOrigin: '50% 100%'`, `rotateX` 0 → ≈−105° over **f62–78**, `Easing.in(Easing.quad)`. Flip the sign if the top edge recedes instead of advancing toward the lens.
- Contact at **f80**, rebound +3° over f80–83, settled by f86.
- Two faces with `backfaceVisibility: hidden`: the screen face, and a lid-back face with a 6 px thickness edge and a logo mark.
- **Delete the `scaleY` squash and the drawn trapezoid slab.**
- Audio: **move the slam SFX from 2.98 s to f80 = 2.67 s** (`audio/mix28.py`, then rebuild `mix28.wav`).

**4. Death beat (show, not tell)**
- f72–80: a 2–3 px light sliver in the closing gap plus glow spill on the deck, fading 0.6 → 0 by f88.
- Add a 4 px amber status LED on the deck front. It breathes at 1 Hz while the assistant works and **goes off at f96**.
- **Cut the "Assistant · session ended" pill.**

**5. Time super**
- Fade "☾ 9:47 PM" in over f4–14.
- At **f80** (on the slam), slide-append "· Meera's out" over 8 frames.
- Over f96–150, tick 9:48 → 10:16 with an in-cubic ease.
- The pill width animates to fit its content and labels crossfade, so there are **no empty-label frames** (fixes the 5.5 s "10:16 PM ·" gap).
- 16:9: text 30 px, pill height 56, top y = 48.
- 9:16: text 40 px delivered, pill top **≥ y 240** delivered, max width 900.

**6. 9:16 safe area (delivered px)**
- Key content stays inside x 90–990 and y 240–1500.
- Laptop bottom ≤ y 1250.
- The deck stays ≥80 px from either edge at every frame, including the jolt.

**7. Doc pane**
- Give the header an opaque background (the pane colour) with a z-index above the rows.
- Clip the scroll region to start 8 px below the header.

**8. Timing anchor**
- The Gazette cross-blur stays at f150–168, so the downstream timeline is untouched.
- If the lull persists, start it at f135 and absorb the 15 frames by holding the Gazette longer.

**9. Flag (next scene, optional)**
- The 16:9 Gazette card at 460 px is 24 % of width, which is the same complaint. Scale it 1.4× (≈640 px) in 16:9 only.

**Acceptance check after re-render:** extract the same timestamps and confirm:
- the 16:9 laptop is ≥30 % of area during f50–80;
- assistant text is ≥26 px delivered;
- 9:16 edge margins are ≥80 px;
- no frame has an empty super label;
- t02.9 shows hinge rotation with no squashed glyphs.
