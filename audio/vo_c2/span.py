import sys,subprocess,numpy as np,glob
def span(f,thr=-40):
    a=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-ar','16000','-ac','1','-f','f32le','-'],capture_output=True).stdout,np.float32)
    h=160;n=len(a)//h;e=20*np.log10(np.sqrt((a[:n*h].reshape(n,h)**2).mean(1))+1e-9);s=np.where(e>e.max()+thr)[0]
    return s[0]/100,(s[-1]+1)/100,len(a)/16000
if __name__=='__main__':
    for f in sorted(glob.glob(sys.argv[1] if len(sys.argv)>1 else 'takes/*.mp3')):
        a,b,d=span(f);print(f"{f:28s} {a:.2f}-{b:.2f} speech {b-a:.2f} / {d:.2f}")
