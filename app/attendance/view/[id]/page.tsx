'use client';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/(Inputs)/Button/Button';
import DataTable from '@/components/DataTable/ProjectTable';
import { attendanceDetailsData } from '@/utils/data/attendanceDetails';
import { attendanceRecordColumns } from '@/utils/columns';
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

  // Add id to records for DataTable
  const recordsWithId = employee.records.map((record, idx) => ({
    ...record,
    id: idx
  }));

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
  
        </div>

        {/* Statistics */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Working Days</div>
            <div className={styles.statValue}>{totalDays}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Present</div>
            <div className={styles.statValue}>{presentDays}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Absent</div>
            <div className={styles.statValue}>{absentDays}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Medical Leave</div>
            <div className={styles.statValue}>{medicalDays}</div>
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

      {/* Monthly Attendance Record Table */}
      <DataTable
        title="Monthly Attendance Record"
        data={recordsWithId}
        columns={attendanceRecordColumns}
        addButtonText=""
        currentPage={1}
        pageSize={recordsWithId.length}
        totalEntries={recordsWithId.length}
        onPageChange={() => {}}
      />

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
  );
}
