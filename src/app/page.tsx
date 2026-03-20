'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './page.module.scss';
import EventsSection from '@/components/Events/EventsSection';
import RsvpSection from '@/components/Rsvp/RsvpSection';



export default function Home() {
  const symbolRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const garlandsRef = useRef<HTMLDivElement>(null);

  
  const groomRef = useRef<HTMLSpanElement>(null);
  const brideRef = useRef<HTMLSpanElement>(null);
  const ampersandRef = useRef<HTMLSpanElement>(null);
  
  const buttonRef = useRef<HTMLButtonElement>(null);

  const titleText = "|| Om Shree Ganeshaya Namaha ||";

  useEffect(() => {
    // 1. Drop the garlands from the top
    gsap.fromTo(garlandsRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "bounce.out" }
    );

    // 2. Slow fade and scale for the intricate Om Symbol
    gsap.fromTo(symbolRef.current,
      { scale: 0.5, opacity: 0, rotation: -5 },
      { scale: 1, opacity: 1, rotation: 0, duration: 2, ease: "power3.out", delay: 0.5 }
    );

    // 3. Staggered letter reveal for the premium elegant script
    if (textRef.current) {
      gsap.fromTo(textRef.current.children,
        { opacity: 0, y: 30, rotationX: -90 }, // 3D flip-up effect
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0, 
          duration: 1, 
          stagger: 0.05, 
          ease: "back.out(1.7)", 
          delay: 1.5 
        }
      );
    }
    
    // 4. (Removed background rose animation)

    // 5. Couple Names reveal (Romantic Collision from Left and Right)
    gsap.fromTo(groomRef.current,
      { x: "-50vw", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.8, ease: "power3.out", delay: 2.2 }
    );
    gsap.fromTo(brideRef.current,
      { x: "50vw", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.8, ease: "power3.out", delay: 2.2 }
    );
    gsap.fromTo(ampersandRef.current,
      { scale: 0, opacity: 0, rotation: -90 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(2)", delay: 3.2 }
    );
    // 6. Button slide up and float (now at delay 3.6 directly after collision)
    gsap.fromTo(buttonRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "back.out(1.5)", delay: 3.6,
        onComplete: () => {
          gsap.to(buttonRef.current, {
            y: "-=8",
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      }
    );

  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* SECTION 1: Intro Hero */}
      <section className={styles.heroSection}>
        {/* Decorative Garlands (Top) */}
        <div className={styles.garlandsTop} ref={garlandsRef}>
          <div className={styles.garlandPattern}></div>
        </div>

        {/* Main Content Center */}
        <div className={styles.contentWrapper}>
          
          <div className={styles.ganeshaWrapper} ref={symbolRef}>
             <div className={styles.omSymbolMini}>ॐ</div>
             <div className={styles.ganeshaImageWrapper}>
                <Image 
                  src="/images/God.png" 
                  alt="Lord Ganesha" 
                  fill 
                  className={styles.blendedGanesha} 
                  priority
                />
             </div>
          </div>

          <h1 className={styles.scriptText} ref={textRef} style={{ perspective: '400px' }}>
            {titleText.split('').map((char, index) => (
              <span 
                key={index} 
                style={{ display: 'inline-block', transformOrigin: '50% 100%' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <h2 className={styles.coupleNames}>
            <span ref={groomRef} style={{ display: 'inline-block' }}>Naveen Batchu</span>
            <span ref={ampersandRef} style={{ display: 'inline-block', margin: '0 20px' }}>&amp;</span>
            <span ref={brideRef} style={{ display: 'inline-block' }}>Divya Bayya</span>
          </h2>
          
          <button 
            className={styles.inviteButton} 
            ref={buttonRef}
            onClick={() => {
              document.getElementById('invite-card')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Save the Date
          </button>
          
        </div>
      </section>

      {/* SECTION 2: Map of Wedding Events / Cards Grid */}
      <EventsSection />

      {/* SECTION 3: Bottom Scroll RSVP Interactive Form */}
      <RsvpSection />

    </div>
  );
}
