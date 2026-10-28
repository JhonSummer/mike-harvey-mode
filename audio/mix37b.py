# Version B mix (37 s, 48 kHz stereo) — "Atmos-feel" stereo trailer mix.
# Stems: VO (ElevenLabs, Mariana OB0Jj6v9DGLLgz8dD57i female narrator since 2026-10-26 ~23:50; was Hank 6F5Zhi321D3Oq7v1oNT4; audio/vo_b) · music (ElevenLabs Music, b_assets/music1) · ambience (café day->night) · SFX (slam, boom, whooshes, ping...).
# VO chain: HPF 90 -> presence shelf -> de-ess -> RMS compressor -> faint early reflections + short 0.35 s room (near-dry since the 2026-10-26 dry patch; 2.2 s hall removed). Dry VO stays centre.
# Music/ambience: M/S widen, sidechain-ducked under VO (and under slam/ping). SFX: per-hit pan / L->R sweeps + room/hall sends for depth.
# Master: bus glue comp -> ffmpeg loudnorm 2-pass to -15 LUFS / -1.5 dBTP.  Run from audio/:  python3 mix37b.py
import numpy as np, wave, json, subprocess
from scipy import signal
SR = 48000; T = 37.0; N = int(T * SR)
rng = np.random.default_rng(7)
def load(f):
    w = wave.open(f); sw = w.getsampwidth(); ch = w.getnchannels(); raw = w.readframes(w.getnframes())
    if sw == 3:
        b = np.frombuffer(raw, np.uint8).reshape(-1, 3).astype(np.int32); a = b[:, 0] | (b[:, 1] << 8) | (b[:, 2] << 16); a = np.where(a >= 1 << 23, a - (1 << 24), a) / 2 ** 23
    else: a = np.frombuffer(raw, np.int16) / 32768
    a = a.reshape(-1, ch).astype(np.float64)
    assert w.getframerate() == SR, f
    return np.repeat(a, 2, 1) if ch == 1 else a
db = lambda x: 10 ** (x / 20)
def bq(a, kind, f, q=0.707, g=0.0):
    # RBJ biquads
    A = 10 ** (g / 40); w0 = 2 * np.pi * f / SR; al = np.sin(w0) / (2 * q); c = np.cos(w0)
    if kind == 'hp': b = [(1 + c) / 2, -(1 + c), (1 + c) / 2]; a_ = [1 + al, -2 * c, 1 - al]
    elif kind == 'lp': b = [(1 - c) / 2, 1 - c, (1 - c) / 2]; a_ = [1 + al, -2 * c, 1 - al]
    elif kind == 'hs':
        sq = 2 * np.sqrt(A) * al
        b = [A * ((A + 1) + (A - 1) * c + sq), -2 * A * ((A - 1) + (A + 1) * c), A * ((A + 1) + (A - 1) * c - sq)]
        a_ = [(A + 1) - (A - 1) * c + sq, 2 * ((A - 1) - (A + 1) * c), (A + 1) - (A - 1) * c - sq]
    elif kind == 'pk':
        b = [1 + al * A, -2 * c, 1 - al * A]; a_ = [1 + al / A, -2 * c, 1 - al / A]
    return signal.lfilter(b, a_, a, axis=0)
def env(x, att, rel):
    # one-pole peak follower on |x| (mono)
    x = np.abs(x); aa = np.exp(-1 / (att * SR)); ar = np.exp(-1 / (rel * SR))
    # fast approx: attack via lfilter on max-smoothing done in two passes
    up = signal.lfilter([1 - aa], [1, -aa], x); dn = signal.lfilter([1 - ar], [1, -ar], x)
    return np.maximum(up, dn)
