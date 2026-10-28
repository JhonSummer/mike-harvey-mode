# Version C music bed, ElevenLabs Music (music_v1), 46 s, sections aligned to the storyboard.
import os,json,urllib.request,urllib.error,subprocess
K=os.environ['ELEVENLABS_API_KEY']
G=["84 BPM","D minor resolving to F major","cinematic premium tech trailer","felt piano motif","warm analog synth pads","wide stereo","instrumental","one consistent motif throughout"]
N=["vocals","EDM","heavy drums","guitar","choir","dubstep"]
S=[("Midnight",["tense late night","ticking clock pulse","sparse felt piano","low synth drone","anxious"],[],12000),
   ("Call",["almost silent","single sustained low drone","tension","very sparse"],["drums","piano"],6000),
   ("Black",["near silence, a soft low sub swell"],["drums","melody"],3000),
   ("Associates",["hopeful build","motif returns confidently","plucked strings pulse","light percussion","forward motion"],[],11000),
   ("Night work",["calm, nocturnal, steady soft pulse","motif on piano","reassuring"],["heavy drums"],4000),
   ("Morning",["warm bright morning","fuller chords","confident","strings swell"],[],9000),
   ("Resolve",["warm resolved major chord","motif returns","elegant ending with soft tail"],[],6000)]
plan=dict(positive_global_styles=G,negative_global_styles=N,sections=[dict(section_name=a,positive_local_styles=b,negative_local_styles=c,duration_ms=d,lines=[]) for a,b,c,d in S])
for take in ['1','2']:
    if os.path.exists(f'music{take}.wav'): continue
    r=urllib.request.Request("https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128",data=json.dumps(dict(composition_plan=plan,model_id="music_v1")).encode(),headers={"xi-api-key":K,"Content-Type":"application/json"})
    try:
        open(f"music{take}.mp3","wb").write(urllib.request.urlopen(r,timeout=600).read())
        subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'music{take}.mp3','-ar','48000','-ac','2','-c:a','pcm_s24le',f'music{take}.wav'],check=True); print("music ok",take,flush=True)
    except urllib.error.HTTPError as e: print("music HTTP",e.code,e.read()[:400],flush=True)
