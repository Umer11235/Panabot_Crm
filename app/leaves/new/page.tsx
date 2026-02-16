'use client';
import { useState, useEffect } from 'react';
// FileUpload removed for leaves form
import Button from '@/components/(Inputs)/Button/Button';
import styles from './addLeave.module.css';
import { calculateDuration, handleFormChange } from './functions';

export default function AddLeavePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    department: '',
    position: '',
    startDate: '',
    endDate: '',
    duration: '',
    leaveType: '',
    status: '',
    approvedBy: ''
  });
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [positionOpen, setPositionOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [leaveTypeOpen, setLeaveTypeOpen] = useState(false);

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
      if (!target.closest(`.${styles.leaveTypeDropdown}`)) {
        setLeaveTypeOpen(false);
      }
    };
    if (departmentOpen || positionOpen || statusOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [departmentOpen, positionOpen, statusOpen]);

  useEffect(() => {
    const duration = calculateDuration(formData.startDate, formData.endDate);
    if (duration) {
      setFormData(prev => ({ ...prev, duration }));
    }
  }, [formData.startDate, formData.endDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleFormChange(formData, setFormData, e);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Leave Data:', formData);
    alert('Leave added successfully!');
  };
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add Leave</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles.formLayout}>
        <div className={styles.leftSection}>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>Employee Name</label>
              <input
                type="text"
                name="employeeName"
                placeholder="Enter employee name"
                value={formData.employeeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Employee ID</label>
              <input
                type="text"
                name="employeeId"
                placeholder="Enter employee ID"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
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
          </div>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                placeholder="Auto calculate"
                value={formData.duration}
                readOnly
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Leave Type</label>
              <div className={styles.leaveTypeDropdown}>
                <button
                  type="button"
                  className={styles.dropdownBtn}
                  onClick={() => setLeaveTypeOpen(!leaveTypeOpen)}
                >
                  {formData.leaveType || 'Select type'}
                </button>
                <div className={`${styles.dropdownMenu} ${leaveTypeOpen ? styles.show : ''}`}>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, leaveType: 'Annual vacation' })); setLeaveTypeOpen(false); }}>Annual vacation</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, leaveType: 'Sick Leave' })); setLeaveTypeOpen(false); }}>Sick Leave</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, leaveType: 'Personal' })); setLeaveTypeOpen(false); }}>Personal</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, leaveType: 'Casual Leave' })); setLeaveTypeOpen(false); }}>Casual Leave</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, leaveType: 'Family vacation' })); setLeaveTypeOpen(false); }}>Family vacation</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, leaveType: 'Childbirth' })); setLeaveTypeOpen(false); }}>Childbirth</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, leaveType: 'Surgery recovery' })); setLeaveTypeOpen(false); }}>Surgery recovery</button>
                </div>
              </div>
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
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Approved' })); setStatusOpen(false); }}>Approved</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Pending' })); setStatusOpen(false); }}>Pending</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Denied' })); setStatusOpen(false); }}>Denied</button>
                </div>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label>Approved By</label>
              <input
                type="text"
                name="approvedBy"
                placeholder="Enter approval name"
                value={formData.approvedBy}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.actions}>
            <Button variant="outline" type="submit" size="md">
              + Add Leave
            </Button>
            <Button variant="outline" type="button" size="md" onClick={() => window.location.href = '/leaves'}>
              Cancel
            </Button>
          </div>
        </div>
        {/* Employee Photo removed as requested */}
      </form>
    </div>
  );
}
