'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './addAttendance.module.css';
import { attendanceData } from '@/utils/data/attendance.data';

export default function AddAttendancePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ employee: '', date: '', status: '' });
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.employeeDropdown}`)) setEmployeeOpen(false);
      if (!target.closest(`.${styles.statusDropdown}`)) setStatusOpen(false);
    };
    if (employeeOpen || statusOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [employeeOpen, statusOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attendance:', formData);
    alert('Attendance added successfully!');
    router.push('/attendance');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add Attendance</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Employee</label>
          <div className={styles.employeeDropdown}>
            <button type="button" className={styles.dropdownBtn} onClick={() => setEmployeeOpen(!employeeOpen)}>
              {formData.employee || 'Select employee'}
            </button>
            <div className={`${styles.dropdownMenu} ${employeeOpen ? styles.show : ''}`}>
              {attendanceData.map(emp => (
                <button key={emp.id} type="button" onClick={() => { setFormData(prev => ({ ...prev, employee: emp.name })); setEmployeeOpen(false); }}>{emp.name}</button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.field}>
          <label>Date</label>
          <input type="date" value={formData.date} onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))} required />
        </div>

        <div className={styles.field}>
          <label>Status</label>
          <div className={styles.statusDropdown}>
            <button type="button" className={styles.dropdownBtn} onClick={() => setStatusOpen(!statusOpen)}>
              {formData.status || 'Select status'}
            </button>
            <div className={`${styles.dropdownMenu} ${statusOpen ? styles.show : ''}`}>
              <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Present' })); setStatusOpen(false); }}>Present</button>
              <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Absent' })); setStatusOpen(false); }}>Absent</button>
              <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Half Day' })); setStatusOpen(false); }}>Half Day</button>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="outline" type="submit" size="md">+ Add Attendance</Button>
          <Button variant="outline" type="button" size="md" onClick={() => router.push('/attendance')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