def comp(x, thr, ratio, att=0.008, rel=0.15, makeup=0.0):
    m = np.sqrt(signal.lfilter([1 - np.exp(-1 / (0.01 * SR))], [1, -np.exp(-1 / (0.01 * SR))], (x ** 2).mean(1)) + 1e-12)
    lv = 20 * np.log10(m + 1e-9); gr = np.minimum(0, (thr - lv) * (1 - 1 / ratio))
    g = 10 ** (gr / 20); g = signal.lfilter([1 - np.exp(-1 / (rel * SR))], [1, -np.exp(-1 / (rel * SR))], g)
    return x * g[:, None] * db(makeup)
def ir(rt, pre, lp, hp, n_s=None, seed=1):
    n = int((n_s or rt * 1.3) * SR); t = np.arange(n) / SR; r_ = np.random.default_rng(seed)
    e = np.exp(-6.9 * t / rt)
    h = r_.standard_normal((n, 2)) * e[:, None]
    h[: int(0.005 * SR)] *= np.linspace(0, 1, int(0.005 * SR))[:, None]
    h = bq(bq(h, 'lp', lp), 'hp', hp)
    h = np.concatenate([np.zeros((int(pre * SR), 2)), h]); return h / np.sqrt((h ** 2).sum() / 2)
def conv(x, h):  # mono-or-stereo x -> stereo with stereo IR
    xm = x.mean(1) if x.ndim == 2 else x
    return np.stack([signal.fftconvolve(xm, h[:, 0]), signal.fftconvolve(xm, h[:, 1])], 1)[: len(xm)]
def ms_widen(x, k):
    m = (x[:, 0] + x[:, 1]) / 2; s = (x[:, 0] - x[:, 1]) / 2 * k; return np.stack([m + s, m - s], 1)
def pan(x, p):  # p -1..1 constant power, p can be array
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
    X = int(xf * SR); out_ = a.copy()
    while len(out_) < n:
        w = np.linspace(0, 1, X)[:, None]; out_ = np.concatenate([out_[:-X], out_[-X:] * (1 - w) + a[:X] * w, a[X:]])
    return out_[:n]
def seg_gain(points):  # [(t, dB)] linear interp -> gain curve
    ts = np.array([p[0] for p in points]) * SR; gs = np.array([p[1] for p in points])
    return db(np.interp(np.arange(N), ts, gs))

# ---------------- VO ----------------
CUES = json.load(open('vo_b/cues.json'))
GAIN = {'v1_open': 0, 'v2_close': 0, 'v3_doesnt': 1.5, 'v4_mid': 0, 'v5_intro': 1.5, 'v6_end': 0.5}  # v5 +1.5 dB (dry patch)
vo = np.zeros((N, 2))
for k, t in CUES.items():
    a = load(f'vo_b/{k}.wav')[:, :1].repeat(2, 1)
    a = a / (np.sqrt(np.mean(a ** 2)) + 1e-9) * db(-20)  # RMS-match lines
    place(vo, fade(a, 0.004, 0.03), t, GAIN[k])
