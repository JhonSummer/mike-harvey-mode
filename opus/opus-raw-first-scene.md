# Mike promo, first scene (0–8 s): director's grade

## 1. Call: PATCH (heavy)

The story beat is right: she's mid-task, the lid closes, the session dies. What's wrong is the camera, the lid mechanics and the dead air. Keep the drawn assets and the f150 handoff, and rebuild the camera curve and the lid inside the same component.

## 2. Sizing: what YP means

YP means **"I can't see anything."** In the 16:9 the hero laptop is 556–589 px wide, about 30% of frame width and only **10–12% of frame area**. It sits in roughly 675 px of black on each side. The story lives on the screen, and that text is about 12 px with an 8 px cap height. At t02.5 I can read "Checking cl. 7.3 against the draft fare rules…" only in the 1:1 crop. On a phone watching the 16:9 post it's grey lint.

After the close it gets worse. The slab is **2.1% of the area** at 3.0 s, and the slab plus pill is 2.5–3.4% from 3.5–5.0 s, so **about 88% of the frame is black for about 2 s.** The camera also pulls *out* (1.06→0.80) while the subject is already tiny, which shrinks it further. The Gazette card at 6.5 s has the same problem: 460 px, 24% of width.

**The 16:9 is the worse master.** The 9:16 has the opposite fault: the laptop is 91–97% of the width and the deck bleeds to x≈1072 at 2.5–2.9 s (asymmetric drift), but at least its 21 px screen text is readable.

## 3. Feel

- **The lid close isn't believable.** A scaleY squash flattens the *screen text* (t02.9: the glyphs are visibly crushed vertically). That reads as a "CRT power-off", not a hinge. No edge comes toward camera and there's no acceleration.
- **The closed slab reads as a tray.** It's a trapezoid that is narrow at the top, with a 4 px dot. It has no lid thickness and no front lip, so it doesn't read as a laptop.
- **The loss doesn't land.** The screen just dims and the half-sentence "…once routes are▌" is unreadable at 16:9 size. The cut-off thought *is* the emotion, and nobody sees it.
- **The "Assistant · session ended" pill tells instead of shows.** At 45% opacity and 20 px it also reads as disabled UI, not a death. Cut it.
- **0–0.5 s is dead.** The assistant pane is empty with a cursor, and f0 is soft (both masters look blurred at t00.0), which is bad for the thumbnail.
- **3.0–5.0 s kills momentum.** A static tiny slab with a receding camera, then at 5.5 s the super pill shows "10:16 PM ·" with an **empty right half**.
- **The "Meera's out" super arrives too late.** It lands at 3.3 s, after the money beat, so the first 3 s have no who or when. Bring the time in at f4 and attach "Meera's out" *on the slam*, so the caption is synced to the action.
- **The header collides with the doc rows.** "INDUS AIR · FALCON GULF" overlaps the skeleton bars from 2.0–2.7 s and looks broken.

## 4. 16:9 vs 9:16

| | 16:9 | 9:16 |
|---|---|---|
| Laptop | 30% W, 11% area: too small | 91–97% W, bleeds right: too big |
| Screen text | ~12 px, illegible | ~21 px, OK |
| Void | 88% after close | ~460 px above and ~700 px below the laptop |
| Super | y 68, fine | y 122–155, **inside the Reels/TikTok top-UI zone** |

The root cause is that **one camera is serving two crops** (the 9:16 is the comp's x 656–1264, so 608 comp px wide). No single scale works for both, so the camera has to be aspect-aware.

## 5. Fix brief (one component; `aspect` prop or `height>width`)

**Camera.** The camera scale C applies to the design-unit stage (laptop deck 560 wide, lid 480×300). Lock camera x to the laptop centre with no x-drift; drift on y only.

| Frames | 16:9 C | 9:16 C (comp) | Ease |
|---|---|---|---|
| f0–50 | 2.60→2.50 (tight: screen ≈1250 px, 65% W; assistant text ≈30 px) | 1.35→1.30 (screen ≈1150 px delivered, bezel just off-frame; text ≈28 px) | linear |
| f50–68 | →1.75 (laptop 980×672 px = 51% W, 62% H, **≈32% area**) | →0.92 (laptop ≈915×627 delivered = **85% W**, ≈28% area; centre y≈880) | inOut(cubic) |
| f80 | kick +0.04, y +6 px, spring(damping 12, stiffness 200), settles by f92 | same, y +10 px | — |
| f92–150 | slow push 1.75→1.90 (never pull out) | 0.92→0.98 | linear |

**Stream.** Open with line 1 already rendered. Stream at about 40 chars/s and **keep it running into the close** (until f72), so the lid cuts off "…routes are".

**Lid.**
- Parent: `perspective: 1400px` (design px), `perspectiveOrigin: '50% 25%'`, `transformStyle: preserve-3d`.
- Lid: `transformOrigin: '50% 100%'` (the hinge), rotateX 0→≈−105° over **f62–f78** with `Easing.in(Easing.quad)`. Flip the sign if the top edge recedes instead of advancing toward camera.
- Contact at f80, rebound +3° over f80–83, settled by f86.
- Two faces with `backfaceVisibility: hidden`: the screen face, and a lid-back face that has a 6 px thickness edge and a logo.
- **Delete the scaleY squash and the drawn slab.**

**Death beat (show, not tell).**
- f72–80: a 2–3 px light sliver at the closing gap plus glow spill on the deck, opacity 0.6→0 by f88.
- Add a 4 px amber status LED on the deck front. It breathes at 1 Hz while the assistant works and **goes off at f96.** That's the death.
- **Move the slam SFX from 2.98 s to f80 (2.67 s).**
- **Cut the "session ended" pill.**

**Super.**
- Fade "☾ 9:47 PM" in over f4–14. At f80 slide-append "· Meera's out" over 8 frames.
- Over f96–150 the clock ticks 9:48→10:16 with `Easing.in(cubic)`.
- Animate the pill width to fit its content and crossfade labels, with no empty-label frames.
- 16:9: text 30 px, pill height 56, top y = 48.
- 9:16: text 40 px, pill top **≥ y 240**, max width 900.

**9:16 safe area.**
- Key content inside x 90–990 and y 240–1500.
- Laptop bottom edge ≤ y 1250.
- Never let the deck come within 80 px of either edge, including during the jolt.

**Doc pane.**
- Give the header an opaque background in the pane colour, with a z-index above the rows.
- Clip the scroll region to start 8 px below the header.

**f0.** No blur at f0. If a focus-in is wanted, it must be sharp by f6.

**Timing anchor.** The Gazette cross-blur stays at f150–168, so the downstream timeline doesn't change. If YP still feels a lull, start it at f135 and absorb the 15 frames by holding the Gazette longer.

**Flag for the next scene (out of scope here).** The Gazette card has the same sizing complaint in 16:9: scale it 1.4× (460→≈640 px).

Net result: the first frame is legible content, the object fills about a third of the frame when it matters, the lid swings on a hinge with weight, and the death is an LED going dark rather than a label.
