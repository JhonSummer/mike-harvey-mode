# Gary Agents · Version C2 mix (48 kHz stereo). Built from mix_c.py (Version C untouched). Near-dry VO (Version B dry patch: ERs -29..-34 dB + 0.35 s room at -30 dB, no hall).
# Stems: VO (vo_c: Mariana narrator + Priya/Rohan call dialogue) · music (ElevenLabs Music, c_assets/music2) · night room tone · SFX (b_assets).
# Timeline from vo_c2/cues.json (same source as src/voC2.ts -> GaryC2.tsx beat map). Master: glue comp -> linear gain to -15 LUFS + limiter (<= -1.5 dBTP).
import numpy as np, wave, json, subprocess
from scipy import signal
SR = 48000
CU = json.load(open('vo_c2/cues.json')); LN = CU['lines']; T = CU['total']; N = int(T * SR)
fr = lambda s: round(s * 30) / 30
cut = lambda k: fr(LN[k]['start'] - 0.15)
FREEZE = fr(LN['d1p2']['end'] + 0.06); BLACK = fr(LN['d1p2']['end'] + 1.0)
W = lambda k, i: LN[k]['words'][i][1]
LAMP = fr(LN['n11']['end'] - 0.02)
SL = CU['sleep']; EY = fr(SL['eyes']); KS = [EY + round(k * 30) / 30 for k in SL['keys']]; HARD = EY + round(SL['len'] * 30) / 30   # sleep shot K1..K6 (= GaryC2.tsx KF / HARD)
HS = SL['hits']; HIT_M, HIT_G, HIT_F, THUNK = KS[1] + HS['mark'] / 30, KS[2] + HS['gary'] / 30, KS[3] + HS['fiona'] / 30, KS[2] + HS['thunk'] / 30   # = GaryC2.tsx HIT (shared via cues.json)
YOU = W('n05', len(LN['n05']['words']) - 1)   # "you." onset: first piano note of the score
FLAG = fr(W('n12', 4)) - 8 / 30
def load(f):
    w = wave.open(f); sw = w.getsampwidth(); ch = w.getnchannels(); raw = w.readframes(w.getnframes()); sr = w.getframerate()
    if sw == 3:
        b = np.frombuffer(raw, np.uint8).reshape(-1, 3).astype(np.int32); a = b[:, 0] | (b[:, 1] << 8) | (b[:, 2] << 16); a = np.where(a >= 1 << 23, a - (1 << 24), a) / 2 ** 23
    else: a = np.frombuffer(raw, np.int16) / 32768
    a = a.reshape(-1, ch).astype(np.float64); assert sr == SR, f
    return np.repeat(a, 2, 1) if ch == 1 else a
db = lambda x: 10 ** (x / 20)
def bq(a, kind, f, q=0.707, g=0.0):
    A = 10 ** (g / 40); w0 = 2 * np.pi * f / SR; al = np.sin(w0) / (2 * q); c = np.cos(w0)
    if kind == 'hp': b = [(1 + c) / 2, -(1 + c), (1 + c) / 2]; a_ = [1 + al, -2 * c, 1 - al]
    elif kind == 'lp': b = [(1 - c) / 2, 1 - c, (1 - c) / 2]; a_ = [1 + al, -2 * c, 1 - al]
    elif kind == 'hs':
        sq = 2 * np.sqrt(A) * al
        b = [A * ((A + 1) + (A - 1) * c + sq), -2 * A * ((A - 1) + (A + 1) * c), A * ((A + 1) + (A - 1) * c - sq)]
        a_ = [(A + 1) - (A - 1) * c + sq, 2 * ((A - 1) - (A + 1) * c), (A + 1) - (A - 1) * c - sq]
    else: b = [1 + al * A, -2 * c, 1 - al * A]; a_ = [1 + al / A, -2 * c, 1 - al / A]
    return signal.lfilter(b, a_, a, axis=0)
def env(x, att, rel):
    x = np.abs(x); aa = np.exp(-1 / (att * SR)); ar = np.exp(-1 / (rel * SR))
    return np.maximum(signal.lfilter([1 - aa], [1, -aa], x), signal.lfilter([1 - ar], [1, -ar], x))
