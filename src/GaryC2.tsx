import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, Img, staticFile} from 'remotion';
import {VOC2, TOTAL_S, SLEEP, W as Wd} from './voC2';

// Gary Agents · Version C2 "Close your eyes. It shows its work." — trust cut of Version C · native 9:16 (1080×1920) · 30 fps.
// Board: refs/version-c2/Mike_VersionC2_trust_storyboard.png (15 frames). 01–06 structure from C (renamed), edits from 07, NEW 11 + 13.
// BRAND LOCK: product = Gary Agents. Associates: Mark (reads, gold) · Gary (digs, blue) · Fiona (drafts/redlines, coral). End card = Gary only.
// Beat map is DERIVED from the VO cues in src/voC2.ts (audio/vo_c2/build_vo_c2.py). Self-contained: MikeC.tsx (Version C KEEP) is not imported.
const FPS = 30;
export const TC = {total: Math.round(TOTAL_S * FPS)};
const C = {bg: '#060608', fg: '#F3EFE6', dim: 'rgba(243,239,230,0.58)', faint: 'rgba(243,239,230,0.14)', card: '#101015',
  gold: '#E6B04B', blue: '#5B9BE6', coral: '#F07B63', red: '#E5534B', green: '#5FBF8A'};
const FONT = 'Inter, "Inter Tight", "DejaVu Sans", sans-serif';
const out = Easing.bezier(0.22, 1, 0.36, 1);
const io = Easing.bezier(0.65, 0, 0.35, 1);
const r = (f: number, a: number, b: number, from = 0, to = 1, e = out) =>
  interpolate(f, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});
const fr = (s: number) => Math.round(s * FPS);
const L = VOC2;
const wt = (line: string, i: number) => L[line].words[i][1]; // word start (s)
const wf = (line: string, i: number) => fr(wt(line, i));       // word start (frame)

// ---------- Beat map (frames) — cut 0.15 s before each beat's first line ----------
const cut = (k: string) => fr(L[k].start - 0.15);
const FREEZE = fr(L.d1p2.end + 0.06);   // call freezes after "At nine."
const BLACK = fr(L.d1p2.end + 1.0);     // 1 s silence/freeze, then black
const EYES = fr(SLEEP.eyes);                      // "eyes." onset = sleep-shot K1 (local 0.0) — lids land shut here
const LAMP = fr(L.n11.end - 0.02);                // lamp clicks off as the word ends
export const KF = SLEEP.keys.map((k) => EYES + fr(k));   // K1..K6 (frames): 0.0 / 1.1 / 4.6 / 9.1 / 13.1 / 14.1 s after "eyes" (C2 sleep stretch, 14.9 s)
export const HARD = EYES + fr(SLEEP.len);         // hard cut to the 7:12 lock at the top of the stretch (no transition)
// Dopamine hits (associate note + tactile) inside each expand window — local offsets live in SLEEP.hits (build_vo_c2.py), shared with audio/mix_c2.py
const H = SLEEP.hits;   // local frames: mark K2+62 · gary K3+88 · fiona K4+76 · thunk K3+58
export const HIT = {mark: KF[1] + H.mark, gary: KF[2] + H.gary, fiona: KF[3] + H.fiona, thunk: KF[2] + H.thunk};
const BRIEFED = wf('n11', 2);   // "once." — pre-roll rows flip from Briefed to working
export const BC = {
  lock: [0, cut('n02')], upload: [cut('n02'), cut('n03')], chats: [cut('n03'), cut('d1p')], call: [cut('d1p'), BLACK], black: [BLACK, cut('n06')],
  // Studio lock: dedicated Mark/Gary/Fiona UI demos DROPPED — Meet chips hold under n06–n09 (role spotlight per VO line), hard cut into the sleep shot.
  team: [cut('n06'), cut('n11')],
  sleep: [cut('n11'), HARD], digest: [HARD, cut('n13')], source: [cut('n13'), cut('d2p')], call2: [cut('d2p'), cut('n15')], end: [cut('n15'), Math.round(TOTAL_S * FPS)],
} as const;
type Span = readonly [number, number];

const Center: React.FC<{y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({y, children, style}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', ...style}}>{children}</div>
);

// ---------- Beat wrapper: zoom-through in, push-out (Version B craft) ----------
const Beat: React.FC<{f: number; span: Span; inF?: number; outF?: number; push?: number; hardIn?: boolean; hardOut?: boolean; children: (lf: number, len: number) => React.ReactNode}> = ({f, span, inF = 8, outF = 8, push = 0.05, hardIn, hardOut, children}) => {
  const [a, b] = span; const len = b - a; const lf = f - a;
  const iF = hardIn ? 0 : inF, oF = hardOut ? 0 : outF;
  if (lf < -iF || lf >= len + oF) return null;
  const en = hardIn ? 1 : r(lf, -iF, iF, 0, 1, out);
  const ex = hardOut ? 0 : r(lf, len - oF / 2, len + oF, 0, 1, io);
  const s = (1 + push * r(lf, 0, len, 0, 1, Easing.bezier(0.3, 0.1, 0.6, 1))) * (1.08 - 0.08 * en) * (1 + 0.08 * ex);
  const bl = 10 * (1 - en) + 12 * ex;
  return (
    <AbsoluteFill style={{opacity: Math.min(en, 1 - ex), transform: `scale(${s})`, filter: bl > 0.1 ? `blur(${bl}px)` : undefined}}>
      {children(lf, len)}
    </AbsoluteFill>
  );
};

const Backdrop: React.FC<{f: number; tint?: string}> = ({f, tint = '230,176,75'}) => (
  <>
    <AbsoluteFill style={{background: `radial-gradient(ellipse 900px 1100px at ${50 + 8 * Math.sin(f / 90)}% ${44 + 5 * Math.cos(f / 110)}%, rgba(${tint},0.075), rgba(0,0,0,0) 70%)`}} />
    <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(243,239,230,0.05) 1px, transparent 1.4px)', backgroundSize: '44px 44px', backgroundPosition: `${(f * 0.35) % 44}px ${(f * -0.6) % 44}px`}} />
  </>
);

// ---------- Primitives ----------
const Lines: React.FC<{n: number; seed: number; w?: number; h?: number; gap?: number; color?: string}> = ({n, seed, w = 100, h = 10, gap = 16, color = 'rgba(243,239,230,0.14)'}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap}}>
    {Array.from({length: n}).map((_, i) => <div key={i} style={{height: h, borderRadius: h, width: `${w * (0.6 + ((i * 37 + seed * 17) % 38) / 100)}%`, background: color}} />)}
  </div>
);
const Card: React.FC<{x: number; y: number; w: number; h?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({x, y, w, h, style, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 26, background: C.card, border: `1.5px solid ${C.faint}`, boxSizing: 'border-box', padding: '34px 38px', fontFamily: FONT, textAlign: 'left', overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.6)', ...style}}>{children}</div>
);
const Tag: React.FC<{children: React.ReactNode; color?: string; size?: number}> = ({children, color = C.gold, size = 22}) => (
  <div style={{fontSize: size, letterSpacing: 3, fontWeight: 750, color, textTransform: 'uppercase'}}>{children}</div>
);
const Pill: React.FC<{children: React.ReactNode; color: string; size?: number}> = ({children, color, size = 22}) => (
  <span style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 40, fontSize: size, fontWeight: 700, color, background: `${color}22`, border: `1.5px solid ${color}66`, whiteSpace: 'nowrap'}}>{children}</span>
);
const Sweep: React.FC<{f: number; a: number; dur?: number; h?: number; bottom?: number; color?: string}> = ({f, a, dur = 18, h = 5, bottom = -8, color = C.gold}) => {
  const w = r(f, a, a + dur, 0, 100, io); const shine = ((f - a) * 2.2) % 160 - 30;
  return (
    <div style={{position: 'absolute', left: 0, bottom, height: h, width: `${w}%`, borderRadius: h, background: color, overflow: 'hidden'}}>
      <div style={{position: 'absolute', top: 0, bottom: 0, left: `${shine}%`, width: '30%', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,240,200,0.85), rgba(255,255,255,0))'}} />
    </div>
  );
};
const pop = (f: number, at: number, damping = 12, stiffness = 170) => spring({frame: f - at, fps: FPS, config: {damping, stiffness, mass: 0.8}});
const Spinner: React.FC<{f: number; color: string; size?: number}> = ({f, color, size = 26}) => (
  <svg width={size} height={size} viewBox="0 0 26 26" style={{transform: `rotate(${f * 12}deg)`}}><circle cx={13} cy={13} r={10} fill="none" stroke={`${color}33`} strokeWidth={3} /><path d="M13 3 a10 10 0 0 1 10 10" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" /></svg>
);
const Lock: React.FC<{color: string; size?: number}> = ({color, size = 26}) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 18 20"><rect x={1} y={8} width={16} height={11} rx={2} fill={color} /><path d="M4 8 V5 a5 5 0 0 1 10 0 V8" fill="none" stroke={color} strokeWidth={2} /></svg>
);

// ---------- Avatars (flat illustration; locked colours: Mark gold · Gary blue · Fiona coral) ----------
type Who = 'mark' | 'gary' | 'fiona';
const AV: Record<Who, {bg: string; skin: string; hair: string; shirt: string}> = {
  mark: {bg: C.gold, skin: '#8A5A3C', hair: '#1B1310', shirt: '#1E2840'},
  gary: {bg: C.blue, skin: '#5B3A28', hair: '#120C0A', shirt: '#2A2D33'},
  fiona: {bg: C.coral, skin: '#F0C6A6', hair: '#A8412A', shirt: '#EFE6D8'},
};
const Avatar: React.FC<{who: Who; size: number; ring?: number; blink?: number; bg?: string}> = ({who, size, ring = 0, blink = 0, bg}) => {
  const a = bg ? {...AV[who], bg} : AV[who]; const ey = 1 - 0.85 * blink;
  if (who === 'gary') {   // Update B: Gary = refs/version-c2/faces/gary-face.png (glasses, beard, suit) — public/gary-face-av.png crop
    const bw = Math.max(2, size * 0.045);
    return (
      <div style={{position: 'relative', width: size, height: size, flexShrink: 0, filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.55))'}}>
        {ring > 0 && <div style={{position: 'absolute', inset: -size * 0.08 * ring, borderRadius: '50%', border: `${Math.max(1.5, size * 0.016)}px solid ${a.bg}`, opacity: 0.55 * ring}} />}
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: a.bg, padding: bw, boxSizing: 'border-box'}}>
          <Img src={staticFile('gary-face-av.png')} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block'}} />
        </div>
      </div>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{overflow: 'visible', filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.55))'}}>
      <defs><clipPath id={`av-${who}-${size}`}><circle cx={50} cy={50} r={48} /></clipPath></defs>
      {ring > 0 && <circle cx={50} cy={50} r={50 + 4 * ring} fill="none" stroke={a.bg} strokeOpacity={0.55 * ring} strokeWidth={1.6} />}
      <circle cx={50} cy={50} r={48} fill={a.bg} />
      <g clipPath={`url(#av-${who}-${size})`}>
        {who === 'fiona' && <path d="M27 46 C26 22 74 22 73 46 L76 78 L24 78 Z" fill={a.hair} />}
        <path d="M14 104 C16 80 32 72 50 72 C68 72 84 80 86 104 Z" fill={a.shirt} />
        {who === 'mark' && <path d="M41 72 L50 84 L59 72 Z" fill="#F3EFE6" />}
        <rect x={43} y={60} width={14} height={14} rx={4} fill={a.skin} />
        <ellipse cx={50} cy={45} rx={18} ry={21} fill={a.skin} />
        {who === 'mark' && <path d="M31 42 C30 24 70 24 69 42 C66 32 58 29 50 29 C42 29 34 32 31 42 Z" fill={a.hair} />}

        {who === 'fiona' && <path d="M31 46 C30 26 70 24 69 44 C60 38 52 30 47 28 C44 34 38 40 31 46 Z" fill={a.hair} />}
        {who === 'mark' && <path d={'M34 50 C36 63 43 66 50 66 C57 66 64 63 66 50 C63 57 58 59 50 59 C42 59 37 57 34 50 Z'} fill={a.hair} opacity={0.92} />}
        <ellipse cx={43} cy={45} rx={2.1} ry={2.3 * ey} fill="#141012" />
        <ellipse cx={57} cy={45} rx={2.1} ry={2.3 * ey} fill="#141012" />
        <path d="M44 55 Q50 59 56 55" fill="none" stroke={who === 'fiona' ? '#9C4A3C' : '#F3EFE6'} strokeWidth={1.8} strokeLinecap="round" opacity={who === 'fiona' ? 1 : 0.85} />
        {who === 'mark' && <g fill="none" stroke="#141012" strokeWidth={1.8}><circle cx={43} cy={45} r={6} /><circle cx={57} cy={45} r={6} /><path d="M49 45 L51 45" /></g>}
      </g>
    </svg>
  );
};
const blinkAt = (f: number, seed: number) => { const p = (f + seed * 37) % 110; return p < 4 ? Math.sin((p / 4) * Math.PI) : 0; };
const AssocChip: React.FC<{who: Who; label: string; f: number; color: string; right?: React.ReactNode}> = ({who, label, f, color, right}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '12px 26px 12px 12px', borderRadius: 60, background: `${color}14`, border: `1.5px solid ${color}77`, fontFamily: FONT, fontSize: 30, color: C.fg}}>
    <Avatar who={who} size={58} blink={blinkAt(f, 3)} />
    <span style={{fontWeight: 700}}>{label}</span>
    <span style={{width: 12, height: 12, borderRadius: 12, background: color, opacity: 0.5 + 0.5 * Math.sin(f / 4)}} />
    {right}
  </div>
);

