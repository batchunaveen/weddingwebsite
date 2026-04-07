'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './EventsSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const MAIN_VENUE = '3500 James Madison Hwy, Haymarket, VA 20169';
const MAIN_VENUE_MAP = 'https://www.google.com/maps/search/?api=1&query=3500+James+Madison+Hwy+Haymarket+VA+20169';
const MARRIAGE_VENUE = '1500 Volunteer Dr, Brunswick, MD 21716';
const MARRIAGE_VENUE_MAP = 'https://www.google.com/maps/search/?api=1&query=1500+Volunteer+Dr+Brunswick+MD+21716';

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
    venue: MAIN_VENUE,
    venueMap: MAIN_VENUE_MAP,
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
    venue: MAIN_VENUE,
    venueMap: MAIN_VENUE_MAP,
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
    venue: MAIN_VENUE,
    venueMap: MAIN_VENUE_MAP,
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
    venue: MAIN_VENUE,
    venueMap: MAIN_VENUE_MAP,
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
    venue: MAIN_VENUE,
    venueMap: MAIN_VENUE_MAP,
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
    venue: MARRIAGE_VENUE,
    venueMap: MARRIAGE_VENUE_MAP,
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
                <img
                  src={event.image}
                  alt={event.title}
                  className={styles.eventImage}
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
