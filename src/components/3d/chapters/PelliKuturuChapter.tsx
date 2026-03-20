import { useRef } from 'react';
import * as THREE from 'three';
import ImagePlane from '../elements/ImagePlane';


export default function PelliKuturuChapter({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  return (
    <group ref={groupRef}>
      {/* Feminine, intimate warm lamp lighting */}
      <spotLight position={[0, 8, 8]} angle={0.7} penumbra={1} intensity={1.2} color="#f5dfc6" castShadow />
      <pointLight position={[2, -2, 4]} intensity={1.5} color="#d4af37" distance={10} />
      

      <ImagePlane url="/images/PelliKuturu.png" position={[0, 0.5, 0]} rotation={[0, 0, 0]} />
    </group>
  );
}
