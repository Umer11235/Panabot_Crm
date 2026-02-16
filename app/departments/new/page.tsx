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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add New Department</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Department Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Department Name</label>
              <input
                type="text"
                placeholder="Enter department name"
                value={formData.department}
                onChange={(e) => handleInputChange(formData, setFormData, 'department', e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Head of Department</label>
              <input
                type="text"
                placeholder="Enter head name"
                value={formData.head}
                onChange={(e) => handleInputChange(formData, setFormData, 'head', e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Contact Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => handleInputChange(formData, setFormData, 'email', e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange(formData, setFormData, 'phone', e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Number of Employees</label>
              <input
                type="number"
                placeholder="Enter number"
                value={formData.employees}
                onChange={(e) => handleInputChange(formData, setFormData, 'employees', e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
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
        </div>

        <div className={styles.actions}>
          <Button variant="primary" type="submit" size="md">
            + Add Department
          </Button>
          <Button 
            variant="outline" 
            type="button" 
            size="md" 
            onClick={() => window.location.href = '/departments'}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