// ---------- Time pill (frames 02/03/04/10/12) ----------
const PILLS: [Span, boolean, string, string][] = [
  [BC.upload, true, '12:20 AM', 'Rohan, Partner'], [BC.chats, true, '1:48 AM', 'Still at it'], [BC.call, true, '1:52 AM', 'Video call'],
  [BC.source, false, '7:13 AM', 'Review note'], [BC.call2, false, '9:01 AM', 'Board call']];
const TimePill: React.FC<{f: number}> = ({f}) => {
  const p = PILLS.find(([s]) => f >= s[0] - 4 && f < s[1] + 4);
  if (!p) return null;
  const [s, night, time, label] = p;
  const vis = r(f, s[0] - 4, s[0] + 8) * (1 - r(f, s[1] - 4, s[1] + 4));
  const pp = pop(f, s[0], 12, 200);
  return (
    <Center y={118} style={{opacity: vis}}>
      <div style={{display: 'flex', alignItems: 'center', height: 74, boxSizing: 'border-box', fontFamily: FONT, fontSize: 34, color: C.fg, padding: '0 32px', borderRadius: 74,
        background: 'rgba(6,6,8,0.78)', border: `1.5px solid ${C.faint}`, whiteSpace: 'nowrap', transform: `scale(${0.92 + 0.08 * pp})`}}>
        <span style={{color: C.gold, marginRight: 14}}>{night ? '☾' : '☀'}</span>
        <span style={{fontVariantNumeric: 'tabular-nums', fontWeight: 700}}>{time}</span>
        <span style={{margin: '0 14px', color: C.dim}}>·</span>
        <span style={{color: C.dim}}>{label}</span>
      </div>
    </Center>
  );
};

// ---------- Captions (~3/4 down, karaoke, keywords in gold / associate colour) ----------
const KEY: Record<string, string> = {
  'fare': C.gold, 'rules': C.gold, 'nine.': C.gold, 'AI': C.gold, 'assistant.': C.gold, 'Upload…': C.gold, 'limit': C.red, 'reached.': C.red,
  'Re-upload.': C.gold, 'Expired.': C.red, 'Mark': C.gold, 'reads': C.gold, 'Gary': C.blue, 'digs': C.blue, 'Fiona': C.coral, 'redlines': C.coral, 'drafts': C.coral,
  'once,': C.gold, 'background.': C.gold, 'yes.': C.gold, 'DEL–AUH?': C.gold, 'DEL–AUH.': C.gold, 'Eleven': C.gold, 'fares': C.gold, 'inbox.': C.gold, 'board.': C.gold,
};
// Per-line overrides (brand words gold in "Meet Gary Agents."; trust phrases gold).
const KEYL: Record<string, Record<string, string>> = {
  n06: {'Gary': C.gold, 'Agents.': C.gold, 'Three': C.gold, 'associates,': C.gold},
  n11: {'close': C.gold, 'your': C.gold, 'eyes.': C.gold},
  n12: {'Every': C.gold, 'line': C.gold, 'cited,': C.gold},
  n13: {'See': C.gold, 'where': C.gold, 'it': C.gold, 'came': C.gold, 'from.': C.gold},
  d2p2: {'And': C.gold, 'cited.': C.gold},
};
const SPLIT: Record<string, number[]> = {n01: [0, 7], n02: [0, 6], n06: [0, 3], n11: [0, 3], n12: [0, 4, 7], n13: [0, 3]};
const CAP_LINES = ['n01', 'n02', 'n03', 'd1p', 'd1r', 'd1p2', 'n06', 'n07', 'n08', 'n09', 'n11', 'n10', 'n12', 'n13', 'd2p', 'd2r', 'd2p2'];
type CapItem = {k: string; w: Wd[]; a: number; b: number; who: 'N' | 'P' | 'R'};
const CAPS: CapItem[] = (() => {
  const items: CapItem[] = [];
  CAP_LINES.forEach((k, li) => {
    const ln = L[k]; const sp = SPLIT[k] ?? [0];
    sp.forEach((i, n) => {
      const j = n < sp.length - 1 ? sp[n + 1] : ln.words.length;
      const a = ln.words[i][1] - 0.14;
      let b = n < sp.length - 1 ? ln.words[j][1] - 0.14 : ln.end + 0.45;
      const nx = CAP_LINES[li + 1];
      if (n === sp.length - 1 && nx) b = Math.min(b, L[nx].start - 0.14);
      if (k === 'n10' && n === sp.length - 1) b = Math.min(b, HARD / FPS);
      if (k === 'n09' && n === sp.length - 1) b = Math.min(b, BC.sleep[0] / FPS);   // hard cut into the sleep shot: no caption tail across it
      items.push({k, w: ln.words.slice(i, j), a, b, who: ln.who});
    });
  });
  return items;
})();
const Captions: React.FC<{f: number}> = ({f}) => {
  if (f >= FREEZE && f < BC.team[0]) return null;   // freeze + black: silence, nothing on the band
  const t = f / FPS;
  const it = CAPS.find((x) => t >= x.a && t < x.b);
  if (!it) return null;
  const hardEnd = false;
  const inSleep = f >= BC.sleep[0] && f < BC.sleep[1];
  const e = r(t, it.a, it.a + 0.18), x = hardEnd ? 0 : r(t, it.b - 0.12, it.b, 0, 1, io);
  const spk = it.who === 'P' ? ['PRIYA', C.gold] : it.who === 'R' ? ['ROHAN', C.blue] : null;
  return (
    <Center y={inSleep ? 1748 : spk ? 1428 : 1460} style={{opacity: e * (1 - x), transform: `translateY(${(1 - e) * 18 - x * 10}px)`}}>
      {spk && <div style={{fontFamily: FONT, fontSize: 26, fontWeight: 800, letterSpacing: 5, color: spk[1], marginBottom: 12}}>{spk[0]}</div>}
      <div style={{maxWidth: 940, fontFamily: FONT, fontSize: 58, fontWeight: 680, letterSpacing: -0.8, lineHeight: 1.2, color: C.fg, textShadow: '0 3px 22px rgba(0,0,0,0.9)'}}>
        {it.w.map(([w, ws], i) => {
          const p = r(t, ws - 0.06, ws + 0.16); const col = KEYL[it.k]?.[w] ?? KEY[w];
          return <span key={i} style={{display: 'inline-block', opacity: 0.3 + 0.7 * p, transform: `translateY(${(1 - p) * 8}px)`, color: col && p > 0.2 ? col : undefined, marginRight: i < it.w.length - 1 ? '0.26em' : 0}}>{w}</span>;
        })}
      </div>
    </Center>
  );
};
const CapShade: React.FC = () => <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0) 66%, rgba(4,4,6,0.78) 84%, rgba(4,4,6,0.6) 100%)', pointerEvents: 'none'}} />;