def comp(x, thr, ratio, rel=0.15, makeup=0.0):
    k = np.exp(-1 / (0.01 * SR)); m = np.sqrt(signal.lfilter([1 - k], [1, -k], (x ** 2).mean(1)) + 1e-12)
    gr = np.minimum(0, (thr - 20 * np.log10(m + 1e-9)) * (1 - 1 / ratio)); g = 10 ** (gr / 20)
    kr = np.exp(-1 / (rel * SR)); g = signal.lfilter([1 - kr], [1, -kr], g); return x * g[:, None] * db(makeup)
def ir(rt, pre, lp, hp, seed=1):
    n = int(rt * 1.3 * SR); t = np.arange(n) / SR; h = np.random.default_rng(seed).standard_normal((n, 2)) * np.exp(-6.9 * t / rt)[:, None]
    h[: int(0.005 * SR)] *= np.linspace(0, 1, int(0.005 * SR))[:, None]; h = bq(bq(h, 'lp', lp), 'hp', hp)
    h = np.concatenate([np.zeros((int(pre * SR), 2)), h]); return h / np.sqrt((h ** 2).sum() / 2)
def conv(x, h):
    xm = x.mean(1); return np.stack([signal.fftconvolve(xm, h[:, 0]), signal.fftconvolve(xm, h[:, 1])], 1)[: len(xm)]
def ms_widen(x, k):
    m = (x[:, 0] + x[:, 1]) / 2; s = (x[:, 0] - x[:, 1]) / 2 * k; return np.stack([m + s, m - s], 1)
def pan(x, p):
    m = x.mean(1); th = (np.asarray(p) + 1) * np.pi / 4; return np.stack([m * np.cos(th), m * np.sin(th)], 1) * np.sqrt(2)
def place(bus, a, t, g=0.0):
    i = int(round(t * SR)); n = min(len(a), N - i)
    if n > 0: bus[i:i + n] += a[:n] * db(g)
def norm_peak(a, pk=-1.0): return a / (np.abs(a).max() + 1e-9) * db(pk)
def fade(a, fi=0.01, fo=0.05):
    a = a.copy(); ni, no = int(fi * SR), int(fo * SR)
    if ni: a[:ni] *= np.linspace(0, 1, ni)[:, None]
    if no: a[-no:] *= np.linspace(1, 0, no)[:, None]
    return a
def loop(a, n, xf=1.0):
    X = int(xf * SR); o = a.copy()
    while len(o) < n: w = np.linspace(0, 1, X)[:, None]; o = np.concatenate([o[:-X], o[-X:] * (1 - w) + a[:X] * w, a[X:]])
    return o[:n]
def seg_gain(points):
    return db(np.interp(np.arange(N), np.array([p[0] for p in points]) * SR, np.array([p[1] for p in points])))

# ---------------- synth instruments (sound-logo triad + felt piano + lullaby pad) ----------------
D4, FS4, A4 = 293.66, 369.99, 440.0
def tone(parts, dur, att=0.004, seed=0):
    t = np.arange(int(dur * SR)) / SR; y = np.zeros_like(t)
    for f0, amp, dec in parts: y += amp * np.sin(2 * np.pi * f0 * t + seed) * np.exp(-t / dec)
    y *= np.minimum(1, t / att); return np.stack([y, y], 1)
def chime(f0, dur=1.6):   # soft mallet / celesta: fundamental + octave + bell partial, 1-3 kHz presence for phone speakers
    y = tone([(f0, 1.0, 0.9), (2 * f0, 0.55, 0.55), (3 * f0, 0.12, 0.3), (4 * f0, 0.22, 0.22), (5.43 * f0, 0.10, 0.07)], dur, 0.003)
    return bq(y, 'lp', 6000)
def piano(f0, dur=3.5, vel=1.0):   # felt piano: inharmonic partials, faster HF decay, felt thump, warm LPF
    B = 0.0004; parts = [(n * f0 * np.sqrt(1 + B * n * n), vel / n ** 1.6, 2.2 / (1 + 0.6 * (n - 1))) for n in range(1, 9)]
    y = tone(parts, dur, 0.008); th = np.random.default_rng(int(f0)).standard_normal(int(0.03 * SR)) * np.exp(-np.arange(int(0.03 * SR)) / (0.006 * SR)) * 0.08
    y[: len(th)] += th[:, None]; return bq(bq(y, 'lp', 2600), 'hp', 50)
