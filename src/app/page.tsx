'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './page.module.scss';
import EventsSection from '@/components/Events/EventsSection';
import RsvpSection from '@/components/Rsvp/RsvpSection';
import IsoLevelWarp from '@/components/ui/isometric-wave-grid-background';



export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

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

      {/* SECTION 1: Cinematic Intro Map */}
      <section className={styles.heroSection}>

        {/* Cinematic Underlay Grid Canvas */}
        <IsoLevelWarp 
          color="251, 112, 5" // Strictly overrides grid stroke to Deep Marigold 
          speed={0.6} 
          density={50}
          className="opacity-30 pointer-events-none mix-blend-multiply" 
        />
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
            <span ref={groomRef} className={styles.coupleNamePart}>Naveen Batchu</span>
            <span ref={ampersandRef} className={styles.ampersand}>&amp;</span>
            <span ref={brideRef} className={styles.coupleNamePart}>Divya Bayya</span>
          </h2>
          
          <button 
            className={styles.inviteButton} 
            ref={buttonRef}
            onClick={() => {
              setIsUnlocked(true);
              // SetTimeout ensures React flushes the DOM nodes into existence before attempting scroll mapping natively traversing physics
              setTimeout(() => {
                document.getElementById('invite-card')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            Save the Date
          </button>
          
        </div>
      </section>

      {/* SECTIONS 2, 3 & 4 (Locked Behind User Interaction) */}
      {isUnlocked && (
        <>
          {/* E-Invite Section */}
          <section id="invite-card" className={styles.inviteSection}>
            <div className={styles.sectionBackground}>
              <Image src="/images/Marriage.png" alt="Background Blur" fill className={styles.blurImage} />
              <div className={styles.overlay}></div>
            </div>

            <div className={styles.inviteContent}>
              <div className={styles.detailsLeft}>
                <h2 className={styles.sectionTitle}>You're Invited</h2>
                <div className={styles.locationBlock}>
                  <h3>Join Us In Celebration</h3>
                  <p>Together with our families, we joyfully invite you to our wedding.</p>
                  <p>Your beautiful presence and blessings mean the world to us as we begin this new journey.</p>
                </div>
              </div>

              <div className={styles.cardRight}>
                <div className={styles.weddingCard}>
                  <div className={styles.cardInnerBorder}></div>
                  <h3 className={styles.cardTitle}>Naveen & Divya</h3>
                  <div className={styles.cardImageWrapper}>
                    <Image src="/images/Engagement_Final.png" alt="Couple Engagement" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <p className={styles.cardDate}>April 25th 9:30 AM</p>
                </div>
              </div>
            </div>
          </section>

          <EventsSection />
          <RsvpSection />
        </>
      )}

    </div>
  );
}