// ---------- Phone (01 midnight / 11 morning) ----------
type Notif = {at: number; app: string; icon: React.ReactNode; title: string; body: string; actions?: boolean; time: string; flag?: boolean; foot?: string};
const Phone: React.FC<{f: number; day: string; clock: string; morning?: boolean; notifs: Notif[]; tapAt?: number}> = ({f, day, clock, morning, notifs, tapAt = 1e9}) => {
  let buzz = 0; notifs.forEach((n) => { if (f >= n.at) buzz += Math.exp(-(f - n.at) / 4) * Math.sin((f - n.at) * 2.8) * 7; });
  const wall = morning ? 'linear-gradient(170deg, #3B2A1C 0%, #8A5A2E 38%, #E3A55A 72%, #F6D49A 100%)' : 'linear-gradient(170deg, #0B0E1F 0%, #141A33 55%, #1D1530 100%)';
  return (
    <div style={{position: 'absolute', left: 540 - 300, top: 170, width: 600, height: 1180, borderRadius: 86, background: '#050507', border: '3px solid rgba(243,239,230,0.22)', boxShadow: `0 60px 160px rgba(0,0,0,0.7), 0 0 120px ${morning ? 'rgba(240,170,90,0.18)' : 'rgba(120,140,255,0.10)'}`, transform: `translateX(${buzz}px) rotate(${buzz * 0.08}deg)`, padding: 16, boxSizing: 'border-box'}}>
      <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 72, overflow: 'hidden', background: wall, fontFamily: FONT}}>
        {!morning && Array.from({length: 26}).map((_, i) => <div key={i} style={{position: 'absolute', left: `${(i * 197) % 100}%`, top: `${((i * 131) % 60) + 4}%`, width: 3, height: 3, borderRadius: 3, background: '#fff', opacity: 0.25 + 0.25 * Math.sin(f / 9 + i)}} />)}
        {morning && <div style={{position: 'absolute', left: '50%', top: '84%', width: 700, height: 700, marginLeft: -350, marginTop: -350, borderRadius: 700, background: 'radial-gradient(circle, rgba(255,236,190,0.75), rgba(255,200,120,0) 65%)', transform: `translateY(${-30 * r(f, 0, 100, 0, 1, Easing.linear)}px)`}} />}
        <div style={{position: 'absolute', left: 230, top: 22, width: 128, height: 36, borderRadius: 20, background: '#000'}} />
        <Center y={112}><div style={{fontSize: 30, fontWeight: 600, color: 'rgba(255,255,255,0.82)'}}>{day}</div></Center>
        <Center y={150}><div style={{fontSize: 170, fontWeight: 300, letterSpacing: -6, color: 'rgba(255,255,255,0.95)', fontVariantNumeric: 'tabular-nums', lineHeight: 1}}>{clock}</div></Center>
        <div style={{position: 'absolute', left: 26, right: 26, top: 400, display: 'flex', flexDirection: 'column', gap: 16}}>
          {notifs.map((n, i) => {
            const p = pop(f, n.at, 13, 180);
            if (f < n.at - 1) return null;
            const press = r(f, tapAt, tapAt + 4) * (1 - r(f, tapAt + 4, tapAt + 12));
            const done = r(f, tapAt + 6, tapAt + 14);
            return (
              <div key={i} style={{borderRadius: 34, background: n.flag ? 'rgba(34,24,8,0.92)' : morning ? 'rgba(30,22,16,0.72)' : 'rgba(28,28,36,0.82)', backdropFilter: 'blur(10px)', padding: '22px 24px', border: n.flag ? `2.5px solid rgba(240,180,70,${0.55 + 0.35 * Math.sin(f / 6)})` : '1px solid rgba(255,255,255,0.10)', boxShadow: n.flag ? '0 0 40px rgba(240,170,60,0.35)' : undefined,
                opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * -90}px) scale(${0.92 + 0.08 * p})`}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  {n.icon}
                  <div style={{fontSize: 22, fontWeight: 650, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.5}}>{n.app}</div>
                  <div style={{marginLeft: 'auto', fontSize: 20, color: 'rgba(255,255,255,0.5)'}}>{n.time}</div>
                </div>
                <div style={{marginTop: 10, fontSize: n.flag ? 34 : 31, lineHeight: 1.28, fontWeight: n.flag ? 750 : 700, color: n.flag ? '#FFD38A' : '#fff'}}>{n.title}</div>
                <div style={{marginTop: 6, fontSize: n.flag ? 31 : 28, lineHeight: 1.32, fontWeight: n.flag ? 600 : 400, color: 'rgba(255,255,255,0.9)'}}>{n.body}</div>
                {n.foot && <div style={{marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.12)', fontSize: 23, color: 'rgba(255,255,255,0.62)', fontWeight: 600}}>{n.foot}</div>}
                {n.actions && (
                  <div style={{display: 'flex', gap: 14, marginTop: 18, opacity: r(f, n.at + 14, n.at + 24)}}>
                    <div style={{flex: 1, textAlign: 'center', padding: '15px 0', borderRadius: 18, fontSize: 25, fontWeight: 750, background: done > 0.5 ? C.green : C.gold, color: '#1a1206', transform: `scale(${1 - 0.06 * press})`, boxShadow: `0 0 ${24 * press + 10 * done}px rgba(230,176,75,0.6)`}}>
                      {done > 0.5 ? '✓ Approved' : 'Review note'}
                    </div>
                    <div style={{flex: 1, textAlign: 'center', padding: '15px 0', borderRadius: 18, fontSize: 25, fontWeight: 700, background: 'rgba(255,255,255,0.12)', color: '#fff'}}>Later</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{position: 'absolute', left: 200, right: 200, bottom: 16, height: 8, borderRadius: 8, background: 'rgba(255,255,255,0.6)'}} />
      </div>
    </div>
  );
};
const AppIcon: React.FC<{bg: string; ch: string; color?: string}> = ({bg, ch, color = '#fff'}) => (
  <div style={{width: 40, height: 40, borderRadius: 11, background: bg, color, fontWeight: 800, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ch}</div>
);
const TriAvatars: React.FC<{size: number}> = ({size}) => (
  <div style={{display: 'flex'}}>{(['mark', 'gary', 'fiona'] as Who[]).map((w, i) => <div key={w} style={{marginLeft: i ? -size * 0.32 : 0}}><Avatar who={w} size={size} /></div>)}</div>
);

// ---------- 02 Upload limit ----------
const FILES: [string, string, string][] = [['AirFare_Rules_2026.pdf', '2.1 MB', '#E5534B'], ['IndusAir_FalconGulf_Codeshare.pdf', '6.4 MB', '#E5534B'], ['Fare_Matrix_v3.xlsx', '942 KB', '#3FA36B'], ['Court orders (47 files)', '118 MB', '#8A8A96']];
const Upload: React.FC<{lf: number; f: number}> = ({lf, f}) => {
  const limF = wf('n02', 7) - BC.upload[0];   // "limit"
  const shake = lf >= limF ? Math.exp(-(lf - limF) / 4) * Math.sin((lf - limF) * 2.6) * 10 : 0;
  const ban = pop(lf, limF, 11, 200);
  return (
    <Card x={70} y={330} w={940} style={{transform: `translateX(${shake}px)`, padding: '30px 34px'}}>
      <div style={{display: 'flex', gap: 10, fontSize: 24, fontWeight: 650}}>
        {['Chat 1', 'Chat 2', 'Chat 3'].map((c, i) => <div key={c} style={{padding: '10px 22px', borderRadius: 14, background: i === 1 ? 'rgba(243,239,230,0.10)' : 'transparent', color: i === 1 ? C.fg : C.dim, border: i === 1 ? `1px solid ${C.faint}` : '1px solid transparent'}}>{c}</div>)}
        <div style={{marginLeft: 'auto', color: C.dim, fontSize: 22, alignSelf: 'center'}}>AI assistant</div>
      </div>
      <div style={{marginTop: 26, fontSize: 21, letterSpacing: 2, color: C.dim, fontWeight: 700}}>ATTACHED FILES</div>
      <div style={{marginTop: 14, display: 'flex', flexDirection: 'column', gap: 14}}>
        {FILES.map(([n, s, col], i) => {
          const a = 6 + i * 9; const p = r(lf, a, a + 8);
          const prog = i < 3 ? r(lf, a + 2, a + 18, 0, 1, io) : r(lf, a + 2, limF, 0, 0.62, Easing.linear);
          const fail = i === 3 && lf >= limF;
          return (
            <div key={n} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 20px', borderRadius: 16, background: fail ? 'rgba(229,83,75,0.10)' : 'rgba(243,239,230,0.05)', border: `1px solid ${fail ? 'rgba(229,83,75,0.6)' : 'rgba(243,239,230,0.08)'}`, opacity: p, transform: `translateY(${(1 - p) * 26}px)`}}>
              <div style={{width: 40, height: 50, borderRadius: 7, background: col, opacity: i === 3 ? 0.6 : 0.9}} />
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontSize: 27, color: i === 3 ? C.dim : C.fg, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{n}</div>
                <div style={{marginTop: 10, height: 6, borderRadius: 6, background: 'rgba(243,239,230,0.1)', overflow: 'hidden'}}><div style={{width: `${prog * 100}%`, height: '100%', background: fail ? C.red : prog >= 1 ? C.green : C.gold}} /></div>
              </div>
              <div style={{fontSize: 22, color: fail ? C.red : C.dim, width: 110, textAlign: 'right', fontWeight: fail ? 700 : 400}}>{fail ? 'Failed' : prog >= 1 ? '✓ ' + s : s}</div>
            </div>
          );
        })}
      </div>
      <div style={{marginTop: 22, padding: '20px 22px', borderRadius: 16, background: 'rgba(229,83,75,0.14)', border: `1.5px solid ${C.red}`, color: '#FFB3AC', fontSize: 27, lineHeight: 1.35, fontWeight: 600,
        opacity: Math.min(1, ban * 1.5), transform: `scale(${0.9 + 0.1 * ban})`, display: 'flex', gap: 14}}>
        <span style={{color: C.red, fontWeight: 800}}>!</span><span>File limit reached for this chat. Start a new chat to add more.</span>
      </div>
      <div style={{marginTop: 22, padding: '20px 22px', borderRadius: 16, border: `1px solid ${C.faint}`, color: C.dim, fontSize: 25}}>
        Compare the new rules with cl. 7.3<span style={{display: 'inline-block', width: 3, height: 28, marginLeft: 4, background: C.fg, opacity: Math.floor(f / 8) % 2 ? 0.8 : 0, verticalAlign: -5}} />
      </div>
    </Card>
  );
};

// ---------- 03 Session hopping ----------
const CHATS: {k: number; title: string; status: string; col: string; body: string; spin?: boolean}[] = [
  {k: 0, title: 'Chat 1 · Rules summary', status: 'Done', col: C.dim, body: 'Here’s a summary of the new rules.'},
  {k: 2, title: 'Chat 2 · Codeshare clauses', status: 'Needs files', col: C.red, body: 'I can’t see files from other chats. Please upload them again.'},
  {k: 3, title: 'Chat 3 · Court orders', status: 'Thinking…', col: C.gold, body: 'Keep this tab open while I search.', spin: true},
  {k: 5, title: 'Chat 4 · Fare matrix', status: 'Expired', col: C.red, body: 'Session expired. Start a new chat?'},
];
const Chats: React.FC<{lf: number; f: number}> = ({lf, f}) => {
  const base = BC.chats[0];
  return (
    <>
      {CHATS.map((c, i) => {
        const at = (i === 0 ? fr(L.n03.start) - 2 : wf('n03', c.k) - 2) - base;
        const p = pop(lf, at, 13, 170);
        const exp = i === 3; const stamp = exp ? pop(lf, at + 6, 9, 260) : 0;
        const x = [90, 150, 70, 130][i], y = 300 + i * 255, rot = [-1.5, 1.2, -0.8, 1.6][i];
        return (
          <Card key={i} x={x} y={y} w={860} style={{padding: '28px 32px', opacity: Math.min(1, p * 1.5) * (i < 3 && lf > at + 40 ? 0.85 : 1), transform: `translateY(${(1 - p) * 120}px) rotate(${rot * p}deg) scale(${0.9 + 0.1 * p})`,
            border: `1.5px solid ${c.col === C.red ? 'rgba(229,83,75,0.55)' : C.faint}`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <div style={{fontSize: 30, fontWeight: 700, color: C.fg}}>{c.title}</div>
              <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10}}>{c.spin && <Spinner f={f} color={C.gold} />}<Pill color={c.col === C.dim ? '#A8A49C' : c.col}>{c.status}</Pill></div>
            </div>
            <div style={{marginTop: 14, fontSize: 26, color: C.dim, lineHeight: 1.35}}>{c.body}</div>
            {exp && <div style={{position: 'absolute', right: 40, top: 30, padding: '6px 18px', border: `4px solid ${C.red}`, borderRadius: 10, color: C.red, fontSize: 40, fontWeight: 900, letterSpacing: 4,
              opacity: Math.min(1, stamp * 1.4), transform: `rotate(-10deg) scale(${2.2 - 1.2 * stamp})`, background: 'rgba(16,16,21,0.9)'}}>EXPIRED</div>}
          </Card>
        );
      })}
    </>
  );
};

// ---------- 04 / 12 Video call ----------
const Person: React.FC<{who: 'priya' | 'rohan'; day: boolean; talk: number; f: number; lean?: number}> = ({who, day, talk, f, lean = 0}) => {
  const sil = day ? (who === 'priya' ? '#3A2C26' : '#2A2622') : (who === 'priya' ? '#0E0B0C' : '#08090D');
  const rim = day ? 'rgba(255,220,170,0.0)' : who === 'rohan' ? 'rgba(165,190,255,0.85)' : 'rgba(255,190,120,0.45)';
  const bob = Math.sin(f / 23) * 4 + talk * Math.sin(f / 2.2) * 2.5;
  return (
    <svg width={900} height={560} viewBox="0 0 900 560" style={{position: 'absolute', inset: 0}}>
      <g transform={`translate(${450 + lean} ${bob})`}>
        <path d="M -230 600 C -220 420 -130 360 0 360 C 130 360 220 420 230 600 Z" fill={sil} stroke={rim} strokeWidth={3} />
        <rect x={-38} y={300} width={76} height={80} rx={20} fill={sil} />
        <ellipse cx={0} cy={235} rx={92} ry={112} fill={sil} stroke={rim} strokeWidth={3} />
        {who === 'priya' && <><circle cx={0} cy={112} r={46} fill={sil} /><path d="M -96 230 C -104 120 104 120 96 230 C 90 160 40 130 0 130 C -40 130 -90 160 -96 230 Z" fill={sil} /></>}
        {who === 'rohan' && <path d="M -94 210 C -98 130 98 120 94 210 C 80 160 40 145 0 145 C -40 145 -80 160 -94 210 Z" fill={sil} />}
      </g>
    </svg>
  );
};
const Tile: React.FC<{who: 'priya' | 'rohan'; day: boolean; y: number; talk: number; f: number; label: string; children?: React.ReactNode; lean?: number}> = ({who, day, y, talk, f, label, children, lean}) => {
  const bg = day ? (who === 'priya' ? 'linear-gradient(160deg, #EADBC3 0%, #CDB592 100%)' : 'linear-gradient(160deg, #E7E1D6 0%, #BDB2A0 100%)')
    : (who === 'priya' ? 'linear-gradient(160deg, #3A2E22 0%, #1A140F 100%)' : 'linear-gradient(160deg, #11162A 0%, #07080E 100%)');
  return (
    <div style={{position: 'absolute', left: 90, top: y, width: 900, height: 560, borderRadius: 30, overflow: 'hidden', background: bg,
      border: `${talk > 0.05 ? 5 : 2}px solid ${talk > 0.05 ? `rgba(230,176,75,${0.4 + 0.6 * talk})` : 'rgba(243,239,230,0.16)'}`, boxShadow: `0 40px 110px rgba(0,0,0,0.6), 0 0 ${50 * talk}px rgba(230,176,75,${0.35 * talk})`, boxSizing: 'border-box'}}>
      {day && who === 'priya' && <div style={{position: 'absolute', right: 70, top: 60, width: 230, height: 300, borderRadius: 8, background: 'rgba(255,250,235,0.75)', boxShadow: '0 0 80px rgba(255,240,200,0.8)'}} />}
      {day && who === 'rohan' && <div style={{position: 'absolute', left: 60, top: 70, width: 180, height: 250, borderRadius: 8, background: 'rgba(255,250,235,0.55)'}} />}
      {!day && who === 'priya' && <div style={{position: 'absolute', left: 80, top: 90, width: 120, height: 120, borderRadius: 120, background: 'radial-gradient(circle, rgba(255,190,110,0.55), rgba(255,190,110,0) 70%)'}} />}
      {!day && who === 'rohan' && <div style={{position: 'absolute', left: 150, top: 160, width: 600, height: 420, background: `radial-gradient(ellipse at 50% 85%, rgba(140,170,255,${0.32 + 0.04 * Math.sin(f / 5)}), rgba(0,0,0,0) 70%)`}} />}
      <Person who={who} day={day} talk={talk} f={f} lean={lean} />
      <div style={{position: 'absolute', left: 22, bottom: 20, display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', borderRadius: 12, background: 'rgba(0,0,0,0.6)', fontFamily: FONT, fontSize: 24, color: '#fff', fontWeight: 600}}>
        <div style={{display: 'flex', gap: 3, alignItems: 'flex-end', height: 20}}>{[0, 1, 2].map((i) => <div key={i} style={{width: 4, borderRadius: 2, background: talk > 0.05 ? C.gold : 'rgba(255,255,255,0.5)', height: 5 + talk * (8 + 7 * Math.abs(Math.sin(f / 1.7 + i * 1.3)))}} />)}</div>
        {label}
      </div>
      {children}
    </div>
  );
};
const talkOf = (f: number, keys: string[]) => keys.reduce((m, k) => Math.max(m, r(f, fr(L[k].start) - 3, fr(L[k].start) + 3) * (1 - r(f, fr(L[k].end), fr(L[k].end) + 6))), 0);

// ---------- 07 Mark reads (Gazette) + source tag with a tick ----------
const Gazette: React.FC<{lf: number}> = ({lf}) => {
  const land = pop(lf, 2, 13, 140); const hl = r(lf, 22, 32); const tag = pop(lf, 34, 12, 210); const tick = r(lf, 40, 50, 0, 1, io);
  return (
    <Card x={110} y={360} w={860} h={900} style={{opacity: Math.min(1, land * 1.4), transform: `translateY(${(1 - land) * -260}px) rotate(${(1 - land) * -5}deg)`, overflow: 'visible'}}>
      <Tag>Gazette of India · Extraordinary</Tag>
      <div style={{marginTop: 14, fontSize: 48, fontWeight: 750, color: C.fg, letterSpacing: -1}}>G-1187 · Civil Aviation</div>
      <div style={{marginTop: 6, fontSize: 26, color: C.dim}}>Published 11:38 PM · in force immediately</div>
      <div style={{marginTop: 38}}><Lines n={5} seed={1} /></div>
      <div style={{marginTop: 30, padding: '18px 20px', borderRadius: 12, fontSize: 32, color: C.fg, background: `rgba(230,176,75,${0.2 * hl})`, borderLeft: `5px solid rgba(230,176,75,${0.3 + 0.7 * hl})`, boxShadow: `0 0 ${40 * hl}px rgba(230,176,75,${0.2 * hl})`}}>
        <span style={{color: C.gold, fontWeight: 750}}>Rule 9(2)</span>&nbsp; Fare ceilings set per route.
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 18, marginRight: -8}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px 12px 14px', borderRadius: 40, background: '#17140c', border: `2px solid ${C.gold}`, boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 26px rgba(230,176,75,0.25)',
          opacity: Math.min(1, tag * 1.5), transform: `translateY(${(1 - tag) * 24}px) scale(${0.85 + 0.15 * tag})`, fontSize: 27, fontWeight: 700, color: C.fg, whiteSpace: 'nowrap'}}>
          <svg width={34} height={34} viewBox="0 0 34 34"><circle cx={17} cy={17} r={16} fill={C.gold} /><path d="M9.5 17.5 L15 23 L25 12" fill="none" stroke="#1a1206" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={24} strokeDashoffset={24 * (1 - tick)} /></svg>
          <span><span style={{color: C.gold}}>Source:</span> Gazette p.4 · Rule 9(2)</span>
        </div>
      </div>
      <div style={{marginTop: 22}}><Lines n={4} seed={4} /></div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 40 + ((lf * 14) % 800), height: 3, background: C.gold, boxShadow: '0 0 26px 6px rgba(230,176,75,0.45)', opacity: 0.85 * (1 - r(lf, 30, 38))}} />
    </Card>
  );
};

// ---------- 08 Gary digs + judgment (court list BLURRED — only forum letters readable; paragraph tags, one order overruled) ----------
const FORA = ['SC', 'HC', 'HC', 'TR', 'SC', 'HC', 'TR', 'HC', 'SC', 'HC'];
const QUOTED: Record<number, number> = {1: 14, 3: 22, 5: 9, 8: 31};
const OVERRULED = 4;
const GaryDigs: React.FC<{lf: number; f: number}> = ({lf, f}) => {
  const n = Math.round(r(lf, 4, 56, 0, 228, Easing.out(Easing.quad)));
  return (
    <Card x={70} y={290} w={940} h={1040} style={{border: `1.5px solid ${C.blue}55`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <Avatar who="gary" size={70} blink={blinkAt(f, 1)} />
        <div style={{fontSize: 32, fontWeight: 700, color: C.fg}}>Gary · court orders</div>
        <div style={{marginLeft: 'auto', fontSize: 28, color: C.blue, fontVariantNumeric: 'tabular-nums', fontWeight: 700}}>{n} read</div>
      </div>
      <div style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 11}}>
        {FORA.map((fo, i) => {
          const q = QUOTED[i]; const over = i === OVERRULED;
          const p = r(lf, 4 + i * 2.5, 12 + i * 2.5); const tagAt = 18 + i * 2.6; const tagP = pop(lf, tagAt, 12, 220);
          const strike = r(lf, tagAt + 2, tagAt + 10, 0, 1, io);
          const scan = Math.abs(((lf * 0.4) % 10) - i) < 0.6 && lf < 40;
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '15px 16px', borderRadius: 14, opacity: p,
              background: over && lf > tagAt ? 'rgba(229,83,75,0.10)' : scan ? 'rgba(91,155,230,0.14)' : q && lf > tagAt ? 'rgba(91,155,230,0.07)' : 'rgba(243,239,230,0.04)',
              border: over && lf > tagAt ? '1px solid rgba(229,83,75,0.45)' : '1px solid transparent'}}>
              <div style={{width: 46, fontSize: 22, fontWeight: 700, color: C.dim}}>{fo}</div>
              <div style={{position: 'relative', flex: 1}}>
                <div style={{filter: 'blur(5px)', opacity: over ? 1 - 0.45 * strike : 1}}><div style={{height: 14, borderRadius: 7, width: `${55 + ((i * 29) % 40)}%`, background: 'rgba(243,239,230,0.45)'}} /><div style={{marginTop: 8, height: 10, borderRadius: 5, width: `${35 + ((i * 17) % 30)}%`, background: 'rgba(243,239,230,0.22)'}} /></div>
                {over && <div style={{position: 'absolute', left: 0, top: 14, height: 3, width: `${70 * strike}%`, background: C.red, borderRadius: 3}} />}
              </div>
              {q ? <div style={{display: 'flex', gap: 10, opacity: Math.min(1, tagP * 1.4), transform: `scale(${0.6 + 0.4 * tagP})`}}>
                  <span style={{padding: '6px 14px', borderRadius: 10, fontSize: 21, fontWeight: 700, color: '#CFE2FA', border: `1.5px solid ${C.blue}`, background: 'rgba(91,155,230,0.12)', whiteSpace: 'nowrap'}}>¶ {q} quoted</span>
                  <Pill color={C.blue} size={20}>Relevant</Pill></div>
                : over ? <div style={{opacity: Math.min(1, tagP * 1.4), transform: `scale(${0.6 + 0.4 * tagP}) rotate(${-3 * tagP}deg)`}}><Pill color={C.red} size={21}>Overruled · excluded</Pill></div>
                : <div style={{width: 120}} />}
            </div>
          );
        })}
      </div>
      <div style={{marginTop: 20, padding: '16px 20px', borderRadius: 14, border: `1.5px solid ${C.blue}66`, background: 'rgba(91,155,230,0.08)', fontSize: 26, color: C.fg, opacity: r(lf, 46, 56), lineHeight: 1.35}}>
        <span style={{color: C.blue, fontWeight: 750}}>6 that matter</span> · ranked, with the paragraph quoted.
      </div>
    </Card>
  );
};

// ---------- 09 Fiona redlines + drafts, Mark's check stamp ----------
const noteTxt = 'Rule 9 sets fare caps per route. Your cl. 7.3 assumes one network-wide ceiling, so 11 DEL–AUH fares need updating.';
const Fiona: React.FC<{lf: number; f: number}> = ({lf, f}) => {
  const red = Math.round(r(lf, 6, 34, 0, 11, Easing.linear));
  const chars = Math.floor(r(lf, 18, 50, 0, noteTxt.length, Easing.linear));
  const st = pop(lf, 56, 10, 230);
  return (
    <>
      <Card x={70} y={250} w={940} style={{border: `1.5px solid ${C.coral}55`, padding: '28px 34px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <Avatar who="fiona" size={70} blink={blinkAt(f, 2)} />
          <div style={{fontSize: 32, fontWeight: 700, color: C.fg}}>Fiona · fare matrix v4</div>
          <div style={{marginLeft: 'auto', fontSize: 28, color: C.coral, fontWeight: 750, fontVariantNumeric: 'tabular-nums'}}>{red} redlined</div>
        </div>
        <div style={{marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10}}>
          {['Y', 'B', 'M', 'H', 'K', 'Q'].map((cl, i) => {
            const s = r(lf, 6 + i * 4, 14 + i * 4, 0, 1, io);
            return (
              <div key={cl} style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 26, padding: '10px 6px', borderBottom: '1px solid rgba(243,239,230,0.07)'}}>
                <div style={{width: 150, color: C.fg, fontWeight: 650}}>DEL–AUH</div>
                <div style={{width: 50, color: C.dim}}>{cl}</div>
                <div style={{position: 'relative', flex: 1}}>
                  <div style={{height: 12, borderRadius: 6, width: `${40 + ((i * 23) % 30)}%`, background: 'rgba(243,239,230,0.22)'}} />
                  <div style={{position: 'absolute', left: 0, top: 4, height: 4, borderRadius: 2, width: `${(40 + ((i * 23) % 30)) * s}%`, background: C.coral, boxShadow: `0 0 10px ${C.coral}`}} />
                </div>
                <div style={{width: 160, height: 12, borderRadius: 6, background: C.coral, opacity: 0.85 * r(lf, 12 + i * 4, 18 + i * 4), transform: `scaleX(${r(lf, 12 + i * 4, 20 + i * 4)})`, transformOrigin: 'left'}} />
              </div>
            );
          })}
        </div>
      </Card>
      <Card x={70} y={850} w={940} style={{border: `1.5px solid ${C.coral}77`, opacity: r(lf, 14, 24), transform: `translateY(${r(lf, 14, 28, 60, 0)}px)`, padding: '28px 34px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}><Tag color={C.coral}>Client note · Indus Air</Tag><div style={{marginLeft: 'auto', fontSize: 22, color: C.dim}}>Draft · overnight</div></div>
        <div style={{marginTop: 16, fontSize: 29, lineHeight: 1.42, color: C.fg, minHeight: 170}}>
          {noteTxt.slice(0, chars)}<span style={{display: 'inline-block', width: 3, height: 30, marginLeft: 3, background: C.coral, opacity: chars < noteTxt.length || Math.floor(f / 8) % 2 ? 0.9 : 0, verticalAlign: -5}} />
        </div>
        <div style={{marginTop: 14, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 14, background: 'rgba(230,176,75,0.08)', border: '1px solid rgba(230,176,75,0.35)', opacity: r(lf, 46, 54)}}>
          <Lock color={C.gold} /><div style={{fontSize: 25, color: C.fg, fontWeight: 650}}>Held for Rohan</div><div style={{marginLeft: 'auto', fontSize: 23, color: C.dim}}>Not sent</div>
        </div>
      </Card>
      <Center y={1268}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '14px 28px 14px 16px', borderRadius: 60, background: '#17140c', border: `2.5px solid ${C.gold}`, fontFamily: FONT, fontSize: 28, fontWeight: 700, color: C.fg, whiteSpace: 'nowrap',
          boxShadow: `0 16px 50px rgba(0,0,0,0.6), 0 0 ${34 * st}px rgba(230,176,75,0.35)`, opacity: Math.min(1, st * 1.6), transform: `scale(${1.7 - 0.7 * st}) rotate(${-2 * (1 - st)}deg)`}}>
          <Avatar who="mark" size={46} />
          <span style={{color: C.gold}}>✓ Checked by Mark</span><span style={{color: C.dim}}>·</span><span>matches cl. 7.3</span><span style={{color: C.dim}}>·</span><span>0 conflicts</span>
        </div>
      </Center>
    </>
  );
};

// ---------- 10+11 SLEEP SHOT · "He tosses and turns. They keep working." (refs/version-c2/sleep/Mike_C2_SleepShot_keyframes.png, renamed Mark/Gary) ----------
// Two rhythms: Rohan JUMPS (time-lapse jump cut + 2-frame dissolve) on each K; the cards GLIDE (9 f ≈ 0.3 s expand/shrink, others to 40 % chips).
// K1 0.0 all three · K2 1.1 Mark expands (3.5 s) · K3 4.6 Gary (4.5 s) · K4 9.1 Fiona (4.0 s) · K5 13.1 regroup, done · K6 14.1 one chip → HARD cut 14.9 at the top of the stretch.
// Micro-anims at native speed; the extra time is holds + one new beat each (Clashes pill · re-rank · snore→stamp). Timing per opus/C2-SLEEP-STRETCH-EDIT.md §2.
type Pal = {wall: string; wall2: string; rim: string; sky: [string, string]; skin: string; sheet: string; tint: string; moon: number; sun?: boolean};
const PAL: Pal[] = [
  {wall: '#1c140c', wall2: '#0b0806', rim: '#E6B04B', sky: ['#0b1230', '#121a3c'], skin: '#6E4A33', sheet: '#2a2219', tint: '230,176,75', moon: 1},     // lamp gold (pre lamp-off)
  {wall: '#0b0e1a', wall2: '#06070c', rim: '#8EA2DA', sky: ['#0d1638', '#152048'], skin: '#3A2C26', sheet: '#1a1d29', tint: '120,140,230', moon: 1},   // lamp off, moonlight comes up
  {wall: '#0c1124', wall2: '#06070e', rim: '#A3B8F2', sky: ['#12204e', '#1b2a5c'], skin: '#3C2E2A', sheet: '#1b2031', tint: '120,150,240', moon: 0.85}, // K2 moonlight blue
  {wall: '#100f26', wall2: '#07060f', rim: '#B0AEF2', sky: ['#171c52', '#2a2560'], skin: '#3D2E2C', sheet: '#1d1d33', tint: '140,130,240', moon: 0.6},  // K3 deep blue → violet
  {wall: '#16102a', wall2: '#090612', rim: '#C7A9F0', sky: ['#2b2458', '#4f3d72'], skin: '#40302E', sheet: '#221d36', tint: '175,130,235', moon: 0.3},  // K4 violet
  {wall: '#17182c', wall2: '#0b0a14', rim: '#BFB8E8', sky: ['#4b5a8e', '#d9998a'], skin: '#46342F', sheet: '#262539', tint: '200,160,200', moon: 0},    // K5 blue hour
  {wall: '#2c2215', wall2: '#140e08', rim: '#F4C878', sky: ['#9cbbe0', '#f7d59c'], skin: '#7A5238', sheet: '#3a2f20', tint: '245,190,110', moon: 0, sun: true}, // K6 sunrise
];
type Pose = 'back' | 'side' | 'other' | 'sprawl' | 'curl' | 'stretch';
const POSES: Pose[] = ['back', 'side', 'other', 'sprawl', 'curl', 'stretch'];
const ACCENT = [C.gold, C.gold, C.blue, C.coral, C.green, C.gold];

const Limb: React.FC<{d: string; w?: number; skin: string; rim: string}> = ({d, w = 40, skin, rim}) => (
  <><path d={d} fill="none" stroke={rim} strokeWidth={w + 5} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} /><path d={d} fill="none" stroke={skin} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></>
);
// Rohan's head: always face-up and readable (never face-down). eyes: 0 shut arc … 1 open
const Head: React.FC<{x: number; y: number; rot: number; p: Pal; eyes: number; mouth: 'line' | 'o' | 'smile' | 'yawn'; s?: number}> = ({x, y, rot, p, eyes, mouth, s = 1}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <circle r={80} fill={p.skin} stroke={p.rim} strokeWidth={4.5} />
    <path d="M -80 -6 C -86 -70 -40 -96 0 -96 C 46 -96 88 -66 80 -8 C 70 -44 40 -60 0 -60 C -38 -60 -70 -44 -80 -6 Z" fill="#0d0a0a" />
    {[-30, 30].map((ex) => eyes > 0.15
      ? <g key={ex}><ellipse cx={ex} cy={6} rx={11} ry={11 * eyes} fill="#EDE3D6" /><circle cx={ex} cy={7} r={5.5 * Math.min(1, eyes * 1.3)} fill="#120c0a" /></g>
      : <path key={ex} d={`M ${ex - 16} 4 Q ${ex} ${16 - 10 * eyes} ${ex + 16} 4`} fill="none" stroke={p.rim} strokeWidth={5.5} strokeLinecap="round" />)}
    {mouth === 'line' && <path d="M -14 40 Q 0 46 14 40" fill="none" stroke={p.rim} strokeWidth={4.5} strokeLinecap="round" opacity={0.8} />}
    {mouth === 'smile' && <path d="M -18 36 Q 0 50 18 36" fill="none" stroke={p.rim} strokeWidth={5} strokeLinecap="round" />}
    {mouth === 'o' && <ellipse cx={0} cy={42} rx={10} ry={13} fill="#120c0a" stroke={p.rim} strokeWidth={4} />}
    {mouth === 'yawn' && <ellipse cx={0} cy={42} rx={14} ry={19} fill="#120c0a" stroke={p.rim} strokeWidth={4} />}
  </g>
);
// One bedroom "plate" per Rohan pose; the light belongs to the plate, so it jumps with him (time-lapse).
const Bedroom: React.FC<{pose: Pose; p: Pal; f: number; lf: number; eyes: number; lamp: number; accent: string; stretch: number}> = ({pose, p, f, lf, eyes, lamp, accent, stretch}) => {
  const br = Math.sin((f / 43) * Math.PI * 2);   // breath: one cycle every 2 beats @ 84 bpm
  const chest = 1 + 0.018 * br;
  const shirt = '#2a2e3a';
  const blanket = (top: string) => <path d={`${top} L 905 990 L 175 990 Z`} fill={p.sheet} stroke={p.rim} strokeWidth={3} strokeOpacity={0.55} />;
  const folds = <g stroke={p.rim} strokeOpacity={0.18} strokeWidth={3} fill="none"><path d="M 260 640 C 360 700 470 690 560 760" /><path d="M 620 700 C 700 760 780 800 860 900" /></g>;
  const moonY = 84 - 40 * (1 - p.moon); const moonX = 870 - 50 * (1 - p.moon);
  return (
    <svg width={1080} height={990} viewBox="0 0 1080 990" style={{position: 'absolute', left: 0, top: 930}}>
      <defs>
        <linearGradient id={`wall-${pose}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.wall} /><stop offset="1" stopColor={p.wall2} /></linearGradient>
        <linearGradient id={`sky-${pose}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.sky[0]} /><stop offset="1" stopColor={p.sky[1]} /></linearGradient>
        <radialGradient id={`lamp-${pose}`} cx="0.1" cy="0.2" r="0.8"><stop offset="0" stopColor={`rgba(255,190,100,${0.42 * lamp})`} /><stop offset="1" stopColor="rgba(255,190,100,0)" /></radialGradient>
        <linearGradient id={`beam-${pose}`} x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(255,214,150,0.42)" /><stop offset="1" stopColor="rgba(255,214,150,0)" /></linearGradient>
        <clipPath id={`win-${pose}`}><rect x={780} y={30} width={140} height={112} rx={4} /></clipPath>
      </defs>
      <rect width={1080} height={990} fill={`url(#wall-${pose})`} />
      {/* window: moon → blue hour → sunrise */}
      <g clipPath={`url(#win-${pose})`}>
        <rect x={780} y={30} width={140} height={112} fill={`url(#sky-${pose})`} />
        {p.moon > 0 && <circle cx={moonX - lf * 0.05} cy={moonY + lf * 0.03} r={10} fill="#F4EEDC" opacity={0.9} style={{filter: 'drop-shadow(0 0 8px rgba(240,236,220,0.8))'}} />}
        {p.sun && <circle cx={880} cy={124 - 8 * stretch} r={20} fill="#FFF1C8" style={{filter: 'drop-shadow(0 0 16px rgba(255,230,170,1))'}} />}
      </g>
      <rect x={780} y={30} width={140} height={112} rx={4} fill="none" stroke="#3a3446" strokeWidth={8} /><path d="M 850 30 L 850 142 M 780 86 L 920 86" stroke="#3a3446" strokeWidth={6} />
      {p.sun && <path d="M 780 40 L 920 40 L 520 990 L 140 990 Z" fill={`url(#beam-${pose})`} opacity={0.75} />}
      {/* lamp-side nightstand + lamp */}
      <rect x={52} y={170} width={100} height={110} rx={10} fill="#141217" stroke="rgba(243,239,230,0.08)" strokeWidth={2} />
      <circle cx={102} cy={168} r={30} fill={lamp > 0 ? '#F6C46E' : '#26222a'} style={{filter: lamp > 0 ? 'drop-shadow(0 0 30px rgba(255,190,100,0.95))' : undefined}} />
      {lamp > 0 && <rect width={1080} height={990} fill={`url(#lamp-${pose})`} />}
      {/* phone on the far nightstand: edge pulse in the active associate's colour */}
      <rect x={928} y={170} width={100} height={110} rx={10} fill="#141217" stroke="rgba(243,239,230,0.08)" strokeWidth={2} />
      <rect x={955} y={186} width={46} height={80} rx={12} fill="#08080b" stroke={accent} strokeWidth={4} strokeOpacity={0.45 + 0.55 * (0.5 + 0.5 * Math.sin(f / 5))} style={{filter: `drop-shadow(0 0 ${10 + 6 * Math.sin(f / 5)}px ${accent})`}} />
      {/* bed */}
      <rect x={168} y={118} width={744} height={60} rx={18} fill="#1a171d" stroke={p.rim} strokeOpacity={0.3} strokeWidth={3} />
      <rect x={175} y={160} width={730} height={840} rx={22} fill={p.sheet} opacity={0.75} />
      <ellipse cx={540} cy={238} rx={250} ry={62} fill="rgba(243,239,230,0.10)" stroke={p.rim} strokeOpacity={0.3} strokeWidth={2.5} />
      {pose === 'back' && <>
        <path d="M 430 340 Q 540 284 650 340 L 650 400 L 430 400 Z" fill={shirt} />
        <Head x={540} y={234} rot={0} p={p} eyes={eyes} mouth="line" />
        <g transform={`translate(540 360) scale(1 ${chest}) translate(-540 -360)`}>{blanket('M 175 340 C 330 326 750 326 905 340')}{folds}
          <ellipse cx={505} cy={384} rx={26} ry={18} fill={p.skin} stroke={p.rim} strokeWidth={3.5} /><ellipse cx={577} cy={384} rx={26} ry={18} fill={p.skin} stroke={p.rim} strokeWidth={3.5} /></g>
      </>}
      {pose === 'side' && <>
        <path d="M 420 360 Q 520 290 640 330 L 640 400 L 420 400 Z" fill={shirt} />
        <Head x={512} y={240} rot={-22} p={p} eyes={0} mouth="line" />
        <g transform={`translate(540 360) scale(1 ${chest}) translate(-540 -360)`}>{blanket('M 175 372 C 330 350 700 320 905 318')}{folds}</g>
        <Limb d="M 560 360 Q 660 400 720 490 L 770 560" skin={p.skin} rim={p.rim} />
      </>}
      {pose === 'other' && <>
        <path d="M 450 330 Q 570 286 670 350 L 670 400 L 450 400 Z" fill={shirt} />
        <Limb d="M 470 330 C 380 230 420 120 540 112 C 620 108 680 130 712 168" skin={p.skin} rim={p.rim} />
        <Head x={568} y={240} rot={22} p={p} eyes={0} mouth="line" />
        <g transform={`translate(540 360) scale(1 ${chest}) translate(-540 -360)`}>{blanket('M 175 318 C 380 322 720 350 905 376')}{folds}</g>
      </>}
      {pose === 'sprawl' && <>
        <path d={`M 400 320 Q 510 290 630 320 L 650 ${520 + 6 * br} L 390 ${520 + 6 * br} Z`} fill={shirt} stroke={p.rim} strokeOpacity={0.35} strokeWidth={3} />
        <Limb d="M 610 340 C 690 320 760 270 830 236" skin={p.skin} rim={p.rim} />
        <Limb d="M 420 350 C 380 410 360 470 350 520" skin={p.skin} rim={p.rim} />
        <Head x={500} y={250} rot={-12} p={p} eyes={0} mouth={f >= HIT.fiona ? 'line' : 'o'} />
        {blanket('M 175 560 C 380 540 620 600 905 660')}
        <Limb d="M 600 700 C 680 760 750 840 800 930" w={46} skin="#2d2a35" rim={p.rim} />
      </>}
      {pose === 'curl' && <>
        <path d="M 420 330 Q 520 290 620 330 L 620 400 L 420 400 Z" fill={shirt} />
        <Head x={515} y={236} rot={-28} p={p} eyes={0} mouth="smile" />
        <g transform={`translate(540 360) scale(1 ${chest}) translate(-540 -360)`}>{blanket('M 175 360 C 330 340 640 330 905 350')}<path d="M 560 560 C 640 520 760 540 800 620" fill="none" stroke={p.rim} strokeOpacity={0.35} strokeWidth={3} /></g>
        <ellipse cx={620} cy={402} rx={92} ry={52} fill="#8a8a9a" stroke={p.rim} strokeWidth={3.5} opacity={0.95} />
        <Limb d="M 470 360 Q 560 430 690 392" skin={p.skin} rim={p.rim} />
      </>}
      {pose === 'stretch' && (() => {
        const k = stretch; const lx = 470 - 80 * k, ly = 250 - 170 * k, rx = 610 + 80 * k;
        return <>
          <path d="M 420 300 Q 540 266 660 300 L 680 460 L 400 460 Z" fill={shirt} stroke={p.rim} strokeOpacity={0.4} strokeWidth={3} />
          <Limb d={`M 450 310 Q ${430 - 30 * k} ${300 - 80 * k} ${lx} ${ly}`} skin={p.skin} rim={p.rim} />
          <Limb d={`M 630 310 Q ${650 + 30 * k} ${300 - 80 * k} ${rx} ${ly}`} skin={p.skin} rim={p.rim} />
          <circle cx={lx} cy={ly} r={26} fill={p.skin} stroke={p.rim} strokeWidth={4} /><circle cx={rx} cy={ly} r={26} fill={p.skin} stroke={p.rim} strokeWidth={4} />
          <Head x={540} y={226 - 10 * k} rot={0} p={p} eyes={1} mouth={k > 0.3 ? 'yawn' : 'line'} s={1.04} />
          {blanket('M 175 450 C 380 430 700 430 905 452')}
        </>;
      })()}
    </svg>
  );
};

// --- top half: the three associates. Box rects glide between layouts. ---
type Rect = {x: number; y: number; w: number; h: number};
const WHO3: Who[] = ['mark', 'gary', 'fiona'];
const COL3 = [C.gold, C.blue, C.coral];
const LIST = (i: number): Rect => ({x: 80, y: 250 + i * 196, w: 920, h: 176});
const CHIP = (i: number): Rect => ({x: 80 + i * 310, y: 244, w: 300, h: 84});
const EXP: Rect = {x: 80, y: 352, w: 920, h: 572};
const MERGE: Rect = {x: 230, y: 470, w: 620, h: 104};
type Lay = 'list' | 0 | 1 | 2 | 'done' | 'merge';
const LAYS: Lay[] = ['list', 0, 1, 2, 'done', 'merge'];
const rectOf = (lay: Lay, i: number): Rect => lay === 'list' || lay === 'done' ? LIST(i) : lay === 'merge' ? MERGE : lay === i ? EXP : CHIP(i);
const lerpR = (a: Rect, b: Rect, t: number): Rect => ({x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, w: a.w + (b.w - a.w) * t, h: a.h + (b.h - a.h) * t});
const band = (h: number, a: number, b: number) => Math.max(0, Math.min(1, (h - a) / (b - a)));

const MarkExp: React.FC<{lf: number}> = ({lf}) => {   // lf = frames since K2
  const hl = r(lf, 20, 30), tag = pop(lf, 56, 12, 220), tick = r(lf, 60, 68, 0, 1, io), clash = pop(lf, 76, 12, 200);   // hit at H.mark (62)
  return (<>
    <div style={{display: 'flex', alignItems: 'center', gap: 16}}><Avatar who="mark" size={64} /><div style={{fontSize: 31, fontWeight: 700}}>Mark <span style={{color: C.dim, fontWeight: 500}}>· reading the new rules</span></div>
      <div style={{marginLeft: 'auto', fontSize: 28, fontWeight: 750, color: C.gold}}>{lf >= H.mark ? 'Read ✓' : 'Reading…'}</div></div>
    <div style={{marginTop: 24, padding: '24px 26px', borderRadius: 18, background: 'rgba(243,239,230,0.04)', border: `1px solid ${C.faint}`}}>
      <Tag size={20}>Gazette of India · Extraordinary</Tag>
      <div style={{marginTop: 10, fontSize: 36, fontWeight: 750, letterSpacing: -0.5}}>G-1187 · Airfare Rules · p.4</div>
      <div style={{marginTop: 18}}><Lines n={2} seed={3} h={9} gap={12} /></div>
      <div style={{marginTop: 18, padding: '14px 18px', borderRadius: 12, fontSize: 28, background: `rgba(230,176,75,${0.2 * hl})`, borderLeft: `5px solid rgba(230,176,75,${0.3 + 0.7 * hl})`}}><span style={{color: C.gold, fontWeight: 750}}>Rule 9(2)</span>&nbsp; Fare caps set per route.</div>
      <div style={{marginTop: 18, filter: 'blur(3px)'}}><Lines n={1} seed={6} h={9} /></div>
    </div>
    <div style={{marginTop: 22, display: 'flex', gap: 14}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px 10px 12px', borderRadius: 40, border: `2px solid ${C.gold}`, background: '#17140c', fontSize: 25, fontWeight: 700, opacity: Math.min(1, tag * 1.5), transform: `scale(${0.85 + 0.15 * tag})`}}>
        <svg width={30} height={30} viewBox="0 0 34 34"><circle cx={17} cy={17} r={16} fill={C.gold} /><path d="M9.5 17.5 L15 23 L25 12" fill="none" stroke="#1a1206" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={24} strokeDashoffset={24 * (1 - tick)} /></svg>Gazette p.4 · Rule 9(2)</div>
      <div style={{opacity: Math.min(1, clash * 1.5), transform: `scale(${0.85 + 0.15 * clash})`}}><Pill color={C.coral} size={25}>Clashes with cl. 7.3</Pill></div>
    </div>
  </>);
};
const G_ROWS: [string, number | null, boolean][] = [['SC', 14, false], ['Del HC', 22, false], ['Bom HC', null, true], ['SC', 9, false], ['DGCA', 31, false]];
const GaryExp: React.FC<{lf: number}> = ({lf}) => {   // lf = frames since K3
  const n = Math.round(r(lf, 6, 74, 120, 212, Easing.out(Easing.quad)));
  const rr = r(lf, 100, 112, 0, 1, io);   // NEW beat: the excluded row re-ranks to the bottom and dims ("ranked" made visible)
  const PITCH = 76;
  return (<>
    <div style={{display: 'flex', alignItems: 'center', gap: 16}}><Avatar who="gary" size={64} /><div style={{fontSize: 31, fontWeight: 700}}>Gary <span style={{color: C.dim, fontWeight: 500}}>· court orders</span></div>
      <div style={{marginLeft: 'auto', fontSize: 28, fontWeight: 750, color: C.blue, fontVariantNumeric: 'tabular-nums'}}>{n} read</div></div>
    <div style={{marginTop: 20, display: 'flex', flexDirection: 'column', gap: PITCH - 66}}>
      {G_ROWS.map(([fo, q, over], i) => {
        const at = 12 + i * 7; const tp = pop(lf, at + 5, 12, 220); const T = H.thunk; const strike = over ? r(lf, T, T + 8, 0, 1, io) : 0;
        const dy = (over ? 2 * PITCH : i > 2 ? -PITCH : 0) * rr; const dim = over ? 1 - 0.55 * rr : 1;
        return (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '0 16px', height: 66, boxSizing: 'border-box', borderRadius: 12, background: over && lf >= T ? 'rgba(229,83,75,0.10)' : 'rgba(243,239,230,0.04)', border: over && lf >= T ? '1px solid rgba(229,83,75,0.45)' : '1px solid transparent', opacity: r(lf, at - 6, at) * dim, transform: `translateY(${dy}px)`, position: 'relative', zIndex: over ? 0 : 1}}>
            <div style={{width: 110, fontSize: 24, fontWeight: 700, color: C.dim}}>{fo}</div>
            <div style={{position: 'relative', flex: 1}}><div style={{filter: 'blur(5px)', height: 13, borderRadius: 7, width: `${58 + ((i * 29) % 34)}%`, background: over ? 'rgba(229,83,75,0.5)' : 'rgba(243,239,230,0.42)'}} />
              {over && <div style={{position: 'absolute', left: 0, top: 5, height: 3, width: `${70 * strike}%`, background: C.red}} />}</div>
            {q ? <span style={{opacity: Math.min(1, tp * 1.4), transform: `scale(${0.6 + 0.4 * tp})`, padding: '6px 14px', borderRadius: 10, fontSize: 21, fontWeight: 700, color: '#CFE2FA', border: `1.5px solid ${C.blue}`, background: 'rgba(91,155,230,0.12)', whiteSpace: 'nowrap'}}>¶ {q} quoted</span>
              : <span style={{opacity: r(lf, H.thunk, H.thunk + 4), transform: `scale(${0.6 + 0.4 * pop(lf, H.thunk, 12, 220)}) rotate(-2deg)`}}><Pill color={C.red} size={21}>Overruled · excluded</Pill></span>}
          </div>
        );
      })}
    </div>
    <div style={{marginTop: 18, fontSize: 26, color: C.fg, opacity: r(lf, 80, 88)}}><span style={{color: C.blue, fontWeight: 750}}>6 that matter ✓</span> · ranked, with the paragraph that applies</div>
  </>);
};
const FionaExp: React.FC<{lf: number}> = ({lf}) => {   // lf = frames since K4
  const red = Math.round(r(lf, 10, 50, 0, 11, Easing.linear)); const st = pop(lf, H.fiona, 10, 230); const lk = r(lf, H.fiona + 6, H.fiona + 12);   // stamp cuts the snore
  const rows = [['Y', 'B'], ['M', 'H'], ['K', '+ 6 more']];
  return (<>
    <div style={{display: 'flex', alignItems: 'center', gap: 16}}><Avatar who="fiona" size={64} /><div style={{fontSize: 31, fontWeight: 700}}>Fiona <span style={{color: C.dim, fontWeight: 500}}>· redlines + note</span></div>
      <div style={{marginLeft: 'auto', fontSize: 28, fontWeight: 750, color: C.coral, fontVariantNumeric: 'tabular-nums'}}>{red} redlined</div></div>
    <div style={{marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 34, rowGap: 12, fontSize: 23, fontVariantNumeric: 'tabular-nums'}}>
      {rows.flat().map((c, i) => { const s = r(lf, 10 + i * 6, 18 + i * 6, 0, 1, io); return (
        <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14}}><span style={{width: 150, color: C.fg, fontWeight: 650, whiteSpace: 'nowrap'}}>{c.startsWith('+') ? c : `DEL–AUH ${c}`}</span>
          {!c.startsWith('+') && <div style={{flex: 1, height: 5, borderRadius: 3, background: 'rgba(243,239,230,0.12)'}}><div style={{width: `${100 * s}%`, height: '100%', background: C.coral, boxShadow: `0 0 8px ${C.coral}`}} /></div>}</div>); })}
    </div>
    <div style={{marginTop: 20, padding: '18px 22px', borderRadius: 16, border: `1px solid ${C.faint}`, background: 'rgba(243,239,230,0.04)', opacity: r(lf, 36, 46)}}>
      <Tag size={19} color={C.coral}>Client note · Indus Air</Tag>
      <div style={{marginTop: 10, fontSize: 25, lineHeight: 1.4, color: C.fg}}>Rule 9 caps fares per route; cl. 7.3 assumes one ceiling. 11 fares to reprice.</div>
    </div>
    <div style={{marginTop: 20, display: 'flex', alignItems: 'center', gap: 22}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '10px 22px 10px 10px', borderRadius: 40, background: '#17140c', border: `2.5px solid ${C.gold}`, fontSize: 24, fontWeight: 750, whiteSpace: 'nowrap',
        opacity: Math.min(1, st * 1.6), transform: `scale(${1.6 - 0.6 * st}) rotate(${-3 * (1 - st)}deg)`, boxShadow: `0 0 ${30 * st}px rgba(230,176,75,0.35)`}}>
        <Avatar who="mark" size={38} /><span style={{color: C.gold}}>✓ Checked by Mark</span><span style={{color: C.dim}}>·</span><span>0 conflicts</span></div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, fontWeight: 650, opacity: lk}}><Lock color={C.gold} size={22} />Held for Rohan</div>
    </div>
  </>);
};

