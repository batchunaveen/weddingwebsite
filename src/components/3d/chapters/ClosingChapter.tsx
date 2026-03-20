import { useRef } from 'react';
import * as THREE from 'three';


export default function ClosingChapter({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  return (
    <group ref={groupRef}>
      {/* Warm concluding light */}
      <spotLight position={[0, 10, 5]} angle={1} penumbra={1} intensity={1} color="#d4af37" />

    </group>
  );
}
