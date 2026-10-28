# Mike Version C VO (2026-10-27 ICT). Narrator: Mariana OB0Jj6v9DGLLgz8dD57i (locked). Dialogue: Priya = Ziina FaqthkZu1EWxXxUFbAfb (Indian F), Rohan = Aaditya Kapur xMagNCpMgZ83QOEsHNre (Indian M).
# eleven_multilingual_v2 via /with-timestamps -> takes/<line>_s<seed>.{mp3,json}. usage: python3 gen_c.py [line ...] [seeds=11,23]
import os,sys,json,base64,time,urllib.request,urllib.error
K=os.environ['ELEVENLABS_API_KEY']; M='eleven_multilingual_v2'
V={'N':'OB0Jj6v9DGLLgz8dD57i','P':'FaqthkZu1EWxXxUFbAfb','R':'xMagNCpMgZ83QOEsHNre'}
NB={"stability":0.50,"similarity_boost":0.80,"style":0.20,"use_speaker_boost":True,"speed":1.0}
DB={"stability":0.45,"similarity_boost":0.80,"style":0.30,"use_speaker_boost":True,"speed":1.0}
L=[('n01','N',"Eleven forty-one P.M. New fare rules just dropped. Client wants answers by nine.",{'speed':1.18,'stability':0.45}),
('n02','N',"So you open your AI assistant. Upload... limit reached.",{'speed':1.15}),
('n03','N',"New chat. Re-upload. Another chat. Expired.",{'speed':1.15}),
('d1p','P',"Yes or no: does it hit Delhi–Abu Dhabi?",{'speed':1.15}),
('d1r','R',"...Can I come back to you?",{'speed':0.95,'stability':0.40}),
('d1p2','P',"It's for the board. At nine.",{'speed':1.08}),
('n05','N',"That doesn't have to be you.",{'speed':0.92,'stability':0.60}),
('n06','N',"Mike doesn't work alone. He brings associates.",{'speed':1.15}),
('n07','N',"Mike reads the new rules the minute they drop.",{'speed':1.15}),
('n08','N',"Garry digs through every court order that matters.",{'speed':1.15}),
('n09','N',"Fiona redlines your fares and drafts the client note.",{'speed':1.15}),
('n10','N',"All at once, in the background. Brief them once, then go to sleep.",{'speed':1.12}),
('n11','N',"By morning it's done, and nothing goes out without your yes.",{'speed':1.12}),
('d2p','P',"So, does it hit us?",{'speed':1.1}),
('d2r','R',"Eleven fares on Delhi–Abu Dhabi. Note's in your inbox.",{'speed':1.15,'stability':0.55}),
('d2p2','P',"...That was fast.",{'speed':0.95}),
('n13','N',"Mike and associates. <break time=\"0.25s\" /> Let them do their thing. <break time=\"0.2s\" /> You review. Then you decide.",{'speed':1.05,'stability':0.55})]
SEEDS=[11,23]; only=[]
for a in sys.argv[1:]:
  if a.startswith('seeds='): SEEDS=[int(x) for x in a[6:].split(',')]
  else: only.append(a)
os.makedirs('takes',exist_ok=True)
import re
plain=lambda t: re.sub(r'\s*<[^>]+>\s*',' ',t)
for i,(n,who,t,o) in enumerate(L):
  if only and n not in only: continue
  vs=dict(NB if who=='N' else DB); vs.update(o)
  for s in SEEDS:
    f=f'takes/{n}_s{s}'
    if os.path.exists(f+'.mp3'): continue
    b={"text":t,"model_id":M,"voice_settings":vs,"seed":s}
    # context only from same speaker neighbours keeps prosody coherent
    if i and L[i-1][1]==who: b["previous_text"]=plain(L[i-1][2])
    if i<len(L)-1 and L[i+1][1]==who: b["next_text"]=plain(L[i+1][2])
    for att in range(8):
      try:
        r=urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{V[who]}/with-timestamps?output_format=mp3_44100_128',data=json.dumps(b).encode(),headers={'xi-api-key':K,'Content-Type':'application/json'})
        d=json.loads(urllib.request.urlopen(r,timeout=300).read())
        open(f+'.mp3','wb').write(base64.b64decode(d['audio_base64'])); json.dump({'text':t,'voice':V[who],'settings':vs,'seed':s,'alignment':d.get('alignment'),'normalized_alignment':d.get('normalized_alignment')},open(f+'.json','w'))
        print(n,s,'ok',flush=True); break
      except urllib.error.HTTPError as e:
        m=e.read()[:300]; print(n,s,e.code,m,flush=True)
        if e.code==429: time.sleep(10); continue
        break
