# C2 sleep shot SFX (ElevenLabs sound-generation, same method as b_assets/elx.py). Sheet rustle/sigh on Rohan's jumps, lamp click, soft UI glide, morning yawn-stretch.
import sys; sys.path.insert(0,'../b_assets')
from elx import post, wav
J=[('rustle_1','close-mic bed sheets and duvet rustle, a person rolling over in bed, soft, quiet bedroom, no voice',1.2),
   ('rustle_2','soft cotton blanket rustle as someone turns over in bed, gentle, intimate, no voice',1.2),
   ('rustle_3','duvet being kicked off, quick blanket rustle and soft mattress creak, quiet bedroom, no voice',1.3),
   ('sigh_1','a man sighs softly in his sleep, gentle contented exhale through the nose, very quiet, intimate close mic',1.2),
   ('snore_1','one small soft snort-snore from a sleeping man, funny but gentle, close mic, quiet',1.0),
   ('mumble_1','a sleepy man murmurs a contented hum while hugging a pillow, very soft, close mic',1.2),
   ('stretch_1','a man yawns and stretches waking up in the morning, big satisfied stretch groan, close mic',1.5),
   ('lamp_click','bedside lamp switch click off, crisp small plastic click, close mic, dry',0.5),
   ('glide_1','very soft subtle UI swoosh, airy digital glide, gentle, short, clean',0.5)]
for n,t,d in J:
    for s in (1,2):
        out=f'{n}_v{s}.mp3'; c=post('/v1/sound-generation',{'text':t,'duration_seconds':d,'prompt_influence':0.55},out); print(n,s,c)
        if c[0]==200: wav(out,f'{n}_v{s}.wav')
