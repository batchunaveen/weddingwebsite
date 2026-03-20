import { useRef } from 'react';
import * as THREE from 'three';
import ImagePlane from '../elements/ImagePlane';


export default function ReceptionChapter({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  return (
    <group ref={groupRef}>
      {/* Glamorous stage lights */}
      <spotLight position={[-6, 10, 4]} angle={0.4} penumbra={0.5} intensity={5} color="#4b0082" castShadow />
      <spotLight position={[6, 10, 4]} angle={0.4} penumbra={0.5} intensity={5} color="#1e90ff" castShadow />
      

      <ImagePlane url="/images/Reception.png" position={[2, 0, 0]} rotation={[0, -0.2, 0]} />
    </group>
  );
}