vo = bq(vo, 'hp', 90, 0.7); vo = bq(vo, 'pk', 250, 1.0, -2.0); vo = bq(vo, 'hs', 4200, 0.7, 3.0); vo = bq(vo, 'hs', 11000, 0.7, 1.5)
# de-ess: dynamic cut of 5.5-9 kHz band when it jumps above the line's body
sb, sa = signal.butter(2, [5500, 9000], 'band', fs=SR); ess = signal.lfilter(sb, sa, vo[:, 0])
e_s = env(ess, 0.002, 0.06); e_b = env(vo[:, 0], 0.005, 0.12)
red = np.clip((e_s / (e_b * 0.35 + 1e-6)), 1, 4); gs = 1 / red  # up to -12 dB on the band
# female bake: de-esser bypassed on "Mike doesn't." so the final t burst is not ducked (Studio killed Hank s11 for a swallowed t)
_v3 = int(CUES['v3_doesnt'] * SR); gs[_v3:_v3 + int(1.6 * SR)] = 1.0
vo = vo - (ess * (1 - gs))[:, None]
vo = comp(vo, -24, 3.0, rel=0.12, makeup=3)
vo_env = env(vo[:, 0], 0.03, 0.35)  # sidechain key
# EAR PATCH 3 (2026-10-27, Studio "v4 clauses run together"): inside the v4 span the duck key HOLDS 0.8 s, so music + café ambience stay ducked
# through the clause pauses instead of swelling back in and filling them (0:29 mix: the bed rose 4-8 dB in each pause).
from scipy.ndimage import maximum_filter1d
_a4, _b4 = int((CUES['v4_mid'] - 0.1) * SR), int((CUES['v4_mid'] + 13.1) * SR)
vo_env[_a4:_b4] = maximum_filter1d(vo_env[_a4:_b4], int(0.8 * SR), origin=-(int(0.8 * SR) // 2) + 1)
# space (2026-10-26 ~23:20 dry patch, YP "echo is too high" + Studio): near-dry VO.
# Before: Haas ERs at -17/-18/-21/-22 dB + 2.2 s stereo hall send at -15 dB.  After: ERs -12 dB lower (-29..-34 dB, keeps a hint of
# centre width), the 2.2 s hall is gone, replaced by a short 0.35 s room at -30 dB.
def vo_space(vo, er_db, hall_rt, hall_db):
    er = np.zeros((N, 2))
    for d, g, side in [(0.011, -17, 0), (0.017, -18, 1), (0.029, -21, 0), (0.037, -22, 1)]:
        i = int(d * SR); er[i:, side] += vo[:-i, 0] * db(g + er_db)
    hall = conv(bq(vo, 'hp', 220), ir(hall_rt, 0.032 if hall_rt > 1 else 0.008, 6500, 220, seed=3)) * db(hall_db)
    return er, hall
er, hall = vo_space(vo, -12, 0.35, -30)
er0, hall0 = vo_space(vo, 0, 2.2, -15)  # previous settings, metered only
_rms = lambda x: np.sqrt(np.mean(x ** 2)) + 1e-12
_act = np.abs(vo[:, 0]) > 0  # whole VO span
WET_BEFORE = _rms(er0 + hall0) / _rms(vo); WET_AFTER = _rms(er + hall) / _rms(vo)
HALL_BEFORE = _rms(hall0) / _rms(vo); HALL_AFTER = _rms(hall) / _rms(vo)
VO_BUS = vo + er + hall

# ---------------- music ----------------
mus = load('b_assets/music1.wav')[:N]
mus = np.pad(mus, ((0, max(0, N - len(mus))), (0, 0)))
mus = ms_widen(mus, 1.6)
# lid-to-reveal hole: hard stop on the slam (f122 = 4.067 s), silence through the black, back in on "Mike"
mus *= seg_gain([(0, 0), (4.03, 0), (4.10, -80), (6.05, -80), (6.10, -8), (7.6, 0), (37, 0)])[:, None]
duck_vo = np.clip(vo_env / (vo_env.max() * 0.25), 0, 1)  # 0..1
duck_vo = signal.lfilter([1 - np.exp(-1 / (0.12 * SR))], [1, -np.exp(-1 / (0.12 * SR))], duck_vo)
hits = np.zeros(N)
for t, d in [(4.067, 0.7), (5.0, 1.2), (29.6, 0.9)]:
    i = int(t * SR); n = int(d * SR); hits[i:i + n] = np.maximum(hits[i:i + n], np.linspace(1, 0, n) ** 0.6)
duck = db(-9 * duck_vo - 7 * hits)
MUS_BUS = mus * duck[:, None] * db(-6)

# ---------------- ambience ----------------
amb = np.zeros((N, 2))
room = loop(load('b_assets/el/room_tone.wav'), int(4.2 * SR)); place(amb, fade(room, 0.3, 0.05), 0.0, -10)
typ = load('b_assets/el/typing.wav')[: int(3.3 * SR)]; place(amb, fade(pan(typ, -0.1), 0.05, 0.2), 0.15, -12)
day = loop(load('b_assets/cafe_day.wav'), int(19 * SR), 1.5); place(amb, fade(ms_widen(day, 2.0), 0.4, 1.5), 7.85, -8)
night = loop(load('b_assets/cafe_night.wav'), int(8.6 * SR), 1.5); night = norm_peak(night, -6); place(amb, fade(ms_widen(night, 2.0), 1.2, 1.2), 25.6, -8)
# proof beats sit "inside Mike" (ambience pulled back + darker), café beats open up
cafe_mask = seg_gain([(0, 0), (10.9, 0), (11.1, -9), (12.9, -9), (13.1, 0), (14.9, 0), (15.1, -9), (18.9, -9), (19.1, 0), (21.9, 0), (22.1, -9), (25.9, -9), (26.1, 0), (33.0, 0), (34.5, -14), (37, -30)])
amb = amb * cafe_mask[:, None] * db(-5 * duck_vo - 6 * hits)[:, None]
AMB_BUS = amb

# ---------------- SFX ----------------
sfx = np.zeros((N, 2)); send = np.zeros((N, 2))
def hit(f, t, g, p=0.0, wet=-12, fx=None):
    a = load(f); a = norm_peak(a, -1)
    if fx: a = fx(a)
    a = pan(a, p) if np.ndim(p) or p != 0 else a
    place(sfx, a, t, g); place(send, a, t, g + wet)
SLAM = 80 + 42
# lid slam: EL slam + EL lid + synth thump, sub-weighted, centre -> slight left, short room tail
hit('b_assets/slam.wav', SLAM / 30 - 0.01, 4, 0.0, -18)  # dry-centre (was pan -0.08, send -6)
hit('b_assets/el/lid_slam.wav', SLAM / 30 - 0.02, 1, 0.0, -20)  # dry-centre (was pan 0.05, send -8)
hit('slam.wav', SLAM / 30, 0, 0.0, -22, fx=lambda a: bq(bq(a, 'lp', 900), 'pk', 70, 0.8, 6))
hit('b_assets/boom.wav', 5.0, -3, 0.0, -10)  # cut to black
hit('b_assets/el/chord_hit.wav', 6.12, -12, 0.0, -8)  # "Mike doesn't."
def sweep(a, p0, p1):
    pp = np.linspace(p0, p1, len(a)); return pan(a, pp)
for t, d in [(7.70, 1), (12.70, -1), (18.70, 1), (25.70, -1)]:  # into café plates: wide L<->R air
    hit('b_assets/whoosh.wav', t, -6, 0.0, -9, fx=lambda a, d=d: sweep(a, -0.85 * d, 0.85 * d))
for i, t in enumerate([10.88, 14.88, 16.88, 21.88, 23.88, 28.9, 32.85]):  # into proof beats: tight whip
    d = 1 if i % 2 else -1
    hit('b_assets/el/whoosh_whip.wav', t, -11, 0.0, -12, fx=lambda a, d=d: sweep(a, -0.6 * d, 0.6 * d))
hit('b_assets/paper.wav', 11.26, -10, 0.1, -14)           # Gazette lands
hit('b_assets/el/check_1.wav', 11.93, -14, 0.15, -14)      # r.7 lit
hit('b_assets/el/check_2.wav', 16.20, -13, 0.25, -14)      # cl. 7.3 linked
hit('b_assets/el/chord_hit.wav', 17.47, -17, 0.0, -10)     # the catch
hit('b_assets/el/check_1.wav', 17.48, -12, 0.0, -14)
typ2 = load('b_assets/el/typing.wav')[: int(1.6 * SR)]; place(sfx, fade(pan(typ2, 0.1), 0.05, 0.25), 22.2, -15)
hit('b_assets/el/tap.wav', 24.07, -12, 0.0, -14)           # Held for Meera
hit('b_assets/el/check_2.wav', 24.36, -14, 0.0, -12)       # Nothing goes out
hit('b_assets/riser.wav', 31.05, -14, 0.0, -8)
# phone ping: EL glass ping + legacy ping, dry and centred (dry patch; was slightly right with ping-pong echoes + hall)
PING = 888 / 30
hit('b_assets/ping.wav', PING, -1, 0.0, -20)  # dry-centre (was pan 0.18, send -8)
hit('ping.wav', PING + 0.01, -10, 0.0, -22)
hit('b_assets/el/buzz.wav', PING, -16, 0.2, -18, fx=lambda a: bq(a, 'lp', 1500))
pp = load('b_assets/ping.wav'); pp = norm_peak(pp, -1)
# ping-pong echoes (were -17/-20 dB at +0.19/+0.37 s) removed in the dry patch
hit('b_assets/el/check_2.wav', 32.0, -16, 0.35, -14)       # "Later" press
hit('chime.wav', 33.05, -8, 0.0, -8)                       # end card
SEND_DRY_DB = -6  # dry patch: every SFX room send -6 dB and 1.6 s -> 0.9 s
send = conv(send, ir(0.9, 0.012, 7000, 250, seed=5)) * db(SEND_DRY_DB)
SFX_BUS = sfx + send

# ---------------- master ----------------
mix = VO_BUS * db(0) + MUS_BUS + AMB_BUS * db(-4) + SFX_BUS * db(-2)
mix = comp(mix, -14, 1.8, rel=0.25)
mix[-int(0.6 * SR):] *= np.linspace(1, 0, int(0.6 * SR))[:, None] ** 1.5
mix = mix / np.abs(mix).max() * 0.7
def wr(fn, a):
    w = wave.open(fn, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
wr('mix37b_raw.wav', mix)
for nm, s_ in [('vo', VO_BUS), ('music', MUS_BUS), ('amb', AMB_BUS), ('sfx', SFX_BUS)]:
    wr(f'b_assets/stem_{nm}.wav', s_ / max(1, np.abs(s_).max()))
# loudness: linear gain to -15 LUFS integrated + lookahead limiter (ceiling -2 dBFS sample -> true peak <= -1.5 dBTP), verified with ebur128
def meas(fn):
    q = subprocess.run(['ffmpeg', '-hide_banner', '-i', fn, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr.splitlines()
    I = [float(l.split()[1]) for l in q if l.strip().startswith('I:')][-1]; TP = [float(l.split()[1]) for l in q if l.strip().startswith('Peak:')][-1]; return I, TP
I0, _ = meas('mix37b_raw.wav'); g = -15.0 - I0
for it in range(4):
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', 'mix37b_raw.wav', '-af', f'volume={g:.2f}dB,aresample=192000,alimiter=limit={db(-2.2):.4f}:attack=3:release=60:level=false,aresample=48000', '-c:a', 'pcm_s24le', 'mix37b.wav'], check=True)
    I, TP = meas('mix37b.wav')
    if abs(I + 15) < 0.2 and TP <= -1.0: break
    g += -15 - I
pct = lambda x: 100 * x ** 2
print(f'VO wet (ER+hall) vs dry: before {20*np.log10(WET_BEFORE):.1f} dB ({pct(WET_BEFORE):.1f}% energy) -> after {20*np.log10(WET_AFTER):.1f} dB ({pct(WET_AFTER):.1f}%); hall alone {20*np.log10(HALL_BEFORE):.1f} dB ({pct(HALL_BEFORE):.1f}%) -> {20*np.log10(HALL_AFTER):.1f} dB ({pct(HALL_AFTER):.2f}%)')
print(f'mix37b.wav: integrated {I:.1f} LUFS, true peak {TP:.1f} dBTP, gain {g:+.2f} dB')
