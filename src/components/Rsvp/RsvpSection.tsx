'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RsvpSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function RsvpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Beautiful fade-up reveal perfectly mapped for the RSVP container
    gsap.fromTo(leftSideRef.current,
      { opacity: 0, y: 80, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%", // Trigger nicely right at the final scroll
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSfB_ameP3DVlliy2Y6ZH5Bj6DBWY2nmvgx2CZJlnqWmi-9ngQ/viewform";

  return (
    <section id="rsvp" className={styles.rsvpContainer} ref={sectionRef}>
      <div className={styles.contentWrapper}>

        {/* Central Card: Information */}
        <div className={styles.leftSide} ref={leftSideRef}>
          <h2 className={styles.title}>RSVP</h2>
          <h3 className={styles.subtitle}>Kindly let us know which events you’ll be joining</h3>
          <div className={styles.separator}></div>
          <p className={styles.subtext}>
            We would be delighted to celebrate with you. Please fill out the RSVP form and select the event or events you’ll be attending.
          </p>

          <ul className={styles.eventList}>
            <li>Engagement</li>
            <li>Haldi</li>
            <li>Mehndi</li>
            <li>Wedding</li>
          </ul>

          <a
            href={googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.submitBtn}
          >
            Open RSVP Form
          </a>
        </div>

      </div>
    </section>
  );
}
