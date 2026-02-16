'use client';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/(Inputs)/Button/Button';
import { attendanceDetailsData, getStatusColor, getStatusLabel } from '@/utils/data/attendanceDetails';
import styles from './attendance.module.css';

export default function AttendanceViewPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  
  const employee = attendanceDetailsData.find(e => e.id === parseInt(decodedId));

  if (!employee) {
    return (
      <div className={styles.container}>
        <h1>Attendance Record Not Found</h1>
        <Button variant="outline" size="md" onClick={() => router.push('/attendance')}>
          Back to Attendance
        </Button>
      </div>
    );
  }

  // Calculate statistics
  const totalDays = employee.records.length;
  const presentDays = employee.records.filter(r => r.status === 'present').length;
  const absentDays = employee.records.filter(r => r.status === 'absent').length;
  const medicalDays = employee.records.filter(r => r.status === 'medical').length;
  const totalHours = employee.records.reduce((sum, r) => sum + r.hoursWorked, 0);
  const avgHours = (totalHours / presentDays).toFixed(2);

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'present': return styles.statusPresent;
      case 'absent': return styles.statusAbsent;
      case 'medical': return styles.statusMedical;
      case 'leave': return styles.statusLeave;
      default: return '';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className={styles.container}>
      {/* Header with Employee Info */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.avatar}>{getInitials(employee.name)}</div>
          <div className={styles.employeeInfo}>
            <h1 className={styles.employeeName}>{employee.name}</h1>
            <div className={styles.employeeDetails}>
              <span>Department: {employee.department}</span>
              <span>Employee ID: {employee.id}</span>
              <span>Month: February 2024</span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push('/attendance')}>
            Back
          </Button>
        </div>

        {/* Statistics */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Working Days</div>
            <div className={styles.statValue}>{totalDays}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel} style={{ color: '#10b981' }}>Present</div>
            <div className={styles.statValue} style={{ color: '#10b981' }}>{presentDays}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel} style={{ color: '#ef4444' }}>Absent</div>
            <div className={styles.statValue} style={{ color: '#ef4444' }}>{absentDays}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel} style={{ color: '#f59e0b' }}>Medical Leave</div>
            <div className={styles.statValue} style={{ color: '#f59e0b' }}>{medicalDays}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Hours</div>
            <div className={styles.statValue}>{totalHours.toFixed(1)}h</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Avg Hours/Day</div>
            <div className={styles.statValue}>{avgHours}h</div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>Monthly Attendance Record</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours Worked</th>
              </tr>
            </thead>
            <tbody>
              {employee.records.map((record, idx) => (
                <tr key={idx}>
                  <td className={styles.dateCell}>
                    {new Date(record.date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className={styles.statusCell}>
                    <span 
                      className={`${styles.statusBadge} ${getStatusBadgeClass(record.status)}`}
                    >
                      {getStatusLabel(record.status)}
                    </span>
                  </td>
                  <td className={styles.timeCell}>
                    <span className={record.checkIn === '-' ? styles.timeCellDisabled : ''}>
                      {record.checkIn}
                    </span>
                  </td>
                  <td className={styles.timeCell}>
                    <span className={record.checkOut === '-' ? styles.timeCellDisabled : ''}>
                      {record.checkOut}
                    </span>
                  </td>
                  <td className={styles.hoursCell}>
                    {record.hoursWorked > 0 ? `${record.hoursWorked.toFixed(2)}h` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.actions}>
          <Button 
            variant="outline" 
            size="md" 
            onClick={() => router.push('/attendance')}
          >
            Back to Attendance
          </Button>
        </div>
      </div>
    </div>
  );
}
