"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { departmentsData } from '@/utils/data/departments.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './edit.module.css';

export default function EditDepartmentPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const department = departmentsData.find(d => d.id === decodedId);

  const [formData, setFormData] = useState({
    department: department?.department || '',
    head: department?.head || '',
    email: department?.email || '',
    phone: department?.phone || '',
    employees: department?.employees || 0,
    budget: department?.budget || ''
  });

  if (!department) {
    return <div>Department not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated department:', formData);
    alert('Department updated successfully!');
    router.push('/departments');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Edit Department</h2>
        <form onSubmit={handleSubmit} className={styles.formLayout}>
          <div className={styles.leftSection}>
            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Department Name</label>
                <input
                  type="text"
                  placeholder="Enter department name"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Head of Department</label>
                <input
                  type="text"
                  placeholder="Enter head name"
                  value={formData.head}
                  onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Contact Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Number of Employees</label>
                <input
                  type="number"
                  placeholder="Enter number"
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Budget</label>
                <input
                  type="text"
                  placeholder="Enter budget (e.g., $500,000)"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className={styles.actions}>
              <Button variant="outline" type="submit" size="md">
                Update Department
              </Button>
              <Button variant="outline" type="button" size="md" onClick={() => router.push('/departments')}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
