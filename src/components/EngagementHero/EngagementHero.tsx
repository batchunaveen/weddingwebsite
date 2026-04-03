import React from 'react';
import Image from 'next/image';
import styles from './EngagementHero.module.scss';

export default function EngagementHero() {
  return (
    <section id="invite-card" className={styles.heroContainer}>
      
      {/* Left Column: Typography Layout */}
      <div className={styles.leftColumn}>
        <div className={styles.textContent}>
          <p className={styles.subtitle}>Celebrate</p>
          <h1 className={styles.title}>The Engagement</h1>
          <div className={styles.separator}></div>
          <p className={styles.romanticSubtext}>Beginning our forever with love and joy</p>
        </div>
      </div>

      {/* Right Column: Simple Photo Card Layout */}
      <div className={styles.rightColumn}>
        <div className={styles.photoCard}>
          <Image 
            src="/images/Engagement_Final.png" 
            alt="The Engagement Couple"
            fill
            className={styles.photoImage}
            priority
          />
        </div>
      </div>

    </section>
  );
}
