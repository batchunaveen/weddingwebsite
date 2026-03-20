import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

const eventDetails = {
  haldi: { title: 'Haldi Ceremony', img: '/images/Haldi.png', time: '10:00 AM, Sunday, 26th April 2026', desc: 'A beautiful morning filled with laughter, blessings, and the vibrant splash of turmeric to commence our lifelong journey.' },
  'pelli-kuturu': { title: 'Pelli Kuturu', img: '/images/PelliKuturu.png', time: '3:00 PM, Sunday, 26th April 2026', desc: 'The elegant transition into the bride and groom alongside traditional rituals spanning generations.' },
  engagement: { title: 'The Engagement', img: '/images/Engagement.png', time: '7:30 PM, Sunday, 26th April 2026', desc: 'An intimate evening where families unite and we publicly exchange rings, declaring our loving commitment to one another.' },
  marriage: { title: 'The Marriage', img: '/images/Marriage.png', time: '9:30 AM (Muhurtham), Monday, 27th April 2026', desc: 'The most auspicious hour where we tie the holy knot, stepping into a new chapter of our lives together.' },
  reception: { title: 'Wedding Reception', img: '/images/Reception.png', time: '7:00 PM, Monday, 27th April 2026', desc: 'Join us for a spectacular evening of dining, joy, and dancing as we celebrate our very first grand night as husband and wife.' }
};

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const data = eventDetails[resolvedParams.id as keyof typeof eventDetails];
  
  if (!data) return notFound();

  return (
    <main className={styles.eventMain}>
      
      {/* Fixed Interactive Nav */}
      <Link href="/" className={styles.backButton}>
        ← Back to Events
      </Link>
      
      {/* Cinematic Full Screen Entry Hero */}
      <section className={styles.heroSection}>
         <Image 
           src={data.img} 
           alt={data.title} 
           fill 
           className={styles.heroBg} 
           priority
         />
         <div className={styles.vignetteOverlay}></div>
         
         <div className={styles.heroTextContent}>
           <p className={styles.ceremonyLabel}>Wedding Ceremony</p>
           <h1 className={styles.eventTitle}>{data.title}</h1>
           <div className={styles.separator}></div>
         </div>
      </section>

      {/* Cinematic Details Fold (Lenis targets this perfectly) */}
      <section className={styles.storySection}>
          <div className={styles.storyCard}>
            <h2 className={styles.timeLabel}>{data.time}</h2>
            <p className={styles.storyDescription}>{data.desc}</p>
          </div>
      </section>

    </main>
  );
}
