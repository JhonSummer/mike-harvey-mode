# CODE-NOTES · Motion Director · one sitting (~40 min edit + ~20 min render/QA)

All edits go in `src/Mike.tsx` (composition `MikePromo`, registered in `src/Root.tsx`). Line numbers refer to the file as of 26 Oct 13:43.
**Do not change** `T` (L18), `BEAT` (L19), `BeatFrame`, `Caption`, Beat1/2/3, `build.sh`, or `audio/`. The timeline stays at 810 frames, so `mix27n.wav` stays in sync.

Constraint for every new element: it must sit inside the 9:16 safe column, x 656–1264, and be ≤ 580 px wide.

---

## 1. `Intro` (L61–83): the AI freezes at 62% as the lid closes
Inside `Intro`, after `const lid = …` (L64), add:
```tsx
const pct = Math.round(r(f, 0, 26, 58, 62, Easing.linear)); // ticks up, then freezes as the lid shuts
const paused = f >= 36;                                       // lid is ~90% closed by f36
```
Between the laptop `<Center y={300}>` block and the headline, insert:
```tsx
<Center y={466} style={{opacity: r(f, 2, 10)}}>
  <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '7px 18px', border: `1px solid ${C.faint}`, borderRadius: 30,
    fontFamily: FONT, fontSize: 22, fontWeight: 550, fontVariantNumeric: 'tabular-nums', color: paused ? C.dim : C.fg}}>
    <span style={{width: 9, height: 9, borderRadius: 9, background: paused ? 'rgba(243,239,230,0.3)' : C.gold,
      opacity: paused ? 1 : 0.6 + 0.4 * Math.sin(f / 3)}} />
    {paused ? `Your AI · paused at ${pct}%` : `Your AI · drafting brief… ${pct}%`}
  </div>
</Center>
```
Move the headline: `<Center y={500}>` → `<Center y={530}>` (L76). Its copy stays as it is: `Most legal AI stops when you close the laptop.`
The paused state is a hard swap with no fade. It should feel like the tool died.

## 2. `Beat4` (L290–324): the review gate
**a. Title** (L295):
```diff
- title={['Texts you', 'when done.']}
+ title={['Texts you', 'when it’s ready.']}
```
(The apostrophe is curly ’, the same character Beat1 uses in `you’re`.)

**b. Notification body** (L311–313): replace the single body div with these two lines:
```tsx
<div style={{marginTop: 9, fontSize: 17, lineHeight: 1.35, color: C.fg, textAlign: 'left'}}>
  Notice draft ready for your review.
</div>
<div style={{marginTop: 4, fontSize: 14, color: C.dim, textAlign: 'left', fontVariantNumeric: 'tabular-nums'}}>
  1,280 pages read · 1 flag (p. 388)
</div>
```
Leave the `Review draft` / `Later` buttons (L314–317) exactly as they are.

**c. Gate chip.** Insert it inside the phone div, after the notification card and before the home-bar div (L319):
```tsx
<div style={{position: 'absolute', left: 0, right: 0, top: 396, display: 'flex', justifyContent: 'center',
  opacity: r(f, 50, 62), transform: `translateY(${r(f, 50, 64, 8, 0)}px)`}}>
  <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20,
    border: '1px solid rgba(230,176,75,0.45)', background: 'rgba(230,176,75,0.08)',
    fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.gold}}>
    <svg width={12} height={14} viewBox="0 0 12 14">
      <rect x={1} y={6} width={10} height={7} rx={1.5} fill="none" stroke={C.gold} strokeWidth={1.6} />
      <path d="M3.5 6V4a2.5 2.5 0 0 1 5 0v2" fill="none" stroke={C.gold} strokeWidth={1.6} />
    </svg>
    Nothing sent yet
  </div>
</div>
```
If the notification card's bottom edge (top 200 plus its height, now about 190 px with the extra line) touches the chip in the t = 19.5 s frame, change the card's `top: 200` (L303) to `top: 186`. Don't move the chip.

**d. Caption** (L321): keep the copy and push the entry back so the order reads notification → chip → caption:
```diff
- <Caption f={f} a={44} b={BEAT} color={C.gold}>Nothing goes out until you say yes.</Caption>
+ <Caption f={f} a={60} b={BEAT} color={C.gold}>Nothing goes out until you say yes.</Caption>
```
Do not add a tap, a "Sent ✓" or an "Approved" state.

## 3. `End` (L327–347): restore YP's tagline and add the review line
Replace the last two `Center` blocks (L339–344) with:
```tsx
<Center y={650} style={a(34)}>
  <div style={{fontFamily: FONT, fontSize: 42, fontWeight: 650, letterSpacing: -1, color: C.fg, lineHeight: 1.25}}>Let Mike do its thing.</div>
</Center>
<Center y={704} style={a(46)}>
  <div style={{fontFamily: FONT, fontSize: 42, fontWeight: 650, letterSpacing: -1, color: C.gold, lineHeight: 1.25}}>You be the spectator.</div>
</Center>
<Center y={788} style={a(64)}>
  <div style={{fontFamily: FONT, fontSize: 26, fontWeight: 500, letterSpacing: -0.3, color: C.dim}}>You review. Then you decide.</div>
</Center>
```
Timing: the chime sits at end+36 f (21.4 s), so "Let Mike…" lands on it. The last line arrives at end+64 f (22.3 s) and holds about 4.7 s. Keep `Mike.`, the descriptor and the rule exactly as they are. The gold rule's y (616) is unchanged; the first tagline line moves from 660 to 650.

---

## 4. Build and QA
```bash
cd /workspace/mike-harvey-mode && ./build.sh
rg -i harvey src/                                  # must be 0
rg -n "when done|It’s done|Done\." src/Mike.tsx    # must be 0
for f in out/mike-harvey-mode-16x9.mp4 out/mike-harvey-mode-9x16.mp4; do
  ffprobe -v error -show_entries stream=codec_name,profile,width,height,nb_frames,duration -of compact "$f"; done
```
Pull frames for both ratios at **t = 1.0, 1.6, 3.5, 8.5, 13, 17.0, 19.0, 19.8, 21, 23, 26.5 s** into `qa/169/` and `qa/916/`, and rebuild `qa/169-contact.png` and `qa/916-contact.png`. Check these by eye:
- **1.0 s**: chip reads `drafting brief… 6x%` with a gold dot. **1.6 s**: `paused at 62%`, grey. The headline doesn't overlap the chip.
- **17.0 s**: the notification is fully settled and both lines read. **19.0 s**: the `Nothing sent yet` chip doesn't collide with the card or the home bar.
- **19.8 s**: the caption is fully in. **26.5 s**: all six end-card elements are inside the 9:16 frame and none overlap.

## 5. STATUS.md
Rewrite `STATUS.md` to match the beat sheet in `opus/SHIP.md`: the hook chip, the new beat 04 copy and gate chip, the three-line end card, the new frame-check times. Note that it's a rebuild on the same timeline with the same audio bed. Don't post or send anything.