def chord(fs, dur, fn=piano, **kw):
    y = sum(fn(f, dur, **kw) for f in fs); return y / len(fs) ** 0.5
def pad(fs, dur, att=1.2, rel=1.5):   # warm lullaby pad: detuned sines, slow LFO
    t = np.arange(int(dur * SR)) / SR; y = np.zeros((len(t), 2))
    for i, f0 in enumerate(fs):
        for dt, side in ((-0.9, 0), (0.9, 1)): y[:, side] += np.sin(2 * np.pi * (f0 + dt) * t + i) * (0.8 + 0.2 * np.sin(2 * np.pi * 0.11 * t + i))
    env_ = np.minimum(1, t / att) * np.minimum(1, (dur - t) / rel); y *= env_[:, None]; return bq(y, 'lp', 1400) / len(fs)
def rev(a): return a[::-1].copy()

# ---------------- VO ----------------
GAIN = {k: (0.0 if v['who'] == 'N' else -0.5) for k, v in LN.items()}
GAIN.update({'n05': 1.0, 'n15': 0.5, 'd1r': -1.0, 'n11': 0.5})
vo = np.zeros((N, 2))
for k, v in LN.items():
    a = load(f'vo_c2/{k}.wav')[:, :1].repeat(2, 1); a = a / (np.sqrt(np.mean(a ** 2)) + 1e-9) * db(-20)
    place(vo, fade(a, 0.004, 0.03), v['at'], GAIN[k])
vo = bq(vo, 'hp', 90, 0.7); vo = bq(vo, 'pk', 250, 1.0, -2.0); vo = bq(vo, 'hs', 4200, 0.7, 3.0); vo = bq(vo, 'hs', 11000, 0.7, 1.5)
sb, sa = signal.butter(2, [5500, 9000], 'band', fs=SR); ess = signal.lfilter(sb, sa, vo[:, 0])
gs = 1 / np.clip(env(ess, 0.002, 0.06) / (env(vo[:, 0], 0.005, 0.12) * 0.35 + 1e-6), 1, 4); vo = vo - (ess * (1 - gs))[:, None]
vo = comp(vo, -24, 3.0, rel=0.12, makeup=3)
vo_env = env(vo[:, 0], 0.03, 0.35)
er = np.zeros((N, 2))
for d, g, side in [(0.011, -29, 0), (0.017, -30, 1), (0.029, -33, 0), (0.037, -34, 1)]:
    i = int(d * SR); er[i:, side] += vo[:-i, 0] * db(g)
room = conv(bq(vo, 'hp', 220), ir(0.35, 0.008, 6500, 220, seed=3)) * db(-30)
VO_BUS = vo + er + room
_r = lambda x: np.sqrt(np.mean(x ** 2)) + 1e-12; WET = _r(er + room) / _r(vo)

# ---------------- music (c_assets/music2: 84 BPM, 51 s; sections Midnight 0-12 · Call 12-18 · Black 18-21 · Associates 21-32 · Night 32-36 · Morning 36-45 · Resolve 45-51) ----------------
m = load('c_assets/music2.wav'); m = ms_widen(m, 1.5); m = np.concatenate([m, np.zeros((SR * 2, 2))])
BAR2 = 2 * 4 * 60 / 84   # two bars
mus = np.zeros((N, 2))
def seg(t0, t1, s0, fi=0.03, fo=0.03):
    a = m[int(s0 * SR): int(s0 * SR) + int((t1 - t0) * SR)]; place(mus, fade(a, fi, fo), t0)
