'use client';

import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function PostProcessing() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return (
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom 
          intensity={2.5} 
          luminanceThreshold={0.5} 
          luminanceSmoothing={0.9} 
          mipmapBlur 
          resolutionX={1024}
          resolutionY={1024}
        />
        <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom 
        intensity={2.5} 
        luminanceThreshold={0.5} 
        luminanceSmoothing={0.9} 
        mipmapBlur 
        resolutionX={1024}
        resolutionY={1024}
      />
      <DepthOfField 
        focusDistance={0.015} 
        focalLength={0.02} 
        bokehScale={2} 
        height={480} 
      />
      <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
