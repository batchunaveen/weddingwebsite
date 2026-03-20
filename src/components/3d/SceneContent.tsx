'use client';

import { useThree } from '@react-three/fiber';
import { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import BookPage from './elements/BookPage';
import IntroChapter from './chapters/IntroChapter';
import EngagementChapter from './chapters/EngagementChapter';
import HaldiChapter from './chapters/HaldiChapter';
import PelliKuturuChapter from './chapters/PelliKuturuChapter';
import MarriageChapter from './chapters/MarriageChapter';
import ReceptionChapter from './chapters/ReceptionChapter';
import ClosingChapter from './chapters/ClosingChapter';

// Register Plugin safely for Next.js SSR
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SceneContent() {
  const { camera, scene } = useThree();
  
  const globalLightRef = useRef<THREE.AmbientLight>(null!);

  // The 4 turning pages of the book
  const page1Ref = useRef<THREE.Group>(null!);
  const page2Ref = useRef<THREE.Group>(null!);
  const page3Ref = useRef<THREE.Group>(null!);
  const page4Ref = useRef<THREE.Group>(null!); // Back cover doesn't turn

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    // Reset camera initial state for a closed right-heavy book
    camera.position.set(3.5, 0, 15);
    camera.rotation.set(0, 0, 0);
    
    // Reset pages
    if (page1Ref.current) page1Ref.current.rotation.y = 0;
    if (page2Ref.current) page2Ref.current.rotation.y = 0;
    if (page3Ref.current) page3Ref.current.rotation.y = 0;

    // Clear old triggers
    ScrollTrigger.getAll().forEach(t => t.kill());

    const buildTimeline = () => {
      // 1. MASTER CAMERA & BOOK TURNING TIMELINE
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // Smooth interpolation
        }
      });

      const easeStyle = "power1.inOut";

      // The 6 Scroll Intervals
      
      // Interval 1 (0 to 1): Section 1 -> 2 (Intro to Engagement)
      // Open Cover natively, sweep camera to look slightly at the Left page (Engagement)
      masterTl.to(page1Ref.current.rotation, { y: -Math.PI, ease: easeStyle, duration: 1 }, 0)
              .to(camera.position, { x: -1.5, z: 12, ease: easeStyle, duration: 1 }, 0)
              .to(camera.rotation, { y: -0.05, duration: 1 }, 0); // Subtle look right

      // Interval 2 (1 to 2): Section 2 -> 3 (Engagement to Haldi)
      // Focus sweeps to the Right page (Haldi)
      masterTl.to(camera.position, { x: 1.5, z: 12, ease: easeStyle, duration: 1 }, 1)
              .to(globalLightRef.current, { intensity: 0.8, duration: 1 }, 1) // Haldi Brightness
              .to(camera.rotation, { y: 0.05, duration: 1 }, 1);

      // Interval 3 (2 to 3): Section 3 -> 4 (Haldi to Pelli Kuturu)
      // Turn Page 2! Sweep camera back to Left page (PelliKuturu)
      masterTl.to(page2Ref.current.rotation, { y: -Math.PI, ease: easeStyle, duration: 1 }, 2)
              .to(camera.position, { x: -1.5, z: 11, ease: easeStyle, duration: 1 }, 2)
              .to(globalLightRef.current, { intensity: 0.3, duration: 1 }, 2) // Pelli Mood
              .to(camera.rotation, { y: -0.05, duration: 1 }, 2);

      // Interval 4 (3 to 4): Section 4 -> 5 (Pelli Kuturu to Marriage)
      // Focus sweeps to Right page (Marriage)
      masterTl.to(camera.position, { x: 1.5, z: 12, ease: easeStyle, duration: 1 }, 3)
              .to(camera.rotation, { y: 0.05, duration: 1 }, 3);

      // Interval 5 (4 to 5): Section 5 -> 6 (Marriage to Reception)
      // Turn Page 3! Sweep camera back to Left page (Reception)
      masterTl.to(page3Ref.current.rotation, { y: -Math.PI, ease: easeStyle, duration: 1 }, 4)
              .to(camera.position, { x: -1.5, z: 13, ease: easeStyle, duration: 1 }, 4)
              .to(globalLightRef.current, { color: '#4b0082', intensity: 0.5, duration: 1 }, 4) // Purple Party Line
              .to(camera.rotation, { y: -0.05, duration: 1 }, 4);

      // Interval 6 (5 to 6): Section 6 -> 7 (Reception to Closing)
      // Focus sweeps to Right page (Closing)
      masterTl.to(camera.position, { x: 1.5, z: 14, ease: easeStyle, duration: 1 }, 5)
              .to(globalLightRef.current, { color: '#ffffff', intensity: 0.2, duration: 1 }, 5)
              .to(camera.rotation, { y: 0, duration: 1 }, 5);
    };

    const timeout = setTimeout(buildTimeline, 200);
    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [camera, scene]);

  return (
    <>
      <ambientLight ref={globalLightRef} intensity={0.4} color="#ffffff" />
      
      {/* 
        The Book Structure: 4 physical folding sheets that compose Spreads when opened.
        - Page 1: Cover (Intro) | Left spread 1 (Engagement)
        - Page 2: Right spread 1 (Haldi) | Left spread 2 (Pelli Kuturu)
        - Page 3: Right spread 2 (Marriage) | Left spread 3 (Reception)
        - Page 4: Right spread 3 (Closing) 
      */}

      <BookPage 
        pageRef={page1Ref} index={1} 
        front={<IntroChapter groupRef={useRef(null!)} />} 
        back={<EngagementChapter groupRef={useRef(null!)} />} 
      />

      <BookPage 
        pageRef={page2Ref} index={2} 
        front={<HaldiChapter groupRef={useRef(null!)} />} 
        back={<PelliKuturuChapter groupRef={useRef(null!)} />} 
      />

      <BookPage 
        pageRef={page3Ref} index={3} 
        front={<MarriageChapter groupRef={useRef(null!)} />} 
        back={<ReceptionChapter groupRef={useRef(null!)} />} 
      />

      {/* Page 4 doesn't turn, it's just the final right-side rest page */}
      <BookPage 
        pageRef={page4Ref} index={4} 
        front={<ClosingChapter groupRef={useRef(null!)} />} 
      />
    </>
  );
}
