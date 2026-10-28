# Prompt-free Whisper (medium.en) pass on the C2 mix: full transcript with word times + "Mike" scan.
import sys,subprocess,numpy as np,re
from faster_whisper import WhisperModel
f=sys.argv[1]
a=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-ar','16000','-ac','1','-f','f32le','-'],capture_output=True).stdout,np.float32)
m=WhisperModel('medium.en',device='cpu',compute_type='float32')
segs,_=m.transcribe(a,temperature=0.0,beam_size=5,condition_on_previous_text=False,word_timestamps=True,language='en',vad_filter=False)
words=[]
for s in segs:
    print(f"{s.start:6.2f}-{s.end:6.2f} {s.text.strip()}",flush=True); words+=s.words
hits=[w for w in words if re.search(r'\b(mike|mic|mikes|michael)\b',w.word.lower())]
print('MIKE-HITS:',len(hits),[(w.word,round(w.start,2)) for w in hits])
print('ASSOCIATES-HITS:',[(w.word,round(w.start,2)) for w in words if 'associat' in w.word.lower()])
