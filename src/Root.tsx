import React from 'react';
import {Composition} from 'remotion';
import {MikePromo, T} from './Mike';
import {MikeVersionB, TB} from './MikeB';
import {MikeVersionC, TC} from './MikeC';
import {GaryAgentsVersionC2, TC as TC2} from './GaryC2';
export const Root: React.FC = () => (
  <>
    <Composition id="MikePromo" component={MikePromo} durationInFrames={T.total} width={1920} height={1080} fps={30} defaultProps={{aspect: '16x9' as const}} />
    <Composition id="MikePromo916" component={MikePromo} durationInFrames={T.total} width={1080} height={1920} fps={30} defaultProps={{aspect: '9x16' as const}} />
    <Composition id="MikeVersionB" component={MikeVersionB} durationInFrames={TB.total} width={1920} height={1080} fps={30} defaultProps={{aspect: '16x9' as const}} />
    <Composition id="MikeVersionB916" component={MikeVersionB} durationInFrames={TB.total} width={1080} height={1920} fps={30} defaultProps={{aspect: '9x16' as const}} />
    <Composition id="MikeVersionC916" component={MikeVersionC} durationInFrames={TC.total} width={1080} height={1920} fps={30} />
    <Composition id="GaryAgentsVersionC2916" component={GaryAgentsVersionC2} durationInFrames={TC2.total} width={1080} height={1920} fps={30} />
  </>
);
