"use client";

import { useParams, useRouter } from 'next/navigation';
import { holidaysData } from '@/utils/data/holidays.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './view.module.css';

export default function ViewHolidayPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const holiday = holidaysData.find(h => h.id === decodedId);

  if (!holiday) {
    return <div>Holiday not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Holiday Details</h1>
        <div className={styles.actions}>
          <Button variant="outline" size="md" onClick={() => router.push(`/holidays/edit/${encodeURIComponent(holiday.id)}`)}>
            Edit Holiday
          </Button>
          <Button variant="outline" size="md" onClick={() => router.push('/holidays')}>
            Back to List
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Holiday Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Holiday ID</label>
              <p>{holiday.id}</p>
            </div>
            <div className={styles.field}>
              <label>Holiday Name</label>
              <p>{holiday.holiday}</p>
            </div>
            <div className={styles.field}>
              <label>Date</label>
              <p>{holiday.date}</p>
            </div>
            <div className={styles.field}>
              <label>Day</label>
              <p>{holiday.day}</p>
            </div>
            <div className={styles.field}>
              <label>Holiday Type</label>
              <p>{holiday.type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