const SleepShot: React.FC<{f: number}> = ({f}) => {
  const [K1, K2, K3, K4, K5, K6] = KF;
  const lf = f - BC.sleep[0];
  // which K we are in (index into POSES / LAYS); -1 = pre-roll before "eyes"
  let k = 0; for (let i = 1; i < 6; i++) if (f >= KF[i]) k = i;
  // ---- palette: lamp gold until the click, then the plate light
  const palOf = (i: number) => (i === 0 ? (f < LAMP ? PAL[0] : PAL[1]) : PAL[i + 1]);
  const lamp = f < LAMP ? 0.94 + 0.06 * Math.sin(f / 7) : 0;
  const eyes = 1 - r(f, K1 - 3, K1 + 2, 0, 1, Easing.bezier(0.5, 0, 0.4, 1));
  const stretch = r(f, K6 + 2, HARD - 1, 0, 1, Easing.bezier(0.3, 0, 0.2, 1));
  // ---- bottom: Rohan JUMPS — new plate dissolves in over 2 frames on each K
  const plate = (i: number) => <Bedroom pose={POSES[i]} p={palOf(i)} f={f} lf={lf} eyes={i === 0 ? eyes : 0} lamp={i === 0 ? lamp : 0} accent={ACCENT[i]} stretch={i === 5 ? stretch : 0} />;
  const dis = k > 0 ? r(f, KF[k], KF[k] + 2, 0, 1, Easing.linear) : 1;
  // ---- top: cards GLIDE (9 f ≈ 0.3 s)
  const g = k > 0 ? r(f, KF[k], KF[k] + 9, 0, 1, io) : 1;
  const prevLay = k > 0 ? LAYS[k - 1] : LAYS[0], lay = LAYS[k];
  const p = palOf(k);
  // ---- clock never stops: 1:56 → 1:58 (eyes) → 2:31 → 4:10 → 5:40 → 6:30 → 7:08 → 7:12 (hard cut)
  const mins = interpolate(f, [BC.sleep[0], K1, K2, K3, K4, K5, K6, HARD], [116, 118, 151, 250, 340, 390, 428, 432], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const mm = Math.floor(mins); const clock = `${Math.floor(mm / 60)}:${String(mm % 60).padStart(2, '0')} AM`;
  const morning = k === 5;
  const status = (i: number): {txt: string; col: string; done: boolean} => {
    if (k >= 4) return i === 2 ? {txt: 'Not sent', col: C.dim, done: true} : {txt: 'Done ✓', col: COL3[i], done: true};
    if (f < BRIEFED) return {txt: 'Briefed', col: C.dim, done: false};
    const done = (i === 0 && f >= HIT.mark) || (i === 1 && f >= HIT.gary) || (i === 2 && f >= HIT.fiona);
    if (done) return {txt: '✓', col: COL3[i], done};
    if (i === 2) return {txt: k === 3 ? 'Drafting…' : 'Queued', col: k === 3 ? C.coral : C.dim, done};
    return {txt: i === 0 ? 'Reading…' : 'Scanning…', col: COL3[i], done};
  };
  const ROW_LAB = k >= 4 ? ['Mark · rules read, source cited', 'Gary · 6 orders that matter', 'Fiona · held for Rohan'] : ['Mark · new rules', 'Gary · court orders', 'Fiona · redlines + note'];
  return (
    <>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #07070a 0%, #07070a 46%, ${p.wall2} 49%)`}} />
      <AbsoluteFill style={{background: `radial-gradient(ellipse 900px 700px at 50% 30%, rgba(${p.tint},0.07), rgba(0,0,0,0) 70%)`}} />
      {/* bottom half */}
      {k > 0 && dis < 1 && plate(k - 1)}
      <div style={{position: 'absolute', inset: 0, opacity: dis}}>{plate(k)}</div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 924, height: 12, background: 'linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0))'}} />
      {/* top half: tab-row highlight for the expanded associate */}
      {[0, 1, 2].map((i) => {
        const on = (lay === i ? g : 0) + (prevLay === i ? 1 - g : 0);
        if (on < 0.01) return null; const c = CHIP(i);
        return <div key={`tab${i}`} style={{position: 'absolute', left: c.x, top: c.y, width: c.w, height: c.h, borderRadius: 60, boxSizing: 'border-box', border: `3px solid ${COL3[i]}`, background: `${COL3[i]}2e`, boxShadow: `0 0 26px ${COL3[i]}66`, opacity: on,
          display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 10, fontFamily: FONT, fontSize: 27, fontWeight: 750, color: C.fg, whiteSpace: 'nowrap'}}><Avatar who={WHO3[i]} size={58} /><span>{['Mark', 'Gary', 'Fiona'][i]}</span></div>;
      })}
      {WHO3.map((who, i) => {
        const R = lerpR(rectOf(prevLay, i), rectOf(lay, i), g);
        const mergeFade = lay === 'merge' ? 1 - g : 1;
        const exp = band(R.h, 300, 470), row = band(R.h, 100, 150) * (1 - band(R.h, 200, 300)), chip = 1 - band(R.h, 90, 130);
        const st = status(i); const col = COL3[i];
        const isExp = lay === i || prevLay === i;
        const finished = (i === 2 && k >= 4);
        const prog = i === 0 ? r(f, BRIEFED, HIT.mark, 0, 1, Easing.linear) : i === 1 ? r(f, BRIEFED, HIT.gary, 0, 1, Easing.linear) : r(f, K4, HIT.fiona, 0, 1, Easing.linear);
        // content crossfade gate during glides: outgoing expanded pane gone by glide f4, incoming starts at f4
        const Kk = KF[k]; const gate = k > 0 && prevLay === i && lay !== i ? 1 - r(f, Kk, Kk + 4, 0, 1, Easing.linear) : k > 0 && lay === i && prevLay !== i ? r(f, Kk + 4, Kk + 9, 0, 1, Easing.linear) : 1;
        return (
          <div key={who} style={{position: 'absolute', left: R.x, top: R.y, width: R.w, height: R.h, borderRadius: R.h < 120 ? R.h / 2 : 26, overflow: 'hidden', boxSizing: 'border-box', fontFamily: FONT, color: C.fg,
            background: R.h < 120 ? `${col}1c` : C.card, border: `${finished ? 2.5 : 1.5}px solid ${finished ? C.gold : col}${isExp && exp > 0.5 ? '' : '77'}`, opacity: mergeFade,
            boxShadow: exp > 0.5 ? `0 40px 120px rgba(0,0,0,0.6), 0 0 40px ${col}33` : '0 24px 70px rgba(0,0,0,0.5)'}}>
            {/* chip (40 %) */}
            {chip > 0.01 && <div style={{position: 'absolute', left: 10, top: 0, height: R.h, display: 'flex', alignItems: 'center', gap: 12, opacity: chip, fontSize: 27, fontWeight: 700, whiteSpace: 'nowrap', color: st.done ? C.fg : C.dim}}>
              <Avatar who={who} size={58} /><span>{['Mark', 'Gary', 'Fiona'][i]}</span>{st.done && <span style={{color: col}}>✓</span>}</div>}
            {/* row */}
            {row > 0.01 && <div style={{position: 'absolute', left: 30, right: 30, top: 26, opacity: row}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 18}}><Avatar who={who} size={64} blink={blinkAt(f, i)} />
                <div style={{fontSize: 30, fontWeight: 700, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 10}}>{finished && <Lock color={C.gold} size={22} />}{ROW_LAB[i]}</div>
                <div style={{marginLeft: 'auto', fontSize: 27, fontWeight: 750, color: st.col, whiteSpace: 'nowrap'}}>{st.txt}</div></div>
              {k < 4 && (i < 2 ? <div style={{marginTop: 22, height: 8, borderRadius: 8, background: 'rgba(243,239,230,0.08)', overflow: 'hidden'}}><div style={{width: `${prog * 100}%`, height: '100%', background: col}} /></div>
                : <div style={{marginTop: 16, fontSize: 24, color: C.dim}}>Starts when Mark and Gary report in</div>)}
            </div>}
            {/* expanded */}
            {exp * gate > 0.01 && <div style={{position: 'absolute', left: 34, top: 30, width: EXP.w - 68, opacity: exp * gate}}>
              {i === 0 && <MarkExp lf={f - K2} />}{i === 1 && <GaryExp lf={f - K3} />}{i === 2 && <FionaExp lf={f - K4} />}
            </div>}
          </div>
        );
      })}
      {/* K6: one chip */}
      {k === 5 && (() => { const c = pop(f, K6 + 3, 13, 170); return (
        <Center y={MERGE.y + 6} style={{opacity: Math.min(1, c * 1.4), transform: `scale(${0.85 + 0.15 * c})`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '16px 34px 16px 18px', borderRadius: 70, background: 'rgba(16,14,10,0.94)', border: `2.5px solid ${C.gold}`, fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.fg, boxShadow: '0 0 40px rgba(230,176,75,0.35)', whiteSpace: 'nowrap'}}>
            <TriAvatars size={56} /><span>All done <span style={{color: C.dim}}>—</span> held for your review</span></div>
        </Center>); })()}
      {/* time pill: clock never stops */}
      <Center y={118}>
        <div style={{display: 'flex', alignItems: 'center', height: 74, boxSizing: 'border-box', fontFamily: FONT, fontSize: 34, color: C.fg, padding: '0 32px', borderRadius: 74, background: 'rgba(6,6,8,0.78)', border: `1.5px solid ${C.faint}`, whiteSpace: 'nowrap'}}>
          <span style={{color: C.gold, marginRight: 14}}>{morning ? '☀' : '☾'}</span>
          <span style={{fontVariantNumeric: 'tabular-nums', fontWeight: 700, minWidth: 140}}>{clock}</span>
          <span style={{margin: '0 14px', color: C.dim}}>·</span>
          <span style={{color: C.dim}}>{morning ? 'Morning' : f >= K1 ? 'Rohan’s asleep' : 'Rohan, lights out'}</span>
        </div>
      </Center>
    </>
  );
};