# Sound brief: NO music 0:00 -> black. The score opens with one felt-piano note ON "you" (placed in SFX bus below).
OFF = cut('n06') - 0.25
sA = 14.0; seg(OFF, cut('n11'), sA, fi=0.6)                                  # associates
sB = sA + (cut('n11') - OFF) + BAR2; seg(cut('n11'), LAMP + 0.01, sB, fo=0.01)  # night: +2 bars (bar-phase kept), dies on the lamp click -> lullaby (synth, D major) takes the sleep shot
seg(HARD, cut('d2p'), 36.0, fi=0.005)                                         # morning bloom enters ON the hard cut
sD = 36.0 + (cut('d2p') - HARD) - BAR2; seg(cut('d2p'), T, sD)               # back 2 bars so the resolve lands under the end card
LOGO = W('n15', len(LN['n15']['words']) - 1)   # sound logo lands on the last word ("yes.")
mus *= seg_gain([(0, -90), (OFF, -90), (OFF + 0.01, -6), (OFF + 1.2, 0),
                 (cut('n11') - 0.1, 0), (cut('n11') + 0.6, -5), (LAMP, -6), (LAMP + 0.01, -90), (HARD - 0.005, -90), (HARD, -12), (HARD + 0.55, -12), (HARD + 1.3, -1),   # morning: dips for the phone buzz, returns
                 (cut('d2p') - 0.2, -1), (cut('d2p') + 0.3, -4), (LN['d2p2']['start'], -4), (LN['d2p2']['end'], 1.0), (cut('n15') + 0.4, 0.5),                       # swell under "Fast. And cited."
                 (LOGO - 0.45, 0), (LOGO - 0.05, -14), (T, -18)])[:, None]                                                                                       # music gives way to the D-major logo
duck_vo = np.clip(vo_env / (vo_env.max() * 0.25), 0, 1); k = np.exp(-1 / (0.12 * SR)); duck_vo = signal.lfilter([1 - k], [1, -k], duck_vo)
hits = np.zeros(N)
for t, d in [(BLACK, 1.0), (cut('n06') + 0.1, 0.8), (HARD, 0.5)]:
    i = int(t * SR); n = int(d * SR); hits[i:i + n] = np.maximum(hits[i:i + n], np.linspace(1, 0, n) ** 0.6)
MUS_BUS = mus * db(-9 * duck_vo - 6 * hits)[:, None] * db(-2)  # music2 sits ~4 dB under music1, so -2 here ~ B bed level

# ---------------- ambience: late-night room tone + typing (01-04), stops dead on the freeze ----------------
amb = np.zeros((N, 2))
rt = loop(load('b_assets/el/room_tone.wav'), int(FREEZE * SR)); place(amb, fade(rt, 0.4, 0.02), 0.0, -8)
typ = load('b_assets/el/typing.wav'); place(amb, fade(pan(typ[: int(2.4 * SR)], -0.15), 0.1, 0.3), cut('n02') + 0.2, -14)
place(amb, fade(pan(typ[: int(1.8 * SR)], 0.15), 0.1, 0.3), cut('n03') + 0.4, -16)
RT2 = cut('n11') - 6 / 30   # J-cut: night room tone pre-laps the hard cut by 6 f under the "note." tail, 0.4 s fade
rt2 = loop(load('b_assets/el/room_tone.wav'), int((HARD - RT2) * SR)); place(amb, fade(rt2, 0.4, 0.005), RT2, -12)
AMB_BUS = amb * db(-4 * duck_vo)[:, None]

# ---------------- SFX ----------------
sfx = np.zeros((N, 2)); send = np.zeros((N, 2))
def hit(f, t, g, p=0.0, wet=-14, fx=None):
    a = norm_peak(load(f), -1)
    if fx: a = fx(a)
    if np.ndim(p) or p != 0: a = pan(a, p)
    place(sfx, a, t, g); place(send, a, t, g + wet)
def sweep(a, p0, p1): return pan(a, np.linspace(p0, p1, len(a)))
# 01 notifications (land with the cards: word start - 4 f)
for t in [W('n01', 2) - 4 / 30, W('n01', 7) - 4 / 30]:
    hit('b_assets/ping.wav', t, -9, 0.0, -20); hit('b_assets/el/buzz.wav', t, -14, 0.0, -20, fx=lambda a: bq(a, 'lp', 1500))
# 02 uploads tick, limit error
b2 = cut('n02')
for i in range(3): hit('b_assets/el/check_1.wav', b2 + (6 + i * 9 + 18) / 30, -18, 0.1 * (i - 1), -16)
hit('b_assets/el/buzz.wav', W('n02', 7), -10, 0.0, -18, fx=lambda a: bq(a, 'lp', 900)); hit('b_assets/el/tap.wav', W('n02', 7), -10, 0.0, -14)
# 03 chat cards whip in, EXPIRED stamp
for i, kk in enumerate([None, 2, 3, 5]):
    t = (LN['n03']['start'] if kk is None else W('n03', kk)) - 2 / 30
    hit('b_assets/el/whoosh_whip.wav', t - 0.08, -17, 0.0, -14, fx=lambda a, d=(1 if i % 2 else -1): sweep(a, -0.5 * d, 0.5 * d))
