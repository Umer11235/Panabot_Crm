"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { employeesData } from '@/utils/data/employees.data';
import Button from '@/components/(Inputs)/Button/Button';
import FileUpload from '@/components/FileUpload/FileUpload';
import styles from './edit.module.css';

export default function EditEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const employee = employeesData.find(e => e.id === decodedId);

  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    firstName: employee?.name.split(' ')[0] || '',
    lastName: employee?.name.split(' ').slice(1).join(' ') || '',
    employeeId: employee?.id || '',
    email: employee?.email || '',
    contact: employee?.contact || '',
    department: employee?.department || '',
    position: employee?.position || '',
    hireDate: employee?.hireDate || '',
    status: employee?.status || '',
    salary: ''
  });
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [positionOpen, setPositionOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.departmentDropdown}`)) {
        setDepartmentOpen(false);
      }
      if (!target.closest(`.${styles.positionDropdown}`)) {
        setPositionOpen(false);
      }
      if (!target.closest(`.${styles.statusDropdown}`)) {
        setStatusOpen(false);
      }
    };
    if (departmentOpen || positionOpen || statusOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [departmentOpen, positionOpen, statusOpen]);

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated employee:', formData);
    alert('Employee updated successfully!');
    router.push('/employees');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Employee</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles.formLayout}>
        <div className={styles.leftSection}>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>Employee ID</label>
              <input
                type="text"
                name="employeeId"
                placeholder="Enter ID"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>Contact</label>
              <input
                type="tel"
                name="contact"
                placeholder="Enter contact number"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Department</label>
              <div className={styles.departmentDropdown}>
                <button
                  type="button"
                  className={styles.dropdownBtn}
                  onClick={() => setDepartmentOpen(!departmentOpen)}
                >
                  {formData.department || 'Select department'}
                </button>
                <div className={`${styles.dropdownMenu} ${departmentOpen ? styles.show : ''}`}>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, department: 'Sales' })); setDepartmentOpen(false); }}>Sales</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, department: 'Marketing' })); setDepartmentOpen(false); }}>Marketing</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, department: 'IT' })); setDepartmentOpen(false); }}>IT</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, department: 'Finance' })); setDepartmentOpen(false); }}>Finance</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, department: 'HR' })); setDepartmentOpen(false); }}>HR</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, department: 'Operations' })); setDepartmentOpen(false); }}>Operations</button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>Position</label>
              <div className={styles.positionDropdown}>
                <button
                  type="button"
                  className={styles.dropdownBtn}
                  onClick={() => setPositionOpen(!positionOpen)}
                >
                  {formData.position || 'Select position'}
                </button>
                <div className={`${styles.dropdownMenu} ${positionOpen ? styles.show : ''}`}>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, position: 'Manager' })); setPositionOpen(false); }}>Manager</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, position: 'Executive' })); setPositionOpen(false); }}>Executive</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, position: 'Developer' })); setPositionOpen(false); }}>Developer</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, position: 'Designer' })); setPositionOpen(false); }}>Designer</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, position: 'Analyst' })); setPositionOpen(false); }}>Analyst</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, position: 'Coordinator' })); setPositionOpen(false); }}>Coordinator</button>
                </div>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label>Hire Date</label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
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
                  onClick={() => setStatusOpen(!statusOpen)}
                >
                  {formData.status || 'Select status'}
                </button>
                <div className={`${styles.dropdownMenu} ${statusOpen ? styles.show : ''}`}>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Full Time' })); setStatusOpen(false); }}>Full Time</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Part Time' })); setStatusOpen(false); }}>Part Time</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Internship' })); setStatusOpen(false); }}>Internship</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Remote' })); setStatusOpen(false); }}>Remote</button>
                </div>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.actions}>
            <Button variant="outline" type="submit" size="md">
              Update Employee
            </Button>
            <Button variant="outline" type="button" size="md" onClick={() => router.push('/employees')}>
              Cancel
            </Button>
          </div>
        </div>
        <div className={styles.rightSection}>
          <FileUpload
            name="photo"
            label="Employee Photo"
            multiple={false}
            accept="image/*"
            files={files}
            setFiles={setFiles}
          />
        </div>
      </form>
    </div>
  );
}