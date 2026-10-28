# Robust prompt-free wording check: max word-similarity to the script over several decode configs (hallucinations can't invent the right words).
import sys,subprocess,numpy as np,json,re,difflib,glob
from faster_whisper import WhisperModel
m=WhisperModel('medium.en',device='cpu',compute_type='float32')
def ld(f): return np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-ar','16000','-ac','1','-f','f32le','-'],capture_output=True).stdout,np.float32)
norm=lambda s: re.sub(r'[^a-z0-9 ]','',s.lower().replace('-',' ').replace('–',' ')).split()
for f in sys.argv[1:]:
    ref=norm(re.sub(r'<[^>]+>','',json.load(open(f[:-4]+'.json'))['text']))
    a=ld(f); best=(0,'')
    for pad in [0.3,1.0,0.0,2.0]:
        x=np.concatenate([np.zeros(int(16000*pad),np.float32),a,np.zeros(16000,np.float32)])
        segs,_=m.transcribe(x,temperature=0.0,beam_size=5,condition_on_previous_text=False,no_speech_threshold=None,log_prob_threshold=None,language='en')
        t=' '.join(s.text.strip() for s in segs); sc=difflib.SequenceMatcher(None,ref,norm(t)).ratio()
        if sc>best[0]: best=(sc,t)
        if sc>0.95: break
    print(f"{f:26s} {best[0]:.2f} | {best[1]}",flush=True)