hit('b_assets/slam.wav', W('n03', 5) + 0.18, -12, 0.0, -18, fx=lambda a: bq(a, 'lp', 1800))
# 04 call connect blip
hit('b_assets/el/check_2.wav', cut('d1p') + 0.05, -16, 0.0, -14)
# 05 black: sub boom
hit('b_assets/boom.wav', BLACK, -6, 0.0, -12)
# 06 team: chord hit on "Gary Agents", whips on the associates
hit('b_assets/el/chord_hit.wav', W('n06', 1) - 0.05, -13, 0.0, -10)
hit('b_assets/el/whoosh_whip.wav', W('n06', 4) - 0.15, -15, 0.0, -12, fx=lambda a: sweep(a, -0.6, 0.0))
hit('b_assets/el/whoosh_whip.wav', W('n06', 4) + 0.02, -15, 0.0, -12, fx=lambda a: sweep(a, 0.6, 0.0))
# beat whooshes — trio demos dropped (no n07–n09 cuts) and no whip into the sleep shot (hard cut into a quiet bedroom)
for i, kk in enumerate(['n13', 'd2p', 'n15']):
    hit('b_assets/el/whoosh_whip.wav', cut(kk) - 0.22, -15, 0.0, -12, fx=lambda a, d=(1 if i % 2 else -1): sweep(a, -0.6 * d, 0.6 * d))
# 07–09 trio demos DROPPED (Studio lock): Meet holds; one soft tap per role spotlight (lands with the name, 3 f early), panned to the chip
for kk, p_ in (('n07', 0.0), ('n08', -0.35), ('n09', 0.35)): hit('b_assets/el/tap.wav', W(kk, 0) - 3 / 30, -22, p_, -18)
# 05 first piano note of the score ON "you" (open D: D2/D3/A3 — consonant with the D-minor bed that follows), long ring into the reveal
place(sfx, chord([73.42, 146.83, 220.0, 293.66], 4.5, vel=1.0), YOU - 0.01, -9); place(send, chord([146.83, 220.0], 4.5), YOU, -22)
# associate notes in 07-09 deferred: c_assets/music2 is D minor/F (F natural) — an F#4 Gary chime over it would clash. Triad lives in the sleep shot + logo.
# 10+11 SLEEP SHOT — lamp click; lullaby pad (D major, half-time feel) + sparse felt piano; dopamine loop x3 (swell -> note + tactile -> release); one snore cut by the stamp
CS = 'c2s_assets/'
hit(CS + 'lamp_click_v1.wav', LAMP, -9, -0.35, -24)
pd = pad([146.83, 220.0, 293.66, 369.99], HARD - LAMP + 0.05, att=1.4, rel=0.25); place(sfx, fade(pd, 0.01, 0.04), LAMP + 0.05, -21)
BEAT = 60 / 84
for j, (t, fq) in enumerate([(KS[1] - 0.15, 220.0), (KS[2] - 0.15, 246.94), (KS[3] - 0.15, 220.0), (KS[4], 293.66)]):   # half-time felt piano, very soft
    place(sfx, piano(fq, 2.6, 0.8), t, -24); place(sfx, piano(fq / 2, 2.6, 0.6), t, -27)
for t, f0, tact in [(HIT_M, D4, 'tick'), (HIT_G, FS4, 'riffle'), (HIT_F, A4, 'stamp')]:
    c = chime(f0); place(sfx, fade(rev(c[: int(0.32 * SR)]), 0.08, 0.005), t - 0.32, -26)   # build: tiny reversed swell
    place(sfx, c, t, -15); place(send, c, t, -26)                                              # hit: the associate's note
