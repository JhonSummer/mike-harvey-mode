import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, interpolateColors, Easing, spring, useVideoConfig} from 'remotion';
import {measureText} from '@remotion/layout-utils';
import {VO, W as Wd} from './voB';

// Mike · Version B — "Coffee date, sun to moon" · 37 s · 30 fps · native 9:16 + 16:9.
// Storyboard: refs/version-b/storyboard-coffee-sun-moon.jpg. VO timings come from src/voB.ts (generated from audio/vo_b).
// Self-contained: src/Mike.tsx (the KEEP overnight cut) is not imported or modified.
export type Aspect = '16x9' | '9x16';
export const TB = {total: 1110};
const K916 = 1920 / 1080;
const C = {bg: '#060608', fg: '#F3EFE6', dim: 'rgba(243,239,230,0.58)', faint: 'rgba(243,239,230,0.14)', gold: '#E6B04B'};
const FONT = 'Inter, "Inter Tight", "DejaVu Sans", sans-serif';
const out = Easing.bezier(0.22, 1, 0.36, 1);
const io = Easing.bezier(0.65, 0, 0.35, 1);
const r = (f: number, a: number, b: number, from = 0, to = 1, e = out) =>
  interpolate(f, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});
const kf = (f: number, keys: [number, number][], e = io) =>
  interpolate(f, keys.map((k) => k[0]), keys.map((k) => k[1]), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});

// ---------- Beat map (frames) — one row per storyboard panel ----------
export const B = {
  open: [0, 150], black: [150, 184], doesnt: [184, 240], morning: [240, 330], gazette: [330, 390], afternoon: [390, 450],
  link: [450, 510], catch: [510, 570], golden: [570, 660], alert: [660, 720], held: [720, 780], night: [780, 870], phone: [870, 990], end: [990, 1110],
} as const;
export const PING_F = 888; // phone lights up (29.6 s) — mix37b.py reads the same number from STATUS/LINE-LOCK

// ---------- Clock: one time of day drives the pill AND the café lighting (continuous sun -> moon) ----------
const TOD: [number, number][] = [[0, 612], [150, 614], [240, 640], [330, 652], [342, 792], [390, 798], [402, 905], [450, 911], [462, 980], [510, 985],
  [522, 1022], [570, 1027], [582, 1128], [660, 1138], [672, 1180], [720, 1184], [732, 1185], [780, 1189], [792, 1284], [870, 1290], [882, 1291], [990, 1293]];
const todAt = (f: number) => kf(f, TOD, Easing.bezier(0.45, 0, 0.55, 1));
const LABELS: [number, string][] = [[0, 'Sat 24 Oct'], [240, 'Coffee date'], [330, 'Gazette drops'], [390, 'Still talking'], [450, 'Mike still reading'],
  [510, 'Mike found it'], [570, 'Golden hour'], [660, 'Alert drafted'], [720, 'Held for you'], [780, 'Candlelight'], [870, 'Phone lights up']];
const hhmm = (mins: number) => {
  const m = Math.round(mins) % 1440, h = Math.floor(m / 60), mm = m % 60;
  return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
};

