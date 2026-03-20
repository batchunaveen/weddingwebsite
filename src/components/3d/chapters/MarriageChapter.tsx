import { useRef } from 'react';
import * as THREE from 'three';
import ImagePlane from '../elements/ImagePlane';


export default function MarriageChapter({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  return (
    <group ref={groupRef}>
      {/* Sacred fire and temple top light */}
      <spotLight position={[0, 15, -5]} angle={0.8} penumbra={1} intensity={2} color="#f9a602" castShadow />
      <pointLight position={[0, -3, 2]} intensity={2.5} color="#ff4500" distance={8} /> {/* Agni Kundam glow */}
      

      <ImagePlane url="/images/Marriage.png" position={[0, 1, -2]} scale={1.2} />
    </group>
  );
}
