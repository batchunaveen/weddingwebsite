'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VenueSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const venues = [
  {
    id: 'main',
    cardClass: 'main',
    tag: 'All Pre Wedding Events',
    title: 'Celebrations Venue',
    address: '3500 James Madison Hwy\nHaymarket, VA 20169',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=3500+James+Madison+Hwy+Haymarket+VA+20169',
    events: ['Engagement', 'Mehndi', 'Haldi', 'Pelli Koduku', 'Pelli Kuturu'],
  },
  {
    id: 'marriage',
    cardClass: 'marriage',
    tag: 'Marriage Ceremony',
    title: 'Marriage Venue',
    address: '1500 Volunteer Dr\nBrunswick, MD 21716',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=1500+Volunteer+Dr+Brunswick+MD+21716',
    events: ['The Marriage'],
  },
];

export default function VenueSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="venue" className={styles.venueSection} ref={sectionRef}>
      <p className={styles.eyebrow}>– Where to Find Us –</p>
      <h2 className={styles.sectionTitle}>Venue Details</h2>
      <p className={styles.sectionSubtitle}>
        Click on any address to open directions in Google Maps
      </p>

      <div className={styles.venueGrid}>
        {venues.map((venue, index) => (
          <div
            key={venue.id}
            className={`${styles.venueCard} ${styles[venue.cardClass]}`}
            ref={(el) => { cardsRef.current[index] = el; }}
          >
            {/* Card Header */}
            <div className={styles.cardHeader}>
              <span className={styles.venueTag}>{venue.tag}</span>
            </div>

            <h3 className={styles.cardTitle}>{venue.title}</h3>

            {/* Event Pills */}
            <div className={styles.eventsHosted}>
              {venue.events.map((ev) => (
                <span key={ev} className={styles.eventPill}>
                  {ev}
                </span>
              ))}
            </div>

            <hr className={styles.cardDivider} />

            {/* Address */}
            <div className={styles.addressBlock}>
              <span className={styles.pinIcon}>📍</span>
              <p className={styles.addressText}>
                {venue.address.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < venue.address.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>

            {/* Map Button */}
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapButton}
            >
              View on Google Maps
              <span className={styles.mapArrow}>↗</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
