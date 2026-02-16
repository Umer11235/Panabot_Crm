'use client';
import { useState } from 'react';
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

  const initialFormData = { holiday: '', date: '', day: '', type: '' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Holiday:', formData);
    alert('Holiday added successfully!');
    setFormData(initialFormData);
    window.location.href = '/holidays';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add New Holiday</h1>
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
                onChange={(e) => handleDateChange(e.target.value, formData, setFormData)}
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
      </form>
    </div>
  );
}
