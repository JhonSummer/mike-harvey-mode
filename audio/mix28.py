# Overnight re-roll bed (28 s): pad (looped w/ crossfade) + slam on lid shut + whooshes on camera travels + ticks on highlights + ping on notification + chime on end card.
import numpy as np, wave
SR=48000; N=28*SR
def load(f):
    w=wave.open(f); a=np.frombuffer(w.readframes(w.getnframes()),np.int16).reshape(-1,2).astype(np.float32)/32768; return a
out=np.zeros((N,2),np.float32)
pad=load('pad.wav'); X=2*SR
fade=np.linspace(0,1,X)[:,None]
loop=np.concatenate([pad[:-X], pad[-X:]*(1-fade)+pad[:X]*fade, pad[X:]])
out+=loop[:N]*3.2
out[-3*SR:]*=np.linspace(1,0.0,3*SR)[:,None]**0.7
def put(f,t,g=1.0):
    a=load(f); i=int(t*SR); n=min(len(a),N-i); out[i:i+n]+=a[:n]*g
put('slam.wav',2.67,1.0)  # lid contact f80 (open patch)
for t in [4.75,8.25,11.75,16.45,21.6]: put('whoosh.wav',t,0.55)
for t in [7.15,9.95,10.7,14.7,18.2,18.4,18.6,20.0]: put('tick.wav',t,0.7)
put('ping.wav',17.55,0.9)
put('chime.wav',22.4,0.8)
out=np.clip(out,-1,1)
w=wave.open('mix28raw.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
