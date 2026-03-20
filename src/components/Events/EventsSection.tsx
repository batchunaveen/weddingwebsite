'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './EventsSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 'haldi',
    title: 'Haldi Ceremony',
    image: '/images/Haldi.png',
    date: 'Sunday, 26th April 2026',
    time: '10:00 AM',
    description: 'A splash of yellow, a lot of love',
    themeColor: '#c58309' // Rich Turmeric Deep Yellow
  },
  {
    id: 'pelli-kuturu',
    title: 'Pelli Kuturu',
    image: '/images/PelliKuturu.png',
    date: 'Sunday, 26th April 2026',
    time: '3:00 PM',
    description: 'The bridal preparations and traditional rituals',
    themeColor: '#8a3a41' // Traditional Earthy Rose
  },
  {
    id: 'engagement',
    title: 'The Engagement',
    image: '/images/Engagement.png',
    date: 'Sunday, 26th April 2026',
    time: '7:30 PM',
    description: 'Beginning our forever with love and joy',
    themeColor: '#2b4036' // Elegant Deep Sage Green
  },
  {
    id: 'marriage',
    title: 'The Marriage',
    image: '/images/Marriage.png',
    date: 'Monday, 27th April 2026',
    time: '9:30 AM (Muhurtham)',
    description: 'Tying the knot and stepping into a new life',
    themeColor: '#871a15' // Auspicious South Indian Maroon
  },
  {
    id: 'reception',
    title: 'Wedding Reception',
    image: '/images/Reception.png',
    date: 'Monday, 27th April 2026',
    time: '7:00 PM',
    description: 'An evening of celebration, dining, and dancing',
    themeColor: '#0a1128' // Luxurious Midnight Blue
  }
];

export default function EventsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    
    // Animate the background theme dynamically when a card reaches the center of the screen!
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const themeColor = events[index].themeColor;

      ScrollTrigger.create({
        trigger: card,
        start: "top 55%", // Triggers precisely when the card comes slightly above the middle of screen
        end: "bottom 45%",
        onEnter: () => gsap.to(containerRef.current, { backgroundColor: themeColor, duration: 1.5, ease: "power2.out", overwrite: "auto" }),
        onEnterBack: () => gsap.to(containerRef.current, { backgroundColor: themeColor, duration: 1.5, ease: "power2.out", overwrite: "auto" }),
      });

      // Special case: if user scrolls back above the Haldi card entirely, revert background to initial dark mode
      if (index === 0) {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%", // When Haldi leaves screen backwards
          onLeaveBack: () => gsap.to(containerRef.current, { backgroundColor: "#0a0604", duration: 1.5, ease: "power2.out", overwrite: "auto" })
        });
      }

      // Existing Elegant GSAP Scroll Popup Animation
      gsap.fromTo(card, 
        { 
          opacity: 0, 
          y: 120, 
          scale: 0.9  
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", 
            toggleActions: "play none none reverse" 
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="invite-card" className={styles.eventsContainer} ref={containerRef}>
      <h2 className={styles.sectionTitle}>Wedding Timeline</h2>
      <div className={styles.cardsStack}>
        
        {events.map((event, index) => (
          <div 
            key={event.id} 
            className={styles.eventCardWrapper}
            ref={(el) => { cardsRef.current[index] = el; }}
          >
            <div className={styles.eventCard}>
              {/* Top Half: Physical Image Base */}
              <div className={styles.imageWrapper}>
                <Image 
                  src={event.image} 
                  alt={event.title}
                  fill
                  className={styles.eventImage}
                  priority={index === 0}
                />
              </div>
              
              {/* Bottom Half: Typography */}
              <div className={styles.cardContent}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDate}>{event.date}</p>
                <p className={styles.eventTime}>{event.time}</p>
                <div className={styles.separator}></div>
                <p className={styles.eventDesc}>{event.description}</p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
