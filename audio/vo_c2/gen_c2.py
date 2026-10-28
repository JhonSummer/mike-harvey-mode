# Gary Agents · Version C2 VO — NEW lines only (all Mike/Garry lines rewritten). Reused C lines are taken from ../vo_c/takes (unchanged text).
# Narrator Mariana OB0Jj6v9DGLLgz8dD57i · Priya = Ziina FaqthkZu1EWxXxUFbAfb. eleven_multilingual_v2 /with-timestamps. usage: python3 gen_c2.py [line ...] [seeds=11,23,37]
import os,sys,json,base64,time,urllib.request,urllib.error,re
K=os.environ['ELEVENLABS_API_KEY']; M='eleven_multilingual_v2'
V={'N':'OB0Jj6v9DGLLgz8dD57i','P':'FaqthkZu1EWxXxUFbAfb','R':'xMagNCpMgZ83QOEsHNre'}
NB={"stability":0.50,"similarity_boost":0.80,"style":0.20,"use_speaker_boost":True,"speed":1.0}
DB={"stability":0.45,"similarity_boost":0.80,"style":0.30,"use_speaker_boost":True,"speed":1.0}
# (name, who, text, overrides, previous_text, next_text)
L=[('n06','N',"Meet Gary Agents. Three associates, working for you.",{'speed':1.12},"That doesn't have to be you.","Mark reads the new rules the minute they drop."),
('n07','N',"Mark reads the new rules the minute they drop.",{'speed':1.15},"Meet Gary Agents. Three associates, working for you.","Gary digs through every court order that matters."),
('n08','N',"Gary digs through every court order that matters.",{'speed':1.15},"Mark reads the new rules the minute they drop.","Fiona redlines your fares and drafts the client note."),
('n11','N',"Brief them once. Then close your eyes.",{'speed':1.0,'stability':0.55},"All at once, in the background.","By morning it's done."),
('n12','N',"By morning it's done. Every line cited, and nothing goes out without your yes.",{'speed':1.1},"Brief them once. Then close your eyes.","Tap any line. See where it came from."),
('n13','N',"Tap any line. See where it came from.",{'speed':1.1},"By morning it's done. Every line cited, and nothing goes out without your yes.",None),
('d2p2','P',"...Fast. And cited.",{'speed':0.95},"Eleven fares on Delhi–Abu Dhabi. Note's in your inbox.",None),
('n15','N',"Gary Agents. <break time=\"0.3s\" /> Every answer cited. <break time=\"0.2s\" /> Nothing sent without your yes.",{'speed':1.02,'stability':0.55},"Tap any line. See where it came from.",None)]
SEEDS=[11,23,37]; only=[]
for a in sys.argv[1:]:
  if a.startswith('seeds='): SEEDS=[int(x) for x in a[6:].split(',')]
  else: only.append(a)
for n,who,t,o,pv,nx in L:
  if only and n not in only: continue
  vs=dict(NB if who=='N' else DB); vs.update(o)
  for s in SEEDS:
    f=f'takes/{n}_s{s}'
    if os.path.exists(f+'.mp3'): continue
    b={"text":t,"model_id":M,"voice_settings":vs,"seed":s}
    if pv: b["previous_text"]=pv
    if nx: b["next_text"]=nx
    for att in range(8):
      try:
        r=urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{V[who]}/with-timestamps?output_format=mp3_44100_128',data=json.dumps(b).encode(),headers={'xi-api-key':K,'Content-Type':'application/json'})
        d=json.loads(urllib.request.urlopen(r,timeout=300).read())
        open(f+'.mp3','wb').write(base64.b64decode(d['audio_base64'])); json.dump({'text':t,'voice':V[who],'settings':vs,'seed':s,'alignment':d.get('alignment')},open(f+'.json','w'))
        print(n,s,'ok',flush=True); break
      except urllib.error.HTTPError as e:
        m=e.read()[:300]; print(n,s,e.code,m,flush=True)
        if e.code==429: time.sleep(10); continue
        break
