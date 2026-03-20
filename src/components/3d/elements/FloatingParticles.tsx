'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface ParticlesProps {
  count: number;
  color: string;
  size: number;
  spread: [number, number, number];
  opacity?: number;
  speed?: number;
}

export default function FloatingParticles({ count, color, size, spread, opacity = 1, speed = 1 }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate deterministic but pseudo-random particle data
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
        // Pure math for side effects to appease strict React constraints
        // Random spread inside spread[x, y, z] volume
        const x = (Math.random() - 0.5) * spread[0];
        const y = (Math.random() - 0.5) * spread[1];
        const z = (Math.random() - 0.5) * spread[2];
        
        pos.set([x, y, z], i * 3);
        spd[i] = Math.random() * speed + 0.1; // Fall/float speed
    }
    return [pos, spd];
    // Keep it decoupled by relying on math instead of state props dynamically
  }, [count, spread, speed]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Animate falling/floating loop
    const positionsArr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Y position 
      const yIdx = i * 3 + 1;
      
      // Float up normally for particles; if speed < 0 fall down (petals)
      positionsArr[yIdx] += speeds[i] * delta * (speed < 0 ? -1 : 1);
      
      // Reset if out of bounds (simplified wrap-around)
      const maxOff = spread[1] / 2;
      if (positionsArr[yIdx] > maxOff && speed > 0) positionsArr[yIdx] = -maxOff;
      if (positionsArr[yIdx] < -maxOff && speed < 0) positionsArr[yIdx] = maxOff;
      
      // Optional subtle wind wobble on X
      positionsArr[i * 3] += Math.sin(state.clock.elapsedTime * speeds[i] + i) * 0.005;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
