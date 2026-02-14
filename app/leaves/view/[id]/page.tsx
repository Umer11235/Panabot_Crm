"use client";

import { useParams, useRouter } from 'next/navigation';
import { leavesData } from '@/utils/data/leaves.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './view.module.css';

export default function ViewLeavePage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const leave = leavesData.find(l => l.id === decodedId);

  if (!leave) {
    return <div>Leave not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Leave Details</h1>
        <div className={styles.actions}>
          <Button variant="primary" size="sm" onClick={() => router.push(`/leaves/edit/${encodeURIComponent(leave.id)}`)}>
            Edit Leave
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push('/leaves')}>
            Back to List
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Employee Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Leave ID</label>
              <p>{leave.id}</p>
            </div>
            <div className={styles.field}>
              <label>Employee Name</label>
              <p>{leave.name}</p>
            </div>
            <div className={styles.field}>
              <label>Department</label>
              <p>{leave.department}</p>
            </div>
            <div className={styles.field}>
              <label>Position</label>
              <p>{leave.position}</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Leave Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Start Date</label>
              <p>{leave.startDate}</p>
            </div>
            <div className={styles.field}>
              <label>End Date</label>
              <p>{leave.endDate}</p>
            </div>
            <div className={styles.field}>
              <label>Duration</label>
              <p>{leave.duration}</p>
            </div>
            <div className={styles.field}>
              <label>Leave Type</label>
              <p>{leave.leaveType}</p>
            </div>
            <div className={styles.field}>
              <label>Approved By</label>
              <p>{leave.approvedBy}</p>
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <p className={styles[leave.status]}>{leave.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