const Center: React.FC<{y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({y, children, style}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', ...style}}>{children}</div>
);

const TimePill: React.FC<{f: number; aspect: Aspect}> = ({f, aspect}) => {
  const vis = (r(f, 4, 14) * (1 - r(f, 140, 150))) + (r(f, 238, 250) * (1 - r(f, 984, 994)));
  if (vis < 0.01) return null;
  const v = aspect === '16x9' ? {fs: 26, h: 50, top: 40, pad: 22} : {fs: 36, h: 70, top: 120, pad: 30};
  const mins = todAt(f);
  let li = 0; LABELS.forEach((l, i) => { if (f >= l[0]) li = i; });
  const [t0, txt] = LABELS[li];
  const prev = li > 0 ? LABELS[li - 1][1] : txt;
  const a = r(f, t0, t0 + 10, 0, 1, io);
  const mw = (t: string) => Math.ceil(measureText({text: t, fontFamily: FONT, fontSize: v.fs, fontWeight: '400'}).width * 1.06) + 4;
  const tw = mw(prev) + (mw(txt) - mw(prev)) * a;
  const night = mins >= 19 * 60 + 15 || mins < 6 * 60;
  const pop = spring({frame: f - t0, fps: 30, config: {damping: 12, stiffness: 200}});
  return (
    <Center y={v.top} style={{opacity: vis}}>
      <div style={{display: 'flex', alignItems: 'center', height: v.h, boxSizing: 'border-box', fontFamily: FONT, fontSize: v.fs, color: C.fg, padding: `0 ${v.pad}px`, borderRadius: v.h,
        background: 'rgba(6,6,8,0.72)', border: `1px solid ${C.faint}`, whiteSpace: 'nowrap', backdropFilter: 'blur(6px)', transform: `scale(${0.94 + 0.06 * pop})`}}>
        <span style={{color: C.gold, display: 'inline-block', transform: `rotate(${f * 1.1}deg)`, marginRight: 14}}>{night ? '☾' : '☀'}</span>
        <span style={{fontVariantNumeric: 'tabular-nums', fontWeight: 650}}>{hhmm(mins)}</span>
        <span style={{margin: '0 12px', color: C.dim}}>·</span>
        <span style={{position: 'relative', display: 'inline-block', width: tw, height: v.fs * 1.3, overflow: 'hidden', color: C.dim}}>
          {a < 1 && li > 0 && <span style={{position: 'absolute', left: 0, top: 0, opacity: 1 - a, transform: `translateY(${-v.fs * a}px)`}}>{prev}</span>}
          <span style={{position: 'absolute', left: 0, top: 0, opacity: li > 0 ? a : 1, transform: `translateY(${li > 0 ? v.fs * (1 - a) : 0}px)`}}>{txt}</span>
        </span>
      </div>
    </Center>
  );
};

// ---------- Timed words (VO-synced kinetic type) ----------
const TimedWords: React.FC<{words: Wd[]; t: number; gold?: (w: string) => boolean; lift?: number; dimBefore?: number; color?: string}> = ({words, t, gold, lift = 24, dimBefore = 0, color}) => (
  <>
    {words.map(([w, ws], i) => {
      const p = r(t, ws - 0.06, ws + 0.2);
      const o = dimBefore + (1 - dimBefore) * p;
      const isG = gold?.(w);
      const join = w.endsWith('-');
      return <span key={i} style={{display: 'inline-block', opacity: o, transform: `translateY(${(1 - p) * lift}px) scale(${0.96 + 0.04 * p})`, filter: p < 0.98 && dimBefore === 0 ? `blur(${(1 - p) * 6}px)` : undefined,
        color: isG ? C.gold : color, marginRight: i < words.length - 1 && !join ? '0.26em' : 0}}>{w}</span>;
    })}
  </>
);

// VO caption band for the long mid + intro lines (chunks, karaoke brighten).
const CHUNKS: [string, [number, number][]][] = [['v4_mid', [[0, 8], [8, 18], [18, 27], [27, 31], [31, 36], [36, 43]]], ['v5_intro', [[0, 2], [2, 7], [7, 17], [17, 26]]]];
const GOLDW = new Set(['24/7', 'coffee', 'date,', 'high-stakes', 'meeting,', 'drafting', 'notice.', 'texts', 'you.', 'Harvey', 'Mike,']);
const voWords = (k: string): Wd[] => VO[k].words.map(([w, a, b]) => [w === 'photographic' ? 'photographic-' : w, a, b] as Wd);
const Captions: React.FC<{f: number; aspect: Aspect}> = ({f, aspect}) => {
  const t = f / 30;
  const items: {w: Wd[]; a: number; b: number}[] = [];
  CHUNKS.forEach(([k, rs]) => {
    const ws = voWords(k);
    rs.forEach(([i, j], n) => {
      const a = ws[i][1] - 0.12;
      const b = n < rs.length - 1 ? ws[rs[n + 1][0]][1] - 0.12 : ws[j - 1][2] + 0.55;
      items.push({w: ws.slice(i, j), a, b});
    });
  });
  const it = items.find((x) => t >= x.a && t < x.b);
  if (!it) return null;
  const e = r(t, it.a, it.a + 0.2), x = r(t, it.b - 0.12, it.b, 0, 1, io);
  const v = aspect === '16x9' ? {fs: 40, top: 930, mw: 1500} : {fs: 52, top: 1590, mw: 940};
  return (
    <>
      <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(0,0,0,0) ${aspect === '16x9' ? 70 : 74}%, rgba(4,4,6,0.62) 100%)`, opacity: 1}} />
      <Center y={v.top} style={{opacity: e * (1 - x), transform: `translateY(${(1 - e) * 18 - x * 10}px)`}}>
        <div style={{maxWidth: v.mw, fontFamily: FONT, fontSize: v.fs, fontWeight: 650, letterSpacing: -0.5, lineHeight: 1.22, color: C.fg, textShadow: '0 2px 18px rgba(0,0,0,0.85)'}}>
          <TimedWords words={it.w} t={t} gold={(w) => GOLDW.has(w)} lift={8} dimBefore={0.28} />
        </div>
      </Center>
    </>
  );
};

// ---------- Beat wrapper: zoom-through in, push-out ----------
const Beat: React.FC<{f: number; span: readonly [number, number]; inF?: number; outF?: number; push?: number; children: (lf: number, len: number) => React.ReactNode; origin?: string}> = ({f, span, inF = 8, outF = 8, push = 0.05, children, origin = '50% 50%'}) => {
  const [a, b] = span; const len = b - a; const lf = f - a;
  if (lf < -inF || lf > len + outF) return null;
  const en = r(lf, -inF, inF, 0, 1, out);
  const ex = r(lf, len - outF / 2, len + outF, 0, 1, io);
  const s = (1 + push * r(lf, 0, len, 0, 1, Easing.bezier(0.3, 0.1, 0.6, 1))) * (1.1 - 0.1 * en) * (1 + 0.1 * ex);
  const bl = 10 * (1 - en) + 12 * ex;
  return (
    <AbsoluteFill style={{opacity: Math.min(en, 1 - ex), transform: `scale(${s})`, transformOrigin: origin, filter: bl > 0.1 ? `blur(${bl}px)` : undefined}}>
      {children(lf, len)}
    </AbsoluteFill>
  );
};

// Proof stage: 1920x1080 design canvas. 9:16 scales by K916 about the centre column; 16:9 scales by s16 about centre.
const Proof: React.FC<{aspect: Aspect; s16?: number; children: React.ReactNode}> = ({aspect, s16 = 1.2, children}) => aspect === '16x9'
  ? <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${s16})`, transformOrigin: '960px 500px'}}>{children}</div>
  : <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `translate(${540 - 960 * K916}px, 0px) scale(${K916})`}}>{children}</div>;

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
const Sweep: React.FC<{f: number; a: number; dur?: number; h?: number; bottom?: number}> = ({f, a, dur = 18, h = 4, bottom = -6}) => {
  const w = r(f, a, a + dur, 0, 100, io);
  const shine = ((f - a) * 2.2) % 160 - 30;
  return (
    <div style={{position: 'absolute', left: 0, bottom, height: h, width: `${w}%`, borderRadius: h, background: C.gold, overflow: 'hidden', opacity: 0.95}}>
      <div style={{position: 'absolute', top: 0, bottom: 0, left: `${shine}%`, width: '30%', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,240,200,0.85), rgba(255,255,255,0))'}} />
    </div>
  );
};
const Words: React.FC<{text: string; f: number; start: number; step?: number; dur?: number; color?: string; lift?: number}> = ({text, f, start, step = 3, dur = 14, color, lift = 26}) => {
  const ws = text.split(' ');
  return <>{ws.map((w, i) => {
    const p = r(f, start + i * step, start + i * step + dur);
    return <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * lift}px)`, filter: p < 0.99 ? `blur(${(1 - p) * 7}px)` : undefined, color, marginRight: i < ws.length - 1 ? '0.25em' : 0}}>{w}</span>;
  })}</>;
};

// ---------- 01–02 Open: laptop (reused open craft from Mike.tsx, retimed: lid 104→122, slam f122 = 4.07 s) ----------
const streamHead = 'Checking cl. 7.3 against the draft fare rules —';
const streamTxt = streamHead + ' it sets one fare ceiling for every route. That network-wide ceiling may not hold once routes are priced one by one.';
const cutAt = streamTxt.indexOf('once routes are') + 'once routes are'.length;
const LW = 480, LH = 300, DD = 300, LID_SHUT = -105, D = 42;
const OPEN_CAM: Record<Aspect, {k: number; c0: number; c1: number; cw: number; cp: number; kick: number; kickY: number; ay0: number; ay1: number}> = {
  '16x9': {k: 1, c0: 2.6, c1: 2.45, cw: 1.75, cp: 1.95, kick: 0.05, kickY: 8, ay0: 520, ay1: 540},
  '9x16': {k: K916, c0: 0.845, c1: 0.82, cw: 0.78, cp: 0.82, kick: 0.035, kickY: 12, ay0: 760, ay1: 820},
};
const lidAngle = (f: number) => {
  const g = f - D;
  if (g < 62) return 0;
  if (g < 78) return interpolate(g, [62, 78], [0, -101], {easing: Easing.in(Easing.quad)});
  if (g < 80) return interpolate(g, [78, 80], [-101, LID_SHUT]);
  if (g < 83) return interpolate(g, [80, 83], [LID_SHUT, LID_SHUT + 3], {easing: Easing.out(Easing.quad)});
  if (g < 86) return interpolate(g, [83, 86], [LID_SHUT + 3, LID_SHUT], {easing: Easing.in(Easing.quad)});
  return LID_SHUT;
};
export const SLAM_F = 80 + D; // 122
const Open: React.FC<{f: number; aspect: Aspect; W: number}> = ({f, aspect, W}) => {
  if (f > 158) return null;
  const cam = OPEN_CAM[aspect];
  const g = f - D;
  const t50 = r(g, 50, 68, 0, 1, Easing.inOut(Easing.cubic));
  let cz = g < 50 ? interpolate(f, [0, 50 + D], [cam.c0, cam.c1], {extrapolateLeft: 'clamp'}) : cam.c1 + (cam.cw - cam.c1) * t50;
  if (g > 86) cz = interpolate(g, [86, 108], [cam.cw, cam.cp], {extrapolateRight: 'clamp', easing: out});
  const kt = g - 80;
  const kick = kt >= 0 ? Math.exp(-kt / 3.2) * Math.cos(kt * 0.55) : 0;
  cz += cam.kick * kick;
  const focal = -150 + 57 * t50 + 113 * r(g, 84, 108, 0, 1, io);
  const ay = cam.ay0 + (cam.ay1 - cam.ay0) * t50 + cam.kickY * kick + 3 * Math.sin(f / 40);
  const exit = r(f, 146, 152, 0, 1, io);
  const Ce = cz * cam.k;
  const ty = ay - focal * Ce;
  const ang = lidAngle(f);
  const chars = g >= 72 ? cutAt : Math.max(streamHead.length, Math.floor(interpolate(f, [4, 72 + D], [streamHead.length, cutAt], {extrapolateLeft: 'clamp'})));
  const caret = g >= 72 || Math.floor(f / 8) % 2 === 0;
  const screenOn = interpolate(g, [78, 80, 88], [1, 0.6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const closing = r(g, 62, 78, 0, 1, Easing.in(Easing.quad));
  const sliver = interpolate(g, [70, 72, 80, 88], [0, 1, 0.6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scroll = r(f, 0, 72 + D, 0, -60, Easing.linear);
  const led = g < 96 ? 0.55 + 0.45 * Math.sin((f / 30) * Math.PI * 2) : 0;
  return (
    <AbsoluteFill style={{opacity: 1 - exit}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 0, height: 0, transform: `translate(${W / 2}px, ${ty}px) scale(${Ce})`, transformOrigin: '0 0'}}>
        <div style={{position: 'absolute', left: -460, top: -80, width: 920, height: 420, background: `radial-gradient(ellipse at 50% 30%, rgba(200,210,255,${0.14 * screenOn}), rgba(0,0,0,0) 62%)`}} />
        <div style={{position: 'absolute', left: -LW / 2, top: -LH, width: LW, height: 960, perspective: 1400, perspectiveOrigin: '50% 25%', transformStyle: 'preserve-3d'}}>
          <div style={{position: 'absolute', left: 0, top: LH, width: LW, height: DD, transformOrigin: '50% 0%', transform: 'rotateX(75deg)', transformStyle: 'preserve-3d',
            background: 'linear-gradient(180deg, #121218 0%, #0D0D12 100%)', border: '2px solid rgba(243,239,230,0.24)', borderRadius: '6px 6px 16px 16px', boxSizing: 'border-box'}}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{position: 'absolute', left: 40 + i * 4, right: 40 + i * 4, top: 26 + i * 30, height: 20, background: 'repeating-linear-gradient(90deg, rgba(243,239,230,0.09) 0 26px, rgba(0,0,0,0) 26px 32px)', borderRadius: 3}} />)}
            <div style={{position: 'absolute', left: LW / 2 - 85, width: 170, top: 186, height: 92, borderRadius: 10, border: '2px solid rgba(243,239,230,0.1)'}} />
            <div style={{position: 'absolute', inset: 0, borderRadius: 'inherit', background: `radial-gradient(ellipse 70% 90% at 50% 0%, rgba(200,214,255,${(0.16 + 0.5 * closing) * screenOn}), rgba(0,0,0,0) 75%)`}} />
            <div style={{position: 'absolute', left: -2, right: -2, top: DD - 2, height: 12, transformOrigin: '50% 0%', transform: 'rotateX(-75deg)', background: 'linear-gradient(180deg,#16161c,#08080b)', border: '1.5px solid rgba(243,239,230,0.2)', borderRadius: '0 0 10px 10px', boxSizing: 'border-box'}}>
              <div style={{position: 'absolute', left: LW / 2 - 3, top: 3, width: 6, height: 4, borderRadius: 3, background: led > 0.01 ? C.gold : 'rgba(243,239,230,0.12)', opacity: led > 0.01 ? 0.35 + 0.65 * led : 1, boxShadow: led > 0.01 ? `0 0 ${4 + 6 * led}px ${1 + 2 * led}px rgba(230,176,75,${0.75 * led})` : 'none'}} />
            </div>
          </div>
          <div style={{position: 'absolute', left: 0, top: 0, width: LW, height: LH, transformOrigin: '50% 100%', transform: ang !== 0 ? `rotateX(${ang}deg)` : undefined, transformStyle: 'preserve-3d'}}>
            <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: '14px 14px 4px 4px', background: '#101015', border: '2px solid rgba(243,239,230,0.3)', boxSizing: 'border-box', overflow: 'hidden', filter: ang !== 0 ? `brightness(${1 - 0.35 * closing})` : undefined}}>
              <div style={{position: 'absolute', inset: 10, borderRadius: 4, background: '#0B0C10', overflow: 'hidden', display: 'flex', fontFamily: FONT, textAlign: 'left', opacity: 0.35 + 0.65 * screenOn}}>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', borderRight: '1px solid rgba(243,239,230,0.08)'}}>
                  <div style={{position: 'relative', zIndex: 2, background: '#0B0C10', padding: '12px 12px 8px', fontSize: 11, letterSpacing: 1.2, lineHeight: 1.3, color: C.gold, fontWeight: 700}}>INDUS AIR · FALCON GULF CODESHARE</div>
                  <div style={{position: 'relative', flex: 1, overflow: 'hidden', marginTop: 8, padding: '0 12px'}}>
                    <div style={{transform: `translateY(${scroll}px)`}}>
                      {Array.from({length: 18}).map((_, i) => (
                        i === 5 ? <div key={i} style={{fontSize: 13, lineHeight: 1.35, color: C.fg, background: 'rgba(230,176,75,0.18)', borderLeft: `2px solid ${C.gold}`, padding: '4px 7px', margin: '7px 0'}}><b style={{color: C.gold}}>7.3</b>  Fare ceiling applies network-wide.</div>
                          : <div key={i} style={{height: 6, borderRadius: 3, margin: '9px 0', width: `${60 + ((i * 37) % 38)}%`, background: 'rgba(243,239,230,0.13)'}} />
                      ))}
                    </div>
                  </div>
                </div>
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
            <div style={{position: 'absolute', inset: 0, transform: 'translateZ(-6px) rotateY(180deg)', backfaceVisibility: 'hidden', borderRadius: '14px 14px 4px 4px', background: 'linear-gradient(180deg,#1d1d24,#141419)', border: '2px solid rgba(243,239,230,0.3)', boxSizing: 'border-box'}}>
              <div style={{position: 'absolute', left: LW / 2 - 18, top: LH / 2 - 18, width: 36, height: 36, borderRadius: 36, border: '3px solid rgba(243,239,230,0.16)', boxSizing: 'border-box'}} />
            </div>
            <div style={{position: 'absolute', left: 6, right: 6, top: 0, height: 6, transformOrigin: '50% 0%', transform: 'rotateX(-90deg)', background: '#1a1a20', borderRadius: 3,
              boxShadow: sliver > 0.01 ? `0 -2px ${6 + 10 * sliver}px ${1 + 2 * sliver}px rgba(205,218,255,${0.8 * sliver})` : 'none', borderTop: sliver > 0.01 ? `3px solid rgba(225,232,255,${sliver})` : 'none', boxSizing: 'border-box'}} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
// Open captions: the VO lines as big kinetic type under the laptop (board 01/02).
const OpenType: React.FC<{f: number; aspect: Aspect}> = ({f, aspect}) => {
  if (f > 152) return null;
  const t = f / 30;
  const v = aspect === '16x9' ? {fs: 52, top: 880} : {fs: 66, top: 1430};
  const w1 = VO.v1_open.words, w2 = VO.v2_close.words;
  const x1 = r(t, w2[0][1] - 0.25, w2[0][1] - 0.05, 0, 1, io);
  const x2 = r(f, 140, 150, 0, 1, io);
  const st = {fontFamily: FONT, fontSize: v.fs, fontWeight: 700, letterSpacing: -1.2, lineHeight: 1.15, color: C.fg, maxWidth: aspect === '16x9' ? 1500 : 900, textShadow: '0 4px 30px rgba(0,0,0,0.9)'};
  return (
    <>
      <Center y={v.top} style={{opacity: 1 - x1, transform: `translateY(${-14 * x1}px)`, filter: x1 > 0.02 ? `blur(${6 * x1}px)` : undefined}}><div style={st}><TimedWords words={w1} t={t} gold={(w) => w === 'laptop.'} /></div></Center>
      <Center y={v.top} style={{opacity: 1 - x2}}><div style={st}><TimedWords words={w2} t={t} gold={(w) => w === 'close' || w === 'it?'} /></div></Center>
    </>
  );
};

// ---------- 03 black + 04 "Mike doesn't." ----------
const Ember: React.FC<{f: number}> = ({f}) => {
  if (f < 146 || f > 196) return null;
  const o = r(f, 146, 156) * (1 - r(f, 184, 196));
  const br = 0.5 + 0.5 * Math.sin((f - 146) / 4);
  const sz = 140 + 160 * r(f, 150, 190, 0, 1, Easing.linear);
  return <AbsoluteFill style={{background: `radial-gradient(circle ${sz}px at 50% ${52 - 4 * r(f, 150, 190)}%, rgba(230,176,75,${(0.05 + 0.06 * br) * o}), rgba(0,0,0,0) 100%)`}} />;
};
const Doesnt: React.FC<{f: number; aspect: Aspect}> = ({f, aspect}) => {
  if (f < 176 || f > 250) return null;
  const t = f / 30;
  const [m, d] = VO.v3_doesnt.words;
  const pm = spring({frame: f - Math.round(m[1] * 30) + 2, fps: 30, config: {damping: 11, stiffness: 170, mass: 0.7}});
  const pd = spring({frame: f - Math.round(d[1] * 30) + 1, fps: 30, config: {damping: 10, stiffness: 210, mass: 0.6}});
  const dot = spring({frame: f - Math.round(d[2] * 30), fps: 30, config: {damping: 7, stiffness: 240}});
  const ex = r(f, 232, 246, 0, 1, io);
  const fs = aspect === '16x9' ? 150 : 150;
  const glow = r(t, m[1], m[1] + 0.6);
  const shake = f >= Math.round(d[1] * 30) ? Math.exp(-(f - d[1] * 30) / 3) * Math.sin(f * 2.3) * 8 : 0;
  return (
    <AbsoluteFill style={{opacity: 1 - ex, transform: `scale(${(1 + 0.05 * r(f, 184, 240, 0, 1, Easing.linear)) * (1 + 0.35 * ex)})`, filter: ex > 0.02 ? `blur(${14 * ex}px)` : undefined}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse 60% 34% at 50% 50%, rgba(230,176,75,${0.16 * glow}), rgba(0,0,0,0) 70%)`}} />
      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateX(${shake}px)`}}>
        <div style={{fontFamily: FONT, fontSize: fs, fontWeight: 780, letterSpacing: -5, color: C.fg, display: 'flex', alignItems: 'baseline', whiteSpace: 'nowrap'}}>
          <span style={{display: 'inline-block', opacity: Math.min(1, pm * 1.5), transform: `scale(${1.5 - 0.5 * pm})`, filter: pm < 0.97 ? `blur(${(1 - pm) * 12}px)` : undefined}}>Mike</span>
          <span style={{display: 'inline-block', marginLeft: '0.24em', opacity: Math.min(1, pd * 1.5), transform: `translateY(${(1 - pd) * 70}px) scale(${1.25 - 0.25 * pd})`}}>doesn’t</span>
          <span style={{display: 'inline-block', color: C.gold, transform: `scale(${dot})`}}>.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- Café scene: ONE scene, lighting is a function of time-of-day (sun -> moon) ----------
const TK = [640, 905, 1128, 1290];
const col = (tod: number, cs: string[]) => interpolateColors(tod, TK, cs);
const num = (tod: number, vs: number[]) => interpolate(tod, TK, vs, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
const CafeScene: React.FC<{tod: number; lf: number; len: number; W: number; H: number; aspect: Aspect; zoom?: number; dim?: number; phoneGlow?: number}> = ({tod, lf, len, W, H, aspect, zoom = 0, dim = 0, phoneGlow = 0}) => {
  const P = aspect === '9x16';
  const u = P ? 1 : 0.74;
  const cx = W / 2, aw = P ? 150 : 96, hy = P ? H * 0.5 : H * 0.55, gy = P ? H * 0.665 : H * 0.69;
  const prog = len > 0 ? lf / len : 0;
  const skyT = col(tod, ['#5E9ED8', '#86AFD3', '#C4532F', '#070C26']);
  const skyB = col(tod, ['#D8EAF6', '#F0DFC2', '#F7B456', '#22295A']);
  const bld = col(tod, ['#B39A80', '#A68D73', '#5C3A2C', '#161829']);
  const bld2 = col(tod, ['#9C8670', '#94795F', '#4A2E24', '#11131F']);
  const haze = col(tod, ['#C7D6E0', '#D9CDB4', '#B9693F', '#1C2246']);
  const floorT = col(tod, ['#8E7764', '#81695A', '#5A3A2A', '#17151F']);
  const floorB = col(tod, ['#6E5A4B', '#5F4C40', '#3A251C', '#0B0A11']);
  const tableC = col(tod, ['#F4F0E8', '#EFE6D6', '#F0CFA2', '#7A604A']);
  const tableE = col(tod, ['#CFC8BC', '#C9BCA6', '#BC8F62', '#3C2E24']);
  const sil = col(tod, ['#151316', '#141215', '#120D0D', '#07070B']);
  const stripeA = col(tod, ['#2F4C3B', '#2D4838', '#25362A', '#121A16']);
  const stripeB = col(tod, ['#EEE7D8', '#E9DFCB', '#E2C297', '#4A4438']);
  const sunC = col(tod, ['#FFF6DA', '#FFF4D8', '#FFD27A', '#FFD27A']);
  const winC = col(tod, ['#7F9DB8', '#8AA0B0', '#3B2A33', '#E0A84E']);
  const sunR = num(tod, [44, 64, 112, 90]) * u;
  const skyH = hy - aw;
  const sx = W * num(tod, [0.78, 0.55, 0.6, 0.6]) - prog * 18 * u;
  const sy = aw + skyH * num(tod, [0.24, 0.16, 0.86, 1.35]) + (num(tod, [0, 0, 1, 1]) * prog * 22 * u);
  const sunO = num(tod, [1, 1, 1, 0]);
  const moonO = r(tod, 1200, 1270), lights = r(tod, 1070, 1130), candle = r(tod, 1230, 1282);
  const nightW = r(tod, 1150, 1260);
  const cups = 1 - r(tod, 1060, 1110), cocktails = r(tod, 1090, 1125);
  const shX = num(tod, [-70, -10, -190, 0]) * u, shA = num(tod, [0.32, 0.28, 0.4, 0.22]);
  const z = (1 + 0.07 * prog + zoom);
  const flick = 0.85 + 0.15 * Math.sin(lf * 0.9) * Math.sin(lf * 0.37 + 1);
  // string-light catenary
  const ly0 = aw + 46 * u, sag = 80 * u;
  const bulbs = Array.from({length: Math.ceil(W / (72 * u)) + 1}).map((_, i) => { const x = i * 72 * u + 20; const tt = x / W; return [x, ly0 + sag * 4 * tt * (1 - tt)]; });
  const stars = Array.from({length: 40}).map((_, i) => [((i * 197) % 997) / 997 * W, aw + (((i * 131) % 613) / 613) * skyH * 0.7, 0.5 + 0.5 * Math.sin(lf / 7 + i)]);
  const person = (s: number) => {
    const xc = cx + s * 270 * u, xp = xc - s * 6 * u;
    const bob = Math.sin(lf / (s > 0 ? 17 : 21) + (s > 0 ? 1 : 0)) * 3 * u;
    const lift = s > 0 ? Math.max(0, Math.sin(lf / 22)) ** 3 : Math.max(0, Math.sin(lf / 26 + 2)) ** 3;
    const handX = cx + s * 150 * u, handY = gy - 12 * u - lift * 50 * u;
    const rim = num(tod, [0, 0, 0.9, 0.5]);
    const rimC = tod > 1200 ? `rgba(255,190,110,${0.6 * candle})` : `rgba(255,170,90,${rim})`;
    return (
      <g key={s}>
        {/* chair */}
        <rect x={xc + s * 40 * u - 46 * u} y={gy - 200 * u} width={92 * u} height={270 * u} rx={46 * u} fill={sil} opacity={0.96} />
        <line x1={xc - 52 * u} y1={gy + 62 * u} x2={xc - 64 * u} y2={gy + 345 * u} stroke={sil} strokeWidth={7 * u} strokeLinecap="round" />
        <line x1={xc + 52 * u} y1={gy + 62 * u} x2={xc + 64 * u} y2={gy + 345 * u} stroke={sil} strokeWidth={7 * u} strokeLinecap="round" />
        <rect x={xc - 70 * u} y={gy + 52 * u} width={140 * u} height={14 * u} rx={7 * u} fill={sil} />
        {/* legs under the table */}
        <path d={`M ${xp} ${gy + 44 * u} L ${xp - s * 95 * u} ${gy + 66 * u} L ${xp - s * 92 * u} ${gy + 310 * u}`} fill="none" stroke={sil} strokeWidth={28 * u} strokeLinecap="round" strokeLinejoin="round" />
        {/* torso + head */}
        <g transform={`translate(0 ${bob})`}>
          <path d={`M ${xp - 58 * u} ${gy + 52 * u} C ${xp - 64 * u} ${gy - 120 * u}, ${xp - 50 * u} ${gy - 196 * u}, ${xp} ${gy - 200 * u} C ${xp + 50 * u} ${gy - 196 * u}, ${xp + 64 * u} ${gy - 120 * u}, ${xp + 58 * u} ${gy + 52 * u} Z`} fill={sil} stroke={rimC} strokeWidth={2.2 * u} />
          <circle cx={xp - s * 4 * u} cy={gy - 252 * u} r={40 * u} fill={sil} stroke={rimC} strokeWidth={2.2 * u} />
          {s < 0 && <circle cx={xp + s * 26 * u} cy={gy - 290 * u} r={19 * u} fill={sil} />}
          <path d={`M ${xp - s * 20 * u} ${gy - 168 * u} Q ${xp - s * 80 * u} ${gy - 40 * u}, ${handX} ${handY}`} fill="none" stroke={sil} strokeWidth={24 * u} strokeLinecap="round" />
        </g>
      </g>
    );
  };
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: C.bg}}>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={skyT} /><stop offset="100%" stopColor={skyB} /></linearGradient>
          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={floorT} /><stop offset="100%" stopColor={floorB} /></linearGradient>
          <radialGradient id="sunGlow"><stop offset="0%" stopColor={sunC} stopOpacity={0.75} /><stop offset="100%" stopColor={sunC} stopOpacity={0} /></radialGradient>
          <radialGradient id="candle"><stop offset="0%" stopColor="#FFC873" stopOpacity={0.55} /><stop offset="45%" stopColor="#FF9A3D" stopOpacity={0.16} /><stop offset="100%" stopColor="#FF9A3D" stopOpacity={0} /></radialGradient>
          <radialGradient id="bulb"><stop offset="0%" stopColor="#FFE2A0" stopOpacity={0.9} /><stop offset="100%" stopColor="#FFB84D" stopOpacity={0} /></radialGradient>
          <clipPath id="floorClip"><rect x={-400} y={hy} width={W + 800} height={H + 400} /></clipPath>
          <radialGradient id="phone"><stop offset="0%" stopColor="#E6B04B" stopOpacity={0.8} /><stop offset="100%" stopColor="#E6B04B" stopOpacity={0} /></radialGradient>
        </defs>
        <g transform={`translate(${cx} ${gy - 120 * u}) scale(${z}) translate(${-cx} ${-(gy - 120 * u)})`}>
          {/* sky layer (parallax: drifts less) */}
          <g transform={`translate(${-prog * 10 * u} 0)`}>
            <rect x={-200} y={-200} width={W + 400} height={hy + 200} fill="url(#sky)" />
            {stars.map(([x, y, tw], i) => <circle key={i} cx={x} cy={y} r={1.6 * u} fill="#fff" opacity={nightW * 0.7 * tw} />)}
            <circle cx={sx} cy={sy} r={sunR * 3.2} fill="url(#sunGlow)" opacity={sunO} />
            <circle cx={sx} cy={sy} r={sunR} fill={sunC} opacity={sunO} />
            <g opacity={moonO} transform={`translate(${W * 0.5 + prog * 8 * u} ${aw + skyH * 0.34 - prog * 10 * u})`}>
              <circle r={120 * u} fill="url(#sunGlow)" opacity={0.35} />
              <circle r={40 * u} fill="#F4EEDC" />
              <circle cx={-10 * u} cy={-8 * u} r={7 * u} fill="#DCD3BC" /><circle cx={12 * u} cy={10 * u} r={5 * u} fill="#DCD3BC" />
            </g>
            {/* distant skyline (haze) */}
            <path d={`M ${-100} ${hy} L -100 ${hy - 60 * u} ${Array.from({length: 14}).map((_, i) => { const x = (i / 13) * (W + 200) - 100; const h = (50 + ((i * 53) % 70)) * u; return `L ${x} ${hy - h} L ${x + 60 * u} ${hy - h}`; }).join(' ')} L ${W + 100} ${hy} Z`} fill={haze} opacity={0.75} />
          </g>
          {/* buildings */}
          <rect x={-60} y={aw + skyH * 0.28} width={(P ? 0.24 : 0.17) * W + 60} height={hy - aw - skyH * 0.28 + 4} fill={bld} />
          {Array.from({length: 6}).map((_, i) => <rect key={i} x={(i % 2) * (P ? 0.1 : 0.07) * W + 24 * u} y={aw + skyH * (0.36 + Math.floor(i / 2) * 0.18)} width={34 * u} height={50 * u} rx={4 * u} fill={winC} opacity={0.55 + 0.45 * nightW * (i % 3 === 1 ? 0.4 : 1)} />)}
          <rect x={W * (P ? 0.78 : 0.84)} y={aw + skyH * 0.2} width={W * (P ? 0.22 : 0.16) + 60} height={hy - aw - skyH * 0.2 + 4} fill={bld2} />
          <path d={`M ${W * (P ? 0.84 : 0.875)} ${hy} L ${W * (P ? 0.84 : 0.875)} ${aw + skyH * 0.55} A ${32 * u} ${32 * u} 0 0 1 ${W * (P ? 0.84 : 0.875) + 64 * u} ${aw + skyH * 0.55} L ${W * (P ? 0.84 : 0.875) + 64 * u} ${hy} Z`} fill={winC} opacity={0.85} />
          {/* terrace floor */}
          <rect x={-200} y={hy} width={W + 400} height={H - hy + 200} fill="url(#floor)" />
          <g clipPath="url(#floorClip)">{Array.from({length: 9}).map((_, i) => <line key={i} x1={cx} y1={hy - 300 * u} x2={cx + (i - 4) * 360 * u} y2={H + 200} stroke="#000" strokeOpacity={0.08} strokeWidth={2} />)}</g>
          <line x1={-200} y1={hy} x2={W + 200} y2={hy} stroke="#000" strokeOpacity={0.18} strokeWidth={3} />
          {/* table shadow */}
          <ellipse cx={cx + shX} cy={gy + 342 * u} rx={280 * u + Math.abs(shX) * 0.6} ry={30 * u} fill="#000" opacity={shA} />
          {/* people + chairs */}
          {person(-1)}{person(1)}
          {/* table */}
          <rect x={cx - 10 * u} y={gy + 20 * u} width={20 * u} height={320 * u} fill={sil} />
          <ellipse cx={cx} cy={gy + 340 * u} rx={92 * u} ry={14 * u} fill={sil} />
          <ellipse cx={cx} cy={gy + 12 * u} rx={250 * u} ry={46 * u} fill={tableE} />
          <ellipse cx={cx} cy={gy} rx={250 * u} ry={44 * u} fill={tableC} />
          {candle > 0.01 && <circle cx={cx} cy={gy - 40 * u} r={420 * u * flick} fill="url(#candle)" opacity={candle} />}
          {/* cups (day) */}
          {[-1, 1].map((s) => (
            <g key={s} opacity={cups}>
              <ellipse cx={cx + s * 110 * u} cy={gy - 2 * u} rx={34 * u} ry={8 * u} fill="#fff" stroke="#bbb" strokeWidth={1} />
              <path d={`M ${cx + s * 110 * u - 18 * u} ${gy - 34 * u} L ${cx + s * 110 * u + 18 * u} ${gy - 34 * u} L ${cx + s * 110 * u + 14 * u} ${gy - 4 * u} L ${cx + s * 110 * u - 14 * u} ${gy - 4 * u} Z`} fill="#fff" stroke="#bbb" strokeWidth={1} />
              {[0, 1].map((k) => <path key={k} d={`M ${cx + s * 110 * u + (k * 10 - 5) * u} ${gy - 40 * u} q ${8 * u} ${-14 * u} 0 ${-28 * u} q ${-8 * u} ${-14 * u} 0 ${-28 * u}`} fill="none" stroke="#fff" strokeWidth={2.2 * u} strokeLinecap="round"
                opacity={num(tod, [0.6, 0.15, 0, 0]) * (0.4 + 0.6 * Math.abs(Math.sin(lf / 9 + k)))} transform={`translate(0 ${-((lf * 0.8 + k * 14) % 24) * u})`} />)}
            </g>
          ))}
          {/* cocktails (golden -> night) */}
          {[-1, 1].map((s) => (
            <g key={s} opacity={cocktails} transform={`translate(${cx + s * 92 * u} ${gy - 6 * u})`}>
              <path d={`M ${-24 * u} ${-62 * u} L ${24 * u} ${-62 * u} L 0 ${-30 * u} Z`} fill={tod > 1230 ? '#8E1F2B' : '#F08A2E'} stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} />
              <line x1={0} y1={-30 * u} x2={0} y2={0} stroke="rgba(255,255,255,0.7)" strokeWidth={2 * u} />
              <ellipse cx={0} cy={0} rx={12 * u} ry={3 * u} fill="rgba(255,255,255,0.6)" />
            </g>
          ))}
          {/* candle */}
          <g opacity={candle} transform={`translate(${cx} ${gy - 4 * u})`}>
            <rect x={-9 * u} y={-56 * u} width={18 * u} height={56 * u} rx={3 * u} fill="#F1E6CF" />
            <ellipse cx={0} cy={-70 * u} rx={7 * u * flick} ry={15 * u * (0.9 + 0.2 * flick)} fill="#FFC45A" />
            <ellipse cx={0} cy={-66 * u} rx={3 * u} ry={7 * u} fill="#FFF3D0" />
          </g>
          {/* phone on the table */}
          <g transform={`translate(${cx + 40 * u} ${gy + 10 * u}) rotate(-8)`}>
            {phoneGlow > 0.01 && <ellipse cx={0} cy={0} rx={160 * u} ry={60 * u} fill="url(#phone)" opacity={phoneGlow} />}
            <rect x={-42 * u} y={-11 * u} width={84 * u} height={22 * u} rx={6 * u} fill="#0d0d10" stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
            <rect x={-36 * u} y={-7 * u} width={72 * u} height={14 * u} rx={4 * u} fill={C.gold} opacity={phoneGlow} />
          </g>
          {/* awning + string lights (foreground, slight extra parallax) */}
          <g transform={`translate(${prog * 8 * u} 0)`}>
            {bulbs.length > 1 && <path d={`M -40 ${ly0} Q ${W / 2} ${ly0 + 2 * sag} ${W + 40} ${ly0}`} fill="none" stroke="rgba(20,18,16,0.8)" strokeWidth={2} />}
            {bulbs.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y + 8 * u} r={30 * u} fill="url(#bulb)" opacity={lights * (0.75 + 0.25 * Math.sin(lf / 6 + i * 1.7))} />
                <circle cx={x} cy={y + 8 * u} r={6 * u} fill={lights > 0.3 ? '#FFE7B0' : 'rgba(240,235,220,0.55)'} opacity={0.5 + 0.5 * lights} />
              </g>
            ))}
            {Array.from({length: Math.ceil(W / (90 * u)) + 2}).map((_, i) => {
              const sw = 90 * u, x = i * sw - 20;
              return (
                <g key={i}>
                  <rect x={x} y={-20} width={sw} height={aw + 20} fill={i % 2 ? stripeB : stripeA} />
                  <path d={`M ${x} ${aw} A ${sw / 2} ${sw * 0.32} 0 0 0 ${x + sw} ${aw} Z`} fill={i % 2 ? stripeB : stripeA} />
                </g>
              );
            })}
            <rect x={-20} y={aw - 6 * u} width={W + 40} height={6 * u} fill="rgba(0,0,0,0.18)" />
          </g>
        </g>
      </svg>
      {/* grade: warm wash at golden hour, cool night, vignette */}
      <AbsoluteFill style={{background: `radial-gradient(ellipse 80% 60% at ${(sx / W) * 100}% ${(sy / H) * 100}%, rgba(255,150,60,${0.22 * num(tod, [0, 0.05, 1, 0])}), rgba(0,0,0,0) 70%)`, mixBlendMode: 'screen'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)'}} />
      {dim > 0 && <AbsoluteFill style={{background: `rgba(4,4,8,${dim})`}} />}
    </AbsoluteFill>
  );
};

// ---------- Proof beats (Mike UI DNA from Mike.tsx: Gazette, cl. 7.3, alert hold, notification) ----------
const MikeChip: React.FC<{f: number; label: string; x: number; y: number}> = ({f, label, x, y}) => (
  <div style={{position: 'absolute', left: x - 160, width: 320, top: y, display: 'flex', justifyContent: 'center', opacity: r(f, 10, 20), transform: `translateY(${r(f, 10, 22, 12, 0)}px)`}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '7px 16px', border: '1px solid rgba(230,176,75,0.5)', borderRadius: 30, fontFamily: FONT, fontSize: 19, color: C.fg, background: 'rgba(230,176,75,0.08)'}}>
      <span style={{width: 8, height: 8, borderRadius: 8, background: C.gold, opacity: 0.5 + 0.5 * Math.sin(f / 4)}} />{label}
    </div>
  </div>
);
const GazetteCard: React.FC<{f: number; x: number; y: number; h?: number; land?: number; r7: number; scan?: boolean}> = ({f, x, y, h = 500, land = 1, r7, scan}) => (
  <Card x={x} y={y} w={460} h={h} style={{opacity: Math.min(1, land * 1.4), transform: `translateY(${(1 - land) * -220}px) rotate(${(1 - land) * -6}deg)`}}>
    <Tag>Gazette of India · Extraordinary</Tag>
    <div style={{marginTop: 8, fontSize: 25, fontWeight: 700, color: C.fg}}>G-1187 · Civil Aviation</div>
    <div style={{marginTop: 4, fontSize: 16, color: C.dim}}>Published 1:12 PM</div>
    <div style={{marginTop: 22}}><Lines n={5} seed={1} /></div>
    <div style={{marginTop: 18, padding: '9px 10px', borderRadius: 6, fontSize: 19, color: C.fg, background: `rgba(230,176,75,${0.2 * r7})`, borderLeft: `3px solid rgba(230,176,75,${r7})`, boxShadow: `0 0 ${24 * r7}px rgba(230,176,75,${0.18 * r7})`}}>
      <span style={{color: C.gold, fontWeight: 700}}>r.7</span>&nbsp; Fare ceilings set per route.
    </div>
    <div style={{marginTop: 18}}><Lines n={5} seed={4} /></div>
    {scan && <div style={{position: 'absolute', left: 0, right: 0, top: 30 + ((f * 9) % (h - 40)), height: 2, background: C.gold, boxShadow: '0 0 18px 4px rgba(230,176,75,0.45)', opacity: 0.85}} />}
  </Card>
);
const CodeCard: React.FC<{f: number; x: number; y: number; c73: number; brk: number; brkStart: number; style?: React.CSSProperties}> = ({f, x, y, c73, brk, brkStart, style}) => (
  <Card x={x} y={y} w={460} h={420} style={style}>
    <Tag color={C.dim}>Indus Air · Falcon Gulf codeshare</Tag>
    <div style={{marginTop: 22}}><Lines n={5} seed={7} /></div>
    <div style={{marginTop: 18, padding: '10px 12px', borderRadius: 6, color: C.fg, background: `rgba(230,176,75,${0.08 + 0.18 * c73})`, borderLeft: `3px solid rgba(230,176,75,${0.3 + 0.7 * c73})`, boxShadow: `0 0 ${30 * c73}px rgba(230,176,75,${0.22 * c73})`}}>
      <div style={{fontSize: 15, color: C.gold, fontWeight: 700, letterSpacing: 1}}>cl. 7.3</div>
      <div style={{fontSize: 21, marginTop: 2}}>One fare ceiling, network-wide.</div>
    </div>
    <div style={{marginTop: 16, marginLeft: 6, fontSize: 19, color: C.gold, fontWeight: 650, opacity: brk, display: 'flex', gap: 8}}>
      <span style={{display: 'inline-block', transform: `scale(${0.6 + 0.4 * brk})`}}>✕</span><span><Words text="Breaks on DEL–AUH under r.7" f={f} start={brkStart} step={2} dur={10} lift={10} /></span>
    </div>
    <div style={{marginTop: 18}}><Lines n={3} seed={9} /></div>
  </Card>
);

const alertBody = 'G-1187 r.7 sets fare ceilings per route. Your cl. 7.3 assumes one network-wide ceiling, so it breaks on DEL–AUH.';
const AlertCard: React.FC<{f: number; x: number; y: number; chars: number; held: number}> = ({f, x, y, chars, held}) => (
  <Card x={x} y={y} w={500} h={350} style={{border: `1px solid rgba(230,176,75,${0.25 + 0.35 * held})`}}>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Tag>Client alert · Indus Air</Tag>
      <div style={{marginLeft: 'auto', fontSize: 14, color: C.dim}}>Draft · 7:40 PM</div>
    </div>
    <div style={{marginTop: 18, fontSize: 21, lineHeight: 1.45, color: C.fg, minHeight: 150}}>
      {alertBody.slice(0, chars)}<span style={{display: 'inline-block', width: 2, height: 22, marginLeft: 2, background: C.gold, opacity: chars < alertBody.length || Math.floor(f / 8) % 2 ? 0.9 : 0, verticalAlign: -3}} />
    </div>
    <div style={{marginTop: 14, display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, background: 'rgba(230,176,75,0.08)', border: '1px solid rgba(230,176,75,0.35)', opacity: held, transform: `translateY(${(1 - held) * 14}px) scale(${0.94 + 0.06 * held})`}}>
      <svg width={18} height={20} viewBox="0 0 18 20"><rect x={1} y={8} width={16} height={11} rx={2} fill={C.gold} opacity={0.6 + 0.4 * (0.5 + 0.5 * Math.sin(f / 5))} /><path d="M4 8 V5 a5 5 0 0 1 10 0 V8" fill="none" stroke={C.gold} strokeWidth={2} /></svg>
      <div style={{fontSize: 18, color: C.fg, fontWeight: 600}}>Held for Meera</div>
      <div style={{marginLeft: 'auto', fontSize: 16, color: C.dim}}>Not sent</div>
    </div>
  </Card>
);

const Backdrop: React.FC<{f: number}> = ({f}) => (
  <>
    <AbsoluteFill style={{background: `radial-gradient(ellipse 900px 640px at ${50 + 6 * Math.sin(f / 90)}% ${46 + 4 * Math.cos(f / 110)}%, rgba(230,176,75,0.07), rgba(0,0,0,0) 70%)`}} />
    <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(243,239,230,0.05) 1px, transparent 1.4px)', backgroundSize: '44px 44px', backgroundPosition: `${(f * 0.35) % 44}px ${(f * -0.6) % 44}px`}} />
  </>
);

// ---------- 15 End card ----------
const End: React.FC<{f: number; aspect: Aspect}> = ({f, aspect}) => {
  if (f < -10) return null;
  const a = (s: number) => ({opacity: r(f, s, s + 14), transform: `translateY(${r(f, s, s + 18, 22, 0)}px)`, filter: f < s + 12 ? `blur(${r(f, s, s + 12, 6, 0)}px)` : undefined});
  const t = (f + B.end[0]) / 30;
  const w = VO.v6_end.words;
  const en = r(f, -10, 8);
  const sweepAt = Math.round(w[8][2] * 30) - B.end[0];
  return (
    <AbsoluteFill style={{opacity: en, transform: `scale(${(1.08 - 0.08 * en) * (1 + 0.035 * r(f, 0, 120, 0, 1, Easing.linear))})`, filter: en < 0.98 ? `blur(${(1 - en) * 10}px)` : undefined}}>
      <Proof aspect={aspect} s16={1.08}>
        <Center y={250}>
          <div style={{fontFamily: FONT, fontSize: 168, fontWeight: 750, letterSpacing: -7, color: C.fg, lineHeight: 1, display: 'flex'}}>
            {'Mike'.split('').map((l, i) => { const p = r(f, 2 + i * 3, 18 + i * 3); return <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 60}px) scale(${0.85 + 0.15 * p})`, filter: p < 0.99 ? `blur(${(1 - p) * 10}px)` : undefined}}>{l}</span>; })}
            <span style={{color: C.gold, display: 'inline-block', transform: `scale(${spring({frame: f - 16, fps: 30, config: {damping: 9, stiffness: 180}})})`}}>.</span>
          </div>
        </Center>
        <Center y={448} style={a(14)}>
          <div style={{fontFamily: FONT, fontSize: 31, fontWeight: 450, color: C.dim, maxWidth: 560, lineHeight: 1.3}}>Your 24/7 photographic-memory associate.</div>
        </Center>
        <Center y={566}><div style={{width: 64 * r(f, 22, 38, 0, 1, io), height: 2, background: C.gold}} /></Center>
        <Center y={606}>
          <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 650, letterSpacing: -1, color: C.fg, lineHeight: 1.25}}><TimedWords words={w.slice(0, 5)} t={t} /></div>
        </Center>
        <Center y={668}>
          <div style={{position: 'relative', fontFamily: FONT, fontSize: 44, fontWeight: 650, letterSpacing: -1, color: C.gold, lineHeight: 1.25}}>
            <TimedWords words={w.slice(5)} t={t} color={C.gold} />
            <Sweep f={f} a={sweepAt} dur={20} h={3} bottom={-6} />
          </div>
        </Center>
      </Proof>
    </AbsoluteFill>
  );
};