for kk in (2, 3, 4): hit(CS + 'glide_1_v1.wav', KS[kk] - 0.02, -27, 0.0, -30)                  # release: soft air as the card shrinks back
hit('b_assets/el/check_1.wav', HIT_M - 0.02, -15, 0.15, -20)                                   # Mark: source-tag tick
hit('b_assets/paper.wav', KS[2] + 12 / 30, -20, -0.1, -20)                                     # Gary: page riffle (K3+12)
hit('b_assets/slam.wav', THUNK, -19, 0.0, -24, fx=lambda a: bq(bq(a, 'lp', 600), 'hp', 60))    # Gary: overruled thunk (felt)
# the one real snore at the sprawl (K4) — cut dead by Fiona's stamp thud (the joke)
SN0 = HIT_F - 1.15   # anchored back from the stamp (K4+42 with the stretch) so the stamp always cuts it mid-snore
sn = norm_peak(load(CS + 'snore_big_v3.wav'), -1); sn = sn[: int((HIT_F - SN0) * SR)]; sn = fade(sn, 0.02, 0.012)
place(sfx, sn, SN0, -14); place(send, sn, SN0, -30)
hit('b_assets/slam.wav', HIT_F, -10, 0.0, -18, fx=lambda a: bq(a, 'lp', 1400)); hit('b_assets/boom.wav', HIT_F, -24, 0.0, -30, fx=lambda a: bq(a, 'lp', 300))
hit('b_assets/el/tap.wav', HIT_F + 6 / 30, -18, 0.1, -20, fx=lambda a: bq(a, 'hp', 1200))       # lock click (held for Rohan)
# Rohan's jumps: sheet rustle (+ sigh on K3), content hum + first bird at K5, yawn-stretch into the hard cut
for kk, fn, g in [(1, 'rustle_1_v2', -21), (2, 'rustle_2_v2', -21), (3, 'rustle_3_v2', -19), (4, 'rustle_1_v2', -22), (5, 'rustle_2_v2', -21)]:
    place(sfx, fade(norm_peak(load(CS + fn + '.wav'), -1), 0.005, 0.2), KS[kk] - 0.03, g)
place(sfx, fade(norm_peak(load(CS + 'sigh_1_v1.wav'), -1), 0.01, 0.2), KS[2] + 0.05, -22)
place(sfx, fade(norm_peak(load(CS + 'mumble_1_v1.wav'), -1)[: int(0.7 * SR)], 0.02, 0.25), KS[4] + 0.15, -27)
bd = norm_peak(load(CS + 'birds_v2.wav'), -1); place(sfx, fade(bd[: int((HARD - KS[4]) * SR)], 0.3, 0.01), KS[4], -30)
place(sfx, fade(norm_peak(load(CS + 'stretch_1_v2.wav'), -1)[: int((HARD - KS[5] - 0.05) * SR)], 0.03, 0.01), KS[5] + 0.08, -21)
# regroup (K5): all three together + faint shimmer — the biggest reward
rg = chord([D4, FS4, A4], 2.2, fn=chime); place(sfx, rg, KS[4] + 0.03, -13); place(send, rg, KS[4] + 0.03, -22)
place(sfx, chord([1174.66, 1479.98, 1760.0], 1.6, fn=chime), KS[4] + 0.06, -31)
# 12 morning: close, real phone buzz on the hard cut — loudest since the freeze; ping on top
hit('b_assets/el/buzz.wav', HARD + 2 / 30, -3, 0.0, -24); hit('b_assets/ping.wav', HARD + 5 / 30, -11, 0.0, -20)
# 12 honest flag: softer, lower alert
hit('b_assets/el/check_2.wav', FLAG, -12, 0.0, -14, fx=lambda a: bq(a, 'lp', 2500))
# 13 tap to source: tap on "Tap", sources whoosh up
tapT = (round(W('n13', 0) * 30) + 3) / 30
hit('b_assets/el/tap.wav', tapT, -9, -0.2, -14)
hit('b_assets/el/whoosh_whip.wav', tapT + 8 / 30 - 0.1, -18, 0.0, -14, fx=lambda a: bq(a, 'lp', 4000))
hit('b_assets/el/whoosh_whip.wav', W('n13', 3) - 0.1, -19, 0.0, -14, fx=lambda a: bq(a, 'lp', 4000))
hit('b_assets/paper.wav', W('n13', 3), -18, 0.1, -14)
# 14 mail lands on "Note's"
hit('b_assets/ping.wav', W('d2r', 4), -13, 0.2, -20)
# 14 faint birds outside the board call
place(sfx, fade(loop(norm_peak(load(CS + 'birds_v2.wav'), -1), int((cut('n15') - cut('d2p')) * SR), 0.5), 0.5, 0.6), cut('d2p'), -34)
# 15 end card: soft chime in; SOUND LOGO on the last word — D4-F#4-A4 rising arpeggio then the chord, ~1.5 s, short ring-out
hit('chime.wav', cut('n15') + 0.1, -13, 0.0, -12)
for j, f0 in enumerate([D4, FS4, A4]): c = chime(f0, 1.2); place(sfx, c, LOGO + 0.11 * j, -15); place(send, c, LOGO + 0.11 * j, -24)
lg = chord([D4 / 2, D4, FS4, A4], 2.0, fn=chime); place(sfx, lg, LOGO + 0.40, -12); place(send, lg, LOGO + 0.40, -20)
place(sfx, chord([D4 / 2, 146.83 * 1.5], 2.0, vel=0.9), LOGO + 0.40, -17)   # felt-piano floor under the logo chord
send = conv(send, ir(0.9, 0.012, 7000, 250, seed=5)) * db(-6)
SFX_BUS = sfx + send

