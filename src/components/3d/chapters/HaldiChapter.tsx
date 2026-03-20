import { useRef } from 'react';
import * as THREE from 'three';
import ImagePlane from '../elements/ImagePlane';


export default function HaldiChapter({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  return (
    <group ref={groupRef}>
      {/* Bright sunlight feel */}
      <spotLight position={[-5, 10, 5]} angle={0.8} penumbra={0.5} intensity={2.5} color="#ffc30b" castShadow />
      

      <ImagePlane url="/images/Haldi.png" position={[-2, 0, 0]} rotation={[0, 0.2, -0.05]} />
    </group>
  );
}
