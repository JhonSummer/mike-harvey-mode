# Mike Version C mix (48 kHz stereo). Near-dry VO (Version B dry patch: ERs -29..-34 dB + 0.35 s room at -30 dB, no hall).
# Stems: VO (vo_c: Mariana narrator + Priya/Rohan call dialogue) · music (ElevenLabs Music, c_assets/music2) · night room tone · SFX (b_assets).
# Timeline from vo_c/cues.json (same source as src/voC.ts -> MikeC.tsx beat map). Master: glue comp -> linear gain to -15 LUFS + limiter (<= -1.5 dBTP).
import numpy as np, wave, json, subprocess
from scipy import signal
SR = 48000
CU = json.load(open('vo_c/cues.json')); LN = CU['lines']; T = CU['total']; N = int(T * SR)
fr = lambda s: round(s * 30) / 30
cut = lambda k: fr(LN[k]['start'] - 0.15)
FREEZE = fr(LN['d1p2']['end'] + 0.06); BLACK = fr(LN['d1p2']['end'] + 1.0)
W = lambda k, i: LN[k]['words'][i][1]
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

# ---------------- VO ----------------
GAIN = {k: (0.0 if v['who'] == 'N' else -0.5) for k, v in LN.items()}
GAIN.update({'n05': 1.0, 'n13': 0.5, 'd1r': -1.0})
vo = np.zeros((N, 2))
for k, v in LN.items():
    a = load(f'vo_c/{k}.wav')[:, :1].repeat(2, 1); a = a / (np.sqrt(np.mean(a ** 2)) + 1e-9) * db(-20)
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

# ---------------- music (c_assets/music2: 51 s, sections roughly follow the board) ----------------
m = load('c_assets/music2.wav'); m = ms_widen(m, 1.5)
mus = np.zeros((N, 2))
# hook 0 -> call: source 0..FREEZE as-is (tension build), call section pulled down under dialogue
place(mus, m[: int(FREEZE * SR)], 0.0)
# associates onward: source from 14.0 s starts at BLACK + 2.2 (on "Mike doesn't work alone"), so the source fade (46 s) lands on the end-card tail
OFF = cut('n06') - 0.25; src0 = 14.0
seg = m[int(src0 * SR):]; place(mus, fade(seg, 0.6, 0.01), OFF)
mus *= seg_gain([(0, 0), (cut('d1p') - 0.3, 0), (cut('d1p') + 0.2, -9), (FREEZE - 0.02, -9), (FREEZE + 0.03, -90), (OFF, -90), (OFF + 0.01, -6), (OFF + 1.2, 0),
                 (cut('d2p') - 0.2, 0), (cut('d2p') + 0.3, -4), (cut('n13') - 0.2, -4), (cut('n13') + 0.4, 0), (T, 0)])[:, None]
duck_vo = np.clip(vo_env / (vo_env.max() * 0.25), 0, 1); k = np.exp(-1 / (0.12 * SR)); duck_vo = signal.lfilter([1 - k], [1, -k], duck_vo)
hits = np.zeros(N)
for t, d in [(BLACK, 1.0), (cut('n06') + 0.1, 0.8)]:
    i = int(t * SR); n = int(d * SR); hits[i:i + n] = np.maximum(hits[i:i + n], np.linspace(1, 0, n) ** 0.6)
MUS_BUS = mus * db(-9 * duck_vo - 6 * hits)[:, None] * db(-2)  # music2 sits ~4 dB under music1, so -2 here ~ B bed level

# ---------------- ambience: late-night room tone + typing (01-04), stops dead on the freeze ----------------
amb = np.zeros((N, 2))
rt = loop(load('b_assets/el/room_tone.wav'), int(FREEZE * SR)); place(amb, fade(rt, 0.4, 0.02), 0.0, -8)
typ = load('b_assets/el/typing.wav'); place(amb, fade(pan(typ[: int(2.4 * SR)], -0.15), 0.1, 0.3), cut('n02') + 0.2, -14)
place(amb, fade(pan(typ[: int(1.8 * SR)], 0.15), 0.1, 0.3), cut('n03') + 0.4, -16)
rt2 = loop(load('b_assets/el/room_tone.wav'), int((cut('n11') - cut('n10')) * SR)); place(amb, fade(rt2, 0.6, 0.6), cut('n10'), -14)
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
# 06 team: chord hit on Mike, whips on associates
hit('b_assets/el/chord_hit.wav', W('n06', 0) - 0.05, -13, 0.0, -10)
hit('b_assets/el/whoosh_whip.wav', W('n06', 6) - 0.15, -15, 0.0, -12, fx=lambda a: sweep(a, -0.6, 0.0))
hit('b_assets/el/whoosh_whip.wav', W('n06', 6) + 0.02, -15, 0.0, -12, fx=lambda a: sweep(a, 0.6, 0.0))
# beat whooshes 07-12
for i, kk in enumerate(['n07', 'n08', 'n09', 'n10', 'n11', 'd2p', 'n13']):
    hit('b_assets/el/whoosh_whip.wav', cut(kk) - 0.22, -15, 0.0, -12, fx=lambda a, d=(1 if i % 2 else -1): sweep(a, -0.6 * d, 0.6 * d))