# ---------------- master ----------------
mix = VO_BUS + MUS_BUS + AMB_BUS * db(-4) + SFX_BUS * db(-2)
# freeze: true 1 s hole — kill everything except the VO tail and the boom that opens the black
hole = seg_gain([(0, 0), (FREEZE - 0.01, 0), (FREEZE + 0.05, -90), (BLACK - 0.02, -90), (BLACK, 0), (T, 0)])
mix = mix * hole[:, None]
fan = norm_peak(load(CS + 'fan_v1.wav'), -1); fan = fade(fan[: int((BLACK - FREEZE + 0.1) * SR)], 0.04, 0.12); place(mix, fan, FREEZE + 0.02, -34)   # the only sound in the hole: faint ceiling fan
mix = comp(mix, -14, 1.8, rel=0.25)
mix[-int(0.7 * SR):] *= np.linspace(1, 0, int(0.7 * SR))[:, None] ** 1.5
mix = mix / np.abs(mix).max() * 0.7
def wr(fn, a):
    w = wave.open(fn, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
wr('mix_c2_raw.wav', mix)
import os; os.makedirs('c2_assets', exist_ok=True)
for nm, s_ in [('vo', VO_BUS), ('music', MUS_BUS), ('amb', AMB_BUS), ('sfx', SFX_BUS)]: wr(f'c2_assets/stem_{nm}.wav', s_ / max(1, np.abs(s_).max()))
def meas(fn):
    q = subprocess.run(['ffmpeg', '-hide_banner', '-i', fn, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr.splitlines()
    return [float(l.split()[1]) for l in q if l.strip().startswith('I:')][-1], [float(l.split()[1]) for l in q if l.strip().startswith('Peak:')][-1]
I0, _ = meas('mix_c2_raw.wav'); TGT = -14.0; g = TGT - I0
for it in range(5):
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', 'mix_c2_raw.wav', '-af', f'volume={g:.2f}dB,aresample=192000,alimiter=limit={db(-1.8):.4f}:attack=3:release=60:level=false,aresample=48000', '-c:a', 'pcm_s24le', 'mix_c2.wav'], check=True)
    I, TP = meas('mix_c2.wav')
    if abs(I - TGT) < 0.2 and TP <= -1.0: break
    g += TGT - I
print(f'LAMP {LAMP:.2f} HARD {HARD:.2f} FLAG {FLAG:.2f} KS {[round(k*30) for k in KS]} HITS M{round(HIT_M*30)} G{round(HIT_G*30)} F{round(HIT_F*30)} thunk{round(THUNK*30)} snore{round(SN0*30)} LOGO {LOGO:.2f}'); print(f'VO wet (ER+room) vs dry: {20*np.log10(WET):.1f} dB ({100*WET**2:.2f}% energy)')
print(f'mix_c2.wav: {T:.2f} s, integrated {I:.1f} LUFS, true peak {TP:.1f} dBTP, gain {g:+.2f} dB; FREEZE {FREEZE:.2f} BLACK {BLACK:.2f}')
