'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './addAttendance.module.css';
import { attendanceData } from '@/utils/data/attendance.data';
import { handleInputChange } from '../functions';

export default function AddAttendancePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ employee: '', date: '', status: '' });
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const employeeOptions = useMemo(
    () => Array.from(new Set(attendanceData.map((emp) => emp.name))),
    []
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.employeeDropdown}`)) {
        setEmployeeOpen(false);
      }
      if (!target.closest(`.${styles.statusDropdown}`)) {
        setStatusOpen(false);
      }
    };

    if (employeeOpen || statusOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [employeeOpen, statusOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attendance:', formData);
    alert('Attendance added successfully!');
    router.push('/attendance');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Add Attendance</h2>
        <form onSubmit={handleSubmit} className={styles.formLayout}>
          <div className={styles.leftSection}>
            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Employee</label>
                <div className={styles.employeeDropdown}>
                  <button
                    type="button"
                    className={styles.dropdownBtn}
                    onClick={() => setEmployeeOpen((prev) => !prev)}
                  >
                    {formData.employee || 'Select employee'}
                  </button>
                  <div className={`${styles.dropdownMenu} ${employeeOpen ? styles.show : ''}`}>
                    {employeeOptions.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => {
                          handleInputChange(formData, setFormData, 'employee', name);
                          setEmployeeOpen(false);
                        }}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange(formData, setFormData, 'date', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Status</label>
                <div className={styles.statusDropdown}>
                  <button
                    type="button"
                    className={styles.dropdownBtn}
                    onClick={() => setStatusOpen((prev) => !prev)}
                  >
                    {formData.status || 'Select status'}
                  </button>
                  <div className={`${styles.dropdownMenu} ${statusOpen ? styles.show : ''}`}>
                    <button
                      type="button"
                      onClick={() => {
                        handleInputChange(formData, setFormData, 'status', 'Present');
                        setStatusOpen(false);
                      }}
                    >
                      Present
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleInputChange(formData, setFormData, 'status', 'Absent');
                        setStatusOpen(false);
                      }}
                    >
                      Absent
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleInputChange(formData, setFormData, 'status', 'Half Day');
                        setStatusOpen(false);
                      }}
                    >
                      Half Day
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Button variant="outline" type="submit" size="md">
                + Add Attendance
              </Button>
              <Button variant="outline" type="button" size="md" onClick={() => router.push('/attendance')}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
