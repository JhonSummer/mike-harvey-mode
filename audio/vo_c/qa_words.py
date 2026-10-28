import sys,subprocess,numpy as np
from faster_whisper import WhisperModel
m=WhisperModel('medium.en',device='cpu',compute_type='int8')
def ld(f): return np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-ar','16000','-ac','1','-f','f32le','-'],capture_output=True).stdout,np.float32)
for f in sys.argv[1:]:
    a=ld(f); a=np.concatenate([np.zeros(16000,np.float32),a,np.zeros(16000,np.float32)]); segs,_=m.transcribe(a,temperature=0.0,beam_size=5,condition_on_previous_text=False,no_speech_threshold=None,log_prob_threshold=None,vad_filter=False)
    print(f, '|', ' '.join(s.text.strip() for s in segs),flush=True)
