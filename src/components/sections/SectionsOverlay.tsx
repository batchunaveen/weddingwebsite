import styles from './SectionsOverlay.module.scss';

export default function SectionsOverlay() {
  return (
    <div className={styles.overlayContainer}>
      
      {/* 1. Intro (Cover - Center Right) */}
      <section className={styles.section} id="scene-1-intro">
        <div className={styles.contentLayerRight}>
          <div className={styles.scrollHint}>
            <span>Scroll to Open Book</span>
            <div className={styles.mouse}></div>
          </div>
        </div>
      </section>

      {/* 2. Engagement (Page 1 Back - Left) */}
      <section className={styles.section} id="scene-2-engagement">
        <div className={styles.contentLayerLeft}>
          <h2 className="script-text">Engagement</h2>
          <div className={styles.eventDetails}>
            <p>Sunday, 26th April 2026</p>
            <p>7:30 PM</p>
          </div>
        </div>
      </section>

      {/* 3. Haldi (Page 2 Front - Right) */}
      <section className={styles.section} id="scene-3-haldi">
        <div className={styles.contentLayerRight}>
          <h2 className="script-text" style={{ color: 'var(--color-marigold)' }}>Haldi</h2>
          <div className={styles.eventDetails}>
            <p>Sunday, 26th April 2026</p>
            <p>Morning Festivities</p>
          </div>
        </div>
      </section>

      {/* 4. Pelli Kuturu (Page 2 Back - Left) */}
      <section className={styles.section} id="scene-4-pellikuturu">
        <div className={styles.contentLayerLeft}>
          <div className={styles.textBlockBottom}>
            <h2 className="script-text">Pelli Kuturu</h2>
            <p>A celebration of blessings, beauty, and tradition</p>
          </div>
        </div>
      </section>

      {/* 5. Marriage / Muhurtham (Page 3 Front - Right) */}
      <section className={styles.section} id="scene-5-marriage">
        <div className={styles.contentLayerRight}>
          <div className={styles.textBlockTop}>
            <h2 className="script-text" style={{ color: 'var(--color-cream)' }}>Muhurtham</h2>
            <div className={styles.eventDetails}>
              <p>Monday, 27th April 2026</p>
              <p>9:30 AM</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Reception (Page 3 Back - Left) */}
      <section className={styles.section} id="scene-6-reception">
        <div className={styles.contentLayerLeft}>
          <h2 className="script-text">Reception</h2>
          <div className={styles.eventDetails}>
            <p>An evening of celebration, music, and joy</p>
            <p>Monday, 27th April 2026 | 7:00 PM</p>
          </div>
        </div>
      </section>

      {/* 7. Closing / RSVP (Page 4 Front - Right) */}
      <section className={styles.section} id="scene-7-closing">
        <div className={styles.contentLayerRight}>
          <h2 className="script-text">With Joy & Blessings</h2>
          <p className={styles.closingDesc}>We look forward to sharing our happiness with you.</p>
          
          <div className={styles.actions}>
            <button className={styles.btn}>RSVP</button>
            <button className={styles.btnOutline}>View Venue</button>
          </div>
        </div>
      </section>
      
    </div>
  );
}
