'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/(Inputs)/Button/Button';
import Modal from '@/components/Modal/Modal';
import styles from './attendance.module.css';
import { attendanceData, getIcon, getIconColor } from '@/utils/data/attendance.data';
import { paginateData, calculateTotalPages, handleFormSubmit, handleInputChange } from './functions';

export default function AttendancePage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
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

  const handleStatusClick = (employee: any, dayIndex: number) => {
    const record = employee.details[dayIndex];
    setSelectedRecord({ ...record, employeeName: employee.name });
    setDetailModalOpen(true);
  };

  const getStatusLabel = (status: string) => {
    if (status === 'check') return 'Present';
    if (status === 'close') return 'Absent';
    return 'Medical Leave';
  };

  // close filter dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.filterDropdown}`)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [filterOpen]);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Attendance Sheet</h1>
        <button className={styles.addBtn} onClick={() => setModalOpen(true)}>+ Add Attendance</button>
      </div>

    <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

          <div className={styles.filterDropdown}>
            <button className={styles.filterBtn} onClick={() => setFilterOpen(!filterOpen)}>
              {filterStatus === 'all' ? 'All Status' : filterStatus}
            </button>
            <div className={`${styles.filterMenu} ${filterOpen ? styles.show : ''}`}>
              <button className={filterStatus === 'all' ? styles.active : ''} onClick={() => { setFilterStatus('all'); setFilterOpen(false); }}>All Status</button>
              <button className={filterStatus === 'active' ? styles.active : ''} onClick={() => { setFilterStatus('active'); setFilterOpen(false); }}>Active</button>
              <button className={filterStatus === 'completed' ? styles.active : ''} onClick={() => { setFilterStatus('completed'); setFilterOpen(false); }}>Completed</button>
              <button className={filterStatus === 'pending' ? styles.active : ''} onClick={() => { setFilterStatus('pending'); setFilterOpen(false); }}>Pending</button>
            </div>
          </div>

          {/* <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
            + Add Attendance
          </Button> */}
        </div>

      <div className={styles.container}>
    

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
                    <button
                      onClick={() => window.location.href = `/attendance/view/${emp.id}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%'
                      }}
                    >
                      <div className={styles.avatar}>
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span style={{
                        color: 'var(--md-sys-color-primary)',
                        textDecoration: 'underline',
                        textAlign: 'left'
                      }}>
                        {emp.name}
                      </span>
                    </button>
                  </td>
                  {emp.attendance.map((status, idx) => (
                    <td key={idx} className={styles.statusCell}>
                      <button
                        onClick={() => handleStatusClick(emp, idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          color: getIconColor(status),
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}
                        title={`Click to view details`}
                      >
                        {getIcon(status)}
                      </button>
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
                <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                  ✕
                </Button>
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
                  <Button variant="primary" type="submit" size="md">
                    + Add Attendance
                  </Button>
                  <Button variant="danger" type="button" size="md" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Detail Modal for Check-in/Check-out */}
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title={`${selectedRecord?.employeeName} - Attendance Details`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ 
                padding: '12px', 
                backgroundColor: 'var(--md-sys-color-surface-dim)',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)' }}>Date</div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px' }}>
                  {selectedRecord?.date ? new Date(selectedRecord.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  }) : '-'}
                </div>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: 'var(--md-sys-color-surface-dim)',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)' }}>Status</div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px', color: selectedRecord?.status === 'close' ? '#ef4444' : selectedRecord?.status === 'unknown_med' ? '#f59e0b' : '#10b981' }}>
                  {getStatusLabel(selectedRecord?.status)}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ 
                padding: '12px', 
                backgroundColor: 'var(--md-sys-color-surface-dim)',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)' }}>Check In</div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px', color: selectedRecord?.checkIn === '-' ? '#9ca3af' : 'var(--md-sys-color-on-surface)' }}>
                  {selectedRecord?.checkIn || '-'}
                </div>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: 'var(--md-sys-color-surface-dim)',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)' }}>Check Out</div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px', color: selectedRecord?.checkOut === '-' ? '#9ca3af' : 'var(--md-sys-color-on-surface)' }}>
                  {selectedRecord?.checkOut || '-'}
                </div>
              </div>
            </div>

            <div style={{ 
              padding: '12px', 
              backgroundColor: 'var(--md-sys-color-surface-dim)',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)' }}>Hours Worked</div>
              <div style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px' }}>
                {selectedRecord?.hoursWorked > 0 ? `${selectedRecord.hoursWorked.toFixed(2)}h` : '-'}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
