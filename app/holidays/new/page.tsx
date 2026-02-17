'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/(Inputs)/Button/Button';
import { handleDateChange } from '../functions';
import styles from './addHoliday.module.css';

export default function AddHolidayPage() {
  const [formData, setFormData] = useState({
    holiday: '',
    date: '',
    day: '',
    type: ''
  });
  const [typeOpen, setTypeOpen] = useState(false);

  const initialFormData = { holiday: '', date: '', day: '', type: '' };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Holiday:', formData);
    alert('Holiday added successfully!');
    setFormData(initialFormData);
    window.location.href = '/holidays';
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add New Holiday</h1>
      </div>

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
                onChange={(e) => handleDateChange(e.target.value, formData, setFormData)}
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
              + Add Holiday
            </Button>
            <Button 
              variant="outline" 
              type="button" 
              size="md" 
              onClick={() => window.location.href = '/holidays'}
            >
              Cancel
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}
