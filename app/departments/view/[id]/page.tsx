"use client";

import { useParams, useRouter } from 'next/navigation';
import { departmentsData } from '@/utils/data/departments.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './view.module.css';

export default function ViewDepartmentPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const department = departmentsData.find(d => d.id === decodedId);

  if (!department) {
    return <div>Department not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Department Details</h1>
        <div className={styles.actions}>
          <Button variant="outline" size="md" onClick={() => router.push(`/departments/edit/${encodeURIComponent(department.id)}`)}>
            Edit Department
          </Button>
          <Button variant="outline" size="md" onClick={() => router.push('/departments')}>
            Back to List
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Department Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Department ID</label>
              <p>{department.id}</p>
            </div>
            <div className={styles.field}>
              <label>Department Name</label>
              <p>{department.department}</p>
            </div>
            <div className={styles.field}>
              <label>Head of Department</label>
              <p>{department.head}</p>
            </div>
            <div className={styles.field}>
              <label>Contact Email</label>
              <p>{department.email}</p>
            </div>
            <div className={styles.field}>
              <label>Phone Number</label>
              <p>{department.phone}</p>
            </div>
            <div className={styles.field}>
              <label>Number of Employees</label>
              <p>{department.employees}</p>
            </div>
            <div className={styles.field}>
              <label>Budget</label>
              <p>{department.budget}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
