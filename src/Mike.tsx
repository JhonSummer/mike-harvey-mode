import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig} from 'remotion';
import {measureText} from '@remotion/layout-utils';

export type Aspect = '16x9' | '9x16';
// 9:16 is rendered natively (1080x1920). Everything except Open + TimeSuper is the legacy 1920x1080 stage, scaled by K about the centre column (identical to the old crop).
const K916 = 1920 / 1080;

// Mike — kinetic rebuild · 30 s · 1920x1080 @30.
// Every value is a function of frame. Critical type lives in the centre 608px column (x 656–1264) for the 9:16 crop.
const C = {
  bg: '#060608', fg: '#F3EFE6', dim: 'rgba(243,239,230,0.58)', faint: 'rgba(243,239,230,0.14)',
  line: 'rgba(243,239,230,0.09)', gold: '#E6B04B', card: '#0E0E12',
};
const FONT = 'Inter, "Inter Tight", "DejaVu Sans", sans-serif';
const out = Easing.bezier(0.22, 1, 0.36, 1);
const io = Easing.bezier(0.65, 0, 0.35, 1);
const inQ = Easing.bezier(0.55, 0, 0.9, 0.4);
const r = (f: number, a: number, b: number, from = 0, to = 1, e = out) =>
  interpolate(f, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});


// Mike — overnight story · 28 s · 1920x1080 @30. One continuous thread, no chapter chrome.
// Every value is a function of frame. Critical type stays inside the centre 608px column (x 656–1264) for the 9:16 crop.
export const T = {open: 0, world: 150, end: 660, total: 840};
const LEN = {open: 165, end: 180};

// ---------- Overnight world: one canvas, one camera ----------
// World coords: x=0 is screen centre. Gazette (y≈0) → codeshare cl. 7.3 (y≈825) → client alert on Meera's desk (y≈1580) → phone (y≈2560).
const kf = (f: number, keys: [number, number][]) =>
  interpolate(f, keys.map((k) => k[0]), keys.map((k) => k[1]), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: io});
const CAM_Y: [number, number][] = [[150, -120], [175, -40], [245, 50], [262, 58], [300, 822], [345, 828], [385, 1560], [430, 1600], [468, 1858], [500, 1866], [548, 2556], [650, 2600]];
const CAM_S: [number, number][] = [[150, 0.86], [175, 1], [245, 1.14], [262, 1.2], [282, 0.8], [300, 1.0], [312, 1.05], [336, 1.5], [350, 1.54], [368, 0.84], [385, 1.0], [430, 1.08], [458, 1.4], [500, 1.46], [520, 0.84], [600, 1.18], [650, 1.32]];

const Lines: React.FC<{n: number; seed: number; w?: number}> = ({n, seed, w = 100}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 11}}>
    {Array.from({length: n}).map((_, i) => <div key={i} style={{height: 6, borderRadius: 4, width: `${w * (0.62 + ((i * 37 + seed * 17) % 36) / 100)}%`, background: 'rgba(243,239,230,0.14)'}} />)}
  </div>
);
const Card: React.FC<{x: number; y: number; w: number; h: number; style?: React.CSSProperties; children: React.ReactNode}> = ({x, y, w, h, style, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 14, background: '#101015', border: `1px solid ${C.faint}`, boxSizing: 'border-box', padding: '22px 26px', fontFamily: FONT, textAlign: 'left', overflow: 'hidden', boxShadow: '0 30px 90px rgba(0,0,0,0.55)', ...style}}>{children}</div>
);
const Tag: React.FC<{children: React.ReactNode; color?: string}> = ({children, color = C.gold}) => (
  <div style={{fontSize: 13, letterSpacing: 2, fontWeight: 700, color, textTransform: 'uppercase'}}>{children}</div>
);

const alertBody = 'G-1187 r.7 sets fare ceilings per route. Your cl. 7.3 assumes one network-wide ceiling, so it breaks on DEL–AUH. 11 rows in matrix v3 need updating.';

