"use client";

import { useParams, useRouter } from 'next/navigation';
import { employeesData } from '@/utils/data/employees.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './view.module.css';

export default function ViewEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const employee = employeesData.find(e => e.id === decodedId);

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Employee Details</h1>
        <div className={styles.actions}>
          <Button variant="primary" size="sm" onClick={() => router.push(`/employees/edit/${encodeURIComponent(employee.id)}`)}>
            Edit Employee
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push('/employees')}>
            Back to List
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Employee ID</label>
              <p>{employee.id}</p>
            </div>
            <div className={styles.field}>
              <label>Full Name</label>
              <p>{employee.name}</p>
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <p>{employee.email}</p>
            </div>
            <div className={styles.field}>
              <label>Contact</label>
              <p>{employee.contact}</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Job Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Department</label>
              <p>{employee.department}</p>
            </div>
            <div className={styles.field}>
              <label>Position</label>
              <p>{employee.position}</p>
            </div>
            <div className={styles.field}>
              <label>Hire Date</label>
              <p>{employee.hireDate}</p>
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <p className={styles[employee.status.replace(' ', '')]}>{employee.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
