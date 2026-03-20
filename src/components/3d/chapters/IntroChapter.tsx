'use client';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

// Procedural Toran (Garland) Generator to sit physically at the top of the 3D page
function ToranGarlands() {
  const marigolds = useMemo(() => {
    const items = [];
    const numFestons = 3; // 3 arches of floral strings
    const width = 8;      // Page is 8 units wide
    const segmentWidth = width / numFestons;
    
    // Top Border
    for (let f = 0; f < numFestons; f++) {
      const startX = -4 + f * segmentWidth;
      
      // Hanging arches
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const x = startX + t * segmentWidth;
        // Parabola math for hanging curve: max droop is 1.5 units down
        const y = 5.2 - 1.5 * (4 * t * (1 - t)); 
        const isOrange = i % 2 === 0;
        items.push(
          <mesh position={[x, y, 0.1]} key={`arch-${f}-${i}`}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color={isOrange ? "#ff69b4" : "#ffc30b"} /> {/* Orange/Marigold */}
          </mesh>
        );
      }

      // Vertical drooping tails at boundaries between arches
      if (f > 0) {
        for (let j = 0; j < 8; j++) {
          items.push(
            <mesh position={[startX, 5.2 - j * 0.25, 0.1]} key={`tail-${f}-${j}`}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color={j % 2 === 0 ? "#ff4500" : "#ffd700"} />
            </mesh>
          );
        }
      }
    }
    
    // Far left and Far right boundary tails
    [ -3.9, 3.9 ].forEach((startX, idx) => {
        for (let j = 0; j < 12; j++) {
          const isGreenLeaf = j === 11 || j === 10;
          items.push(
            <mesh position={[startX, 5.2 - j * 0.25, 0.1]} key={`edge-tail-${idx}-${j}`}>
                <sphereGeometry args={isGreenLeaf ? [0.1, 4, 8] : [0.08, 8, 8]} />
                <meshStandardMaterial color={isGreenLeaf ? "#228B22" : (j % 2 === 0 ? "#ff4500" : "#ffd700")} />
            </mesh>
          );
        }
    });

    return items;
  }, []);

  return <group>{marigolds}</group>;
}

export default function IntroChapter({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  return (
    <group ref={groupRef}>
      {/* Small light just to highlight the garlands slightly */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 2, 5]} intensity={1.5} color="#fff" />

      {/* 3D Generated Garlands placed physically at the top of the Cover Page */}
      <ToranGarlands />
      
      {/* Native WebGL transformed DOM HTML replicating exactly the Wedding Image Design */}
      {/* Centers directly on 0,0 locally on the Cover Page plane */}
      <Html transform position={[0, 0, 0.05]} scale={0.6}>
        <div style={{
          width: '700px', // Substantial logical width to ensure perfect kerning
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fb7005', // Exact vibrant orange from the reference
          fontFamily: "'Great Vibes', cursive",
          textShadow: '1px 1px 3px rgba(0,0,0,0.05)'
        }}>
          {/* Standard spiritual symbol replacing the vector Ganesh since it perfectly captures tradition natively */}
          <div style={{ 
            fontSize: '180px', 
            lineHeight: '1', 
            margin: '0 0 10px 0',
            fontFamily: "system-ui, -apple-system, sans-serif" // ensuring the ॐ mounts natively safely
          }}>
            ॐ
          </div>
          
          <div style={{ fontSize: '50px', letterSpacing: '2px', padding: '0 40px' }}>
            || Om Shree Ganeshay Nama: ||
          </div>
        </div>
      </Html>
      
    </group>
  );
}
