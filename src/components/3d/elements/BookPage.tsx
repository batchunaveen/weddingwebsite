'use client';

import React from 'react';
import * as THREE from 'three';

interface BookPageProps {
  pageRef: React.RefObject<THREE.Group>;
  front: React.ReactNode;
  back?: React.ReactNode;
  index: number; // For z-stacking so pages don't clip
}

export default function BookPage({ pageRef, front, back, index }: BookPageProps) {
  // Page size: matches the 4 unit offset so width is 8. Height we'll set to 12.
  const pageWidth = 8;
  const pageHeight = 11;

  return (
    // Hinge at X=0
    <group ref={pageRef} position={[0, 0, -index * 0.1]}>
      
      {/* Front Face */}
      <group position={[pageWidth / 2, 0, 0.02]}>
        {/* Solid Paper Background */}
        <mesh position={[0, 0, -0.01]} castShadow receiveShadow>
          <planeGeometry args={[pageWidth, pageHeight]} />
             <meshStandardMaterial color="#FFFCDC" roughness={0.9} />
        </mesh>
        
        {/* The Chapter 3D Content */}
        {front}
      </group>
      
      {/* Back Face */}
      {back && (
        <group position={[pageWidth / 2, 0, -0.02]} rotation={[0, Math.PI, 0]}>
          {/* Solid Paper Background */}
          <mesh position={[0, 0, -0.01]} castShadow receiveShadow>
             <planeGeometry args={[pageWidth, pageHeight]} />
             <meshStandardMaterial color="#fdfaef" roughness={0.9} />
          </mesh>

          {/* The Chapter 3D Content */}
          {back}
        </group>
      )}
      
    </group>
  );
}
