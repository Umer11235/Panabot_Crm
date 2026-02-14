"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { holidaysData, getDayFromDate } from '@/utils/data/holidays.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './edit.module.css';

export default function EditHolidayPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const holiday = holidaysData.find(h => h.id === decodedId);

  const [formData, setFormData] = useState({
    holiday: holiday?.holiday || '',
    date: holiday?.date || '',
    day: holiday?.day || '',
    type: holiday?.type || ''
  });

  if (!holiday) {
    return <div>Holiday not found</div>;
  }

  const handleDateChange = (dateValue: string) => {
    const day = getDayFromDate(dateValue);
    setFormData({ ...formData, date: dateValue, day });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated holiday:', formData);
    alert('Holiday updated successfully!');
    router.push('/holidays');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Holiday</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Holiday Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Holiday Name</label>
              <input
                type="text"
                placeholder="Enter holiday name"
                value={formData.holiday}
                onChange={(e) => setFormData({ ...formData, holiday: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleDateChange(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Day</label>
              <input
                type="text"
                placeholder="Auto-filled"
                value={formData.day}
                readOnly
                style={{ backgroundColor: 'var(--md-sys-color-surface-variant)', cursor: 'not-allowed' }}
              />
            </div>
            <div className={styles.field}>
              <label>Holiday Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="">Select</option>
                <option value="Public">Public</option>
                <option value="Religious">Religious</option>
                <option value="Public/National">Public/National</option>
                <option value="Optional">Optional</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" type="submit" size="md">
            Update Holiday
          </Button>
          <Button variant="outline" type="button" size="md" onClick={() => router.push('/holidays')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