const World: React.FC<{g: number; fps: number; aspect: Aspect}> = ({g, fps, aspect}) => {
  if (g < 140 || g > 680) return null;
  const camY = kf(g, CAM_Y) + Math.cos(g / 41) * 9;
  const camX = Math.sin(g / 33) * 12;
  // grade §9: Gazette ~1.25x in 16:9 only (1.4x collided with the time super), lowered 50 px so its tag clears the pill.
  const gz16 = aspect === '16x9' ? interpolate(g, [200, 250], [1.25, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: io}) : 1;
  // 9:16: the native time super sits at y>=240 delivered, so lower the world under it during the Gazette hold and the phone (eased out/in during camera travels).
  const yOff = aspect === '16x9' ? 50 * (gz16 - 1) / 0.25 : 70 * (1 - r(g, 262, 300, 0, 1, io)) + 40 * r(g, 560, 620, 0, 1, io);
  const s = kf(g, CAM_S) * (1 + 0.012 * Math.sin(g / 27)) * gz16;
  const vis = r(g, 150, 168) * (1 - r(g, 646, 668, 0, 1, io));
  const blur = 10 * (1 - r(g, 150, 170)) + 14 * r(g, 648, 668);
  // gazette lands
  const gz = spring({frame: g - 158, fps, config: {damping: 16, stiffness: 120, mass: 0.8}});
  const scanY = -200 + ((g - 172) * 7.5) % 440;
  const r7 = r(g, 214, 226);
  // thread r.7 → cl. 7.3 → alert
  const th1 = r(g, 248, 300, 0, 1, Easing.bezier(0.4, 0, 0.6, 1));
  const th2 = r(g, 350, 386, 0, 1, Easing.bezier(0.4, 0, 0.6, 1));
  const ag = r(g, 236, 262);
  const c73 = r(g, 298, 312);
  const brk = r(g, 318, 330);
  // alert drafting on her desk
  const al = r(g, 360, 384);
  const chars = Math.floor(r(g, 388, 440, 0, alertBody.length, Easing.linear));
  const held = r(g, 440, 452);
  const lockPulse = 0.5 + 0.5 * Math.sin(g / 5);
  // morning phone
  const rise = spring({frame: g - 492, fps, config: {damping: 18, stiffness: 90, mass: 0.9}});
  const drop = spring({frame: g - 526, fps, config: {damping: 15, stiffness: 140, mass: 0.8}});
  const ring = r(g, 530, 562);
  const pm = Math.round(r(g, 500, 650, 418, 431, Easing.linear)); // 6:58 → 7:11
  const proof = (a: number) => ({opacity: r(g, a, a + 8), transform: `translateX(${r(g, a, a + 12, 12, 0)}px)`});
  const PW = 300;
  return (
    <AbsoluteFill style={{opacity: vis, filter: blur > 0.1 ? `blur(${blur}px)` : undefined}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 0, height: 0, transform: `translate(${960 - camX * s}px, ${540 - camY * s + yOff}px) scale(${s})`, transformOrigin: '0 0'}}>
        {/* threads */}
        <svg style={{position: 'absolute', left: -400, top: -400, overflow: 'visible'}} width={800} height={3200}>
          <path d="M 640 455 C 720 540, 720 1150, 636 1225" fill="none" stroke={C.gold} strokeWidth={3} strokeDasharray="1200" strokeDashoffset={1200 * (1 - th1)} style={{filter: 'drop-shadow(0 0 8px rgba(230,176,75,0.7))'}} />
          <path d="M 636 1260 C 720 1340, 720 1720, 655 1800" fill="none" stroke={C.gold} strokeWidth={3} strokeDasharray="900" strokeDashoffset={900 * (1 - th2)} style={{filter: 'drop-shadow(0 0 8px rgba(230,176,75,0.7))'}} />
        </svg>
        {/* Mike status, riding above the gazette */}
        <div style={{position: 'absolute', left: -150, width: 300, top: 268, display: 'flex', justifyContent: 'center', opacity: r(g, 176, 188) * (1 - r(g, 250, 262)), transform: `translateY(${r(g, 176, 190, 12, 0)}px)`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '7px 16px', border: '1px solid rgba(230,176,75,0.5)', borderRadius: 30, fontFamily: FONT, fontSize: 19, color: C.fg, background: 'rgba(230,176,75,0.06)'}}>
            <span style={{width: 8, height: 8, borderRadius: 8, background: C.gold, opacity: 0.5 + 0.5 * Math.sin(g / 4)}} />Mike · reading
          </div>
        </div>
        {/* Gazette G-1187 */}
        <Card x={-230} y={-290} w={460} h={540} style={{opacity: Math.min(1, gz * 1.4), transform: `translateY(${(1 - gz) * -180}px) rotate(${(1 - gz) * -4}deg)`}}>
          <Tag>Gazette of India · Extraordinary</Tag>
          <div style={{marginTop: 8, fontSize: 25, fontWeight: 700, color: C.fg}}>G-1187 · Civil Aviation</div>
          <div style={{marginTop: 4, fontSize: 16, color: C.dim}}>Published 10:16 PM</div>
          <div style={{marginTop: 22}}><Lines n={6} seed={1} /></div>
          <div style={{position: 'absolute', left: 18, right: 18, top: 312, padding: '9px 10px', borderRadius: 6, fontSize: 19, color: C.fg,
            background: `rgba(230,176,75,${0.2 * r7})`, borderLeft: `3px solid rgba(230,176,75,${r7})`}}>
            <span style={{color: C.gold, fontWeight: 700}}>r.7</span>&nbsp; Fare ceilings set per route.
          </div>
          <div style={{position: 'absolute', left: 26, right: 26, top: 376}}><Lines n={5} seed={4} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: scanY + 290, height: 2, background: C.gold, boxShadow: '0 0 18px 4px rgba(230,176,75,0.45)', opacity: 0.85 * r(g, 170, 178) * (1 - r(g, 250, 262))}} />
        </Card>
        {/* Codeshare agreement · cl. 7.3 */}
        <Card x={-230} y={600} w={460} h={470} style={{opacity: ag, transform: `translateY(${(1 - ag) * 40}px)`}}>
          <Tag color={C.dim}>Indus Air · Falcon Gulf codeshare</Tag>
          <div style={{marginTop: 22}}><Lines n={6} seed={7} /></div>
          <div style={{position: 'absolute', left: 18, right: 18, top: 186, padding: '10px 12px', borderRadius: 6, color: C.fg,
            background: `rgba(230,176,75,${0.08 + 0.16 * c73})`, borderLeft: `3px solid rgba(230,176,75,${0.3 + 0.7 * c73})`, boxShadow: `0 0 ${30 * c73}px rgba(230,176,75,${0.2 * c73})`}}>
            <div style={{fontSize: 15, color: C.gold, fontWeight: 700, letterSpacing: 1}}>cl. 7.3</div>
            <div style={{fontSize: 21, marginTop: 2}}>One fare ceiling, network-wide.</div>
          </div>
          <div style={{position: 'absolute', left: 32, top: 282, fontSize: 18, color: C.gold, fontWeight: 650, opacity: brk, display: 'flex', gap: 8}}>
            <span>✕</span><span><Words text="Breaks on DEL–AUH under r.7" f={g} start={320} step={2} dur={10} lift={10} /></span>
          </div>
          <div style={{position: 'absolute', left: 26, right: 26, top: 330}}><Lines n={4} seed={9} /></div>
        </Card>
        {/* Client alert waiting on Meera's desk */}
        <div style={{position: 'absolute', left: -250, top: 1340, width: 500, fontFamily: FONT, fontSize: 15, color: C.dim, letterSpacing: 1.5, textAlign: 'left', opacity: al}}>ON MEERA’S DESK · CHAIR EMPTY</div>
        <Card x={-250} y={1372} w={500} h={404} style={{opacity: al, transform: `translateY(${(1 - al) * 50}px) scale(${0.96 + 0.04 * al})`, border: `1px solid rgba(230,176,75,${0.25 + 0.3 * held})`}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Tag>Client alert · Indus Air</Tag>
            <div style={{marginLeft: 'auto', fontSize: 14, color: C.dim, fontVariantNumeric: 'tabular-nums'}}>Draft · 3:40 AM</div>
          </div>
          <div style={{marginTop: 18, fontSize: 21, lineHeight: 1.45, color: C.fg, minHeight: 186}}>
            {alertBody.slice(0, chars)}<span style={{display: 'inline-block', width: 2, height: 22, marginLeft: 2, background: C.gold, opacity: chars < alertBody.length || Math.floor(g / 8) % 2 ? 0.9 : 0, verticalAlign: -3}} />
          </div>
          <div style={{marginTop: 16, display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, background: 'rgba(230,176,75,0.08)', border: '1px solid rgba(230,176,75,0.35)', opacity: held, transform: `translateY(${(1 - held) * 10}px)`}}>
            <svg width={18} height={20} viewBox="0 0 18 20"><rect x={1} y={8} width={16} height={11} rx={2} fill={C.gold} opacity={0.6 + 0.4 * lockPulse} /><path d="M4 8 V5 a5 5 0 0 1 10 0 V8" fill="none" stroke={C.gold} strokeWidth={2} /></svg>
            <div style={{fontSize: 18, color: C.fg, fontWeight: 600}}>Held for Meera</div>
            <div style={{marginLeft: 'auto', fontSize: 16, color: C.dim}}>Not sent</div>
          </div>
        </Card>
        <div style={{position: 'absolute', left: -300, width: 600, top: 1812, textAlign: 'center', fontFamily: FONT, fontSize: 40, fontWeight: 700, letterSpacing: -1, lineHeight: 1.2, color: C.gold}}>
          <div><Words text="Nothing goes out" f={g} start={452} step={3} /></div>
          <div style={{position: 'relative', display: 'inline-block'}}>
            <Words text="without your yes." f={g} start={460} step={3} />
            <Sweep f={g} a={470} h={3} bottom={-6} />
          </div>
        </div>
        {/* Morning: lock screen */}
        <div style={{position: 'absolute', left: -PW / 2, top: 2300, width: PW, height: 520, perspective: 1200}}>
          <div style={{position: 'absolute', inset: 0, borderRadius: 48, border: '1.5px solid rgba(243,239,230,0.22)', background: 'linear-gradient(180deg,#16151a 0%,#0A0A0E 100%)', boxShadow: '0 40px 120px rgba(0,0,0,0.7)', overflow: 'hidden',
            opacity: Math.min(1, rise * 1.5), transform: `translateY(${(1 - rise) * 160}px) rotateX(${(1 - rise) * 22 + Math.sin(g / 24) * 1.4}deg) rotateY(${Math.sin(g / 31) * 2.4}deg)`}}>
            <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, rgba(230,176,75,${0.16 * r(g, 496, 560)}), rgba(0,0,0,0) 70%)`}} />
            <div style={{position: 'absolute', top: 12, left: PW / 2 - 46, width: 92, height: 24, borderRadius: 20, background: '#000'}} />
            <div style={{position: 'absolute', top: 58, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, color: C.fg}}>
              <div style={{fontSize: 16, color: C.dim, fontWeight: 500}}>Tuesday</div>
              <div style={{fontSize: 76, fontWeight: 250, letterSpacing: -3, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums'}}>{`${Math.floor(pm / 60)}:${String(pm % 60).padStart(2, '0')}`}</div>
            </div>
            <div style={{position: 'absolute', left: 12, right: 12, top: 186, transform: `translateY(${(1 - drop) * -150}px) scale(${0.92 + 0.08 * drop})`, opacity: Math.min(1, drop * 1.4),
              borderRadius: 20, background: 'rgba(36,34,32,0.95)', border: `1px solid rgba(230,176,75,${0.2 + 0.4 * (1 - ring)})`, padding: '12px 14px', fontFamily: FONT, textAlign: 'left',
              boxShadow: `0 0 0 ${ring * 18}px rgba(230,176,75,${0.22 * (1 - ring)})`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 9}}>
                <div style={{width: 28, height: 28, borderRadius: 7, background: C.gold, color: '#1a1206', fontWeight: 800, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>M</div>
                <div style={{fontSize: 16, fontWeight: 700, color: C.fg}}>Mike</div>
                <div style={{marginLeft: 'auto', fontSize: 13, color: C.dim}}>6:58 AM</div>
              </div>
              <div style={{marginTop: 8, fontSize: 15.5, lineHeight: 1.35, color: C.fg}}>Meera, G-1187 breaks cl. 7.3 on DEL–AUH. Client alert drafted and held for your review.</div>
              <div style={{marginTop: 8, padding: '7px 10px', borderRadius: 10, background: 'rgba(230,176,75,0.1)', border: '1px solid rgba(230,176,75,0.3)', fontSize: 13, lineHeight: 1.5, color: C.dim}}>
                <div style={proof(546)}><span style={{color: C.gold, fontWeight: 700}}>✓</span> Read G-1187 · cl. 7.3 · matrix v3</div>
                <div style={proof(552)}><span style={{color: C.gold, fontWeight: 700}}>✓</span> r.7 → cl. 7.3 → 11 rows</div>
              </div>
              <div style={{display: 'flex', gap: 8, marginTop: 10, opacity: r(g, 558, 568), transform: `translateY(${r(g, 558, 570, 10, 0)}px)`}}>
                <div style={{flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 10, background: C.gold, color: '#1a1206', fontSize: 15, fontWeight: 700, transform: `scale(${1 - 0.07 * r(g, 594, 600) + 0.07 * r(g, 600, 610)})`, boxShadow: `0 0 ${10 + 10 * Math.sin(g / 6) + 26 * r(g, 600, 606) * (1 - r(g, 606, 630))}px rgba(230,176,75,${0.45 + 0.4 * r(g, 600, 606) * (1 - r(g, 606, 630))})`}}>Review alert</div>
                <div style={{flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 10, background: 'rgba(243,239,230,0.1)', color: C.dim, fontSize: 15, fontWeight: 600}}>Later</div>
              </div>
            </div>
            <div style={{position: 'absolute', bottom: 10, left: PW / 2 - 56, width: 112, height: 5, borderRadius: 5, background: 'rgba(243,239,230,0.4)'}} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Rolling time super: the only on-screen narration. Native per aspect (grade §5).
const CLOCK: [number, number][] = [[165, 22 * 60 + 16], [300, 25 * 60 + 12], [400, 27 * 60 + 40], [520, 30 * 60 + 58], [650, 31 * 60 + 11]];
const NOTES: [number, string][] = [[80, 'Meera’s out'], [165, 'Gazette G-1187 drops'], [262, 'Mike still reading'], [372, 'Desk empty'], [505, 'Morning']];
const hhmm = (mins: number) => {
  const m = Math.round(mins) % (24 * 60);
  const h24 = Math.floor(m / 60), mm = m % 60;
  return `${((h24 + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h24 < 12 ? 'AM' : 'PM'}`;
};
const clockAt = (g: number) => {
  if (g < 96) return 21 * 60 + 47;
  if (g <= 150) return interpolate(g, [96, 150], [21 * 60 + 48, 22 * 60 + 16], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic)});
  if (g < 165) return 22 * 60 + 16;
  return interpolate(g, CLOCK.map((k) => k[0]), CLOCK.map((k) => k[1]), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.45, 0, 0.55, 1)});
};
const TimeSuper: React.FC<{g: number; aspect: Aspect}> = ({g, aspect}) => {
  if (g < 4 || g > 670) return null;
  const v = aspect === '16x9' ? {fs: 30, h: 56, top: 48, pad: 24, gap: 14} : {fs: 40, h: 76, top: 250, pad: 32, gap: 16};
  const mins = clockAt(g);
  const m = Math.round(mins) % (24 * 60);
  const night = m > 18 * 60 || m < 6 * 60;
  const vis = r(g, 4, 14) * (1 - r(g, 644, 662)) * (1 - 0.85 * r(g, 322, 334) * (1 - r(g, 352, 364))) * (1 - 0.9 * r(g, 448, 460) * (1 - r(g, 506, 518)));
  const mw = (t: string) => Math.ceil(measureText({text: t, fontFamily: FONT, fontSize: v.fs, fontWeight: '400'}).width * 1.06) + 4;
  // label track: '· label', appended on the slam (f80) by a width wipe; later labels roll (old up/out, new up/in, overlapping) while the width animates -> never an empty label
  let ni = -1;
  NOTES.forEach((n, i) => { if (g >= n[0]) ni = i; });
  const dotW = mw('·') + v.gap;
  let trackW = 0;
  const labels: React.ReactNode[] = [];
  if (ni >= 0) {
    const [t0, txt] = NOTES[ni];
    if (ni === 0) {
      const a = r(g, t0, t0 + 8, 0, 1, io);
      trackW = (dotW + mw(txt)) * a;
      // slide-append: the whole '· label' group rides the right edge of the growing track, so label glyphs lead in and no frame shows a bare dot
      labels.push(<span key={ni} style={{position: 'absolute', left: trackW - (dotW + mw(txt)), top: 0, width: dotW + mw(txt), opacity: r(g, t0, t0 + 3), whiteSpace: 'nowrap'}}><span style={{position: 'absolute', left: 0, top: 0}}>·</span><span style={{position: 'absolute', left: dotW, top: 0}}>{txt}</span></span>);
    } else {
      const prev = NOTES[ni - 1][1];
      const a = r(g, t0, t0 + 10, 0, 1, io);
      trackW = dotW + mw(prev) + (mw(txt) - mw(prev)) * a;
      const outO = 1 - r(g, t0, t0 + 6, 0, 1, Easing.linear);
      if (outO > 0.001) labels.push(<span key={ni - 1} style={{position: 'absolute', left: dotW, top: 0, opacity: outO, transform: `translateY(${-0.7 * v.fs * (1 - outO)}px)`, whiteSpace: 'nowrap'}}>{prev}</span>);
      const inO = r(g, t0 + 2, t0 + 9);
      labels.push(<span key={ni} style={{position: 'absolute', left: dotW, top: 0, opacity: inO, transform: `translateY(${0.7 * v.fs * (1 - inO)}px)`, whiteSpace: 'nowrap'}}>{txt}</span>);
    }
  }
  return (
    <Center y={v.top} style={{opacity: vis, transform: `translateY(${r(g, 4, 16, -14, 0)}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', height: v.h, boxSizing: 'border-box', maxWidth: 900, fontFamily: FONT, fontSize: v.fs, color: C.fg, padding: `0 ${v.pad}px`, borderRadius: v.h, background: 'rgba(6,6,8,0.78)', border: `1px solid ${C.faint}`, whiteSpace: 'nowrap'}}>
        <span style={{display: 'inline-block', color: C.gold, transform: `rotate(${g * 1.2}deg)`, marginRight: v.gap}}>{night ? '☾' : '☀'}</span>
        <span style={{fontVariantNumeric: 'tabular-nums', fontWeight: 650}}>{hhmm(mins)}</span>
        <span style={{position: 'relative', display: 'inline-block', width: trackW, height: v.fs * 1.3, lineHeight: `${v.fs * 1.3}px`, overflow: 'hidden', color: C.dim, marginLeft: trackW > 0.5 ? v.gap : 0}}>
          {trackW > 0.5 && ni > 0 && <span style={{position: 'absolute', left: 0, top: 0}}>·</span>}
          {labels}
        </span>
      </div>
    </Center>
  );
};

const Center: React.FC<{y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({y, children, style}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', ...style}}>{children}</div>
);

// Word-by-word assembly: rise + de-blur, staggered.
const Words: React.FC<{text: string; f: number; start: number; step?: number; dur?: number; color?: string; lift?: number}> = ({text, f, start, step = 3, dur = 14, color, lift = 26}) => {
  const ws = text.split(' ');
  return (
    <>
      {ws.map((w, i) => {
        const p = r(f, start + i * step, start + i * step + dur);
        return (
          <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * lift}px)`, filter: p < 0.99 ? `blur(${(1 - p) * 7}px)` : undefined, color, marginRight: i < ws.length - 1 ? '0.25em' : 0}}>{w}</span>
        );
      })}
    </>
  );
};

// Gold underline that travels in, then keeps a highlight running along it.
const Sweep: React.FC<{f: number; a: number; dur?: number; h?: number; bottom?: number}> = ({f, a, dur = 18, h = 4, bottom = -6}) => {
  const w = r(f, a, a + dur, 0, 100, io);
  const shine = ((f - a) * 2.2) % 160 - 30;
  return (
    <div style={{position: 'absolute', left: 0, bottom, height: h, width: `${w}%`, borderRadius: h, background: C.gold, overflow: 'hidden', opacity: 0.95}}>
      <div style={{position: 'absolute', top: 0, bottom: 0, left: `${shine}%`, width: '30%', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,240,200,0.85), rgba(255,255,255,0))'}} />
    </div>
  );
};

// Scene = camera. Push-through transition in/out, continuous slow punch 1.00→1.06, drift, optional extra punch.
const Scene: React.FC<{f: number; len: number; oy?: number; punch?: number; jolt?: number; push?: number; children: React.ReactNode}> = ({f, len, oy = 540, punch = 1, jolt = 0, push = 0.06, children}) => {
  if (f < -8 || f > len + 10) return null;
  const enter = r(f, -6, 10);
  const exit = r(f, len - 6, len + 8, 0, 1, io);
  const drive = interpolate(f, [0, len], [1, 1 + push], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.3, 0.1, 0.6, 1)});
  const s = drive * punch * (0.94 + 0.06 * enter) * (1 + 0.09 * exit);
  const blur = 9 * (1 - enter) + 12 * exit;
  const dx = Math.sin(f / 38) * 5;
  const dy = Math.cos(f / 51) * 4 + jolt - 30 * exit;
  return (
    <AbsoluteFill style={{opacity: Math.min(enter, 1 - exit), transform: `translate(${dx}px, ${dy}px) scale(${s})`, transformOrigin: `960px ${oy}px`, filter: blur > 0.1 ? `blur(${blur}px)` : undefined}}>
      {children}
    </AbsoluteFill>
  );
};

// ---------- Open: mid-matter -> the lid closes (shown, not told). Native per aspect (grade §E). ----------
const streamHead = 'Checking cl. 7.3 against the draft fare rules —';
const streamTxt = streamHead + ' it sets one fare ceiling for every route. That network-wide ceiling may not hold once routes are priced one by one.';
const cutAt = streamTxt.indexOf('once routes are') + 'once routes are'.length;
const LW = 480, LH = 300, DD = 300, LID_SHUT = -105;
// Camera table (grade §E1). C is relative to the 1920x1080 design stage; 9:16 multiplies by K916.
// 9:16 values are trimmed below the brief (1.35/0.92/0.98) so the perspective deck front (~605 design px) keeps >=80 px side margins delivered at every frame;
// screen type is sized up (assistant 17.5 px design in 16:9, 19 px in 9:16) so both deliver >=26 px through f50–80.
const OPEN_CAM: Record<Aspect, {k: number; c0: number; c1: number; cw: number; cp: number; kick: number; kickY: number; ay0: number; ay1: number}> = {
  '16x9': {k: 1, c0: 2.6, c1: 2.5, cw: 1.75, cp: 1.9, kick: 0.04, kickY: 6, ay0: 548, ay1: 560},
  '9x16': {k: K916, c0: 0.845, c1: 0.83, cw: 0.78, cp: 0.8, kick: 0.03, kickY: 10, ay0: 820, ay1: 880},
};
const cubicIO = Easing.inOut(Easing.cubic);
const lidAngle = (f: number) => {
  if (f < 62) return 0;
  if (f < 78) return interpolate(f, [62, 78], [0, -101], {easing: Easing.in(Easing.quad)});
  if (f < 80) return interpolate(f, [78, 80], [-101, LID_SHUT]);
  if (f < 83) return interpolate(f, [80, 83], [LID_SHUT, LID_SHUT + 3], {easing: Easing.out(Easing.quad)});
  if (f < 86) return interpolate(f, [83, 86], [LID_SHUT + 3, LID_SHUT], {easing: Easing.in(Easing.quad)});
  return LID_SHUT;
};
const Open: React.FC<{f: number; aspect: Aspect; W: number}> = ({f, aspect, W}) => {
  if (f > LEN.open + 10) return null;
  const cam = OPEN_CAM[aspect];
  // camera: tight on the screen -> settle on the whole laptop -> impact kick -> slow push. Never pulls out, no x-drift.
  const t50 = r(f, 50, 68, 0, 1, cubicIO);
  let cz = f < 50 ? interpolate(f, [0, 50], [cam.c0, cam.c1], {extrapolateLeft: 'clamp'}) : cam.c1 + (cam.cw - cam.c1) * t50;
  if (f > 92) cz = interpolate(f, [92, 150], [cam.cw, cam.cp], {extrapolateRight: 'clamp'});
  const kt = f - 80;
  const kick = kt >= 0 ? Math.exp(-kt / 3.2) * Math.cos(kt * 0.55) : 0;
  cz += cam.kick * kick;
  const focal = -150 + 57 * t50 + 113 * r(f, 88, 150, 0, 1, io); // screen centre -> laptop centre -> closed-slab
  const ay = cam.ay0 + (cam.ay1 - cam.ay0) * t50 + cam.kickY * kick + 3 * Math.sin(f / 40);
  const exit = r(f, LEN.open - 6, LEN.open + 8, 0, 1, io);
  const Ce = cz * cam.k * (1 + 0.09 * exit);
  const ty = ay - focal * Ce - 30 * exit * cam.k;
  // lid + stream
  const ang = lidAngle(f);
  const chars = f >= 72 ? cutAt : Math.max(streamHead.length, Math.floor(interpolate(f, [6, 72], [streamHead.length, cutAt], {extrapolateLeft: 'clamp'})));
  const caret = f >= 72 || Math.floor(f / 8) % 2 === 0;
  const screenOn = interpolate(f, [78, 80, 88], [1, 0.6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const closing = r(f, 62, 78, 0, 1, Easing.in(Easing.quad));
  const sliver = interpolate(f, [70, 72, 80, 88], [0, 1, 0.6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scroll = r(f, 0, 72, 0, -40, Easing.linear);
  const led = f < 96 ? 0.55 + 0.45 * Math.sin((f / 30) * Math.PI * 2) : f < 98 ? 0.25 * (98 - f) / 2 : 0;
  return (
    <AbsoluteFill style={{opacity: 1 - exit, filter: exit > 0.01 ? `blur(${12 * exit * cam.k}px)` : undefined}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 0, height: 0, transform: `translate(${W / 2}px, ${ty}px) scale(${Ce})`, transformOrigin: '0 0'}}>
        {/* screen spill on the desk */}
        <div style={{position: 'absolute', left: -460, top: -80, width: 920, height: 420, background: `radial-gradient(ellipse at 50% 30%, rgba(200,210,255,${0.14 * screenOn}), rgba(0,0,0,0) 62%)`}} />
        {/* 3D stage: hinge at (0,0). perspective origin 25% of a 960-tall box = 60 px above the hinge */}
        <div style={{position: 'absolute', left: -LW / 2, top: -LH, width: LW, height: 960, perspective: 1400, perspectiveOrigin: '50% 25%', transformStyle: 'preserve-3d'}}>
          {/* deck: a real plane, 105° to the open lid */}
          <div style={{position: 'absolute', left: 0, top: LH, width: LW, height: DD, transformOrigin: '50% 0%', transform: 'rotateX(75deg)', transformStyle: 'preserve-3d',
            background: 'linear-gradient(180deg, #121218 0%, #0D0D12 100%)', border: '2px solid rgba(243,239,230,0.24)', borderRadius: '6px 6px 16px 16px', boxSizing: 'border-box'}}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{position: 'absolute', left: 40 + i * 4, right: 40 + i * 4, top: 26 + i * 30, height: 20, background: 'repeating-linear-gradient(90deg, rgba(243,239,230,0.09) 0 26px, rgba(0,0,0,0) 26px 32px)', borderRadius: 3}} />)}
            <div style={{position: 'absolute', left: LW / 2 - 85, width: 170, top: 186, height: 92, borderRadius: 10, border: '2px solid rgba(243,239,230,0.1)'}} />
            {/* screen light on the keys; brightens as the lid closes, then dies */}
            <div style={{position: 'absolute', inset: 0, borderRadius: 'inherit', background: `radial-gradient(ellipse 70% 90% at 50% 0%, rgba(200,214,255,${(0.16 + 0.5 * closing) * screenOn}), rgba(0,0,0,0) 75%)`}} />
            {/* front lip + status LED */}
            <div style={{position: 'absolute', left: -2, right: -2, top: DD - 2, height: 12, transformOrigin: '50% 0%', transform: 'rotateX(-75deg)', background: 'linear-gradient(180deg,#16161c,#08080b)', border: '1.5px solid rgba(243,239,230,0.2)', borderRadius: '0 0 10px 10px', boxSizing: 'border-box'}}>
              <div style={{position: 'absolute', left: LW / 2 - 3, top: 3, width: 6, height: 4, borderRadius: 3, background: led > 0.01 ? C.gold : 'rgba(243,239,230,0.12)', opacity: led > 0.01 ? 0.35 + 0.65 * led : 1, boxShadow: led > 0.01 ? `0 0 ${4 + 6 * led}px ${1 + 2 * led}px rgba(230,176,75,${0.75 * led})` : 'none'}} />
            </div>
          </div>
          {/* lid: real hinge, two faces + thickness edge */}
          <div style={{position: 'absolute', left: 0, top: 0, width: LW, height: LH, transformOrigin: '50% 100%', transform: ang !== 0 ? `rotateX(${ang}deg)` : undefined, transformStyle: 'preserve-3d'}}>
            <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: '14px 14px 4px 4px', background: '#101015', border: '2px solid rgba(243,239,230,0.3)', boxSizing: 'border-box', overflow: 'hidden', filter: ang !== 0 ? `brightness(${1 - 0.35 * closing})` : undefined}}>
              <div style={{position: 'absolute', inset: 10, borderRadius: 4, background: '#0B0C10', overflow: 'hidden', display: 'flex', fontFamily: FONT, textAlign: 'left', opacity: 0.35 + 0.65 * screenOn}}>
                {/* doc: opaque header above a clipped scroll region (grade §7) */}
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', borderRight: '1px solid rgba(243,239,230,0.08)'}}>
                  <div style={{position: 'relative', zIndex: 2, background: '#0B0C10', padding: '12px 12px 8px', fontSize: 11, letterSpacing: 1.2, lineHeight: 1.3, color: C.gold, fontWeight: 700}}>INDUS AIR · FALCON GULF CODESHARE</div>
                  <div style={{position: 'relative', flex: 1, overflow: 'hidden', marginTop: 8, padding: '0 12px'}}>
                    <div style={{transform: `translateY(${scroll}px)`}}>
                      {Array.from({length: 16}).map((_, i) => (
                        i === 5 ? (
                          <div key={i} style={{fontSize: 13, lineHeight: 1.35, color: C.fg, background: 'rgba(230,176,75,0.18)', borderLeft: `2px solid ${C.gold}`, padding: '4px 7px', margin: '7px 0'}}><b style={{color: C.gold}}>7.3</b>  Fare ceiling applies network-wide.</div>
                        ) : <div key={i} style={{height: 6, borderRadius: 3, margin: '9px 0', width: `${60 + ((i * 37) % 38)}%`, background: 'rgba(243,239,230,0.13)'}} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* assistant pane, mid-answer */}
                <div style={{flex: 1, padding: '12px 12px', boxSizing: 'border-box'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: C.dim, fontWeight: 600}}>
                    <span style={{width: 7, height: 7, borderRadius: 7, background: 'rgba(160,200,255,0.85)', opacity: 0.5 + 0.5 * Math.sin(f / 3)}} />Assistant
                  </div>
                  <div style={{marginTop: 8, fontSize: aspect === '16x9' ? 17.5 : 19, lineHeight: 1.3, color: 'rgba(243,239,230,0.9)'}}>
                    {streamTxt.slice(0, chars)}<span style={{display: 'inline-block', width: 8, height: aspect === '16x9' ? 17 : 18, marginLeft: 1, background: C.fg, opacity: caret ? 0.8 : 0, verticalAlign: -2}} />
                  </div>
                </div>
              </div>
            </div>
            {/* lid back (logo) */}
            <div style={{position: 'absolute', inset: 0, transform: 'translateZ(-6px) rotateY(180deg)', backfaceVisibility: 'hidden', borderRadius: '14px 14px 4px 4px', background: 'linear-gradient(180deg,#1d1d24,#141419)', border: '2px solid rgba(243,239,230,0.3)', boxSizing: 'border-box'}}>
              <div style={{position: 'absolute', left: LW / 2 - 18, top: LH / 2 - 18, width: 36, height: 36, borderRadius: 36, border: '3px solid rgba(243,239,230,0.16)', boxSizing: 'border-box'}} />
            </div>
            {/* thickness edge (6 px); its screen-side lip carries the light sliver in the closing gap */}
            <div style={{position: 'absolute', left: 6, right: 6, top: 0, height: 6, transformOrigin: '50% 0%', transform: 'rotateX(-90deg)', background: '#1a1a20', borderRadius: 3,
              boxShadow: sliver > 0.01 ? `0 -2px ${6 + 10 * sliver}px ${1 + 2 * sliver}px rgba(205,218,255,${0.8 * sliver})` : 'none', borderTop: sliver > 0.01 ? `3px solid rgba(225,232,255,${sliver})` : 'none', boxSizing: 'border-box'}} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- End card ----------
const End: React.FC<{f: number}> = ({f}) => {
  if (f < -8) return null;
  const a = (s: number) => ({opacity: r(f, s, s + 14), transform: `translateY(${r(f, s, s + 18, 22, 0)}px)`, filter: f < s + 12 ? `blur(${r(f, s, s + 12, 6, 0)}px)` : undefined});
  const letters = 'Mike'.split('');
  return (
    <Scene f={f} len={LEN.end + 40} push={0.04}>
      <Center y={274}>
        <div style={{fontFamily: FONT, fontSize: 168, fontWeight: 750, letterSpacing: -7, color: C.fg, lineHeight: 1, display: 'flex'}}>
          {letters.map((l, i) => {
            const p = r(f, 2 + i * 3, 18 + i * 3);
            return <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 60}px) scale(${0.85 + 0.15 * p})`, filter: p < 0.99 ? `blur(${(1 - p) * 10}px)` : undefined}}>{l}</span>;
          })}
          <span style={{color: C.gold, display: 'inline-block', transform: `scale(${spring({frame: f - 16, fps: 30, config: {damping: 9, stiffness: 180}})})`}}>.</span>
        </div>
      </Center>
      <Center y={472} style={a(18)}>
        <div style={{fontFamily: FONT, fontSize: 31, fontWeight: 450, color: C.dim, maxWidth: 560, lineHeight: 1.3}}>Your 24/7 photographic-memory associate.</div>
      </Center>
      <Center y={590}><div style={{width: 64 * r(f, 28, 44, 0, 1, io), height: 2, background: C.gold}} /></Center>
      <Center y={630}>
        <div style={{fontFamily: FONT, fontSize: 42, fontWeight: 650, letterSpacing: -1, color: C.fg, lineHeight: 1.25}}><Words text="Let Mike do its thing." f={f} start={38} step={3} /></div>
      </Center>
      <Center y={684}>
        <div style={{position: 'relative', fontFamily: FONT, fontSize: 42, fontWeight: 650, letterSpacing: -1, color: C.gold, lineHeight: 1.25}}>
          <Words text="You review. Then you decide." f={f} start={54} step={3} color={C.gold} />
          <Sweep f={f} a={74} dur={22} h={3} bottom={-6} />
        </div>
      </Center>
    </Scene>
  );
};

