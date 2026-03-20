import styles from './LoadingScreen.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ isLoaded }: { isLoaded: boolean }) {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className={styles.loader}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: 'easeInOut' } }}
        >
          <div className={styles.loaderContent}>
            <div className={styles.spinner}>
              {/* CSS spinner to look like a flower or mandala */}
            </div>
            <h1 className="script-text">Karthik & Sneha</h1>
            <p className={styles.waitText}>Preparing the Celebration...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
