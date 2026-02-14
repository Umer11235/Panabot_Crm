"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { leavesData } from '@/utils/data/leaves.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './edit.module.css';

export default function EditLeavePage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const leave = leavesData.find(l => l.id === decodedId);

  const [formData, setFormData] = useState({
    name: leave?.name || '',
    department: leave?.department || '',
    position: leave?.position || '',
    startDate: leave?.startDate || '',
    endDate: leave?.endDate || '',
    leaveType: leave?.leaveType || '',
    approvedBy: leave?.approvedBy || '',
    status: leave?.status || ''
  });

  if (!leave) {
    return <div>Leave not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated leave:', formData);
    alert('Leave updated successfully!');
    router.push('/leaves');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Leave</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Employee Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Employee Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Leave Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Leave Type</label>
              <input
                type="text"
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Approved By</label>
              <input
                type="text"
                value={formData.approvedBy}
                onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="">Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Denied">Denied</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" type="submit" size="md">
            Update Leave
          </Button>
          <Button variant="outline" type="button" size="md" onClick={() => router.push('/leaves')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