hit('b_assets/paper.wav', cut('n07') + 0.25, -11, 0.1, -14); hit('b_assets/el/check_1.wav', cut('n07') + 28 / 30, -14, 0.15, -14)
for i in [1, 3, 5, 8]: hit('b_assets/el/check_1.wav', cut('n08') + (22 + i * 3) / 30, -19, 0.1, -14)
place(sfx, fade(pan(typ[: int(1.5 * SR)], 0.1), 0.05, 0.25), cut('n09') + 24 / 30, -15)
hit('b_assets/el/check_2.wav', cut('n09') + 62 / 30, -15, 0.0, -12)   # Held for Rohan
# 11 morning: notification + tap on "yes."
hit('b_assets/ping.wav', cut('n11') + 8 / 30, -7, 0.0, -20)
yes = LN['n11']['words'][-1][1]; hit('b_assets/el/tap.wav', yes, -11, 0.0, -14); hit('b_assets/el/check_2.wav', yes + 0.2, -14, 0.0, -14)
# 12 mail lands on "Note's"
hit('b_assets/ping.wav', W('d2r', 4), -13, 0.2, -20)
# 13 end card
hit('chime.wav', cut('n13') + 0.1, -9, 0.0, -10)
send = conv(send, ir(0.9, 0.012, 7000, 250, seed=5)) * db(-6)
SFX_BUS = sfx + send

# ---------------- master ----------------
mix = VO_BUS + MUS_BUS + AMB_BUS * db(-4) + SFX_BUS * db(-2)
# freeze: true 1 s hole — kill everything except the VO tail and the boom that opens the black
hole = seg_gain([(0, 0), (FREEZE - 0.01, 0), (FREEZE + 0.05, -90), (BLACK - 0.02, -90), (BLACK, 0), (T, 0)])
mix = mix * hole[:, None]
mix = comp(mix, -14, 1.8, rel=0.25)
mix[-int(0.7 * SR):] *= np.linspace(1, 0, int(0.7 * SR))[:, None] ** 1.5
mix = mix / np.abs(mix).max() * 0.7
def wr(fn, a):
    w = wave.open(fn, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
wr('mix_c_raw.wav', mix)
import os; os.makedirs('c_assets', exist_ok=True)
for nm, s_ in [('vo', VO_BUS), ('music', MUS_BUS), ('amb', AMB_BUS), ('sfx', SFX_BUS)]: wr(f'c_assets/stem_{nm}.wav', s_ / max(1, np.abs(s_).max()))
def meas(fn):
    q = subprocess.run(['ffmpeg', '-hide_banner', '-i', fn, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr.splitlines()
    return [float(l.split()[1]) for l in q if l.strip().startswith('I:')][-1], [float(l.split()[1]) for l in q if l.strip().startswith('Peak:')][-1]
I0, _ = meas('mix_c_raw.wav'); g = -15.0 - I0
for it in range(5):
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', 'mix_c_raw.wav', '-af', f'volume={g:.2f}dB,aresample=192000,alimiter=limit={db(-2.2):.4f}:attack=3:release=60:level=false,aresample=48000', '-c:a', 'pcm_s24le', 'mix_c.wav'], check=True)
    I, TP = meas('mix_c.wav')
    if abs(I + 15) < 0.2 and TP <= -1.0: break
    g += -15 - I
print(f'VO wet (ER+room) vs dry: {20*np.log10(WET):.1f} dB ({100*WET**2:.2f}% energy)')
print(f'mix_c.wav: {T:.2f} s, integrated {I:.1f} LUFS, true peak {TP:.1f} dBTP, gain {g:+.2f} dB; FREEZE {FREEZE:.2f} BLACK {BLACK:.2f}')
