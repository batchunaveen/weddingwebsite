'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, Environment } from '@react-three/drei';
import SceneContent from './SceneContent';
import PostProcessing from './PostProcessing';
import * as THREE from 'three';

interface SceneCanvasProps {
  setLoaded: () => void;
}

export default function SceneCanvas({ setLoaded }: SceneCanvasProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 200 }}
      dpr={[1, 2]} // good for high resolution but capped at 2x
      gl={{
        antialias: false, // disabled for post-processing
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      onCreated={() => setLoaded()}
    >
      {/* Deep cinematic background */}
      <color attach="background" args={['#050302']} />
      
      {/* We use env map for realistic reflections on gold/lamps */}
      <Environment preset="night" environmentIntensity={0.5} />

      {/* Main Orchestrator */}
      <SceneContent />
      
      {/* Cinematic bloom rendering */}
      <PostProcessing />
      
      {/* Preloads all assets into GPU memory before fading loading screen */}
      <Preload all />
    </Canvas>
  );
}
