'use client';
import { useState } from 'react';
import Button from '@/components/(Inputs)/Button/Button';
import { handleInputChange } from '../functions';
import styles from './addDepartment.module.css';

export default function AddDepartmentPage() {
  const [formData, setFormData] = useState({
    department: '',
    head: '',
    email: '',
    phone: '',
    employees: '',
    budget: ''
  });

  const initialFormData = { department: '', head: '', email: '', phone: '', employees: '', budget: '' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Department:', formData);
    alert('Department added successfully!');
    setFormData(initialFormData);
    window.location.href = '/departments';
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Add New Department</h2>
        <form onSubmit={handleSubmit} className={styles.formLayout}>
          <div className={styles.leftSection}>
            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Department Name</label>
                <input
                  type="text"
                  placeholder="Enter department name"
                  value={formData.department}
                  onChange={(e) => handleInputChange(formData, setFormData, 'department', e.target.value)}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Head of Department</label>
                <input
                  type="text"
                  placeholder="Enter head name"
                  value={formData.head}
                  onChange={(e) => handleInputChange(formData, setFormData, 'head', e.target.value)}
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
                  onChange={(e) => handleInputChange(formData, setFormData, 'email', e.target.value)}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange(formData, setFormData, 'phone', e.target.value)}
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
                  onChange={(e) => handleInputChange(formData, setFormData, 'employees', e.target.value)}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Budget</label>
                <input
                  type="text"
                  placeholder="Enter budget (e.g., $500,000)"
                  value={formData.budget}
                  onChange={(e) => handleInputChange(formData, setFormData, 'budget', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.actions}>
              <Button variant="outline" type="submit" size="md">
                + Add Department
              </Button>
              <Button variant="outline" type="button" size="md" onClick={() => window.location.href = '/departments'}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