// Drifting backdrop: parallax dot field + wandering gold glow.
const Backdrop: React.FC<{f: number}> = ({f}) => (
  <>
    <AbsoluteFill style={{background: `radial-gradient(ellipse 900px 640px at ${50 + 6 * Math.sin(f / 90)}% ${46 + 4 * Math.cos(f / 110)}%, rgba(230,176,75,0.06), rgba(0,0,0,0) 70%)`}} />
    <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(243,239,230,0.05) 1px, transparent 1.4px)', backgroundSize: '44px 44px', backgroundPosition: `${(f * 0.35) % 44}px ${(f * -0.6) % 44}px`}} />
  </>
);

// Legacy 1920x1080 stage. In 9:16 it is scaled by K916 about the centre column (== the old crop=1216:2160:1312:0), so f150+ is unchanged.
const Legacy: React.FC<{aspect: Aspect; children: React.ReactNode}> = ({aspect, children}) =>
  aspect === '16x9' ? <AbsoluteFill>{children}</AbsoluteFill> : (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, overflow: 'hidden', transformOrigin: '0 0', transform: `translate(${540 - 960 * K916}px, 0px) scale(${K916})`}}>{children}</div>
  );

export const MikePromo: React.FC<{aspect?: Aspect}> = ({aspect = '16x9'}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: FONT, overflow: 'hidden'}}>
      <Legacy aspect={aspect}><Backdrop f={frame} /></Legacy>
      <Open f={frame - T.open} aspect={aspect} W={width} />
      <Legacy aspect={aspect}><World g={frame} fps={fps} aspect={aspect} /></Legacy>
      <TimeSuper g={frame} aspect={aspect} />
      <Legacy aspect={aspect}>
        <End f={frame - T.end} />
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)', pointerEvents: 'none'}} />
      </Legacy>
    </AbsoluteFill>
  );
};
