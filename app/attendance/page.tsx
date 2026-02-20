'use client';
import { useState, useEffect } from 'react';
import ListPageHeader from '@/components/ListPage/ListPageHeader';
import SearchFilterBar from '@/components/ListPage/SearchFilterBar';
import styles from './attendance.module.css';
import { attendanceData, getIcon, getIconColor } from '@/utils/data/attendance.data';
import { paginateData, calculateTotalPages } from './functions';

export default function AttendancePage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const { paginatedData, startIndex, endIndex } = paginateData(attendanceData, page, pageSize);
  const totalPages = calculateTotalPages(attendanceData.length, pageSize);



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
      <ListPageHeader
        title="Attendance Sheet"
        classes={{ header: styles.header, title: styles.title, addBtn: styles.addBtn }}
        addButtonText="+ Add Attendance"
        onAdd={() => window.location.href = '/attendance/new'}
      />

      <SearchFilterBar
        classes={{
          searchBar: styles.searchBar,
          searchInput: styles.searchInput,
          filterDropdown: styles.filterDropdown,
          filterBtn: styles.filterBtn,
          filterMenu: styles.filterMenu,
          show: styles.show,
          active: styles.active,
        }}
        searchPlaceholder="Search..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterLabel={filterStatus === 'all' ? 'All Status' : filterStatus}
        filterOpen={filterOpen}
        onToggleFilter={() => setFilterOpen(!filterOpen)}
        filterValue={filterStatus}
        filterOptions={[
          { value: 'all', label: 'All Status' },
          { value: 'active', label: 'Active' },
          { value: 'completed', label: 'Completed' },
          { value: 'pending', label: 'Pending' },
        ]}
        onSelectFilter={(value) => {
          setFilterStatus(value);
          setFilterOpen(false);
        }}
      />

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



        {/* Detail Modal for Check-in/Check-out */}
        {detailModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h3>{`${selectedRecord?.employeeName} - Attendance Details`}</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setDetailModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className={styles.modalBody}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: 500,
                        color: 'var(--md-sys-color-on-surface)',
                        marginBottom: '6px'
                      }}>Date</div>
                      <div style={{ 
                        fontSize: '15px', 
                        fontWeight: 400,
                        color: 'var(--md-sys-color-on-surface)'
                      }}>
                        {selectedRecord?.date ? new Date(selectedRecord.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        }) : '-'}
                      </div>
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: 500,
                        color: 'var(--md-sys-color-on-surface)',
                        marginBottom: '6px'
                      }}>Status</div>
                      <div style={{ 
                        fontSize: '15px', 
                        fontWeight: 400,
                        color: 'var(--md-sys-color-on-surface)'
                      }}>
                        {getStatusLabel(selectedRecord?.status)}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: 500,
                        color: 'var(--md-sys-color-on-surface)',
                        marginBottom: '6px'
                      }}>Check In</div>
                      <div style={{ 
                        fontSize: '15px', 
                        fontWeight: 400,
                        color: 'var(--md-sys-color-on-surface)'
                      }}>
                        {selectedRecord?.checkIn || '-'}
                      </div>
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: 500,
                        color: 'var(--md-sys-color-on-surface)',
                        marginBottom: '6px'
                      }}>Check Out</div>
                      <div style={{ 
                        fontSize: '15px', 
                        fontWeight: 400,
                        color: 'var(--md-sys-color-on-surface)'
                      }}>
                        {selectedRecord?.checkOut || '-'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: 500,
                      color: 'var(--md-sys-color-on-surface)',
                      marginBottom: '6px'
                    }}>Hours Worked</div>
                    <div style={{ 
                      fontSize: '15px', 
                      fontWeight: 400,
                      color: 'var(--md-sys-color-on-surface)'
                    }}>
                      {selectedRecord?.hoursWorked > 0 ? `${selectedRecord.hoursWorked.toFixed(2)}h` : '-'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
