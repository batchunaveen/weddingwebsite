import { useRef } from 'react';
import * as THREE from 'three';
import ImagePlane from '../elements/ImagePlane';


export default function EngagementChapter({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  return (
    <group ref={groupRef}>
      {/* Soft romantic light */}
      <spotLight position={[5, 10, 5]} angle={0.5} penumbra={0.8} intensity={1} color="#ffe4e1" castShadow />
      

      <ImagePlane url="/images/Engagement_Final.png" position={[2, 0, 0]} rotation={[0, -0.15, 0.05]} />
    </group>
  );
}
