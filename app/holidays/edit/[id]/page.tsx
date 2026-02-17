"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [typeOpen, setTypeOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.typeDropdown}`)) {
        setTypeOpen(false);
      }
    };
    if (typeOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [typeOpen]);

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
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Edit Holiday</h2>
        <form onSubmit={handleSubmit} className={styles.formLayout}>
          <div className={styles.leftSection}>
            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Holiday Name</label>
                <input
                  type="text"
                  placeholder="Enter holiday name"
                  value={formData.holiday}
                  onChange={(e) => setFormData({ ...formData, holiday: e.target.value })}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Day</label>
                <input
                  type="text"
                  placeholder="Auto-filled"
                  value={formData.day}
                  readOnly
                  style={{ backgroundColor: 'var(--md-sys-color-surface-variant)', cursor: 'not-allowed' }}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Holiday Type</label>
                <div className={styles.typeDropdown}>
                  <button
                    type="button"
                    className={styles.dropdownBtn}
                    onClick={() => setTypeOpen(!typeOpen)}
                  >
                    {formData.type || 'Select'}
                  </button>
                  <div className={`${styles.dropdownMenu} ${typeOpen ? styles.show : ''}`}>
                    <button type="button" onClick={() => { setFormData(prev => ({ ...prev, type: 'Public' })); setTypeOpen(false); }}>Public</button>
                    <button type="button" onClick={() => { setFormData(prev => ({ ...prev, type: 'Religious' })); setTypeOpen(false); }}>Religious</button>
                    <button type="button" onClick={() => { setFormData(prev => ({ ...prev, type: 'Public/National' })); setTypeOpen(false); }}>Public/National</button>
                    <button type="button" onClick={() => { setFormData(prev => ({ ...prev, type: 'Optional' })); setTypeOpen(false); }}>Optional</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Button variant="outline" type="submit" size="md">
                Update Holiday
              </Button>
              <Button variant="outline" type="button" size="md" onClick={() => router.push('/holidays')}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