// ---------- 13 NEW · Tap to source ----------
const Cite: React.FC<{n: number; children: React.ReactNode; on?: number}> = ({n, children, on = 0}) => (
  <span style={{position: 'relative', display: 'inline', borderBottom: `2.5px dotted rgba(230,176,75,${0.55 + 0.45 * on})`, background: `rgba(230,176,75,${0.22 * on})`, borderRadius: 4, padding: '0 2px', color: on > 0.3 ? '#FFE1A6' : undefined}}>
    {children}<sup style={{fontSize: '0.55em', color: C.gold, marginLeft: 2, fontWeight: 800}}>{n}</sup>
  </span>
);
const Source: React.FC<{f: number; lf: number}> = ({f, lf}) => {
  const tapF = wf('n13', 0) + 3 - BC.source[0];          // on "Tap"
  const s1 = pop(lf, tapF + 8, 14, 150), s2 = pop(lf, wf('n13', 3) - BC.source[0], 14, 150), un = pop(lf, wf('n13', 6) - BC.source[0], 14, 170);
  const on = r(lf, tapF, tapF + 4);
  const ring = r(lf, tapF, tapF + 16, 0, 1, Easing.out(Easing.quad));
  const press = r(lf, tapF - 6, tapF, 0, 1) * (1 - r(lf, tapF + 2, tapF + 14));
  return (
    <>
      <Card x={70} y={240} w={940} style={{border: '1.5px solid rgba(230,176,75,0.35)', padding: '28px 34px', overflow: 'visible'}}>
        <div style={{display: 'flex', alignItems: 'center'}}><Tag>Client note · Indus Air</Tag><div style={{marginLeft: 'auto', fontSize: 22, color: C.dim}}>Held for Rohan</div></div>
        <div style={{marginTop: 18, fontSize: 34, lineHeight: 1.55, color: C.fg}}>
          {/* the tapped term: press + an outline ripple AROUND the word box (hollow, never filled over the text) so "Rule 9(2)" stays readable */}
          <span style={{position: 'relative', display: 'inline-block', transform: `scale(${1 - 0.05 * press})`}}>
            <Cite n={1} on={on}>Rule 9(2)</Cite>
            <span style={{position: 'absolute', left: -8 - 26 * ring, right: -8 - 26 * ring, top: -4 - 18 * ring, bottom: -4 - 18 * ring, borderRadius: 14 + 10 * ring, border: `3px solid rgba(255,225,166,${0.9 * (1 - ring)})`, opacity: lf >= tapF ? 1 : 0, pointerEvents: 'none'}} />
            <span style={{position: 'absolute', left: -6, right: -6, top: -2, bottom: -2, borderRadius: 10, border: `2px solid rgba(230,176,75,${0.9 * on})`, boxShadow: `0 0 ${22 * on}px rgba(230,176,75,${0.45 * on})`, pointerEvents: 'none'}} />
          </span>{' '}sets fare caps per route. <Cite n={2}>Your cl. 7.3</Cite> assumes one network-wide ceiling, so <Cite n={3}>eleven fares on DEL–AUH</Cite> need repricing.
        </div>
      </Card>
      <Card x={70} y={720} w={940} style={{border: `2px solid ${C.gold}`, background: '#14110a', padding: '24px 32px', opacity: Math.min(1, s1 * 1.4), transform: `translateY(${(1 - s1) * 420}px)`}}>
        <div style={{fontSize: 25, fontWeight: 750, color: C.gold, letterSpacing: 1}}>SOURCE 1 · Gazette of India · p.4 · Rule 9(2)</div>
        <div style={{marginTop: 18, padding: '12px 16px', borderRadius: 10, background: 'rgba(230,176,75,0.16)', borderLeft: `4px solid ${C.gold}`}}>
          <div style={{filter: 'blur(4px)'}}><div style={{height: 12, borderRadius: 6, width: '92%', background: 'rgba(255,225,166,0.7)'}} /><div style={{marginTop: 10, height: 12, borderRadius: 6, width: '64%', background: 'rgba(255,225,166,0.55)'}} /></div>
        </div>
        <div style={{marginTop: 14, filter: 'blur(4px)'}}><Lines n={2} seed={7} h={9} gap={12} /></div>
      </Card>
      <Card x={70} y={990} w={940} style={{border: '1.5px solid rgba(243,239,230,0.25)', padding: '22px 32px', opacity: Math.min(1, s2 * 1.4), transform: `translateY(${(1 - s2) * 420}px)`}}>
        <div style={{fontSize: 25, fontWeight: 750, color: C.gold, letterSpacing: 1}}>SOURCE 3 · Fare matrix v4 · rows 1–11</div>
        <div style={{marginTop: 12, display: 'flex', gap: 22, fontSize: 24, color: C.dim, fontVariantNumeric: 'tabular-nums'}}>
          <span style={{color: C.fg, fontWeight: 650}}>DEL–AUH</span>{['Y', 'B', 'M', 'H', 'K', 'Q', '…'].map((x) => <span key={x}>{x}</span>)}
        </div>
      </Card>
      <div style={{position: 'absolute', left: 70, top: 1150, width: 940, boxSizing: 'border-box', padding: '18px 24px', borderRadius: 18, border: '2px dashed rgba(240,180,70,0.75)', background: 'rgba(240,170,60,0.08)', fontFamily: FONT, fontSize: 26, color: '#FFD38A', fontWeight: 600,
        display: 'flex', gap: 12, opacity: Math.min(1, un * 1.4), transform: `translateY(${(1 - un) * 40}px)`}}>
        <span>⚑</span><span>Unconfirmed: Rule 9 start date. Check before sending.</span>
      </div>
      <div style={{position: 'absolute', left: 70, top: 1258, width: 940, display: 'flex', gap: 18, fontFamily: FONT, opacity: r(lf, 20, 32)}}>
        <div style={{flex: 1, textAlign: 'center', padding: '20px 0', borderRadius: 18, fontSize: 28, fontWeight: 700, background: 'rgba(255,255,255,0.08)', border: `1px solid ${C.faint}`, color: C.fg}}>Edit</div>
        <div style={{flex: 1, textAlign: 'center', padding: '20px 0', borderRadius: 18, fontSize: 28, fontWeight: 800, background: C.gold, color: '#1a1206'}}>Approve &amp; send</div>
      </div>
    </>
  );
};

