'use client';

import { useTexture } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ImagePlaneProps {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  width?: number;
  height?: number;
  wobble?: boolean;
}

export default function ImagePlane({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, width = 3, height = 4.5, wobble = false }: ImagePlaneProps) {
  // Use a fallback if texture fails, though Drei handles errors natively
  const originalTexture = useTexture(url);
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Clone texture to avoid global mutation, and set ColorSpace
  const texture = originalTexture.clone();
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    if (wobble && meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      <planeGeometry args={[width, height, 16, 16]} />
      <meshPhysicalMaterial 
        map={texture} 
        roughness={0.4} 
        metalness={0.1}
        clearcoat={0.3} // Adds slight premium gloss 
        side={THREE.DoubleSide} 
      />
    </mesh>
  );
}
