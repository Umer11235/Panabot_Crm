import styles from './SocialStatCard.module.css';
import { SocialStatCardProps } from '@/utils/types/socialstat.types';
export default function SocialStatCard({ 
  platform, 
  icon, 
  followers, 
  growth, 
  isPositive = true 
}: SocialStatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={icon} alt={platform} className={styles.icon} />
        <span className={styles.platform}>{platform}</span>
      </div>
      <div className={styles.stats}>
        <h3 className={styles.followers}>{followers}</h3>
        <span className={`${styles.growth} ${isPositive ? styles.positive : styles.negative}`}>
          {isPositive ? 'â†‘' : 'â†“'} {growth}
        </span>
      </div>
    </div>
  );
}
