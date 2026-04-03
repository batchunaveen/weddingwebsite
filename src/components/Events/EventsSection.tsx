'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './EventsSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 'engagement',
    title: 'The Engagement',
    image: '/images/Engagement_Final.png',
    date: 'Saturday, 25th April 2026',
    time: '9:30 AM',
    description: 'Beginning our forever with love and joy',
    themeColor: '#2b4036',
    bgLabel: 'Sage Green',
  },
  {
    id: 'mehndi',
    title: 'Mehndi Ceremony',
    image: '/images/mehendi.png',
    date: 'Saturday, 25th April 2026',
    time: '6:00 PM',
    description: 'Intricate patterns, joyful hearts — the Mehndi evening',
    themeColor: '#5c3317',
    bgLabel: 'Henna Brown',
  },
  {
    id: 'haldi',
    title: 'Haldi Ceremony',
    image: '/images/Haldi_Final.png',
    date: 'Sunday, 26th April 2026',
    time: '9:00 AM',
    description: 'A splash of yellow, a lot of love',
    themeColor: '#c58309',
    bgLabel: 'Turmeric Gold',
  },
  {
    id: 'pelli-koduku',
    title: 'Pelli Koduku',
    image: '/images/PelliKoduku.png',
    date: 'Sunday, 26th April 2026',
    time: '11:00 AM',
    description: 'The groom\'s side rituals — charm, tradition & celebration',
    themeColor: '#b05a00',
    bgLabel: 'Saffron Dusk',
  },
  {
    id: 'pelli-kuturu',
    title: 'Pelli Kuturu',
    image: '/images/PelliKuturu.png',
    date: 'Sunday, 26th April 2026',
    time: '11:30 AM',
    description: 'The bridal preparations and traditional rituals',
    themeColor: '#8a3a41',
    bgLabel: 'Bridal Rose',
  },
  {
    id: 'marriage',
    title: 'The Marriage',
    image: '/images/Marriage.png',
    date: 'Monday, 27th April 2026',
    time: '9:30 AM (Muhurtham)',
    description: 'Tying the knot and stepping into a new life',
    themeColor: '#871a15',
    bgLabel: 'Auspicious Maroon',
  },
  {
    id: 'reception',
    title: 'Wedding Reception',
    image: '/images/Reception.png',
    date: 'Monday, 27th April 2026',
    time: '7:00 PM',
    description: 'An evening of celebration, dining, and dancing',
    themeColor: '#0a1128',
    bgLabel: 'Midnight Blue',
  },
];

export default function EventsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // On mount: card scroll-reveal animations
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // When activeId changes, animate the section background
  useEffect(() => {
    const color = events.find((e) => e.id === activeId)?.themeColor ?? '#0a0604';
    gsap.to(containerRef.current, {
      backgroundColor: color,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, [activeId]);

  const handleCardClick = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id)); // Toggle off if same card clicked again
  };

  return (
    <section className={styles.eventsContainer} ref={containerRef}>
      <div className={styles.headerBlock}>
        <p className={styles.sectionEyebrow}>– Our Celebrations –</p>
        <h2 className={styles.sectionTitle}>Wedding Timeline</h2>
        <p className={styles.sectionSubtitle}>
          Tap a card to feel the vibe of each celebration
        </p>
      </div>

      <div className={styles.cardsGrid}>
        {events.map((event, index) => {
          const isActive = activeId === event.id;
          return (
            <div
              key={event.id}
              id={`event-${event.id}`}
              className={`${styles.eventCard} ${isActive ? styles.eventCardActive : ''}`}
              ref={(el) => { cardsRef.current[index] = el; }}
              onClick={() => handleCardClick(event.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(event.id)}
              aria-pressed={isActive}
            >
              {/* Colored Accent Bar */}
              <div
                className={styles.accentBar}
                style={{ backgroundColor: event.themeColor }}
              />

              {/* Image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={event.image}
                  alt={event.title}
                  width={600}
                  height={800}
                  className={styles.eventImage}
                  priority={index < 2}
                />
                {/* Active overlay glow */}
                {isActive && (
                  <div
                    className={styles.activeGlow}
                    style={{
                      boxShadow: `inset 0 0 50px ${event.themeColor}99`,
                      border: `2px solid ${event.themeColor}`,
                    }}
                  />
                )}
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDate}>{event.date}</p>
                <p className={styles.eventTime}>⏰ {event.time}</p>
                <div
                  className={styles.separator}
                  style={{ backgroundColor: event.themeColor }}
                />
                <p className={styles.eventDesc}>{event.description}</p>

                {isActive && (
                  <span
                    className={styles.activeLabel}
                    style={{ color: event.themeColor }}
                  >
                    ● {event.bgLabel}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