// ---------- 06 Meet the team ----------
const Team: React.FC<{lf: number; f: number}> = ({lf, f}) => {
  const b = BC.team[0];
  const gA = wf('n06', 1) - b, tA = wf('n06', 3) - b, aA = wf('n06', 4) - b;   // "Gary" / "Three" / "associates,"
  const pt = pop(lf, gA - 4, 13, 170), pm = pop(lf, tA - 2, 11, 150), pg = pop(lf, aA - 2, 11, 190), pf = pop(lf, aA + 3, 11, 190);
  const lineP = r(lf, aA, aA + 14, 0, 1, io);
  // Role teaching (trio demos dropped): each VO one-liner spotlights its associate on the Meet board — name lands 3 f before the word, the role line types on under the chip.
  const ROLE: Record<Who, [string, string]> = {mark: ['n07', 'the new rules, the minute they drop'], gary: ['n08', 'every court order that matters'], fiona: ['n09', 'your fares + the client note']};
  const spot = (who: Who) => { const ln = ROLE[who][0]; const a = wf(ln, 0) - 3 - b, e = fr(L[ln].end) + 2 - b; return r(lf, a, a + 9, 0, 1, io) * (1 - r(lf, e, e + 9, 0, 1, io)); };
  const anySpot = Math.max(spot('mark'), spot('gary'), spot('fiona'));
  const node = (who: Who, x: number, y: number, s: number, p: number, lab: string, verb: string, col: string) => {
    const sp = spot(who); const ra = wf(ROLE[who][0], 0) - 3 - b; const role = r(lf, ra + 4, ra + 16);
    return (
      <div style={{position: 'absolute', left: x - s / 2 - 120, top: y, width: s + 240, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: Math.min(1, p * 1.5) * (1 - 0.5 * (anySpot - sp)), transform: `translateY(${(1 - p) * 80}px) scale(${(0.6 + 0.4 * p) * (1 + 0.08 * sp)})`, transformOrigin: `50% ${s / 2}px`}}>
        <div style={{borderRadius: '50%', boxShadow: `0 0 ${70 * sp}px ${col}${sp > 0.01 ? '88' : '00'}`}}><Avatar who={who} size={s} ring={0.6 + 0.4 * Math.sin(f / 12) + 0.6 * sp} blink={blinkAt(f, x)} /></div>
        <div style={{marginTop: 22, fontFamily: FONT, fontSize: s > 300 ? 40 : 34, fontWeight: 700, color: C.fg, whiteSpace: 'nowrap'}}>{lab} <span style={{color: C.dim}}>·</span> <span style={{color: col}}>{verb}</span></div>
        <div style={{marginTop: 8, fontFamily: FONT, fontSize: 25, fontWeight: 550, color: C.dim, whiteSpace: 'nowrap', opacity: role, transform: `translateY(${(1 - role) * 10}px)`}}>{ROLE[who][1]}</div>
      </div>
    );
  };
  return (
    <>
      <Center y={240} style={{opacity: Math.min(1, pt * 1.4), transform: `translateY(${(1 - pt) * 24}px)`}}>
        <div style={{fontFamily: FONT, fontSize: 70, fontWeight: 800, letterSpacing: -2.5, color: C.fg}}>Gary Agents<span style={{color: C.gold}}>.</span></div>
        <div style={{marginTop: 6, fontFamily: FONT, fontSize: 28, letterSpacing: 5, fontWeight: 700, color: C.dim, textTransform: 'uppercase', opacity: r(lf, tA, tA + 10)}}>three associates</div>
      </Center>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M 540 884 C 480 930 330 912 290 978" fill="none" stroke={C.blue} strokeOpacity={0.6} strokeWidth={3} strokeDasharray="400" strokeDashoffset={400 * (1 - lineP)} />
        <path d="M 540 884 C 600 930 750 912 790 978" fill="none" stroke={C.coral} strokeOpacity={0.6} strokeWidth={3} strokeDasharray="400" strokeDashoffset={400 * (1 - lineP)} />
      </svg>
      {node('mark', 540, 440, 300, pm, 'Mark', 'reads', C.gold)}
      {node('gary', 290, 970, 240, pg, 'Gary', 'digs', C.blue)}
      {node('fiona', 790, 970, 240, pf, 'Fiona', 'drafts', C.coral)}
    </>
  );
};

