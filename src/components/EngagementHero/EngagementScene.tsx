'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function EngagementScene() {
  const coupleRef = useRef<THREE.Group>(null);
  
  // Automatically loads the couple's isolated photo
  const texture = useTexture('/images/Engagement_Final.png');
  texture.colorSpace = THREE.SRGBColorSpace;

  // Cinematic Bulb Generator
  const hangingLights = useMemo(() => {
    return Array.from({ length: 12 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 8, 
        2 + Math.random() * 4, 
        -2 + (Math.random() - 0.5) * 6
      ] as [number, number, number],
      speed: 1 + Math.random() * 2
    }));
  }, []);

  // Stabilized handheld cinematography effect
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Slow dolly-in
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 4.5 + Math.sin(t * 0.1) * 0.3, 0.01);
    
    // Very subtle hand-held breathing drift
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.4) * 0.15, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, Math.cos(t * 0.3) * 0.1, 0.02);
    
    state.camera.lookAt(0, 0, 0);

    // Subtle parallax float for the subject
    if (coupleRef.current) {
      coupleRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group>
      {/* Base Depth Element layer */}
      <Sparkles count={150} scale={15} size={25} speed={0.2} opacity={0.15} position={[0, -2, -5]} color="#fb7005" />

      {/* Midground: Hero Couple with Extended Picture Frame Base */}
      <group ref={coupleRef} position={[1.5, 0, 0]}>
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
          {/* Metallic Gold Picture Frame Border slightly larger than the photo itself */}
          <mesh castShadow position={[0, 0, -0.01]}>
             <planeGeometry args={[2.55, 3.15]} />
             <meshStandardMaterial color="#d4af37" metalness={0.5} roughness={0.3} />
          </mesh>
          
          {/* Main Photo Plane */}
          <mesh castShadow receiveShadow>
             <planeGeometry args={[2.4, 3]} />
             <meshStandardMaterial map={texture} transparent opacity={0.98} roughness={0.6} side={THREE.DoubleSide} />
          </mesh>
        </Float>
      </group>

      {/* Floating Hanging Golden Bulbs / Micro Decor */}
      {hangingLights.map((light, i) => (
        <Float key={i} speed={light.speed} rotationIntensity={0.5} floatIntensity={0.5} position={light.position}>
          <mesh>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#ffe1a8" />
            <pointLight intensity={0.4} distance={3} color="#ffb067" />
          </mesh>
        </Float>
      ))}

      {/* Cinematic Foreground Gold Dust (Creates intense Bokeh as passing lens) */}
      <Sparkles count={50} scale={8} size={20} speed={0.4} opacity={0.6} position={[0, 0, 2.5]} color="#ffedd6" />
    </group>
  );
}
