import { DataTableColumn } from "@/utils/types/datatable.types";
import { getStatusLabel } from "@/utils/data/attendanceDetails";

export interface AttendanceRecord {
  date: string;
  status: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
}

export const attendanceRecordColumns: DataTableColumn<AttendanceRecord>[] = [
  {
    header: 'Date',
    key: 'date',
    render: (item: AttendanceRecord) => (
      <span>
        {new Date(item.date).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })}
      </span>
    )
  },
  {
    header: 'Status',
    key: 'status',
    render: (item: AttendanceRecord) => {
      const colors: Record<string, { bg: string; text: string }> = {
        'present': { bg: '#ecfdf5', text: '#10b981' },
        'absent': { bg: '#fef2f2', text: '#ef4444' },
        'medical': { bg: '#fffbeb', text: '#f59e0b' },
        'leave': { bg: '#eff6ff', text: '#3b82f6' }
      };
      const style = colors[item.status] || colors['present'];
      return (
        <span style={{ background: style.bg, color: style.text, padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
          {getStatusLabel(item.status)}
        </span>
      );
    }
  },
  { header: 'Check In', key: 'checkIn' },
  { header: 'Check Out', key: 'checkOut' },
  {
    header: 'Hours Worked',
    key: 'hoursWorked',
    render: (item: AttendanceRecord) => (
      <span>
        {item.hoursWorked > 0 ? `${item.hoursWorked.toFixed(2)}h` : '-'}
      </span>
    )
  }
];