const Watermark: React.FC<{aspect: Aspect}> = ({aspect}) => {
  const P = aspect === '9x16';
  return (
    <div style={{position: 'absolute', right: P ? 52 : 40, bottom: P ? 56 : 32, fontFamily: FONT, fontSize: P ? 26 : 20, fontWeight: 700, letterSpacing: 3, color: 'rgba(243,239,230,0.42)', display: 'flex', alignItems: 'center', gap: 8, textShadow: '0 1px 6px rgba(0,0,0,0.6)'}}>
      <span style={{width: P ? 8 : 6, height: P ? 8 : 6, borderRadius: 8, background: 'rgba(230,176,75,0.75)'}} />7HL
    </div>
  );
};

// ---------- Composition ----------
export const MikeVersionB: React.FC<{aspect?: Aspect}> = ({aspect = '9x16'}) => {
  const f = useCurrentFrame();
  const {fps, width: W, height: H} = useVideoConfig();
  const tod = todAt(f);
  const P = aspect === '9x16';
  const cafe = (span: readonly [number, number], extra?: {zoom?: number; dim?: number; phoneGlow?: number}) => (
    <Beat f={f} span={span} inF={10} outF={10} push={0}>{(lf, len) => <CafeScene tod={tod} lf={lf} len={len} W={W} H={H} aspect={aspect} {...extra} />}</Beat>
  );
  // 06 Gazette drops
  const gzLand = spring({frame: f - B.gazette[0] - 2, fps, config: {damping: 13, stiffness: 140, mass: 0.8}});
  // 14 phone
  const pf = f - B.phone[0];
  const drop = spring({frame: f - PING_F, fps, config: {damping: 11, stiffness: 170, mass: 0.7}});
  const ring = r(f, PING_F, PING_F + 30);
  const sel = r(f, 948, 958, 0, 1, io); // highlight moves Review -> Later (you decide)
  const press = r(f, 958, 962) * (1 - r(f, 962, 972));
  const punch = 1 + 0.06 * Math.exp(-Math.max(0, f - PING_F) / 5) * (f >= PING_F ? 1 : 0);
  const shake = f >= PING_F ? Math.exp(-(f - PING_F) / 4) * Math.sin((f - PING_F) * 2.6) * 6 : 0;
  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: FONT, overflow: 'hidden'}}>
      <Backdrop f={f} />
      {/* 01–02 laptop + lid */}
      <Open f={f} aspect={aspect} W={W} />
      <OpenType f={f} aspect={aspect} />
      {/* 03 black (nothing drawn) · 04 Mike doesn't. */}
      <Ember f={f} />
      <Doesnt f={f} aspect={aspect} />
      {/* 05 café morning */}
      {cafe(B.morning)}
      {/* 06 Gazette drops */}
      <Beat f={f} span={B.gazette} push={0.08}>{(lf) => (
        <Proof aspect={aspect} s16={1.25}>
          <MikeChip f={lf} label="Mike · reading" x={960} y={170} />
          <GazetteCard f={lf} x={730} y={230} land={gzLand} r7={r(lf, 28, 38)} scan />
        </Proof>
      )}</Beat>
      {/* 07 café afternoon */}
      {cafe(B.afternoon)}
      {/* 08 Mike links cl. 7.3 */}
      <Beat f={f} span={B.link} push={0.05}>{(lf) => {
        const th = r(lf, 10, 40, 0, 1, Easing.bezier(0.4, 0, 0.6, 1));
        return (
          <Proof aspect={aspect} s16={1.0}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `translateY(${r(lf, 0, 60, 24, -12, io)}px)`}}>
              <GazetteCard f={lf} x={730} y={125} h={290} r7={1} />
              <CodeCard f={lf} x={730} y={470} c73={r(lf, 36, 46)} brk={0} brkStart={999} style={{opacity: r(lf, 4, 16), transform: `translateY(${r(lf, 4, 18, 40, 0)}px)`}} />
              <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1920} height={1080}>
                <path d="M 1190 360 C 1300 400, 1300 640, 1190 680" fill="none" stroke={C.gold} strokeWidth={3} strokeDasharray="520" strokeDashoffset={520 * (1 - th)} style={{filter: 'drop-shadow(0 0 8px rgba(230,176,75,0.8))'}} />
                {th > 0.98 && <circle cx={1190} cy={680} r={6 + 4 * Math.sin(lf / 3)} fill={C.gold} />}
              </svg>
            </div>
          </Proof>
        );
      }}</Beat>
      {/* 09 The catch — punch-in on cl. 7.3 */}
      <Beat f={f} span={B.catch} push={0.04}>{(lf) => {
        const pi = spring({frame: lf - 2, fps, config: {damping: 14, stiffness: 120}});
        const jolt = lf >= 16 ? Math.exp(-(lf - 16) / 3) * Math.sin((lf - 16) * 2.4) * 5 : 0;
        return (
          <Proof aspect={aspect} s16={1.25}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${jolt}px, 0) scale(${1 + 0.32 * pi})`, transformOrigin: '960px 520px'}}>
              <CodeCard f={lf} x={730} y={300} c73={1} brk={r(lf, 14, 22)} brkStart={14} />
            </div>
          </Proof>
        );
      }}</Beat>
      {/* 10 café golden hour */}
      {cafe(B.golden)}
      {/* 11 Alert drafted */}
      <Beat f={f} span={B.alert} push={0.06}>{(lf) => (
        <Proof aspect={aspect} s16={1.25}>
          <div style={{position: 'absolute', left: 710, top: 262, width: 500, fontFamily: FONT, fontSize: 15, color: C.dim, letterSpacing: 1.5, textAlign: 'left', opacity: r(lf, 0, 10)}}>ON MEERA’S DESK · CHAIR EMPTY</div>
          <div style={{opacity: r(lf, 0, 10), transform: `translateY(${r(lf, 0, 14, 40, 0)}px)`}}>
            <AlertCard f={lf} x={710} y={295} chars={Math.floor(r(lf, 6, 52, 0, alertBody.length, Easing.linear))} held={0} />
          </div>
        </Proof>
      )}</Beat>
      {/* 12 Held for Meera · Nothing goes out without your yes. */}
      <Beat f={f} span={B.held} push={0.04}>{(lf) => {
        const up = r(lf, 0, 16, 0, 1, io);
        const nb = spring({frame: lf - 10, fps, config: {damping: 10, stiffness: 160}});
        return (
          <Proof aspect={aspect} s16={1.2}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `translateY(${(P ? -190 : -110) * up}px)`}}>
              <AlertCard f={lf + 60} x={710} y={295} chars={alertBody.length} held={r(lf, 2, 12)} />
            </div>
            <div style={{position: 'absolute', left: 560, width: 800, top: P ? 520 : 560, textAlign: 'center', fontFamily: FONT, fontSize: 54, fontWeight: 750, letterSpacing: -1.5, lineHeight: 1.15, color: C.gold,
              transform: `scale(${0.85 + 0.15 * nb})`, opacity: Math.min(1, nb * 1.3), textShadow: '0 0 40px rgba(230,176,75,0.25)'}}>
              <div><Words text="Nothing goes out" f={lf} start={10} step={3} /></div>
              <div style={{position: 'relative', display: 'inline-block'}}><Words text="without your yes." f={lf} start={18} step={3} /><Sweep f={lf} a={28} h={4} bottom={-8} /></div>
            </div>
          </Proof>
        );
      }}</Beat>
      {/* 13 café night */}
      {cafe(B.night)}
      {/* 14 Phone lights up on the café table — Review alert / Later — You decide. */}
      <Beat f={f} span={B.phone} inF={6} outF={10} push={0}>{(lf) => (
        <>
          <CafeScene tod={tod} lf={lf + 90} len={90} W={W} H={H} aspect={aspect} zoom={0.55 * r(lf, 0, 26, 0, 1, io) + 0.05 * r(lf, 26, 120, 0, 1, Easing.linear)} dim={0.42 * r(lf, 0, 20)} phoneGlow={r(f, PING_F - 2, PING_F + 4) * (0.75 + 0.25 * Math.sin(f / 4))} />
          <Proof aspect={aspect} s16={1.15}>
            <div style={{position: 'absolute', left: 960 - 270, top: P ? 150 : 185, width: 540, transform: `translate(${shake}px, ${(1 - drop) * -260}px) scale(${(0.9 + 0.1 * drop) * punch})`, opacity: Math.min(1, drop * 1.4),
              borderRadius: 24, background: 'rgba(30,29,28,0.96)', border: `1px solid rgba(230,176,75,${0.25 + 0.45 * (1 - ring)})`, padding: '18px 20px', fontFamily: FONT, textAlign: 'left',
              boxShadow: `0 30px 90px rgba(0,0,0,0.6), 0 0 0 ${ring * 24}px rgba(230,176,75,${0.25 * (1 - ring)})`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <div style={{width: 34, height: 34, borderRadius: 9, background: C.gold, color: '#1a1206', fontWeight: 800, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>M</div>
                <div style={{fontSize: 21, fontWeight: 700, color: C.fg}}>Mike</div>
                <div style={{marginLeft: 'auto', fontSize: 16, color: C.dim}}>9:31 PM</div>
              </div>
              <div style={{marginTop: 12, fontSize: 21, lineHeight: 1.38, color: C.fg}}>Meera, G-1187 breaks cl. 7.3 on DEL–AUH. Client alert drafted and held for your review.</div>
              <div style={{display: 'flex', gap: 12, marginTop: 16, opacity: r(f, PING_F + 16, PING_F + 26), transform: `translateY(${r(f, PING_F + 16, PING_F + 28, 12, 0)}px)`}}>
                {['Review alert', 'Later'].map((lb, i) => {
                  const on = i === 0 ? 1 - sel : sel;
                  return <div key={lb} style={{flex: 1, textAlign: 'center', padding: '11px 0', borderRadius: 12, fontSize: 19, fontWeight: 700,
                    background: i === 0 ? C.gold : 'rgba(243,239,230,0.08)', color: i === 0 ? '#1a1206' : C.fg,
                    border: `2px solid rgba(243,239,230,${i === 1 ? 0.25 + 0.6 * on : 0})`,
                    boxShadow: `0 0 ${18 * on + 8 * Math.sin(f / 6) * on}px rgba(230,176,75,${0.5 * on})`,
                    transform: `scale(${1 + 0.04 * on - (i === 1 ? 0.06 * press : 0)})`}}>{lb}</div>;
                })}
              </div>
            </div>
            <Center y={P ? 860 : 470} style={{opacity: r(f, 930, 942), transform: `translateY(${r(f, 930, 944, 20, 0)}px)`}}>
              <div style={{position: 'relative', fontFamily: FONT, fontSize: 54, fontWeight: 750, letterSpacing: -1.5, color: C.gold, textShadow: '0 4px 30px rgba(0,0,0,0.8)'}}>
                <Words text="You decide." f={f} start={930} step={4} /><Sweep f={f} a={944} h={4} bottom={-8} />
              </div>
            </Center>
          </Proof>
        </>
      )}</Beat>
      {/* 15 End card */}
      <End f={f - B.end[0]} aspect={aspect} />
      <TimePill f={f} aspect={aspect} />
      <Captions f={f} aspect={aspect} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)', pointerEvents: 'none'}} />
      <Watermark aspect={aspect} />
    </AbsoluteFill>
  );
};
