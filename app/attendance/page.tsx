'use client';
import { useState } from 'react';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './attendance.module.css';
import { attendanceData, getIcon, getIconColor } from '@/utils/data/attendance.data';
import { paginateData, calculateTotalPages, handleFormSubmit, handleInputChange } from './functions';

export default function AttendancePage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employee: '',
    date: '',
    status: ''
  });

  const { paginatedData, startIndex, endIndex } = paginateData(attendanceData, page, pageSize);
  const totalPages = calculateTotalPages(attendanceData.length, pageSize);

  const initialFormData = { employee: '', date: '', status: '' };

  const handleSubmit = (e: React.FormEvent) => {
    handleFormSubmit(e, formData, setModalOpen, setFormData, initialFormData, 'Attendance added successfully!');
  };

  return (
    <div>
      <h1 style={{
        font: 'var(--md-sys-typescale-headline-medium)',
        color: 'var(--md-sys-color-on-surface)',
        marginBottom: '24px'
      }}>Attendance Sheet</h1>

      <div className={styles.container}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <button onClick={() => setModalOpen(true)} className={styles.addButton}>
            + Add Attendance
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.nameColumn}>Employee Name</th>
                {Array.from({ length: 30 }, (_, i) => (
                  <th key={i} className={styles.dayColumn}>{String(i + 1).padStart(2, '0')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((emp) => (
                <tr key={emp.id}>
                  <td className={styles.nameCell}>
                    <div className={styles.employeeInfo}>
                      <div className={styles.avatar}>
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{emp.name}</span>
                    </div>
                  </td>
                  {emp.attendance.map((status, idx) => (
                    <td key={idx} className={styles.statusCell}>
                      <span style={{ color: getIconColor(status), fontSize: '16px', fontWeight: 'bold' }}>
                        {getIcon(status)}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.footer}>
          <p>Showing {startIndex + 1} to {Math.min(endIndex, attendanceData.length)} of {attendanceData.length} entries</p>
          <div className={styles.pagination}>
            <button
              className={styles.arrowBtn}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ←
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`${styles.pageBtn} ${page === i + 1 ? styles.active : ''}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={styles.arrowBtn}
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              →
            </button>
          </div>
        </div>

        {modalOpen && (
          <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Add Attendance</h2>
                <button onClick={() => setModalOpen(false)} className={styles.closeBtn}>✕</button>
              </div>
              <form onSubmit={handleSubmit} className={styles.modalForm}>
                <div className={styles.field}>
                  <label>Employee</label>
                  <select
                    value={formData.employee}
                    onChange={(e) => handleInputChange(formData, setFormData, 'employee', e.target.value)}
                    required
                  >
                    <option value="">Select employee</option>
                    {attendanceData.map(emp => (
                      <option key={emp.id} value={emp.name}>{emp.name}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange(formData, setFormData, 'date', e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange(formData, setFormData, 'status', e.target.value)}
                    required
                  >
                    <option value="">Select status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Half Day">Half Day</option>
                  </select>
                </div>
                <div className={styles.modalActions}>
                  <Button variant="primary" type="submit" size="sm">
                    + Add Attendance
                  </Button>
                  <Button variant="danger" type="button" size="sm" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
