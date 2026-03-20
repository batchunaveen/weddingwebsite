'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RsvpSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function RsvpSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Beautiful fade-up reveal perfectly mapped for the RSVP container
    gsap.fromTo([textRef.current, formRef.current],
      { opacity: 0, y: 80, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.2, // Text reveals first, then the form
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%", // Trigger nicely right at the final scroll
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your RSVP! We're thrilled to celebrate with you.");
  };

  return (
    <section className={styles.rsvpContainer}>
      {/* Dynamic Floating Form Card */}
      <div className={styles.contentWrapper}>

        {/* RSVP Topology Component */}
        <div className={styles.textContainer} ref={textRef}>
          <h2 className={styles.title}>Kindly RSVP</h2>
          <div className={styles.separator}></div>
          <p className={styles.subtext}>
            We would be absolutely honored by your presence. Please let us know if you and your family will be joining us.
          </p>
        </div>

        {/* Input Interactive DOM */}
        <form className={styles.rsvpForm} ref={formRef} onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <input type="text" id="name" required placeholder="Full Name(s)" className={styles.inputField} />
          </div>

          <div className={styles.inputGroup}>
            <select id="attendance" required className={styles.inputField} defaultValue="">
              <option value="" disabled hidden>Will you be attending?</option>
              <option value="yes">Joyfully Accepts!</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <input type="number" id="guests" min="1" max="10" placeholder="Number of Guests" className={styles.inputField} />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send RSVP Status
          </button>
        </form>

      </div>
    </section>
  );
}