// ---------- 15 End card — GARY ONLY (single gold avatar for the namesake product) ----------
const End: React.FC<{lf: number; f: number}> = ({lf, f}) => {
  const t = f / FPS; const w = L.n15.words;
  const av = pop(lf, 2, 12, 140);
  const tw = (ws: Wd[], color?: string, big?: boolean) => ws.map(([x, s], i) => { const p = r(t, s - 0.08, s + 0.22); return <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * (big ? 30 : 18)}px)`, filter: p < 0.98 ? `blur(${(1 - p) * 6}px)` : undefined, color, marginRight: i < ws.length - 1 ? '0.26em' : 0}}>{x}</span>; });
  const sweepAt = fr(w[w.length - 1][1]) - BC.end[0];
  const tagA = fr(w[1][2]) - BC.end[0];
  return (
    <>
      <AbsoluteFill style={{background: `radial-gradient(ellipse 700px 600px at 50% 31%, rgba(230,176,75,${0.13 * av}), rgba(0,0,0,0) 70%)`}} />
      <Center y={320} style={{opacity: Math.min(1, av * 1.4), transform: `scale(${0.7 + 0.3 * av})`}}>
        <Avatar who="gary" bg={C.blue} size={300} ring={0.7 + 0.3 * Math.sin(f / 14)} blink={blinkAt(f, 5)} />
      </Center>
      <Center y={710}>
        <div style={{fontFamily: FONT, fontSize: 124, fontWeight: 800, letterSpacing: -5, color: C.fg, lineHeight: 1, whiteSpace: 'nowrap'}}>{tw(w.slice(0, 1), undefined, true)}<span style={{display: 'inline-block', width: '0.26em'}} />{tw([[w[1][0].replace('.', ''), w[1][1], w[1][2]]], undefined, true)}<span style={{color: C.gold, opacity: r(t, w[1][2] - 0.1, w[1][2] + 0.1)}}>.</span></div>
      </Center>
      <Center y={862} style={{opacity: r(lf, tagA, tagA + 14), transform: `translateY(${r(lf, tagA, tagA + 18, 16, 0)}px)`}}><div style={{fontFamily: FONT, fontSize: 34, fontWeight: 450, color: C.dim}}>Your 24/7 associates. Async by design.</div></Center>
      <Center y={950}><div style={{width: 90 * r(lf, tagA + 4, tagA + 22, 0, 1, io), height: 3, background: C.gold}} /></Center>
      <Center y={995}><div style={{fontFamily: FONT, fontSize: 58, fontWeight: 700, letterSpacing: -1, color: C.fg}}>{tw(w.slice(2, 5))}</div></Center>
      <Center y={1078}>
        <div style={{position: 'relative', fontFamily: FONT, fontSize: 58, fontWeight: 700, letterSpacing: -1, color: C.gold}}>{tw(w.slice(5), C.gold)}<Sweep f={lf} a={sweepAt} dur={20} h={4} bottom={-10} /></div>
      </Center>
    </>
  );
};

const Watermark: React.FC = () => (
  <div style={{position: 'absolute', right: 52, bottom: 56, fontFamily: FONT, fontSize: 26, fontWeight: 700, letterSpacing: 3, color: 'rgba(243,239,230,0.42)', display: 'flex', alignItems: 'center', gap: 8, textShadow: '0 1px 6px rgba(0,0,0,0.6)'}}>
    <span style={{width: 8, height: 8, borderRadius: 8, background: 'rgba(230,176,75,0.75)'}} />7HL
  </div>
);

// ---------- Composition ----------
export const GaryAgentsVersionC2: React.FC = () => {
  const f = useCurrentFrame();
  const inEnd = f >= BC.end[0];
  const n1 = [wf('n01', 2) - 4, wf('n01', 7) - 4];
  const cf = Math.min(f, FREEZE);
  const frozen = f >= FREEZE;
  const flagAt = wf('n12', 4) - 8 - BC.digest[0];     // flag lands just before "Every line cited"
  const day = f >= BC.digest[0] && f < BC.end[0];
  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: FONT, overflow: 'hidden'}}>
      {(f < BLACK || f >= BC.team[0] - 8) && !(f >= BC.sleep[0] && f < BC.sleep[1]) ? <Backdrop f={f} tint={day ? '240,170,90' : '230,176,75'} /> : null}
      {/* 01 Midnight ping */}
      <Beat f={f} span={BC.lock} inF={0} push={0.06} hardIn>{(lf) => (
        <div style={{position: 'absolute', inset: 0, transform: `scale(${1.04 - 0.04 * r(lf, 0, 40)})`, opacity: r(lf, 0, 10)}}>
          <Phone f={lf} day="Tuesday" clock="11:41" notifs={[
            {at: n1[0], app: 'GAZETTE OF INDIA', icon: <AppIcon bg="#2C4A7A" ch="G" />, title: 'New airfare rules notified', body: 'G-1187 · In force immediately.', time: 'now'},
            {at: n1[1], app: 'PRIYA · INDUS AIR', icon: <AppIcon bg={C.gold} ch="P" color="#1a1206" />, title: 'Priya · GC, Indus Air', body: 'Does this hit our codeshare fares? Need it for the 9 AM board.', time: 'now'},
          ]} />
        </div>
      )}</Beat>
      <Beat f={f} span={BC.upload} push={0.04}>{(lf) => <Upload lf={lf} f={f} />}</Beat>
      <Beat f={f} span={BC.chats} push={0.04}>{(lf) => <Chats lf={lf} f={f} />}</Beat>
      {/* 04 The awkward call — freezes on "At nine.", 1 s hold, hard cut to black */}
      <Beat f={f} span={BC.call} push={0} hardOut>{(lf) => {
        const fz = r(f, FREEZE, FREEZE + 6);
        const push = 1 + 0.05 * r(cf - BC.call[0], 0, BC.call[1] - BC.call[0], 0, 1, Easing.linear) + 0.03 * r(f, FREEZE, BLACK, 0, 1, Easing.linear);
        const pt = frozen ? 0 : talkOf(f, ['d1p', 'd1p2']), rt = frozen ? 0 : talkOf(f, ['d1r']);
        return (
          <div style={{position: 'absolute', inset: 0, transform: `scale(${push})`, filter: fz > 0 ? `grayscale(${0.75 * fz}) brightness(${1 - 0.25 * fz}) contrast(${1 + 0.1 * fz})` : undefined}}>
            <Tile who="priya" day={false} y={250} talk={pt} f={cf} label="Priya · GC, Indus Air" />
            <Tile who="rohan" day={false} y={850} talk={rt} f={cf} label="Rohan · Partner" lean={-8}>
              <div style={{position: 'absolute', right: 22, top: 22, opacity: r(lf, 10, 20)}}><Pill color={C.red} size={22}>Session expired</Pill></div>
            </Tile>
            {frozen && <AbsoluteFill style={{background: `rgba(255,255,255,${0.12 * (1 - r(f, FREEZE, FREEZE + 4))})`}} />}
          </div>
        );
      }}</Beat>
      {/* 05 Black */}
      {f >= BLACK && f < BC.team[0] + 8 && (() => {
        const t = f / FPS; const ws = L.n05.words; const ex = r(f, BC.team[0] - 6, BC.team[0] + 8, 0, 1, io);
        return (
          <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1 - ex, transform: `scale(${1 + 0.04 * r(f, BLACK, BC.team[0], 0, 1, Easing.linear) + 0.2 * ex})`, filter: ex > 0.02 ? `blur(${12 * ex}px)` : undefined}}>
            <div style={{maxWidth: 900, textAlign: 'center', fontFamily: FONT, fontSize: 104, fontWeight: 780, letterSpacing: -3.5, lineHeight: 1.08, color: C.fg}}>
              {ws.map(([w, s], i) => { const p = r(t, s - 0.08, s + 0.22); const g = i === ws.length - 1;
                return <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 30}px) scale(${g ? 1.25 - 0.25 * p : 1})`, filter: p < 0.98 ? `blur(${(1 - p) * 8}px)` : undefined, color: g ? C.gold : undefined, marginRight: i < ws.length - 1 ? '0.25em' : 0, textShadow: g ? '0 0 40px rgba(230,176,75,0.35)' : undefined}}>{w}</span>; })}
            </div>
          </AbsoluteFill>
        );
      })()}
      {/* 06 Meet chips — holds under n06 + the Mark/Gary/Fiona VO one-liners (roles teach via spotlight); the trio UI demos (07–09) are DROPPED. Hard cut into "Brief them once". */}
      <Beat f={f} span={BC.team} push={0.04} inF={10} hardOut>{(lf) => <Team lf={lf} f={f} />}</Beat>
      {/* 10+11 SLEEP SHOT (split screen): hard in on the breath before "Brief", cards glide on top, Rohan jumps below — hard out on the 7:12 lock at the top of the stretch */}
      <Beat f={f} span={BC.sleep} push={0.015} hardIn hardOut>{() => <SleepShot f={f} />}</Beat>
      {/* 12 Morning + honest flag — hard in from 11, slow push toward the flag through the hold */}
      <Beat f={f} span={BC.digest} push={0.0} hardIn>{(lf, len) => {
        const z = r(lf, flagAt + 6, len, 0, 1, Easing.bezier(0.3, 0, 0.5, 1));
        return (
          <div style={{position: 'absolute', inset: 0, transform: `scale(${1 + 0.07 * z})`, transformOrigin: '540px 980px'}}>
            <Phone f={lf} day="Wednesday" clock="7:12" morning notifs={[
              {at: 3, app: 'GARY AGENTS', icon: <TriAvatars size={40} />, title: 'Done overnight', body: 'Rules read · 6 key orders found · 11 fares redlined. Client note held for your review.', actions: true, time: '7:00 AM'},
              {at: flagAt, app: 'GARY AGENTS · FLAG', icon: <AppIcon bg="#F0B446" ch="⚑" color="#1a1206" />, title: 'Couldn’t confirm: Rule 9 start date.', body: 'Flagged for you.', foot: 'Every line cited · 18 sources', time: '7:00 AM', flag: true},
            ]} />
          </div>
        );
      }}</Beat>
      {/* 13 NEW tap to source */}
      <Beat f={f} span={BC.source} push={0.03}>{(lf) => <Source f={f} lf={lf} />}</Beat>
      {/* 14 Fast. And cited. */}
      <Beat f={f} span={BC.call2} push={0.03}>{(lf) => {
        const mailAt = wf('d2r', 4) - BC.call2[0]; const mp = pop(lf, mailAt, 13, 180);
        return (
          <>
            <Tile who="priya" day y={250} talk={talkOf(f, ['d2p', 'd2p2'])} f={f} label="Priya · GC, Indus Air">
              <div style={{position: 'absolute', left: 30, right: 30, top: 26, padding: '16px 20px', borderRadius: 18, background: 'rgba(20,20,26,0.9)', display: 'flex', alignItems: 'center', gap: 14, fontFamily: FONT,
                opacity: Math.min(1, mp * 1.4), transform: `translateY(${(1 - mp) * -60}px)`, boxShadow: '0 20px 50px rgba(0,0,0,0.4)'}}>
                <AppIcon bg={C.blue} ch="✉" />
                <div style={{flex: 1}}><div style={{fontSize: 22, color: C.dim, fontWeight: 600}}>Rohan · just now</div><div style={{fontSize: 25, color: C.fg, fontWeight: 700}}>Client note · DEL–AUH (11 fares) · 18 sources</div></div>
              </div>
            </Tile>
            <Tile who="rohan" day y={850} talk={talkOf(f, ['d2r'])} f={f} label="Rohan · Partner" lean={6}>
              <div style={{position: 'absolute', right: 22, top: 22, opacity: r(lf, 6, 16)}}><Pill color={C.green} size={22}>✓ Reviewed · sent</Pill></div>
            </Tile>
          </>
        );
      }}</Beat>
      {/* 15 End card — Gary only */}
      <Beat f={f} span={BC.end} push={0.03} inF={10} hardOut>{(lf) => <End lf={lf} f={f} />}</Beat>
      <TimePill f={f} />
      {!inEnd && <CapShade />}
      <Captions f={f} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)', pointerEvents: 'none'}} />
      {(f < BLACK || f >= BC.team[0]) && <Watermark />}
    </AbsoluteFill>
  );
};
